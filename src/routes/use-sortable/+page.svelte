<script lang="ts">
    import { Badge, Button, Card, Link, SortableList, useSortable } from '$lib/compat.js'

    type Task = { id: string; title: string; color: 'primary' | 'success' | 'warning' }

    let tasks = $state<Task[]>([
        { id: 'design', title: 'Design system tokens', color: 'primary' },
        { id: 'build', title: 'Build sortable hook', color: 'success' },
        { id: 'docs', title: 'Write documentation', color: 'warning' },
        { id: 'ship', title: 'Ship release', color: 'primary' }
    ])

    let horizontalItems = $state([
        { id: 'a', label: 'Alpha' },
        { id: 'b', label: 'Beta' },
        { id: 'c', label: 'Gamma' }
    ])

    let sortDisabled = $state(false)

    const sortable = useSortable({
        getItems: () => tasks,
        getId: (task) => task.id,
        handle: '[data-sortable-handle]',
        disabled: () => sortDisabled,
        onReorder: (next) => {
            tasks = next
        }
    })

    const horizontalSortable = useSortable({
        getItems: () => horizontalItems,
        getId: (item) => item.id,
        axis: 'horizontal',
        handle: '[data-sortable-handle]',
        onReorder: (next) => {
            horizontalItems = next
        }
    })

    const sortableOptionsReference = [
        { name: 'getItems', type: '() => T[]', description: 'Reactive getter for the current array.' },
        { name: 'getId', type: '(item: T) => string | number', description: 'Stable id per row (must match data-sortable-id).' },
        { name: 'onReorder', type: '(items: T[]) => void', description: 'Called with the reordered array after drop.' },
        { name: 'axis', type: "'vertical' | 'horizontal' | 'grid' | (() => ...)", description: 'Drag axis. Default: vertical. Use grid for CSS grid layouts.' },
        { name: 'handle', type: 'string | (() => string | undefined)', description: 'Handle selector. Omit to drag the whole row.' },
        { name: 'disabled', type: 'boolean | (() => boolean)', description: 'Disable sorting. Default: false.' }
    ] as const

    const sortableReturnReference = [
        { name: 'Provider', type: 'Component', description: 'Required wrapper — mounts @dnd-kit/svelte DragDropProvider. Accepts an optional `overlay` snippet for custom drag overlays.' },
        { name: 'container', type: 'Action<HTMLElement>', description: 'Optional list wrapper — sets data-sortable-active while dragging.' },
        { name: 'item', type: 'Action<HTMLElement, { index, item }>', description: 'Attach to each row with the current index and item.' },
        { name: 'draggingId', type: 'string | number | null', description: 'Readonly id of the row currently being dragged.' }
    ] as const

    const markupReference = [
        { name: 'use:sortable.item', description: 'Required on each row — pass { index, item } from the #each block.' },
        { name: 'data-sortable-handle', description: 'Optional handle element when using handle selector.' },
        { name: 'data-sortable-item / data-sortable-id', description: 'Set automatically by use:sortable.item for styling hooks.' }
    ] as const

    function resetOrder() {
        tasks = [
            { id: 'design', title: 'Design system tokens', color: 'primary' },
            { id: 'build', title: 'Build sortable hook', color: 'success' },
            { id: 'docs', title: 'Write documentation', color: 'warning' },
            { id: 'ship', title: 'Ship release', color: 'primary' }
        ]
    }
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">useSortable</h1>
        <p class="text-on-surface-variant">
            Sortable list reordering powered by
            <a href="https://clauderic-dnd-kit.mintlify.app/frameworks/svelte" class="text-primary underline" target="_blank" rel="noreferrer">@dnd-kit/svelte</a>.
            Wrap markup in
            <code class="rounded bg-surface-container-high px-1">sortable.Provider</code>,
            attach
            <code class="rounded bg-surface-container-high px-1">use:sortable.item</code>
            to each row, and optionally use
            <code class="rounded bg-surface-container-high px-1">use:sortable.container</code>
            on the list wrapper. Browse all demos in the
            <Link href="/docs/drag-and-drop" class="text-primary underline">Drag & Drop playground</Link>.
        </p>
    </div>

    <section class="space-y-3">
        <h2 id="When-to-use-what" class="text-lg font-semibold">
            <a href="#When-to-use-what" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                When to use what
            </a>
        </h2>
        <div class="grid gap-3 md:grid-cols-2">
            <Card class="space-y-2 border border-outline-variant/70 p-4">
                <p class="font-semibold text-on-surface">useSortable / SortableList</p>
                <p class="text-sm text-on-surface-variant">Reorder items inside one list (tasks, menu items, table rows).</p>
            </Card>
            <Card class="space-y-2 border border-outline-variant/70 p-4">
                <p class="font-semibold text-on-surface">
                    <Link href="/docs/hooks/use-drag-drop" class="text-primary underline">useDragDrop</Link>
                </p>
                <p class="text-sm text-on-surface-variant">Move items between containers (kanban columns, trays).</p>
            </Card>
            <Card class="space-y-2 border border-outline-variant/70 p-4">
                <p class="font-semibold text-on-surface">
                    <Link href="/docs/components/file-upload" class="text-primary underline">FileUpload</Link>
                </p>
                <p class="text-sm text-on-surface-variant">Drag files from the OS onto a dropzone — not for reordering UI lists.</p>
            </Card>
            <Card class="space-y-2 border border-outline-variant/70 p-4">
                <p class="font-semibold text-on-surface">
                    <Link href="/docs/components/editor" class="text-primary underline">Editor dragHandle</Link>
                </p>
                <p class="text-sm text-on-surface-variant">Reorder rich-text blocks inside TipTap — built into Editor, not this hook.</p>
            </Card>
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Manual-markup" class="text-lg font-semibold">
            <a href="#Manual-markup" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Manual markup
            </a>
        </h2>
        <sortable.Provider>
            {#snippet overlay({ item })}
                <div class="flex items-center gap-3 rounded-lg border border-outline-variant/60 bg-surface px-3 py-2 z-50 shadow-xl scale-[1.02] opacity-95">
                    <button type="button" class="cursor-grab rounded-md p-1 text-on-surface-variant">::</button>
                    <Badge label={item.title} color={item.color} variant="soft" />
                </div>
            {/snippet}
            <div use:sortable.container class="space-y-2 rounded-lg bg-surface-container-high p-4">
                {#each tasks as task, index (task.id)}
                    <div
                        use:sortable.item={{ index, item: task }}
                        class={[
                            'relative flex items-center gap-3 rounded-lg border border-outline-variant/60 px-3 py-2 transition-colors',
                            sortable.draggingId === task.id ? 'bg-transparent border-transparent' : 'bg-surface'
                        ]}
                        aria-grabbed={sortable.draggingId === task.id}
                    >
                    {#if sortable.draggingId === task.id}
                        <div class="absolute inset-0 z-10 rounded-lg border-2 border-dashed border-primary/50 bg-primary/5 pointer-events-none"></div>
                    {/if}
                    <div class={['flex w-full items-center gap-3', sortable.draggingId === task.id && 'invisible']}>
                        <button
                            type="button"
                            data-sortable-handle
                            class="cursor-grab rounded-md p-1 text-on-surface-variant active:cursor-grabbing"
                            aria-label="Drag to reorder"
                        >
                            ::
                        </button>
                        <Badge label={task.title} color={task.color} variant="soft" />
                    </div>
                </div>
            {/each}
            </div>
        </sortable.Provider>
        <div class="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" label="Reset order" onclick={resetOrder} />
            <Button
                variant={sortDisabled ? 'solid' : 'outline'}
                size="sm"
                label={sortDisabled ? 'Sorting disabled' : 'Disable sorting'}
                onclick={() => (sortDisabled = !sortDisabled)}
            />
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Horizontal-axis" class="text-lg font-semibold">
            <a href="#Horizontal-axis" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Horizontal axis
            </a>
        </h2>
        <horizontalSortable.Provider>
            <div use:horizontalSortable.container class="flex flex-wrap gap-2 rounded-lg bg-surface-container-high p-4">
                {#each horizontalItems as item, index (item.id)}
                    <div
                        use:horizontalSortable.item={{ index, item }}
                        class={[
                            'flex items-center gap-2 rounded-lg border border-outline-variant/60 bg-surface px-3 py-2',
                            horizontalSortable.draggingId === item.id && 'opacity-80 shadow-md'
                        ]}
                    >
                        <button type="button" data-sortable-handle class="cursor-grab px-1" aria-label="Drag">::</button>
                        <span class="text-sm font-medium">{item.label}</span>
                    </div>
                {/each}
            </div>
        </horizontalSortable.Provider>
    </section>

    <section class="space-y-3">
        <h2 id="SortableList-component" class="text-lg font-semibold">
            <a href="#SortableList-component" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                SortableList component
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Prefer a styled wrapper? See
            <Link href="/docs/components/sortable-list" class="text-primary underline">SortableList</Link>.
        </p>
        <Card class="border border-outline-variant/70 p-4">
            <SortableList bind:items={tasks} getKey={(task) => task.id}>
                {#snippet children({ item })}
                    <span class="text-sm font-medium">{item.title}</span>
                {/snippet}
            </SortableList>
        </Card>
    </section>

    <section class="space-y-3">
        <h2 id="API-Reference" class="text-lg font-semibold">
            <a href="#API-Reference" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                API Reference
            </a>
        </h2>
        <div class="grid gap-4 lg:grid-cols-2">
            <Card class="border border-outline-variant/70">
                <div class="space-y-4">
                    <h3 class="text-base font-semibold">useSortable options</h3>
                    <div class="space-y-3">
                        {#each sortableOptionsReference as item (item.name)}
                            <div class="border-b border-outline-variant/60 pb-3 last:border-b-0 last:pb-0">
                                <p class="font-mono text-xs text-primary">{item.name}</p>
                                <p class="mt-1 text-sm font-medium">{item.type}</p>
                                <p class="mt-1 text-sm text-on-surface-variant">{item.description}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
            <Card class="border border-outline-variant/70">
                <div class="space-y-4">
                    <h3 class="text-base font-semibold">Return value</h3>
                    <div class="space-y-3">
                        {#each sortableReturnReference as item (item.name)}
                            <div class="border-b border-outline-variant/60 pb-3 last:border-b-0 last:pb-0">
                                <p class="font-mono text-xs text-primary">{item.name}</p>
                                <p class="mt-1 text-sm font-medium">{item.type}</p>
                                <p class="mt-1 text-sm text-on-surface-variant">{item.description}</p>
                            </div>
                        {/each}
                    </div>
                    <h3 class="pt-2 text-base font-semibold">Markup attributes</h3>
                    <div class="space-y-3">
                        {#each markupReference as item (item.name)}
                            <div class="border-b border-outline-variant/60 pb-3 last:border-b-0 last:pb-0">
                                <p class="font-mono text-xs text-on-surface-variant">{item.name}</p>
                                <p class="mt-1 text-sm text-on-surface-variant">{item.description}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
        </div>
    </section>
</div>
