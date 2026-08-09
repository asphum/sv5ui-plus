<script lang="ts">
    import { Badge, Button, Card, Fonts, Link } from '$lib/compat.js'

    const importThemeCode = `@import 'tailwindcss';
@import 'svelora/theme.css';

@custom-variant dark (&:where(.dark, .dark *));`

    const oklchCode = `/* oklch(lightness chroma hue) */

/* Lightness: 0 (black) -> 1 (white) */
/* Chroma: 0 (gray) -> 0.4 (vivid) */
/* Hue: 0-360 (color wheel angle) */

--color-primary: oklch(0.546 0.245 262.88);
/* bright vivid blue */`

    const tailwindCode = `<!-- Background colors -->
<div class="bg-primary">Primary background</div>
<div class="bg-surface-container">Elevated surface</div>

<!-- Text colors -->
<p class="text-on-surface">Primary text</p>
<p class="text-on-surface/60">Muted text (60% opacity)</p>

<!-- Border colors -->
<div class="border-outline-variant">Subtle border</div>

<!-- Combined -->
<div class="bg-primary-container text-on-primary-container">
 Tinted container
</div>`

    const customColorsCode = `@import 'tailwindcss';
@import 'svelora/theme.css';

@custom-variant dark (&:where(.dark, .dark *));

:root {
 --color-primary: oklch(0.60 0.20 280);
 --color-on-primary: oklch(1 0 0);
 --color-primary-container: oklch(0.90 0.05 280);
 --color-on-primary-container: oklch(0.25 0.10 280);
}

.dark {
 --color-primary: oklch(0.75 0.15 280);
 --color-on-primary: oklch(0.20 0.05 280);
 --color-primary-container: oklch(0.30 0.08 280);
 --color-on-primary-container: oklch(0.90 0.05 280);
}`

    const radiusCode = `:root {
 --radius-xs: 0.125rem;
 --radius-sm: 0.25rem;
 --radius-md: 0.375rem;
 --radius-lg: 0.5rem;
 --radius-xl: 0.75rem;
 --radius-2xl: 1rem;
 --radius-3xl: 1.5rem;
 --radius-full: 9999px;
}`

    const fontsLayoutCode = `<` + `script lang="ts">
 import { Fonts } from 'svelora';
 import { ModeWatcher } from 'mode-watcher';
 import 'svelora/theme.css';

 let { children } = $props();
<` + `/script>

<Fonts
 families={[
  { name: 'Inter', variable: '--font-sans-family', weights: [400, 500, 600, 700] },
  { name: 'Poppins', variable: '--font-heading-family', weights: [600, 700] },
  { name: 'JetBrains Mono', variable: '--font-mono-family', weights: [400, 500, 700] }
 ]}
/>

<ModeWatcher />
{@render children?.()}`

    const modeWatcherPropsCode = `<!-- Default behavior (syncs with system, saves to localStorage) -->
<ModeWatcher />

<!-- Force dark mode by default -->
<ModeWatcher defaultMode="dark" />

<!-- Disable saving to localStorage (always use system preference) -->
<ModeWatcher track={false} />`

    const sarabunCode = `<` + `script lang="ts">
 import { Fonts } from 'svelora';
<` + `/script>

<Fonts
 families={[
  {
   provider: 'local',
   name: 'Sarabun',
   variable: '--font-sarabun-family',
   sources: [{ src: '/fonts/Sarabun-Regular.woff2', format: 'woff2', weight: 400 }]
  }
 ]}
/>

<p class="font-sarabun">Hello Sarabun</p>`

    const fontsConfigCode = `import { defineConfig } from 'svelora';

defineConfig({
 fonts: {
  families: [
   { name: 'Inter', variable: '--font-sans-family', weights: [400, 500, 600, 700] },
   { name: 'Poppins', variable: '--font-heading-family', weights: [600, 700] },
   { name: 'JetBrains Mono', variable: '--font-mono-family', weights: [400, 500, 700] },
   {
    provider: 'local',
    name: 'Sarabun',
    variable: '--font-sarabun-family',
    sources: [{ src: '/fonts/Sarabun-Regular.woff2', format: 'woff2', weight: 400 }]
   }
  ]
 }
});`

    const configCode = `import { defineConfig } from 'svelora';

defineConfig({
 button: {
  defaultVariants: { variant: 'outline', size: 'md' },
  slots: { base: 'rounded-full' }
 },
 avatar: {
  defaultVariants: { size: 'lg' },
  slots: { root: 'ring-2 ring-primary' }
 },
 icons: {
  loading: 'svg-spinners:ring-resize',
  close: 'lucide:x',
  chevronDown: 'lucide:chevron-down',
  chevronRight: 'lucide:chevron-right',
  check: 'lucide:check',
  light: 'lucide:sun',
  dark: 'lucide:moon'
 }
});`

    const overridesCode = `<Button
 ui={{ base: 'rounded-full shadow-lg', label: 'uppercase' }}
 label="Custom Button"
/>

<Card ui={{ root: 'shadow-xl', header: 'bg-primary/5' }}>
 {#snippet header()}
 <h3>Styled Card</h3>
 {/snippet}
 Content here
</Card>`

    const colorTokens = [
        {
            name: 'primary',
            baseClass: 'bg-primary text-on-primary',
            containerClass: 'bg-primary-container text-on-primary-container'
        },
        {
            name: 'secondary',
            baseClass: 'bg-secondary text-on-secondary',
            containerClass: 'bg-secondary-container text-on-secondary-container'
        },
        {
            name: 'tertiary',
            baseClass: 'bg-tertiary text-on-tertiary',
            containerClass: 'bg-tertiary-container text-on-tertiary-container'
        },
        {
            name: 'success',
            baseClass: 'bg-success text-on-success',
            containerClass: 'bg-success-container text-on-success-container'
        },
        {
            name: 'warning',
            baseClass: 'bg-warning text-on-warning',
            containerClass: 'bg-warning-container text-on-warning-container'
        },
        {
            name: 'error',
            baseClass: 'bg-error text-on-error',
            containerClass: 'bg-error-container text-on-error-container'
        },
        {
            name: 'info',
            baseClass: 'bg-info text-on-info',
            containerClass: 'bg-info-container text-on-info-container'
        },
        {
            name: 'surface',
            baseClass: 'bg-surface text-on-surface',
            containerClass: 'bg-surface-container text-on-surface'
        }
    ] as const
</script>

<div class="space-y-10">
    <Fonts
        families={[
            { name: 'Inter', variable: '--font-sans-family', weights: [400, 500, 600, 700] },
            { name: 'Poppins', variable: '--font-heading-family', weights: [600, 700] },
            { name: 'JetBrains Mono', variable: '--font-mono-family', weights: [400, 500, 700] }
        ]}
    />

    <section class="space-y-4 border-b border-outline-variant/60 pb-8">
        <nav class="text-sm text-on-surface-variant">
            <ol class="flex flex-wrap items-center gap-2">
                <li><Link href="/docs" raw class="hover:text-primary">Docs</Link></li>
                <li>/</li>
                <li><Link href="/docs" raw class="hover:text-primary">Getting Started</Link></li>
                <li>/</li>
                <li>Theming</li>
            </ol>
        </nav>

        <div class="space-y-3">
            <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
                Getting Started
            </p>
            <h1 class="text-4xl font-semibold tracking-tight">Theming</h1>
            <p class="max-w-3xl text-lg leading-8 text-on-surface-variant">
                Svelora uses an <strong>OKLCH color system</strong> with CSS custom properties.
                Every color automatically adapts to light and dark mode.
            </p>
        </div>
    </section>

    <section class="space-y-4">
        <h2 id="Import-Theme" class="text-xl font-semibold">
<a href="#Import-Theme" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Import Theme
                    </a>
</h2>
        <p class="text-on-surface-variant">
            Import `svelora/theme.css` in your layout CSS to load all color tokens.
        </p>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm text-on-surface-variant">`src/routes/layout.css`</p>
            <pre class="overflow-x-auto text-sm"><code>{importThemeCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 id="OKLCH-Color-Space" class="text-xl font-semibold">
<a href="#OKLCH-Color-Space" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        OKLCH Color Space
                    </a>
</h2>
        <p class="text-on-surface-variant">
            Svelora uses OKLCH, a perceptually uniform color space. Colors stay more consistent across lightness levels.
        </p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{oklchCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 id="Color-Tokens" class="text-xl font-semibold">
<a href="#Color-Tokens" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Color Tokens
                    </a>
</h2>
        <p class="text-on-surface-variant">
            Each semantic color provides base, on-color, container, and on-container tokens.
        </p>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {#each colorTokens as color (color.name)}
                <Card class="border border-outline-variant/70">
                    <div class="space-y-4">
                        <div class={`rounded-2xl p-4 text-sm font-medium ${color.baseClass}`}>
                            {color.name}
                        </div>
                        <div class={`rounded-2xl p-4 text-sm ${color.containerClass}`}>
                            {color.name}-container
                        </div>
                    </div>
                </Card>
            {/each}
        </div>
        <p class="text-sm text-on-surface-variant">
            Each color provides `--color-&#123;name&#125;`, `--color-on-&#123;name&#125;`, `--color-&#123;name&#125;-container`, and `--color-on-&#123;name&#125;-container`.
        </p>
    </section>

    <section class="space-y-4">
        <h2 id="Surface-System" class="text-xl font-semibold">
<a href="#Surface-System" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Surface System
                    </a>
</h2>
        <p class="text-on-surface-variant">
            Surface tokens provide depth-based backgrounds for pages, cards, dialogs, drawers, and popovers.
        </p>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div class="rounded-2xl border border-outline-variant bg-surface p-5 text-on-surface">`bg-surface`</div>
            <div class="rounded-2xl border border-outline-variant bg-surface-container-low p-5 text-on-surface">`bg-surface-container-low`</div>
            <div class="rounded-2xl border border-outline-variant bg-surface-container p-5 text-on-surface">`bg-surface-container`</div>
            <div class="rounded-2xl border border-outline-variant bg-surface-container-high p-5 text-on-surface">`bg-surface-container-high`</div>
            <div class="rounded-2xl border border-outline-variant bg-surface-container-highest p-5 text-on-surface">`bg-surface-container-highest`</div>
            <div class="rounded-2xl border border-outline-variant p-5 text-on-surface">
                <p class="font-medium">Borders & text</p>
                <p class="mt-2 text-on-surface-variant">`text-on-surface-variant`</p>
                <div class="mt-3 rounded-xl border border-outline p-3">`border-outline`</div>
            </div>
        </div>
    </section>

    <section class="space-y-4">
        <h2 id="Using-in-Tailwind" class="text-xl font-semibold">
<a href="#Using-in-Tailwind" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Using in Tailwind
                    </a>
</h2>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{tailwindCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 id="Customizing-Colors" class="text-xl font-semibold">
<a href="#Customizing-Colors" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Customizing Colors
                    </a>
</h2>
        <p class="text-on-surface-variant">
            Override CSS custom properties to customize any color. Define both light and dark values.
        </p>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm text-on-surface-variant">`src/routes/layout.css`</p>
            <pre class="overflow-x-auto text-sm"><code>{customColorsCode}</code></pre>
        </Card>
        <p class="text-sm text-warning">
            Always override both `:root` and `.dark` values to preserve contrast in every theme.
        </p>
    </section>

    <section class="space-y-4">
        <h2 id="Border-Radius" class="text-xl font-semibold">
<a href="#Border-Radius" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Border Radius
                    </a>
</h2>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{radiusCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 id="Fonts-Provider" class="text-xl font-semibold">
<a href="#Fonts-Provider" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Fonts Provider
                    </a>
</h2>
        <p class="text-on-surface-variant">
            Use the `Fonts` provider to load either Google Fonts or local font files and map them to
            Svelora variables such as `--font-sans-family`, `--font-heading-family`, and
            `--font-mono-family`.
        </p>
        <div class="grid gap-4 md:grid-cols-2">
            <Card class="border border-outline-variant/70">
                <div class="space-y-3">
                    <h3 class="font-heading text-2xl font-semibold">Poppins heading</h3>
                    <p>Inter body copy is applied through `--font-sans-family`.</p>
                    <p class="font-mono text-sm">const family = 'font-mono';</p>
                </div>
            </Card>
            <Card class="border border-outline-variant/70">
                <p class="mb-3 text-sm text-on-surface-variant">`src/routes/+layout.svelte`</p>
                <pre class="overflow-x-auto text-sm"><code>{fontsLayoutCode}</code></pre>
            </Card>
        </div>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm text-on-surface-variant">`src/svelora.config.ts`</p>
            <pre class="overflow-x-auto text-sm"><code>{fontsConfigCode}</code></pre>
        </Card>
        <p class="text-sm text-on-surface-variant">
            Top-level config uses `fonts`, `fonts: false` disables defaults, `font-heading` is available
            as a utility class, and `font-mono` automatically uses
            `--font-mono-family`.
        </p>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm text-on-surface-variant">Custom class: `font-sarabun`</p>
            <pre class="overflow-x-auto text-sm"><code>{sarabunCode}</code></pre>
        </Card>
        <p class="text-sm text-on-surface-variant">
            Svelora now exposes `font-sarabun` through theme tokens, so you can use it directly in
            classes across the project after mapping `--font-sarabun-family`.
        </p>
    </section>

    <section class="space-y-4">
        <h2 id="Mode-Watcher-Dark-Mode" class="text-xl font-semibold">
<a href="#Mode-Watcher-Dark-Mode" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Mode Watcher (Dark Mode)
                    </a>
</h2>
        <p class="text-on-surface-variant">
            Svelora uses <a href="https://github.com/svecosystem/mode-watcher" target="_blank" class="text-primary hover:underline">mode-watcher</a> to handle dark mode seamlessly without a flash of unstyled content (FOUC).
            You must install it as a peer dependency: <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-sm">npm install mode-watcher</code>
        </p>
        <p class="text-on-surface-variant">
            Place the <code>&lt;ModeWatcher /&gt;</code> component at the root of your app (in <code>+layout.svelte</code>). You can customize its behavior using props:
        </p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{modeWatcherPropsCode}</code></pre>
        </Card>
        <p class="text-sm text-on-surface-variant">
            You can also import <code>mode</code> and <code>toggleMode</code> directly from <code>mode-watcher</code> to build your own theme toggle buttons.
        </p>
    </section>

    <section class="space-y-4">
        <h2 id="Global-Configuration" class="text-xl font-semibold">
<a href="#Global-Configuration" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Global Configuration
                    </a>
</h2>
        <p class="text-on-surface-variant">
            Use `defineConfig` to set library-wide defaults for variants, slots, and icons.
        </p>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm text-on-surface-variant">`src/lib/config.ts`</p>
            <pre class="overflow-x-auto text-sm"><code>{configCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 id="Per-Component-Overrides" class="text-xl font-semibold">
<a href="#Per-Component-Overrides" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Per-Component Overrides
                    </a>
</h2>
        <p class="text-on-surface-variant">
            Every component accepts a `ui` prop to override specific slot classes on individual instances.
        </p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{overridesCode}</code></pre>
        </Card>
        <div class="flex flex-wrap gap-3">
            <Button label="Primary" color="primary" />
            <Button label="Outline" variant="outline" color="secondary" />
            <Badge label="Soft" variant="soft" color="success" />
        </div>
    </section>
</div>
