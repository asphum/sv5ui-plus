<script lang="ts">
    import { Link, Card, Button, SortableList, SortableGroup } from '$lib/compat.js'
    import { move } from '@dnd-kit/helpers'
    import type { DragOverEvent } from '@dnd-kit/dom'

    type Item = { id: string; label: string }

    let items = $state<Item[]>([
        { id: '1', label: 'Inbox zero' },
        { id: '2', label: 'Prepare release notes' },
        { id: '3', label: 'Record demo video' },
        { id: '4', label: 'Update changelog' }
    ])

    let horizontalItems = $state<Item[]>([
        { id: 'h1', label: 'Draft' },
        { id: 'h2', label: 'Review' },
        { id: 'h3', label: 'Publish' }
    ])

    let wholeRowItems = $state([
        { id: '1', label: 'Click anywhere to drag' },
        { id: '2', label: 'No handle needed' },
        { id: '3', label: 'Works great for simple lists' }
    ])

    // Kanban board state
    let kanbanItems = $state<Record<string, { id: string; label: string }[]>>({
        'in-progress': [
            { id: 'task-1', label: 'Learn Svelte 5' },
            { id: 'task-2', label: 'Build a Kanban board' },
            { id: 'task-3', label: 'Review code' },
            { id: 'task-4', label: 'Setup project' }
        ],
        done: []
    })

    function handleDragOver(event: DragOverEvent) {
        kanbanItems = move(kanbanItems, event)
    }

    let sortDisabled = $state(false)

    const propsReference = [
        { name: 'items', type: 'T[]', description: 'Bindable array — updated automatically on reorder.' },
        { name: 'getKey', type: '(item: T) => string | number', description: 'Stable key per item (used in #each).' },
        { name: 'onReorder', type: '(items: T[]) => void', description: 'Optional callback after bind:items updates.' },
        { name: 'handle', type: 'boolean', description: 'Show grip handle. Default true. Set false to drag the whole row.' },
        { name: 'axis', type: "'vertical' | 'horizontal' | 'grid'", description: 'List layout axis. Default vertical. Use grid with CSS grid classes.' },
        { name: 'disabled', type: 'boolean', description: 'Disable sorting.' },
        { name: 'class', type: 'ClassNameValue', description: 'Classes on the list container.' },
        { name: 'itemClass', type: 'ClassNameValue', description: 'Classes on each sortable row.' },
        { name: 'overlay', type: 'Snippet<[{ item: T }]>', description: 'Optional snippet to render a custom drag overlay (floating placeholder).' }
    ] as const

    const snippetReference = [
        { name: 'item', type: 'T', description: 'The row item.' },
        { name: 'index', type: 'number', description: 'Zero-based position in the array.' },
        { name: 'dragging', type: 'boolean', description: 'True while this row is being dragged.' }
    ] as const

    function resetItems() {
        items = [
            { id: '1', label: 'Inbox zero' },
            { id: '2', label: 'Prepare release notes' },
            { id: '3', label: 'Record demo video' },
            { id: '4', label: 'Update changelog' }
        ]
    }
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">SortableList</h1>
        <p class="text-on-surface-variant">
            Opinionated sortable list built on
            <Link href="/docs/hooks/use-sortable" class="text-primary underline">useSortable</Link>.
            Uses <code class="rounded bg-surface-container-high px-1">bind:items</code>
            to keep array state in sync. See the
            <Link href="/docs/drag-and-drop" class="text-primary underline">Drag & Drop playground</Link>
            for more examples. For kanban or cross-column moves, use
            <Link href="/docs/hooks/use-drag-drop" class="text-primary underline">useDragDrop</Link>.
        </p>
    </div>

    <section class="space-y-3">
        <h2 id="When-to-use-what" class="text-lg font-semibold">
            <a href="#When-to-use-what" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                When to use what
            </a>
        </h2>
        <Card class="border border-outline-variant/70 p-4 text-sm text-on-surface-variant">
            <p>
                Use <strong class="text-on-surface">SortableList</strong> for standard vertical/horizontal task lists with a grip handle.
                Use <Link href="/docs/hooks/use-sortable" class="text-primary underline">useSortable</Link> directly when you need full control over markup.
                See the <Link href="/docs/hooks/use-sortable#When-to-use-what" class="text-primary underline">drag & drop overview</Link>
                for FileUpload and Editor.
            </p>
        </Card>
    </section>

    <section class="space-y-3">
        <h2 id="Basic" class="text-lg font-semibold">
            <a href="#Basic" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Basic
            </a>
        </h2>
        <Card class="border border-outline-variant/70 p-5 bg-surface-container-lowest">
            <h3 class="mb-4 text-base font-bold flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
                Tasks
            </h3>
            <SortableList bind:items disabled={sortDisabled} getKey={(item) => item.id} itemClass="bg-surface border border-outline-variant/60 rounded-lg p-3">
                {#snippet overlay({ item })}
                    <div class="flex w-full items-center justify-between gap-3 bg-surface border border-outline-variant/60 rounded-lg p-3 z-50 shadow-xl scale-[1.02] opacity-95">
                        <span class="text-sm font-medium">{item.label}</span>
                    </div>
                {/snippet}
                {#snippet children({ item, index, dragging })}
                    <div class="flex w-full items-center justify-between gap-3">
                        <span class="text-sm font-medium">{item.label}</span>
                        <span class="text-xs text-on-surface-variant">#{index + 1}</span>
                    </div>
                {/snippet}
            </SortableList>
        </Card>
        <div class="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" label="Reset" onclick={resetItems} />
            <Button
                variant={sortDisabled ? 'solid' : 'outline'}
                size="sm"
                label={sortDisabled ? 'Sorting disabled' : 'Disable sorting'}
                onclick={() => (sortDisabled = !sortDisabled)}
            />
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Horizontal" class="text-lg font-semibold">
            <a href="#Horizontal" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Horizontal
            </a>
        </h2>
        <Card class="border border-outline-variant/70 p-5 bg-surface-container-lowest">
            <h3 class="mb-4 text-base font-bold flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                Stages
            </h3>
            <SortableList bind:items={horizontalItems} axis="horizontal" getKey={(item) => item.id} itemClass="bg-surface border border-outline-variant/60 rounded-lg px-4 py-2">
                {#snippet overlay({ item })}
                    <div class="flex items-center bg-surface border border-outline-variant/60 rounded-lg px-4 py-2 z-50 shadow-xl scale-[1.02] opacity-95">
                        <span class="text-sm font-medium">{item.label}</span>
                    </div>
                {/snippet}
                {#snippet children({ item })}
                    <span class="text-sm font-medium">{item.label}</span>
                {/snippet}
            </SortableList>
        </Card>
    </section>

    <section class="space-y-3">
        <h2 id="Whole-row-drag" class="text-lg font-semibold">
            <a href="#Whole-row-drag" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Whole row drag
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">Set <code class="rounded bg-surface-container-high px-1">handle={'{false}'}</code> to drag the entire row.</p>
        <Card class="border border-outline-variant/70 p-4">
            <SortableList bind:items={wholeRowItems} handle={false} getKey={(item) => item.id} itemClass="bg-surface border border-outline-variant/60 rounded-lg p-3">
                {#snippet overlay({ item })}
                    <div class="flex w-full items-center gap-3 bg-surface border border-outline-variant/60 rounded-lg p-3 z-50 shadow-xl scale-[1.02] opacity-95">
                        <span class="cursor-grab text-sm font-medium">{item.label}</span>
                    </div>
                {/snippet}
                {#snippet children({ item })}
                    <span class="cursor-grab text-sm font-medium active:cursor-grabbing">{item.label}</span>
                {/snippet}
            </SortableList>
        </Card>
    </section>

    <section class="space-y-3">
        <h2 id="Draggable-Containers" class="text-lg font-semibold">
            <a href="#Draggable-Containers" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Draggable Containers (Kanban)
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">Wrap multiple <code class="rounded bg-surface-container-high px-1">SortableList</code> components in a <code class="rounded bg-surface-container-high px-1">SortableGroup</code> to drag items between them.</p>
        
        <SortableGroup onDragOver={handleDragOver}>
            <div class="grid gap-4 md:grid-cols-2">
                <Card class="border border-outline-variant/70 p-5 bg-surface-container-lowest">
                    <h3 class="mb-4 text-base font-bold flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
                        In Progress
                    </h3>
                    <SortableList bind:items={kanbanItems['in-progress']} group="in-progress" getKey={(item) => item.id} class="min-h-[100px]" itemClass="bg-surface border border-outline-variant/60 rounded-lg p-3">
                        {#snippet overlay({ item })}
                            <div class="flex w-full items-center justify-between gap-3 bg-surface border border-outline-variant/60 rounded-lg p-3 z-50 shadow-xl scale-[1.02] opacity-95">
                                <span class="text-sm font-medium">{item.label}</span>
                            </div>
                        {/snippet}
                        {#snippet children({ item })}
                            <span class="text-sm font-medium">{item.label}</span>
                        {/snippet}
                    </SortableList>
                </Card>

                <Card class="border border-outline-variant/70 p-5 bg-surface-container-lowest">
                    <h3 class="mb-4 text-base font-bold flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                        Done
                    </h3>
                    <SortableList bind:items={kanbanItems.done} group="done" getKey={(item) => item.id} class="min-h-[100px]" itemClass="bg-surface border border-outline-variant/60 rounded-lg p-3">
                        {#snippet overlay({ item })}
                            <div class="flex w-full items-center justify-between gap-3 bg-surface border border-outline-variant/60 rounded-lg p-3 z-50 shadow-xl scale-[1.02] opacity-95">
                                <span class="text-sm font-medium">{item.label}</span>
                            </div>
                        {/snippet}
                        {#snippet children({ item })}
                            <span class="text-sm font-medium">{item.label}</span>
                        {/snippet}
                    </SortableList>
                </Card>
            </div>
        </SortableGroup>
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
                    <h3 class="text-base font-semibold">Props</h3>
                    <div class="space-y-3">
                        {#each propsReference as item (item.name)}
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
                    <h3 class="text-base font-semibold">children snippet</h3>
                    <div class="space-y-3">
                        {#each snippetReference as item (item.name)}
                            <div class="border-b border-outline-variant/60 pb-3 last:border-b-0 last:pb-0">
                                <p class="font-mono text-xs text-primary">{item.name}</p>
                                <p class="mt-1 text-sm font-medium">{item.type}</p>
                                <p class="mt-1 text-sm text-on-surface-variant">{item.description}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
        </div>
    </section>
</div>
