<script lang="ts">
    import { Button, Card } from 'sv5ui'
    import { docsComponentGroups, docsHookItems } from '$internal/docs/navigation.js'
</script>

<div class="space-y-10">
    <header class="space-y-3">
        <p class="text-sm font-medium text-primary">Svelora 4</p>
        <h1 class="text-4xl font-semibold tracking-tight">SV5UI companion library</h1>
        <p class="max-w-3xl text-on-surface-variant">
            Use SV5UI for the design-system core. Add Svelora only for components and hooks that SV5UI does not provide.
        </p>
        <Button label="Installation" href="/docs/installation" leadingIcon="lucide:download" />
    </header>

    <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Addons</h2>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {#each docsComponentGroups.flatMap((group) => group.items) as item (item.href)}
                <Card class="p-4">
                    <a href={item.href} class="font-medium hover:text-primary">{item.title}</a>
                </Card>
            {/each}
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-2xl font-semibold">Hooks</h2>
        <div class="grid gap-3 sm:grid-cols-2">
            {#each docsHookItems as item (item.href)}
                <Card class="p-4"><a href={item.href} class="font-medium hover:text-primary">{item.title}</a></Card>
            {/each}
        </div>
    </section>
</div>
