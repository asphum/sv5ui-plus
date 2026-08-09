<script lang="ts">
    import { Card, CodeBlock, Fonts, defaultFontFamilies, fontsDefaults } from '$lib/compat.js'
    import { renderHighlightedCode } from '$internal/docs/code-block.js'
    import type { FontDefinition } from '$lib/compat.js'

    const googleFamilies: FontDefinition[] = [
        {
            name: 'Inter',
            variable: '--font-sans-family',
            weights: [400, 500, 600, 700]
        },
        {
            name: 'Poppins',
            variable: '--font-heading-family',
            weights: [600, 700]
        },
        {
            name: 'JetBrains Mono',
            variable: '--font-mono-family',
            weights: [400, 500, 700]
        }
    ]

    const defaultPresetCode = `<Fonts />`

    const defaultPresetItems = [
        {
            variable: '--font-sans-family',
            family: 'Inter',
            weights: '400, 500, 600, 700',
            utility: 'font-sans'
        },
        {
            variable: '--font-heading-family',
            family: 'Inter',
            weights: '400, 500, 600, 700',
            utility: 'font-heading'
        },
        {
            variable: '--font-mono-family',
            family: 'JetBrains Mono',
            weights: '400, 500, 700',
            utility: 'font-mono'
        }
    ] as const

    const localSetupSteps = [
        'Add your files under `static/fonts/*` so they are served from the app root.',
        'Map each file with `provider: "local"` and `sources` entries for the weights/styles you need.',
        'Bind the family to a CSS variable such as `--font-sarabun-family`.',
        'Use the mapped variable through utility classes like `font-sarabun`, `font-heading`, or `font-mono`.'
    ] as const

    const localLayoutCode = `<script lang="ts">
 import 'svelora/theme.css';
 import { Fonts } from 'svelora';

 let { children } = $props();
<` + `/script>

<Fonts
 families={[
  {
   provider: 'local',
   name: 'Sarabun',
   variable: '--font-sarabun-family',
   sources: [
    { src: '/fonts/Sarabun-Regular.woff2', format: 'woff2', weight: 400 },
    { src: '/fonts/Sarabun-Medium.woff2', format: 'woff2', weight: 500 },
    { src: '/fonts/Sarabun-Bold.woff2', format: 'woff2', weight: 700 }
   ]
  }
 ]}
/>

<main class="font-sarabun">
 {@render children?.()}
</main>`

    const familyReference = [
        {
            name: 'provider',
            type: `'google' | 'local'`,
            description: 'Selects whether the family loads from Google Fonts or local assets.'
        },
        {
            name: 'name',
            type: 'string',
            description: 'Font family name used in the request or `@font-face` declaration.'
        },
        {
            name: 'variable',
            type: '`--${string}`',
            description: 'CSS custom property that stores the generated font-family stack.'
        },
        {
            name: 'fallback',
            type: 'string',
            description: 'Optional fallback stack appended after the primary font family.'
        },
        {
            name: 'weights',
            type: 'number[]',
            description: 'Google-only list of weights to request.'
        },
        {
            name: 'styles',
            type: `('normal' | 'italic')[]`,
            description: 'Google-only styles to request.'
        },
        {
            name: 'sources',
            type: 'LocalFontSource[]',
            description: 'Local-only file definitions used to build `@font-face` rules.'
        }
    ] as const

    const optionsReference = [
        {
            name: 'families',
            type: 'FontDefinition[]',
            description: 'Complete list of families managed by the provider.'
        },
        {
            name: 'display',
            type: `'auto' | 'block' | 'swap' | 'fallback' | 'optional'`,
            description: 'Controls `font-display` for Google requests and local `@font-face` output.'
        },
        {
            name: 'preconnect',
            type: 'boolean',
            description: 'Adds preconnect links for Google Fonts when enabled.'
        }
    ] as const

    const localSourceReference = [
        {
            name: 'src',
            type: 'string',
            description: 'Public URL to the local font file, for example `/fonts/Sarabun-Regular.woff2`.'
        },
        {
            name: 'format',
            type: `'woff2' | 'woff' | 'truetype' | 'opentype' | 'embedded-opentype' | 'svg'`,
            description: 'Optional format hint used in `@font-face`.'
        },
        {
            name: 'weight',
            type: 'number | `${number} ${number}`',
            description: 'Single weight or variable font range.'
        },
        {
            name: 'style',
            type: `'normal' | 'italic'`,
            description: 'Font style for the source entry.'
        },
        {
            name: 'unicodeRange',
            type: 'string',
            description: 'Optional unicode-range for partial subsets.'
        }
    ] as const

    const localProviderCode = `<Fonts
 families={[
  {
   provider: 'local',
   name: 'Sarabun',
   variable: '--font-sarabun-family',
   sources: [
    { src: '/fonts/Sarabun-Regular.woff2', format: 'woff2', weight: 400 },
    { src: '/fonts/Sarabun-Bold.woff2', format: 'woff2', weight: 700 }
   ]
  }
 ]}
/>`

    const mixedProviderCode = `<Fonts
 families={[
  { name: 'Inter', variable: '--font-sans-family', weights: [400, 500, 600, 700] },
  { name: 'Poppins', variable: '--font-heading-family', weights: [600, 700] },
  {
   provider: 'local',
   name: 'Sarabun',
   variable: '--font-sarabun-family',
   sources: [{ src: '/fonts/Sarabun-Regular.woff2', format: 'woff2', weight: 400 }]
  }
 ]}
/>`

    const configCode = `import { defineConfig } from 'svelora';

defineConfig({
 fonts: {
  families: [
   { name: 'Inter', variable: '--font-sans-family', weights: [400, 500, 600, 700] },
   { name: 'Poppins', variable: '--font-heading-family', weights: [600, 700] },
   {
    provider: 'local',
    name: 'Sarabun',
    variable: '--font-sarabun-family',
    sources: [
     { src: '/fonts/Sarabun-Regular.woff2', format: 'woff2', weight: 400 },
     { src: '/fonts/Sarabun-Bold.woff2', format: 'woff2', weight: 700 }
    ]
   }
  ]
 }
});`

    const layoutCode = `<script lang="ts">
 import 'svelora/theme.css';
 import { Fonts } from 'svelora';
 import { ModeWatcher } from 'mode-watcher';

 let { children } = $props();
<` + `/script>

<Fonts />
<ModeWatcher />
{@render children?.()}`

    const disableDefaultsCode = `import { defineConfig } from 'svelora';

defineConfig({
 fonts: false
});`

    let isDarkMode = $state(true)
    let defaultPresetHtml = $state('')
    let localProviderHtml = $state('')
    let localLayoutHtml = $state('')
    let mixedProviderHtml = $state('')
    let configHtml = $state('')
    let layoutHtml = $state('')
    let disableDefaultsHtml = $state('')

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

        const tasks = [
            renderHighlightedCode(defaultPresetCode, darkMode).then((html) => {
                if (!cancelled) defaultPresetHtml = html
            }),
            renderHighlightedCode(localProviderCode, darkMode).then((html) => {
                if (!cancelled) localProviderHtml = html
            }),
            renderHighlightedCode(localLayoutCode, darkMode).then((html) => {
                if (!cancelled) localLayoutHtml = html
            }),
            renderHighlightedCode(mixedProviderCode, darkMode).then((html) => {
                if (!cancelled) mixedProviderHtml = html
            }),
            renderHighlightedCode(configCode, darkMode).then((html) => {
                if (!cancelled) configHtml = html
            }),
            renderHighlightedCode(layoutCode, darkMode).then((html) => {
                if (!cancelled) layoutHtml = html
            }),
            renderHighlightedCode(disableDefaultsCode, darkMode).then((html) => {
                if (!cancelled) disableDefaultsHtml = html
            })
        ]

        void Promise.all(tasks)

        return () => {
            cancelled = true
        }
    })
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Fonts</h1>
        <p class="text-on-surface-variant">
            A unified font provider for Svelora that supports both Google Fonts and local font files
            through the same `fonts.families` API.
        </p>
    </div>

    <section class="space-y-3">
        <h2 id="Default-Preset" class="text-lg font-semibold">
<a href="#Default-Preset" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Default Preset
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            If you render `<Fonts />` without props or custom config, Svelora uses the built-in preset
            below. The current default display is `{fontsDefaults.display}` with preconnect set to
            `{fontsDefaults.preconnect ? 'true' : 'false'}`.
        </p>
        <CodeBlock title="Default Preset" code={defaultPresetCode} html={defaultPresetHtml} />
        <div class="grid gap-4 md:grid-cols-3">
            {#each defaultPresetItems as item (item.variable)}
                <Card class="border border-outline-variant/70">
                    <div class="space-y-2">
                        <p class="font-mono text-xs text-on-surface-variant">{item.variable}</p>
                        <h3 class="text-base font-semibold">{item.family}</h3>
                        <p class="text-sm text-on-surface-variant">Weights: {item.weights}</p>
                        <p class="text-sm text-on-surface-variant">Utility: `{item.utility}`</p>
                    </div>
                </Card>
            {/each}
        </div>
        <p class="text-sm text-on-surface-variant">
            The preset is sourced from `defaultFontFamilies` and currently includes
            `{defaultFontFamilies.length}` families.
        </p>
    </section>

    <section class="space-y-3">
        <h2 id="Google-Provider" class="text-lg font-semibold">
<a href="#Google-Provider" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Google Provider
                    </a>
</h2>
        <div class="rounded-lg bg-surface-container-high p-4">
            <Fonts families={googleFamilies} />
            <h3 class="font-heading text-2xl font-semibold">Poppins heading</h3>
            <p>Inter body copy is mapped to `--font-sans-family`.</p>
            <p class="font-mono mt-2 text-sm">const provider = 'google';</p>
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Local-Provider" class="text-lg font-semibold">
<a href="#Local-Provider" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Local Provider
                    </a>
</h2>
        <CodeBlock title="Local Provider" code={localProviderCode} html={localProviderHtml} />
        <p class="text-sm text-on-surface-variant">
            Put your font files under `static/fonts/*`, map them to a CSS variable, then use utility
            classes like `font-sarabun` across the project.
        </p>
    </section>

    <section class="space-y-3">
        <h2 id="Local-Font-Setup" class="text-lg font-semibold">
<a href="#Local-Font-Setup" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Local Font Setup
                    </a>
</h2>
        <div class="grid gap-3 md:grid-cols-2">
            {#each localSetupSteps as step, index (`${index}-${step}`)}
                <Card class="border border-outline-variant/70">
                    <div class="space-y-2">
                        <p class="text-sm font-medium text-primary">Step {index + 1}</p>
                        <p class="text-sm text-on-surface-variant">{step}</p>
                    </div>
                </Card>
            {/each}
        </div>
        <CodeBlock title="Local Font Setup" code={localLayoutCode} html={localLayoutHtml} />
    </section>

    <section class="space-y-3">
        <h2 id="Mixed-Providers" class="text-lg font-semibold">
<a href="#Mixed-Providers" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Mixed Providers
                    </a>
</h2>
        <CodeBlock title="Mixed Providers" code={mixedProviderCode} html={mixedProviderHtml} />
        <p class="text-sm text-on-surface-variant">
            Mix Google fonts for global typography with local assets for brand or language-specific
            families in the same provider.
        </p>
    </section>

    <section class="space-y-3">
        <h2 id="Using-Global-Config" class="text-lg font-semibold">
<a href="#Using-Global-Config" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Using Global Config
                    </a>
</h2>
        <CodeBlock title="defineConfig()" code={configCode} html={configHtml} />
        <CodeBlock title="+layout.svelte" code={layoutCode} html={layoutHtml} />
    </section>

    <section class="space-y-3">
        <h2 id="Disable-Defaults" class="text-lg font-semibold">
<a href="#Disable-Defaults" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Disable Defaults
                    </a>
</h2>
        <CodeBlock title="Disable Defaults" code={disableDefaultsCode} html={disableDefaultsHtml} />
        <p class="text-sm text-on-surface-variant">
            Set `fonts: false` when you want to fully manage font loading yourself.
        </p>
    </section>

    <section class="space-y-3">
        <h2 id="API-Reference" class="text-lg font-semibold">
<a href="#API-Reference" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        API Reference
                    </a>
</h2>
        <div class="grid gap-4 lg:grid-cols-2">
            <Card class="border border-outline-variant/70">
                <div class="space-y-4">
                    <h3 class="text-base font-semibold">Fonts Options</h3>
                    <div class="space-y-3">
                        {#each optionsReference as item (item.name)}
                            <div class="border-b border-outline-variant/60 pb-3 last:border-b-0 last:pb-0">
                                <p class="font-mono text-xs text-on-surface-variant">{item.name}</p>
                                <p class="mt-1 text-sm font-medium">{item.type}</p>
                                <p class="mt-1 text-sm text-on-surface-variant">{item.description}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
            <Card class="border border-outline-variant/70">
                <div class="space-y-4">
                    <h3 class="text-base font-semibold">Font Definition</h3>
                    <div class="space-y-3">
                        {#each familyReference as item (item.name)}
                            <div class="border-b border-outline-variant/60 pb-3 last:border-b-0 last:pb-0">
                                <p class="font-mono text-xs text-on-surface-variant">{item.name}</p>
                                <p class="mt-1 text-sm font-medium">{item.type}</p>
                                <p class="mt-1 text-sm text-on-surface-variant">{item.description}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
        </div>
        <Card class="border border-outline-variant/70">
            <div class="space-y-4">
                <h3 class="text-base font-semibold">Local Font Source</h3>
                <div class="grid gap-3 md:grid-cols-2">
                    {#each localSourceReference as item (item.name)}
                        <div class="rounded-xl border border-outline-variant/60 p-4">
                            <p class="font-mono text-xs text-on-surface-variant">{item.name}</p>
                            <p class="mt-1 text-sm font-medium">{item.type}</p>
                            <p class="mt-1 text-sm text-on-surface-variant">{item.description}</p>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>
    </section>
</div>
