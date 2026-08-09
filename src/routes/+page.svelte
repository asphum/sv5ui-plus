<script lang="ts">
    import { Badge, Button, Card } from 'sv5ui'
    import { BentoCard, BentoGrid, NumberTicker } from 'svelora'
    import { docsMeta, totalComponents, totalHooks } from '$internal/docs/navigation.js'
</script>

<svelte:head>
    <title>Svelora — SV5UI companion</title>
    <meta name="description" content="Additional components and hooks for SV5UI and Svelte 5." />
</svelte:head>

<div class="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6">
    <section class="space-y-6 text-center">
        <Badge label={docsMeta.version} variant="soft" color="primary" />
        <h1 class="text-4xl font-bold tracking-tight sm:text-6xl">More for SV5UI.</h1>
        <p class="mx-auto max-w-2xl text-lg text-on-surface-variant">
            Svelora adds focused components and drag-and-drop hooks without duplicating the SV5UI core.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
            <Button label="Get started" href="/docs/installation" leadingIcon="lucide:rocket" />
            <Button label="Components" href="/docs/components" variant="outline" leadingIcon="lucide:blocks" />
        </div>
    </section>

    <BentoGrid class="md:grid-cols-3">
        <BentoCard name="addon-components" title="Addon components" description="Only capabilities not supplied by SV5UI.">
            <p class="text-4xl font-semibold"><NumberTicker value={totalComponents} /></p>
        </BentoCard>
        <BentoCard name="addon-hooks" title="Addon hooks" description="Sortable and drag-and-drop primitives.">
            <p class="text-4xl font-semibold"><NumberTicker value={totalHooks} /></p>
        </BentoCard>
        <Card class="space-y-3 p-5">
            <h2 class="font-semibold">Clear ownership</h2>
            <p class="text-sm text-on-surface-variant">Core UI comes from <code>sv5ui</code>; additions come from <code>svelora</code>.</p>
        </Card>
    </BentoGrid>
</div>
