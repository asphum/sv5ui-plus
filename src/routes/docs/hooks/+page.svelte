<script lang="ts">
    import { Icon, Link } from '$lib/compat.js'
    import { docsHookItems, totalHooks } from '$internal/docs/navigation.js'
</script>

<div class="space-y-8">
    <section class="space-y-4 border-b border-outline-variant/60 pb-8">
        <nav class="text-sm text-on-surface-variant">
            <ol class="flex flex-wrap items-center gap-2">
                <li><Link href="/docs" raw class="hover:text-primary">Docs</Link></li>
                <li>/</li>
                <li>Hooks</li>
            </ol>
        </nav>

        <div class="space-y-2">
            <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">Hooks</p>
            <h1 class="text-4xl font-semibold tracking-tight">Utility Hooks</h1>
            <p class="max-w-3xl text-lg text-on-surface-variant">
                {totalHooks} utilities for clipboard, media queries, escape handling, debouncing, and more.
            </p>
        </div>
    </section>

    <div class="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        {#each docsHookItems as item (item.href)}
            <Link
                href={item.href}
                raw
                class="group flex items-center gap-3 rounded-2xl border border-outline-variant px-4 py-3 transition-colors hover:border-primary hover:bg-surface-container"
            >
                <Icon
                    name={item.icon}
                    size="18"
                    class="text-on-surface-variant group-hover:text-primary"
                />
                <span class="font-mono font-medium group-hover:text-primary">{item.title}</span>
            </Link>
        {/each}
    </div>
</div>
