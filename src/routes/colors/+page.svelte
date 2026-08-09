<script lang="ts">
    import { Card, Link } from '$lib/compat.js'

    const colors = [
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
        }
    ] as const
</script>

<div class="space-y-10">
    <section class="space-y-4 border-b border-outline-variant/60 pb-8">
        <nav class="text-sm text-on-surface-variant">
            <ol class="flex flex-wrap items-center gap-2">
                <li><Link href="/docs" raw class="hover:text-primary">Docs</Link></li>
                <li>/</li>
                <li>Colors</li>
            </ol>
        </nav>

        <div class="space-y-3">
            <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
                Theme & Config
            </p>
            <h1 class="text-4xl font-semibold tracking-tight">Color Tokens</h1>
            <p class="max-w-3xl text-lg leading-8 text-on-surface-variant">
                Material Design 3 inspired semantic colors used throughout the SV5UI Plus theme.
            </p>
        </div>
    </section>

    <section class="space-y-4">
        <h2 id="Theme-Colors" class="text-xl font-semibold">
<a href="#Theme-Colors" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Theme Colors
                    </a>
</h2>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {#each colors as color (color.name)}
                <Card class="border border-outline-variant/70">
                    <div class="space-y-4">
                        <div class={`rounded-2xl p-4 font-medium capitalize ${color.baseClass}`}>
                            {color.name}
                        </div>
                        <div class={`rounded-2xl p-4 text-sm ${color.containerClass}`}>
                            {color.name}-container
                        </div>
                    </div>
                </Card>
            {/each}
        </div>
    </section>

    <section class="space-y-4">
        <h2 id="Surface-Colors" class="text-xl font-semibold">
<a href="#Surface-Colors" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Surface Colors
                    </a>
</h2>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div class="rounded-2xl border border-outline-variant bg-surface p-5 text-on-surface">
                Surface
            </div>
            <div class="rounded-2xl border border-outline-variant bg-surface-container-low p-5 text-on-surface">
                Container Low
            </div>
            <div class="rounded-2xl border border-outline-variant bg-surface-container p-5 text-on-surface">
                Container
            </div>
            <div class="rounded-2xl border border-outline-variant bg-surface-container-high p-5 text-on-surface">
                Container High
            </div>
            <div class="rounded-2xl border border-outline-variant bg-surface-container-highest p-5 text-on-surface">
                Container Highest
            </div>
            <div class="rounded-2xl border border-outline-variant bg-surface-bright p-5 text-on-surface">
                Surface Bright
            </div>
        </div>
    </section>

    <section class="space-y-4">
        <h2 id="Outline-Colors" class="text-xl font-semibold">
<a href="#Outline-Colors" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Outline Colors
                    </a>
</h2>
        <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-2xl border-2 border-outline p-5">
                <p class="font-medium">outline</p>
                <p class="text-sm text-on-surface-variant">Primary border color</p>
            </div>
            <div class="rounded-2xl border-2 border-outline-variant p-5">
                <p class="font-medium">outline-variant</p>
                <p class="text-sm text-on-surface-variant">Subtle border color</p>
            </div>
        </div>
    </section>
</div>
