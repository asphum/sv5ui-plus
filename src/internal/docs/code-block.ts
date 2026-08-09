import { codeToHtml } from 'shiki'

export type DocSectionSnippet = {
    heading: string
    snippet: string
}

export type DocSectionSnippetOverrides = Record<string, string>

export function normalizeCode(code: string): string {
    const lines = code.replaceAll('\r\n', '\n').split('\n')
    const firstNonEmpty = lines.findIndex((line) => line.trim().length > 0)
    const lastNonEmptyFromEnd = [...lines].reverse().findIndex((line) => line.trim().length > 0)

    if (firstNonEmpty < 0 || lastNonEmptyFromEnd < 0) {
        return ''
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

function unwrapPreviewWrappers(source: string): string {
    let current = source.trim()

    const stripPrefix = (token: string): string => token.split(':').at(-1) ?? token
    const isPresentationToken = (token: string): boolean => {
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

export function extractSectionSnippet(sectionSource: string): string {
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

function decodeHeading(value: string): string {
    return value
        .replaceAll('&amp;', '&')
        .replaceAll('&times;', '×')
        .replaceAll('&#39;', "'")
        .replaceAll('&quot;', '"')
        .trim()
}

function extractSectionHeading(sectionSource: string): string {
    const match = sectionSource.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/)
    if (!match) return ''

    return decodeHeading(match[1].replace(/<[^>]+>/g, ' '))
}

export function getSectionSnippets(
    source: string,
    routeOverrides: DocSectionSnippetOverrides = {}
): DocSectionSnippet[] {
    const overrides = routeOverrides

    return [...source.matchAll(/<section\b[\s\S]*?<\/section>/g)].map((match) => {
        const sectionSource = match[0]
        const heading = extractSectionHeading(sectionSource)
        const overrideSnippet = heading ? overrides[heading] : undefined

        return {
            heading,
            snippet: overrideSnippet ?? extractSectionSnippet(sectionSource)
        }
    })
}

function detectLanguage(code: string): 'svelte' | 'ts' | 'js' | 'css' | 'html' | 'json' | 'bash' {
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

    if (source.includes('import ') || source.includes('export ') || source.includes('interface ')) {
        return 'ts'
    }

    if (source.startsWith('<') && source.endsWith('>')) {
        return 'html'
    }

    if (source.startsWith('npm ') || source.startsWith('bun ') || source.startsWith('pnpm ')) {
        return 'bash'
    }

    return 'js'
}

function decorateHighlightedHtml(html: string): string {
    return html.replace(/<pre class="shiki[\s\S]*?"[^>]*>/, '<pre class="shiki">')
}

export async function renderHighlightedCode(code: string, isDarkMode = true): Promise<string> {
    const html = await codeToHtml(code, {
        lang: detectLanguage(code),
        theme: isDarkMode ? 'github-dark' : 'github-light'
    })

    return decorateHighlightedHtml(html)
}

export function slugToComponentName(slug: string): string {
    return slug
        .split('-')
        .filter((token) => token.length > 0)
        .map((token) => (token[0] ? token[0].toUpperCase() + token.slice(1) : token))
        .join('')
}

export function slugToHookName(slug: string): string {
    const tokens = slug.split('-').filter((token) => token.length > 0)

    if (tokens.length === 0) return ''

    const [first, ...rest] = tokens
    return [
        first,
        ...rest.map((token) => (token[0] ? token[0].toUpperCase() + token.slice(1) : token))
    ].join('')
}

export function buildDefaultComponentExample(slug: string): string {
    const componentName = slugToComponentName(slug)

    return (
        `<script lang="ts">
 import { ${componentName} } from 'sv5ui-plus';
<` +
        `/script>

<${componentName} />`
    )
}

export function buildDefaultHookExample(slug: string): string {
    const hookName = slugToHookName(slug)

    return (
        `<script lang="ts">
 import { ${hookName} } from 'sv5ui-plus';
<` +
        `/script>

const value = ${hookName}();`
    )
}
