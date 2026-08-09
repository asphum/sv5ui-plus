<script lang="ts">
    import { CodeBlock } from '$lib/compat.js'
    import { renderHighlightedCode } from '$internal/docs/code-block.js'

    const sampleCode = `<script lang="ts">
 import { Button } from 'svelora';
<` + `/script>

<Button label="Hello" />`

    const sampleTs = `type User = { _id: string; name: string }

const user: User = { _id: 'u_1', name: 'Jane' }
console.log(user)`

    let shikiHtml = $state('')
    let isDarkMode = $state(true)

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

        observer.observe(root, { attributes: true, attributeFilter: ['class'] })
        return () => observer.disconnect()
    })

    $effect(() => {
        const darkMode = isDarkMode
        let cancelled = false

        void renderHighlightedCode(sampleCode, darkMode).then((html) => {
            if (cancelled) return
            shikiHtml = html
        })

        return () => {
            cancelled = true
        }
    })
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">CodeBlock</h1>
        <p class="text-on-surface-variant">
            Display code snippets with a consistent header, copy button, and theme-aware styling.
        </p>
    </div>

    <section class="space-y-3">
        <h2 id="Basic" class="text-lg font-semibold">
<a href="#Basic" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Basic
                    </a>
</h2>
        <div class="rounded-lg bg-surface-container-high p-4">
            <CodeBlock title="Code" code={sampleTs} />
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="With-highlighted-HTML" class="text-lg font-semibold">
<a href="#With-highlighted-HTML" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        With highlighted HTML
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Provide pre-highlighted HTML (for example, from Shiki) via the <code>html</code> prop.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4">
            <CodeBlock code={sampleCode} html={shikiHtml} />
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Variants" class="text-lg font-semibold">
<a href="#Variants" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Variants
                    </a>
</h2>
        <div class="grid gap-3 md:grid-cols-2">
            <div class="rounded-lg bg-surface-container-high p-4">
                <CodeBlock title="outline" variant="outline" code={sampleTs} />
            </div>
            <div class="rounded-lg bg-surface-container-high p-4">
                <CodeBlock title="soft" variant="soft" code={sampleTs} />
            </div>
            <div class="rounded-lg bg-surface-container-high p-4">
                <CodeBlock title="subtle" variant="subtle" code={sampleTs} />
            </div>
            <div class="rounded-lg bg-surface-container-high p-4">
                <CodeBlock title="solid" variant="solid" code={sampleTs} />
            </div>
            <div class="rounded-lg bg-surface-container-high p-4">
                <CodeBlock title="ghost" variant="ghost" code={sampleTs} />
            </div>
            <div class="rounded-lg bg-surface-container-high p-4">
                <CodeBlock title="none" variant="none" code={sampleTs} />
            </div>
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Sizes" class="text-lg font-semibold">
<a href="#Sizes" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Sizes
                    </a>
</h2>
        <div class="grid gap-3 md:grid-cols-3">
            <div class="rounded-lg bg-surface-container-high p-4">
                <CodeBlock title="sm" size="sm" code={sampleTs} />
            </div>
            <div class="rounded-lg bg-surface-container-high p-4">
                <CodeBlock title="md" size="md" code={sampleTs} />
            </div>
            <div class="rounded-lg bg-surface-container-high p-4">
                <CodeBlock title="lg" size="lg" code={sampleTs} />
            </div>
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Copy-controls" class="text-lg font-semibold">
<a href="#Copy-controls" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Copy controls
                    </a>
</h2>
        <div class="grid gap-3 md:grid-cols-2">
            <div class="rounded-lg bg-surface-container-high p-4">
                <CodeBlock title="copyable=false" code={sampleTs} copyable={false} />
            </div>
            <div class="rounded-lg bg-surface-container-high p-4">
                <CodeBlock title="custom copyText" code="Visible code" copyText="Copied text" />
            </div>
        </div>
    </section>
</div>

