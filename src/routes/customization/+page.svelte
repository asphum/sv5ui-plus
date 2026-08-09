<script lang="ts">
    import { Card, Link } from '$lib/compat.js'

    const configCode = `import { defineSV5UIPlusConfig } from 'sv5ui-plus';

defineSV5UIPlusConfig({
 button: {
  defaultVariants: { variant: 'outline', color: 'secondary', size: 'sm' }
 },
 avatar: {
  defaultVariants: { size: 'lg' }
 }
});`

    const layoutCode = `<script lang="ts">
 import './layout.css';
 import '../lib/config';
 import { ModeWatcher } from 'mode-watcher';

 let { children } = $props();
<` + `/script>`

    const resetCode = `import { resetSV5UIPlusConfig } from 'sv5ui-plus';

resetSV5UIPlusConfig();`

    const fontsConfigCode = `import { defineSV5UIPlusConfig } from 'sv5ui-plus';

defineSV5UIPlusConfig({
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

    const disableFontsCode = `import { defineSV5UIPlusConfig } from 'sv5ui-plus';

defineSV5UIPlusConfig({
 fonts: false
});`

    const variantsCode = `// src/lib/Button/button.variants.ts
export const buttonVariants = tv({
 variants: {
  variant: {
   solid: '',
   outline: '',
   soft: '',
   gradient: ''
  }
 },
 compoundVariants: [
  {
   variant: 'gradient',
   color: 'primary',
   class: { base: 'bg-linear-to-r from-primary to-tertiary text-on-primary' }
  }
 ]
});`
</script>

<div class="space-y-10">
    <section class="space-y-4 border-b border-outline-variant/60 pb-8">
        <nav class="text-sm text-on-surface-variant">
            <ol class="flex flex-wrap items-center gap-2">
                <li><Link href="/docs" raw class="hover:text-primary">Docs</Link></li>
                <li>/</li>
                <li>Customization</li>
            </ol>
        </nav>

        <div class="space-y-3">
            <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
                Theme & Config
            </p>
            <h1 class="text-4xl font-semibold tracking-tight">Customization</h1>
            <p class="max-w-3xl text-lg leading-8 text-on-surface-variant">
                Configure global defaults, icons, and component slots when you need project-wide consistency.
            </p>
        </div>
    </section>

    <section class="space-y-4">
        <h2 id="Custom-Component-Defaults" class="text-xl font-semibold">
<a href="#Custom-Component-Defaults" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Custom Component Defaults
                    </a>
</h2>
        <p class="text-on-surface-variant">Create a config file to change default props for all instances.</p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{configCode}</code></pre>
        </Card>
        <p class="text-on-surface-variant">Then import it in your root layout.</p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{layoutCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 id="Reset-Config" class="text-xl font-semibold">
<a href="#Reset-Config" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Reset Config
                    </a>
</h2>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{resetCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 id="Fonts-Provider-Defaults" class="text-xl font-semibold">
<a href="#Fonts-Provider-Defaults" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Fonts Provider Defaults
                    </a>
</h2>
        <p class="text-on-surface-variant">
            Configure top-level `fonts` once, then render a single `&lt;Fonts /&gt;` in your root layout.
        </p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{fontsConfigCode}</code></pre>
        </Card>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{disableFontsCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 id="Customizing-Variants" class="text-xl font-semibold">
<a href="#Customizing-Variants" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Customizing Variants
                    </a>
</h2>
        <p class="text-on-surface-variant">
            Add new variants or modify existing ones in the component variant definitions.
        </p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{variantsCode}</code></pre>
        </Card>
    </section>
</div>
