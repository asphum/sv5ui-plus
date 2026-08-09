<script lang="ts">
    import { mount, tick, unmount } from 'svelte'
    import { CodeBlock, Link } from '$lib/compat.js'
    import { getSectionSnippets, renderHighlightedCode } from '$internal/docs/code-block.js'
    import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'
    import Page from '../../drag-and-drop/+page.svelte'
    import pageSource from '../../drag-and-drop/+page.svelte?raw'
    import { quickExample } from '../../drag-and-drop/quick-example.js'
    import { sectionSnippets } from '../../drag-and-drop/snippets.js'

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

        if (!root || !source) return

        let cancelled = false

        void tick().then(() => {
            if (cancelled) return
            void injectCodeBlocks(root, source, darkMode, sectionSnippets)
        })

        return () => {
            cancelled = true
            clearInjectedCodeBlocks(root)
        }
    })

    $effect(() => {
        const code = quickExample
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

<div class="space-y-8">
    <section class="space-y-3 rounded-2xl border border-outline-variant bg-surface-container/40 p-5">
        <div class="space-y-1">
            <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">Quick Example</p>
            <h2 id="Drag-and-Drop-Usage" class="text-xl font-semibold">
                <a
                    href="#Drag-and-Drop-Usage"
                    class="group relative inline-flex w-fit items-center no-underline hover:underline focus:outline-none focus-visible:underline"
                >
                    <span
                        class="absolute -left-5 top-1/2 -translate-y-1/2 text-base font-normal leading-none text-primary/60 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true">#</span>
                    Drag & Drop Usage
                </a>
            </h2>
            <p class="text-sm text-on-surface-variant">
                Start with <Link href="/docs/components/sortable-list" class="text-primary underline">SortableList</Link>
                for list reordering, or
                <Link href="/docs/hooks/use-drag-drop" class="text-primary underline">useDragDrop</Link>
                for kanban-style moves between zones.
            </p>
        </div>
        <CodeBlock code={quickExample} html={quickExampleHtml} />
    </section>

    <div bind:this={containerEl}>
        <Page />
    </div>
</div>
