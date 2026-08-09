#!/usr/bin/env node

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { codeToHtml } from 'shiki'
import { z } from 'zod'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '../../')
const packagedDataPath = path.resolve(__dirname, './sv5ui-plus-docs.data.json')

let packagedDataPromise

function resolveRepoPath(relativePath) {
    const fullPath = path.resolve(repoRoot, relativePath)
    if (!fullPath.startsWith(repoRoot)) {
        throw new Error('Invalid path')
    }
    return fullPath
}

async function readJsonIfExists(filePath) {
    try {
        const source = await readFile(filePath, 'utf8')
        return JSON.parse(source)
    } catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
            return null
        }
        throw error
    }
}

async function getPackagedData() {
    packagedDataPromise ??= readJsonIfExists(packagedDataPath)
    return await packagedDataPromise
}

function normalizeCode(code) {
    const lines = code.replaceAll('\r\n', '\n').split('\n')
    const firstNonEmpty = lines.findIndex((line) => line.trim().length > 0)
    if (firstNonEmpty === -1) return ''

    let lastNonEmptyFromEnd = 0
    for (let index = lines.length - 1; index >= 0; index -= 1) {
        if (lines[index].trim().length > 0) break
        lastNonEmptyFromEnd += 1
    }

    const trimmed = lines.slice(firstNonEmpty, lines.length - lastNonEmptyFromEnd)
    const indents = trimmed
        .filter((line) => line.trim().length > 0)
        .map((line) => line.match(/^(\s*)/)?.[1].length ?? 0)

    const minIndent = indents.length > 0 ? Math.min(...indents) : 0
    return trimmed
        .map((line) => line.slice(minIndent))
        .join('\n')
        .trim()
}

function unwrapPreviewWrappers(source) {
    let current = source.trim()

    const stripPrefix = (token) => token.split(':').at(-1) ?? token
    const isPresentationToken = (token) => {
        const t = stripPrefix(token)
        if (t.length === 0) return false

        if (t.startsWith('max-w-') || t.startsWith('min-w-') || t.startsWith('w-')) return true
        if (t.startsWith('max-h-') || t.startsWith('min-h-') || t.startsWith('h-')) return true
        if (/^(m|p)[trblxyse]?-\d+$/.test(t)) return true
        if (t.startsWith('gap-') || t.startsWith('space-')) return true
        if (t.startsWith('overflow-')) return true
        if (t === 'grid' || t.startsWith('grid-')) return true
        if (t === 'flex' || t === 'inline-flex' || t.startsWith('flex-')) return true
        if (t.startsWith('items-') || t.startsWith('justify-') || t.startsWith('content-'))
            return true
        if (t.startsWith('self-') || t.startsWith('place-')) return true
        if (t.startsWith('rounded')) return true
        if (t.startsWith('border') || t.startsWith('ring') || t.startsWith('shadow')) return true
        if (t === 'bg-transparent') return true
        if (t.startsWith('bg-surface')) return true
        if (t.startsWith('bg-[')) return true
        if (t.startsWith('text-') || t.startsWith('font-') || t.startsWith('leading-')) return true
        if (t.startsWith('tracking-')) return true
        if (t === 'uppercase' || t === 'lowercase' || t === 'capitalize') return true
        if (t.startsWith('opacity-')) return true
        if (t.startsWith('backdrop-blur') || t.startsWith('blur')) return true
        if (t.startsWith('aspect-') || t.startsWith('object-')) return true
        if (t.startsWith('size-')) return true
        if (t.startsWith('[') && t.includes(']:')) return true

        return false
    }

    for (let pass = 0; pass < 3; pass += 1) {
        const match = current.match(/^<div\b([^>]*)>([\s\S]*)<\/div>$/)
        if (!match) break

        const attrs = match[1]
        const attrsWithoutClass = attrs
            .replace(/\s*\bclass=(?:"[^"]*"|'[^']*')/, '')
            .replace(/\s+/g, ' ')
            .trim()
        if (attrsWithoutClass.length > 0) break

        const classMatch = attrs.match(/\bclass=(?:"([^"]*)"|'([^']*)')/)
        const classValue = (classMatch?.[1] ?? classMatch?.[2] ?? '').trim()
        const tokens = classValue.length > 0 ? classValue.split(/\s+/) : []

        const isPreviewBg = tokens.some((token) => token.startsWith('bg-surface-container'))
        const isBordered = tokens.some((token) => token.startsWith('border-outline-variant'))
        const isRounded = tokens.some((token) => token.startsWith('rounded'))
        const hasPadding = tokens.some((token) => /^p[trblxy]?-\d+$/.test(token))
        const isMaxWidth = tokens.some((token) => token.startsWith('max-w-'))
        const isOverflow = tokens.some((token) => token.startsWith('overflow-'))
        const isPresentationOnly = tokens.length > 0 && tokens.every(isPresentationToken)

        const shouldUnwrap = ((isPreviewBg || isBordered || isRounded) && hasPadding) || isOverflow
        const shouldUnwrapMaxWidth = isMaxWidth && isPresentationOnly

        if (!shouldUnwrap && !shouldUnwrapMaxWidth) break

        current = match[2].trim()
    }

    return current
}

function decodeHeading(value) {
    return value
        .replaceAll('&amp;', '&')
        .replaceAll('&times;', '×')
        .replaceAll('&#39;', "'")
        .replaceAll('&quot;', '"')
        .trim()
}

function extractSectionHeading(sectionSource) {
    const match = sectionSource.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/)
    if (!match) return ''
    return decodeHeading(match[1].replace(/<[^>]+>/g, ' '))
}

function extractSectionSnippet(sectionSource) {
    const openTagEnd = sectionSource.indexOf('>')
    const closeTagStart = sectionSource.lastIndexOf('</section>')

    if (openTagEnd < 0 || closeTagStart < 0) {
        return normalizeCode(sectionSource)
    }

    let inner = sectionSource.slice(openTagEnd + 1, closeTagStart)
    inner = inner.replace(/^\s*<h2\b[\s\S]*?<\/h2>\s*/, '')
    inner = inner.replace(/^\s*<!--[\s\S]*?-->\s*/g, '')

    while (/^\s*<p\b[\s\S]*?<\/p>\s*/.test(inner)) {
        inner = inner.replace(/^\s*<p\b[\s\S]*?<\/p>\s*/, '')
    }

    inner = inner.replace(/\s*<!--[\s\S]*?-->\s*$/g, '')
    inner = unwrapPreviewWrappers(inner)
    return normalizeCode(inner)
}

function getSectionSnippets(source) {
    return [...source.matchAll(/<section\b[\s\S]*?<\/section>/g)].map((match) => {
        const sectionSource = match[0]
        return {
            heading: extractSectionHeading(sectionSource),
            snippet: extractSectionSnippet(sectionSource)
        }
    })
}

function detectLanguage(code) {
    const source = code.trim()

    if (
        source.includes('<script lang="ts">') ||
        source.includes('$state(') ||
        source.includes('{#each') ||
        source.includes('<Button') ||
        source.includes('<FormField')
    ) {
        return 'svelte'
    }

    if (source.startsWith('{') || source.startsWith('[')) {
        return 'json'
    }

    if (
        source.startsWith('@import') ||
        (source.includes('{') && source.includes(':') && source.includes(';'))
    ) {
        return 'css'
    }

    if (source.startsWith('#') || source.startsWith('bun ') || source.startsWith('npm ')) {
        return 'bash'
    }

    if (source.includes('export ') || source.includes('import ') || source.includes('interface ')) {
        return 'ts'
    }

    return 'html'
}

function decorateHighlightedHtml(html) {
    return html.replace(/<pre class="shiki[\s\S]*?"[^>]*>/, '<pre class="shiki">')
}

async function renderHighlightedCode(code, isDarkMode = true) {
    const html = await codeToHtml(code, {
        lang: detectLanguage(code),
        theme: isDarkMode ? 'github-dark' : 'github-light'
    })
    return decorateHighlightedHtml(html)
}

function getPagePathFromSlug(slug) {
    return `src/routes/${slug}/+page.svelte`
}

async function readRouteSource(slug) {
    const packagedData = await getPackagedData()
    if (packagedData?.pages?.[slug]) {
        return packagedData.pages[slug]
    }

    const filePath = resolveRepoPath(getPagePathFromSlug(slug))
    return await readFile(filePath, 'utf8')
}

async function readDocsNavigationSource() {
    const filePath = resolveRepoPath('src/internal/docs/navigation.ts')
    return await readFile(filePath, 'utf8')
}

async function listDocSlugs() {
    const packagedData = await getPackagedData()
    if (packagedData?.slugs) {
        return packagedData.slugs
    }

    const navigationSource = await readDocsNavigationSource()
    return extractDocSlugs(navigationSource)
}

function extractDocSlugs(navigationSource) {
    const componentSlugs = []
    const hookSlugs = []

    for (const match of navigationSource.matchAll(/href:\s*'\/docs\/components\/([^']+)'/g)) {
        componentSlugs.push(match[1])
    }

    for (const match of navigationSource.matchAll(/href:\s*'\/docs\/hooks\/([^']+)'/g)) {
        hookSlugs.push(match[1])
    }

    return {
        components: Array.from(new Set(componentSlugs)),
        hooks: Array.from(new Set(hookSlugs))
    }
}

const server = new McpServer({
    name: 'sv5ui-plus-docs',
    version: '0.1.0'
})

server.tool(
    'sv5ui_plus_docs_list_slugs',
    'List docs slugs from src/internal/docs/navigation.ts (components + hooks)',
    {},
    async () => {
        const slugs = await listDocSlugs()

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(slugs, null, 2)
                }
            ]
        }
    }
)

server.tool(
    'sv5ui_plus_docs_get_page_source',
    'Read src/routes/[slug]/+page.svelte and return as text',
    {
        slug: z.string().min(1).describe('Route slug, e.g. button, select-menu, use-form-field')
    },
    async ({ slug }) => {
        const source = await readRouteSource(slug)
        return { content: [{ type: 'text', text: source }] }
    }
)

server.tool(
    'sv5ui_plus_docs_get_section_snippets',
    'Extract all <section> headings and code snippets from a route page source',
    {
        slug: z.string().min(1).describe('Route slug, e.g. button, select-menu, use-form-field')
    },
    async ({ slug }) => {
        const source = await readRouteSource(slug)
        const sections = getSectionSnippets(source)
        return { content: [{ type: 'text', text: JSON.stringify(sections, null, 2) }] }
    }
)

server.tool(
    'sv5ui_plus_docs_render_shiki',
    'Render highlighted HTML (Shiki) for a code snippet. Returns <pre class="shiki">...</pre> HTML',
    {
        code: z.string().min(1).describe('Code string'),
        isDarkMode: z.boolean().optional().describe('Use dark theme when true')
    },
    async ({ code, isDarkMode }) => {
        const html = await renderHighlightedCode(code, isDarkMode ?? true)
        return { content: [{ type: 'text', text: html }] }
    }
)

const transport = new StdioServerTransport()
await server.connect(transport)
