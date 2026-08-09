<script lang="ts">
    import type { Component } from 'svelte'
    import { mount, tick, unmount } from 'svelte'
    import { CodeBlock, Link } from '$lib/compat.js'
    import { docsHookItems } from '$internal/docs/navigation.js'
    import { buildDefaultHookExample, getSectionSnippets, renderHighlightedCode } from '$internal/docs/code-block.js'
    import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'

    type PageModule = {
        default: Component
    }

    type SnippetModule = {
        sectionSnippets: DocSectionSnippetOverrides
    }

    type QuickExampleModule = {
        quickExample: string
    }

    const modules = import.meta.glob('../../../use*/+page.svelte', {
        eager: true
    }) as Record<string, PageModule>

    const sourceModules = import.meta.glob('../../../use-*/+page.svelte', {
        eager: true,
        query: '?raw',
        import: 'default'
    }) as Record<string, string>

    const snippetModules = import.meta.glob('../../../use-*/snippets.ts', {
        eager: true
    }) as Record<string, SnippetModule>

    const quickExampleModules = import.meta.glob('../../../use-*/quick-example.ts', {
        eager: true
    }) as Record<string, QuickExampleModule>

    const docsPages = new Map<string, Component>(
        Object.entries(modules)
            .map(([path, module]) => [path.split('/').at(-2) ?? '', module.default] as const)
            .filter(([slug]) => slug.length > 0)
    )

    const pageSources = new Map<string, string>(
        Object.entries(sourceModules)
            .map(([path, source]) => [path.split('/').at(-2) ?? '', source] as const)
            .filter(([slug]) => slug.length > 0)
    )

    const pageSnippetOverrides = new Map<string, DocSectionSnippetOverrides>(
        Object.entries(snippetModules)
            .map(([path, module]) => [path.split('/').at(-2) ?? '', module.sectionSnippets] as const)
            .filter(([slug]) => slug.length > 0)
    )

    const pageQuickExamples = new Map<string, string>(
        Object.entries(quickExampleModules)
            .map(([path, module]) => [path.split('/').at(-2) ?? '', module.quickExample] as const)
            .filter(([slug]) => slug.length > 0)
    )

    const { data } = $props<{
        data: {
            slug: string
        }
    }>()

    const hookMeta = $derived(docsHookItems.find((item) => item.href.endsWith(`/${data.slug}`)))
    const resolvedPage = $derived(docsPages.get(data.slug))
    const pageSource = $derived(pageSources.get(data.slug) ?? '')
    const routeSnippetOverrides = $derived(pageSnippetOverrides.get(data.slug) ?? {})
    const routeQuickExample = $derived(pageQuickExamples.get(data.slug))

    const exampleCode = $derived.by(() => {
        return routeQuickExample ?? buildDefaultHookExample(data.slug)
    })

    let containerEl = $state<HTMLElement | null>(null)
    let quickExampleHtml = $state('')
    let isDarkMode = $state(true)

    const mountedCodeBlocks = new Map<Element, ReturnType<typeof mount>>()

    function clearInjectedCodeBlocks(root: HTMLElement): void {
        root.querySelectorAll('[data-doc-code]').forEach((node) => {
            const instance = mountedCodeBlocks.get(node)
            if (instance) {
                unmount(instance)
                mountedCodeBlocks.delete(node)
            }
            node.remove()
        })
    }

    async function injectCodeBlocks(
        root: HTMLElement,
        source: string,
        darkMode: boolean,
        snippetOverrides: DocSectionSnippetOverrides
    ): Promise<void> {
        clearInjectedCodeBlocks(root)

        const snippets = getSectionSnippets(source, snippetOverrides)
        const sections = Array.from(root.querySelectorAll('section'))
        const highlightedSnippets = await Promise.all(
            snippets.map((entry) => renderHighlightedCode(entry.snippet, darkMode))
        )

        sections.forEach((section, index) => {
            if (section.querySelector('pre, .shiki')) return

            const code = snippets[index]?.snippet
            const highlightedHtml = highlightedSnippets[index]
            if (!code || !highlightedHtml) return

            const host = document.createElement('div')
            host.setAttribute('data-doc-code', 'true')
            section.appendChild(host)

            const instance = mount(CodeBlock, {
                target: host,
                props: {
                    title: 'Code',
                    code,
                    copyText: code,
                    html: highlightedHtml
                }
            })
            mountedCodeBlocks.set(host, instance)
        })
    }

    $effect(() => {
        const root = containerEl
        const source = pageSource
        const darkMode = isDarkMode
        const snippetOverrides = routeSnippetOverrides

        if (!root || !source) return

        let cancelled = false

        void tick().then(() => {
            if (cancelled) return
            void injectCodeBlocks(root, source, darkMode, snippetOverrides)
        })

        return () => {
            cancelled = true
            clearInjectedCodeBlocks(root)
        }
    })

    $effect(() => {
        const code = exampleCode
        const darkMode = isDarkMode
        let cancelled = false

        void renderHighlightedCode(code, darkMode).then((html) => {
            if (cancelled) return
            quickExampleHtml = html
        })

        return () => {
            cancelled = true
        }
    })

    $effect(() => {
        if (typeof document === 'undefined') return

        const root = document.documentElement
        const updateMode = () => {
            isDarkMode = root.classList.contains('dark')
        }

        updateMode()

        const observer = new MutationObserver(() => {
            updateMode()
        })

        observer.observe(root, {
            attributes: true,
            attributeFilter: ['class']
        })

        return () => {
            observer.disconnect()
        }
    })
</script>

{#if resolvedPage}
    {@const ResolvedPage = resolvedPage}
    <div class="space-y-8">
        <section class="space-y-3 rounded-2xl border border-outline-variant bg-surface-container/40 p-5">
            <div class="space-y-1">
                <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
                    Quick Example
                </p>
                <h2 id="hookMetatitle--Hook-Usage" class="text-xl font-semibold">
<a href="#hookMetatitle--Hook-Usage" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        {hookMeta?.title ?? 'Hook'} Usage
                    </a>
</h2>
                <p class="text-sm text-on-surface-variant">
                    ตัวอย่าง import และการใช้งานแบบสั้นสำหรับหน้า `{data.slug}`
                </p>
            </div>
            <CodeBlock code={exampleCode} html={quickExampleHtml} />
        </section>

        <div bind:this={containerEl}>
            <ResolvedPage />
        </div>
    </div>
{:else}
    <div class="space-y-4">
        <h1 class="text-3xl font-semibold">Hook not found</h1>
        <p class="text-on-surface-variant">
            The requested hook page does not exist.
        </p>
        <Link href="/docs/hooks" raw class="text-primary hover:underline">
            Back to all hooks
        </Link>
    </div>
{/if}
