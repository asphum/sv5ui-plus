<script lang="ts">
    import { Card, Link, ThemeModeButton } from '$lib/compat.js'

    const layoutCode = `<script lang="ts">
 import './layout.css';
 import { ModeWatcher } from 'mode-watcher';

 let { children } = $props();
<` + `/script>

<ModeWatcher />
{@render children()}`

    const layoutCssCode = `@import 'tailwindcss';
@import 'sv5ui-plus/theme.css';

/* Required for Tailwind CSS 4 dark mode classes */
@custom-variant dark (&:where(.dark, .dark *));`

    const toggleCode = `<script lang="ts">
 import { ThemeModeButton } from 'sv5ui';
<` + `/script>

<ThemeModeButton />
<ThemeModeButton size="sm" variant="outline" />
<ThemeModeButton size="lg" variant="soft" color="primary" />
<ThemeModeButton lightIcon="lucide:sun-medium" darkIcon="lucide:moon-star" />`

    const programmaticCode = `<script lang="ts">
 import { mode, setMode, toggleMode } from 'mode-watcher';
<` + `/script>

<p>Current: {mode.current}</p>

<button onclick={() => setMode('dark')}>Dark</button>
<button onclick={() => setMode('light')}>Light</button>
<button onclick={toggleMode}>Toggle</button>`

    const stylingCode = `<!-- Tailwind dark: variant -->
<div class="bg-white dark:bg-gray-900">
 <p class="text-gray-900 dark:text-white">
  This text adapts to the theme.
 </p>
</div>

<!-- SV5UI Plus semantic colors -->
<div class="bg-surface text-on-surface">
 <p class="text-on-surface/60">
  Semantic colors handle dark mode for you.
 </p>
</div>`
</script>

<div class="space-y-10">
    <section class="space-y-4 border-b border-outline-variant/60 pb-8">
        <nav class="text-sm text-on-surface-variant">
            <ol class="flex flex-wrap items-center gap-2">
                <li><Link href="/docs" raw class="hover:text-primary">Docs</Link></li>
                <li>/</li>
                <li><Link href="/docs" raw class="hover:text-primary">Getting Started</Link></li>
                <li>/</li>
                <li>Dark Mode</li>
            </ol>
        </nav>

        <div class="space-y-3">
            <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
                Getting Started
            </p>
            <h1 class="text-4xl font-semibold tracking-tight">Dark Mode</h1>
            <p class="max-w-3xl text-lg leading-8 text-on-surface-variant">
                SV5UI Plus includes built-in dark mode support. All components automatically adapt to the current theme.
            </p>
        </div>
    </section>

    <section class="space-y-4">
        <h2 id="Setup" class="text-xl font-semibold">
<a href="#Setup" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Setup
                    </a>
</h2>
        <p class="text-on-surface-variant">
            Two things are needed: the `ModeWatcher` component in your layout, and the `@custom-variant` CSS rule.
        </p>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm text-on-surface-variant">`src/routes/+layout.svelte`</p>
            <pre class="overflow-x-auto text-sm"><code>{layoutCode}</code></pre>
        </Card>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm text-on-surface-variant">`src/routes/layout.css`</p>
            <pre class="overflow-x-auto text-sm"><code>{layoutCssCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 id="Toggle-Button" class="text-xl font-semibold">
<a href="#Toggle-Button" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Toggle Button
                    </a>
</h2>
        <p class="text-on-surface-variant">
            Use `ThemeModeButton` for a ready-to-use theme switcher with animated icons.
        </p>
        <div class="flex flex-wrap items-center gap-3">
            <ThemeModeButton />
            <ThemeModeButton size="sm" variant="outline" />
            <ThemeModeButton size="lg" variant="soft" color="primary" />
            <ThemeModeButton lightIcon="lucide:sun-medium" darkIcon="lucide:moon-star" />
        </div>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{toggleCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 id="Programmatic-Control" class="text-xl font-semibold">
<a href="#Programmatic-Control" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Programmatic Control
                    </a>
</h2>
        <p class="text-on-surface-variant">
            Use `mode`, `setMode`, and `toggleMode` to control the theme manually.
        </p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{programmaticCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 id="Styling-with-Dark-Mode" class="text-xl font-semibold">
<a href="#Styling-with-Dark-Mode" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Styling with Dark Mode
                    </a>
</h2>
        <p class="text-on-surface-variant">
            You can use Tailwind's `dark:` variant, but SV5UI Plus semantic colors usually remove the need for it.
        </p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{stylingCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 id="Why-Semantic-Colors" class="text-xl font-semibold">
<a href="#Why-Semantic-Colors" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Why Semantic Colors?
                    </a>
</h2>
        <div class="overflow-hidden rounded-2xl border border-outline-variant">
            <table class="w-full text-left text-sm">
                <thead class="bg-surface-container text-on-surface">
                    <tr>
                        <th class="px-4 py-3 font-medium">Approach</th>
                        <th class="px-4 py-3 font-medium">Code</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant">
                    <tr>
                        <td class="px-4 py-3">Manual (verbose)</td>
                        <td class="px-4 py-3 font-mono text-xs">bg-white dark:bg-gray-900 text-gray-900 dark:text-white</td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3">Semantic (automatic)</td>
                        <td class="px-4 py-3 font-mono text-xs">bg-surface text-on-surface</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</div>
