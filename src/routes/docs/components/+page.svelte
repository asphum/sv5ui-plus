<script lang="ts">
    import { Icon, Link } from '$lib/compat.js'
    import { docsComponentGroups, totalComponents } from '$internal/docs/navigation.js'
</script>

<div class="space-y-8">
    <section class="space-y-4 border-b border-outline-variant/60 pb-8">
        <nav class="text-sm text-on-surface-variant">
            <ol class="flex flex-wrap items-center gap-2">
                <li><Link href="/docs" raw class="hover:text-primary">Docs</Link></li>
                <li>/</li>
                <li>Components</li>
            </ol>
        </nav>

        <div class="space-y-2">
            <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">Components</p>
            <h1 class="text-4xl font-semibold tracking-tight">All Components</h1>
            <p class="max-w-3xl text-lg text-on-surface-variant">
                Explore {totalComponents}+ production-ready components grouped by category.
            </p>
        </div>
    </section>

    {#each docsComponentGroups as group (group.title)}
        <section class="space-y-4">
            <div class="flex items-baseline gap-2">
                <h2 id="grouptitle" class="text-2xl font-semibold">
<a href="#grouptitle" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        {group.title}
                    </a>
</h2>
                <span class="text-sm text-on-surface-variant">{group.items.length}</span>
            </div>

            <div class="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                {#each group.items as item (item.href)}
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
                        <span class="font-medium group-hover:text-primary">{item.title}</span>
                    </Link>
                {/each}
            </div>
        </section>
    {/each}
</div>
