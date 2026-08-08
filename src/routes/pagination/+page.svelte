<script lang="ts">
    import { Pagination, Button, Separator } from '$lib/index.js'

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
    const activeVariants = ['solid', 'outline', 'soft', 'subtle', 'ghost'] as const
    const navVariants = ['ghost', 'outline', 'soft', 'subtle', 'solid', 'link'] as const

    let controlledPage = $state(5)
    let callbackPage = $state(1)
    let callbackLog = $state('')
</script>

<div class="space-y-8">
    <h1 class="text-2xl font-bold text-on-surface">Pagination</h1>

    <!-- Basic -->
    <section class="space-y-4">
        <h2 id="Basic-Usage" class="text-lg font-semibold text-on-surface">
<a href="#Basic-Usage" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Basic Usage
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Simple pagination with previous/next controls and page numbers.
        </p>
        <Pagination total={100} itemsPerPage={10} />
    </section>

    <!-- Default Page -->
    <section class="space-y-4">
        <h2 id="Default-Page" class="text-lg font-semibold text-on-surface">
<a href="#Default-Page" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Default Page
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Set the initial page with <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">defaultPage</code
            >.
        </p>
        <Pagination total={100} itemsPerPage={10} defaultPage={5} />
    </section>

    <!-- Show Edges -->
    <section class="space-y-4">
        <h2 id="Show-Edges" class="text-lg font-semibold text-on-surface">
<a href="#Show-Edges" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Show Edges
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Display first/last page buttons with <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">showEdges</code
            >.
        </p>
        <Pagination total={100} itemsPerPage={10} showEdges />
    </section>

    <!-- Without Controls -->
    <section class="space-y-4">
        <h2 id="Without-Controls" class="text-lg font-semibold text-on-surface">
<a href="#Without-Controls" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Without Controls
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Hide prev/next buttons with <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >showControls={'{false}'}</code
            >.
        </p>
        <div class="space-y-3">
            <div>
                <p class="mb-1 text-xs text-on-surface-variant">Pages only</p>
                <Pagination total={100} itemsPerPage={10} showControls={false} />
            </div>
            <div>
                <p class="mb-1 text-xs text-on-surface-variant">With edges, no prev/next</p>
                <Pagination total={100} itemsPerPage={10} showEdges showControls={false} />
            </div>
        </div>
    </section>

    <!-- Sibling Count -->
    <section class="space-y-4">
        <h2 id="Sibling-Count" class="text-lg font-semibold text-on-surface">
<a href="#Sibling-Count" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Sibling Count
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Control visible siblings around current page with <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >siblingCount</code
            >.
        </p>
        <div class="space-y-3">
            {#each [0, 1, 2] as count (count)}
                <div>
                    <p class="mb-1 text-xs text-on-surface-variant">
                        siblingCount={count}{count === 1 ? ' (default)' : ''}
                    </p>
                    <Pagination total={100} itemsPerPage={10} page={5} siblingCount={count} />
                </div>
            {/each}
        </div>
    </section>

    <!-- Items Per Page -->
    <section class="space-y-4">
        <h2 id="Items-Per-Page" class="text-lg font-semibold text-on-surface">
<a href="#Items-Per-Page" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Items Per Page
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Same total (100) with different <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >itemsPerPage</code
            > values.
        </p>
        <div class="space-y-3">
            {#each [5, 10, 25, 50] as perPage (perPage)}
                <div>
                    <p class="mb-1 text-xs text-on-surface-variant">
                        {perPage} items/page ({Math.ceil(100 / perPage)} pages)
                    </p>
                    <Pagination total={100} itemsPerPage={perPage} />
                </div>
            {/each}
        </div>
    </section>

    <!-- Controlled State -->
    <section class="space-y-4">
        <h2 id="Controlled-State" class="text-lg font-semibold text-on-surface">
<a href="#Controlled-State" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Controlled State
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >bind:page</code
            >
            for two-way binding. Current page:
            <strong class="text-on-surface">{controlledPage}</strong>
        </p>
        <Pagination total={200} itemsPerPage={10} bind:page={controlledPage} showEdges />
        <div class="flex gap-2">
            {#each [1, 10, 20] as p (p)}
                <Button
                    variant="solid"
                    color="primary"
                    size="sm"
                    label="Go to page {p}"
                    onclick={() => (controlledPage = p)}
                />
            {/each}
        </div>
    </section>

    <!-- Active Colors -->
    <section class="space-y-4">
        <h2 id="Active-Colors" class="text-lg font-semibold text-on-surface">
<a href="#Active-Colors" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Active Colors
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Customize the active page color with <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">activeColor</code
            >.
        </p>
        <div class="space-y-3">
            {#each colors as color (color)}
                <div class="flex items-center gap-4">
                    <span class="w-20 text-sm text-on-surface-variant">{color}</span>
                    <Pagination total={100} itemsPerPage={10} page={3} activeColor={color} />
                </div>
            {/each}
        </div>
    </section>

    <!-- Active Variant -->
    <section class="space-y-4">
        <h2 id="Active-Variant" class="text-lg font-semibold text-on-surface">
<a href="#Active-Variant" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Active Variant
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Change the selected page style with <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >activeVariant</code
            >.
        </p>
        <div class="space-y-3">
            {#each activeVariants as av (av)}
                <div class="flex items-center gap-4">
                    <span class="w-16 text-sm text-on-surface-variant">{av}</span>
                    <Pagination total={100} itemsPerPage={10} page={3} activeVariant={av} />
                </div>
            {/each}
        </div>
    </section>

    <!-- Nav Button Variant -->
    <section class="space-y-4">
        <h2 id="Nav-Button-Variant" class="text-lg font-semibold text-on-surface">
<a href="#Nav-Button-Variant" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Nav Button Variant
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Change navigation button style with <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">variant</code
            >
            and
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">color</code>.
        </p>
        <div class="space-y-3">
            {#each navVariants as v (v)}
                <div class="flex items-center gap-4">
                    <span class="w-16 text-sm text-on-surface-variant">{v}</span>
                    <Pagination
                        total={100}
                        itemsPerPage={10}
                        page={3}
                        variant={v}
                        color="primary"
                        showEdges
                    />
                </div>
            {/each}
        </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-4">
        <h2 id="Sizes" class="text-lg font-semibold text-on-surface">
<a href="#Sizes" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Sizes
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Control the pagination size with <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">size</code
            >.
        </p>
        <div class="space-y-4">
            {#each sizes as size (size)}
                <div class="flex items-center gap-4">
                    <span class="w-8 text-sm text-on-surface-variant">{size}</span>
                    <Pagination total={100} itemsPerPage={10} {size} showEdges />
                </div>
            {/each}
        </div>
    </section>

    <!-- Disabled -->
    <section class="space-y-4">
        <h2 id="Disabled" class="text-lg font-semibold text-on-surface">
<a href="#Disabled" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Disabled
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Disable all controls with <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">disabled</code
            >.
        </p>
        <Pagination total={100} itemsPerPage={10} page={3} disabled showEdges />
    </section>

    <!-- Page Change Callback -->
    <section class="space-y-4">
        <h2 id="Page-Change-Callback" class="text-lg font-semibold text-on-surface">
<a href="#Page-Change-Callback" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Page Change Callback
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Listen for page changes with <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >onPageChange</code
            >. Current page: <strong class="text-on-surface">{callbackPage}</strong>
        </p>
        <Pagination
            total={100}
            itemsPerPage={10}
            bind:page={callbackPage}
            onPageChange={(p) => (callbackLog = `Navigated to page ${p}`)}
            showEdges
        />
        {#if callbackLog}
            <p class="text-xs text-on-surface-variant">{callbackLog}</p>
        {/if}
    </section>

    <!-- Custom Icons -->
    <section class="space-y-4">
        <h2 id="Custom-Icons" class="text-lg font-semibold text-on-surface">
<a href="#Custom-Icons" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Custom Icons
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">Customize navigation icons with icon props.</p>
        <Pagination
            total={100}
            itemsPerPage={10}
            page={5}
            showEdges
            prevIcon="icon-[lucide--arrow-left]"
            nextIcon="icon-[lucide--arrow-right]"
            ellipsisIcon="icon-[lucide--more-horizontal]"
        />
    </section>

    <!-- UI Slot Overrides -->
    <section class="space-y-4">
        <h2 id="UI-Slot-Overrides" class="text-lg font-semibold text-on-surface">
<a href="#UI-Slot-Overrides" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        UI Slot Overrides
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Customize individual parts with <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">ui</code
            >.
        </p>
        <div class="space-y-4">
            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Rounded buttons</p>
                <Pagination
                    total={100}
                    itemsPerPage={10}
                    page={3}
                    showEdges
                    ui={{
                        item: 'rounded-full',
                        first: 'rounded-full',
                        prev: 'rounded-full',
                        next: 'rounded-full',
                        last: 'rounded-full'
                    }}
                />
            </div>
            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Custom gap &amp; root</p>
                <Pagination
                    total={100}
                    itemsPerPage={10}
                    page={3}
                    class="rounded-lg border border-outline-variant bg-surface-container p-3"
                    ui={{ list: 'gap-2' }}
                />
            </div>
        </div>
    </section>

    <!-- Custom Snippet Slots -->
    <section class="space-y-4">
        <h2 id="Custom-Snippet-Slots" class="text-lg font-semibold text-on-surface">
<a href="#Custom-Snippet-Slots" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Custom Snippet Slots
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">Override individual parts with snippet slots.</p>
        <div class="space-y-4">
            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Custom item slot (rounded)</p>
                <Pagination total={50} itemsPerPage={10} page={2}>
                    {#snippet itemSlot({ page, selected })}
                        <span
                            class="inline-flex size-9 items-center justify-center rounded-full text-sm font-bold {selected
                                ? 'bg-primary text-on-primary'
                                : 'text-on-surface-variant'}"
                        >
                            {page}
                        </span>
                    {/snippet}
                </Pagination>
            </div>
            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Custom prev/next text</p>
                <Pagination total={100} itemsPerPage={10} page={3}>
                    {#snippet prevSlot({ disabled })}
                        <span
                            class="text-sm font-medium {disabled
                                ? 'text-on-surface-variant/50'
                                : 'text-primary'}"
                        >
                            Previous
                        </span>
                    {/snippet}
                    {#snippet nextSlot({ disabled })}
                        <span
                            class="text-sm font-medium {disabled
                                ? 'text-on-surface-variant/50'
                                : 'text-primary'}"
                        >
                            Next
                        </span>
                    {/snippet}
                </Pagination>
            </div>
            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Custom ellipsis</p>
                <Pagination total={100} itemsPerPage={10} page={5}>
                    {#snippet ellipsisSlot()}
                        <span class="text-on-surface-variant">---</span>
                    {/snippet}
                </Pagination>
            </div>
        </div>
    </section>

    <!-- Edge Cases -->
    <section class="space-y-4">
        <h2 id="Edge-Cases" class="text-lg font-semibold text-on-surface">
<a href="#Edge-Cases" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Edge Cases
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">Handling special scenarios.</p>
        <div class="space-y-3">
            <div>
                <p class="mb-1 text-xs text-on-surface-variant">Single page (5 items, 10/page)</p>
                <Pagination total={5} itemsPerPage={10} showEdges />
            </div>
            <div>
                <p class="mb-1 text-xs text-on-surface-variant">Few pages (30 items, 10/page)</p>
                <Pagination total={30} itemsPerPage={10} showEdges />
            </div>
            <div>
                <p class="mb-1 text-xs text-on-surface-variant">Many pages (1000 items, 10/page)</p>
                <Pagination total={1000} itemsPerPage={10} page={50} showEdges />
            </div>
            <div>
                <p class="mb-1 text-xs text-on-surface-variant">Zero total</p>
                <Pagination total={0} itemsPerPage={10} />
            </div>
        </div>
    </section>

    <Separator />

    <!-- Real World Example -->
    <section class="space-y-4">
        <h2 id="Real-World-Examples" class="text-lg font-semibold text-on-surface">
<a href="#Real-World-Examples" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Real World Examples
                    </a>
</h2>

        <div class="space-y-6">
            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Table-style pagination</p>
                <div class="rounded-lg border border-outline-variant bg-surface-container-low p-4">
                    <div class="mb-3 text-sm text-on-surface-variant">
                        Showing <strong class="text-on-surface">41-50</strong> of
                        <strong class="text-on-surface">200</strong> results
                    </div>
                    <Pagination
                        total={200}
                        itemsPerPage={10}
                        page={5}
                        showEdges
                        size="sm"
                        activeColor="primary"
                    />
                </div>
            </div>

            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Minimal blog pagination</p>
                <div class="flex items-center justify-center">
                    <Pagination
                        total={50}
                        itemsPerPage={5}
                        page={3}
                        showControls={false}
                        activeColor="surface"
                        ui={{ item: 'rounded-full' }}
                    />
                </div>
            </div>

            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Combined features</p>
                <Pagination
                    total={200}
                    itemsPerPage={10}
                    bind:page={controlledPage}
                    activeColor="success"
                    size="lg"
                    showEdges
                    siblingCount={2}
                    ui={{
                        item: 'rounded-full',
                        first: 'rounded-full',
                        prev: 'rounded-full',
                        next: 'rounded-full',
                        last: 'rounded-full',
                        list: 'gap-1.5'
                    }}
                />
                <p class="mt-2 text-xs text-on-surface-variant">
                    Page <strong class="text-on-surface">{controlledPage}</strong> | Size: lg | Color:
                    success | Edges | Siblings: 2 | Rounded
                </p>
            </div>
        </div>
    </section>
</div>
