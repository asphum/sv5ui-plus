<script lang="ts">
    import { ThemeModeButton } from '$lib/index.js'
    import { mode } from 'mode-watcher'

    const variants = ['solid', 'outline', 'soft', 'subtle', 'ghost', 'link'] as const
    const colors = [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'error',
        'info',
        'surface'
    ] as const
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">ThemeModeButton</h1>
        <p class="text-on-surface-variant">
            A button to switch between light and dark mode. Built on top of the Button component
            and <code class="rounded bg-surface-container-highest px-1">mode-watcher</code>.
        </p>
        <div class="mt-4 rounded-xl border-l-4 border-warning bg-warning/10 p-4 text-sm text-on-surface-variant">
            <strong class="font-semibold text-warning">Requirement:</strong>
            You must install <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-sm">mode-watcher</code> as a peer dependency to use this component.
        </div>
    </div>

    <!-- Basic Usage -->
    <section class="space-y-3">
        <h2 id="Basic-Usage" class="text-lg font-semibold">
<a href="#Basic-Usage" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Basic Usage
                    </a>
</h2>
        <div class="flex flex-wrap items-center gap-4 rounded-lg bg-surface-container-high p-4">
            <ThemeModeButton />
            <span class="text-sm text-on-surface-variant capitalize">
                Current mode: {mode.current}
            </span>
        </div>
    </section>

    <!-- Variants -->
    <section class="space-y-3">
        <h2 id="Variants" class="text-lg font-semibold">
<a href="#Variants" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Variants
                    </a>
</h2>
        <div class="flex flex-wrap items-center gap-3 rounded-lg bg-surface-container-high p-4">
            {#each variants as variant (variant)}
                <div class="flex flex-col items-center gap-2">
                    <ThemeModeButton {variant} color="primary" />
                    <span class="text-xs text-on-surface-variant capitalize">{variant}</span>
                </div>
            {/each}
        </div>
    </section>

    <!-- Colors -->
    <section class="space-y-3">
        <h2 id="Colors" class="text-lg font-semibold">
<a href="#Colors" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Colors
                    </a>
</h2>
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="border-b border-outline-variant">
                        <th class="px-2 py-3 text-left text-sm font-medium text-on-surface-variant"
                            >Variant</th
                        >
                        {#each colors as color (color)}
                            <th
                                class="px-2 py-3 text-center text-sm font-medium text-on-surface-variant capitalize"
                                >{color}</th
                            >
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each variants as variant (variant)}
                        <tr class="border-b border-outline-variant/50">
                            <td
                                class="px-2 py-3 text-sm font-medium text-on-surface-variant capitalize"
                                >{variant}</td
                            >
                            {#each colors as color (color)}
                                <td class="px-2 py-3 text-center">
                                    <ThemeModeButton {variant} {color} />
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-3">
        <h2 id="Sizes" class="text-lg font-semibold">
<a href="#Sizes" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Sizes
                    </a>
</h2>
        <div class="flex flex-wrap items-end gap-3 rounded-lg bg-surface-container-high p-4">
            {#each sizes as size (size)}
                <div class="flex flex-col items-center gap-2">
                    <ThemeModeButton {size} />
                    <span class="text-xs text-on-surface-variant">{size}</span>
                </div>
            {/each}
        </div>
    </section>

    <!-- Custom Icons -->
    <section class="space-y-3">
        <h2 id="Custom-Icons" class="text-lg font-semibold">
<a href="#Custom-Icons" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Custom Icons
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Override the default light/dark icons using the
            <code class="rounded bg-surface-container-highest px-1">lightIcon</code> and
            <code class="rounded bg-surface-container-highest px-1">darkIcon</code> props.
        </p>
        <div class="flex flex-wrap items-center gap-4 rounded-lg bg-surface-container-high p-4">
            <div class="flex flex-col items-center gap-2">
                <ThemeModeButton lightIcon="icon-[lucide--sun-medium]" darkIcon="icon-[lucide--moon-star]" />
                <span class="text-xs text-on-surface-variant">sun-medium / moon-star</span>
            </div>
            <div class="flex flex-col items-center gap-2">
                <ThemeModeButton lightIcon="icon-[lucide--sun-dim]" darkIcon="icon-[lucide--cloud-moon]" />
                <span class="text-xs text-on-surface-variant">sun-dim / cloud-moon</span>
            </div>
            <div class="flex flex-col items-center gap-2">
                <ThemeModeButton lightIcon="icon-[lucide--sunrise]" darkIcon="icon-[lucide--sunset]" />
                <span class="text-xs text-on-surface-variant">sunrise / sunset</span>
            </div>
        </div>
    </section>

    <!-- Non-square (with label via children) -->
    <section class="space-y-3">
        <h2 id="Custom-Content-Children-Snippet" class="text-lg font-semibold">
<a href="#Custom-Content-Children-Snippet" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Custom Content (Children Snippet)
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use the <code class="rounded bg-surface-container-highest px-1">children</code> snippet
            with
            <code class="rounded bg-surface-container-highest px-1">{'{ isDark }'}</code> to render custom
            content.
        </p>
        <div class="flex flex-wrap items-center gap-4 rounded-lg bg-surface-container-high p-4">
            <ThemeModeButton square={false} variant="outline" color="secondary">
                {#snippet children({ isDark })}
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                {/snippet}
            </ThemeModeButton>

            <ThemeModeButton square={false} variant="soft" color="primary">
                {#snippet children({ isDark })}
                    <span class="flex items-center gap-2">
                        {#if isDark}
                            ☀️ Switch to Light
                        {:else}
                            🌙 Switch to Dark
                        {/if}
                    </span>
                {/snippet}
            </ThemeModeButton>
        </div>
    </section>

    <!-- Disabled & Loading -->
    <section class="space-y-3">
        <h2 id="Disabled--Loading" class="text-lg font-semibold">
<a href="#Disabled--Loading" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Disabled & Loading
                    </a>
</h2>
        <div class="flex flex-wrap items-center gap-4 rounded-lg bg-surface-container-high p-4">
            <div class="flex flex-col items-center gap-2">
                <ThemeModeButton disabled />
                <span class="text-xs text-on-surface-variant">Disabled</span>
            </div>
            <div class="flex flex-col items-center gap-2">
                <ThemeModeButton loading />
                <span class="text-xs text-on-surface-variant">Loading</span>
            </div>
        </div>
    </section>

    <!-- UI Overrides -->
    <section class="space-y-3">
        <h2 id="UI-Prop-Class-Overrides" class="text-lg font-semibold">
<a href="#UI-Prop-Class-Overrides" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        UI Prop (Class Overrides)
                    </a>
</h2>
        <div class="flex flex-wrap items-center gap-4 rounded-lg bg-surface-container-high p-4">
            <div class="flex flex-col items-center gap-2">
                <ThemeModeButton class="rounded-full" variant="outline" color="primary" />
                <span class="text-xs text-on-surface-variant">Pill shape</span>
            </div>
            <div class="flex flex-col items-center gap-2">
                <ThemeModeButton
                    variant="solid"
                    color="tertiary"
                    class="shadow-lg shadow-tertiary/30"
                />
                <span class="text-xs text-on-surface-variant">With shadow</span>
            </div>
            <div class="flex flex-col items-center gap-2">
                <ThemeModeButton
                    variant="solid"
                    color="primary"
                    class="bg-linear-to-r from-primary to-tertiary hover:from-primary/90 hover:to-tertiary/90"
                />
                <span class="text-xs text-on-surface-variant">Gradient</span>
            </div>
        </div>
    </section>
</div>
