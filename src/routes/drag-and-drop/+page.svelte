<script lang="ts">
    import {
        Badge,
        Button,
        Card,
        Input,
        Link,
        SortableList,
        Switch,
        useDragDrop,
        useSortable
    } from '$lib/compat.js'
    import BasicThreeZonesDemo from './demos/BasicThreeZonesDemo.svelte'
    import NestedContainersDemo from './demos/NestedContainersDemo.svelte'
    import TaskListColumnsDemo from './demos/TaskListColumnsDemo.svelte'

    type SimpleItem = { id: string; label: string }
    type Task = { id: string; title: string; priority: 'low' | 'medium' | 'high' }
    type KanbanTask = { id: string; label: string; lane: 'todo' | 'progress' | 'done' }
    type FolderItem = { id: string; label: string; zone: 'inbox' | 'archive' }

    // --- Sortable demos ---
    let verticalItems = $state<SimpleItem[]>([
        { id: 'v1', label: 'Design review' },
        { id: 'v2', label: 'Implement API' },
        { id: 'v3', label: 'Write tests' },
        { id: 'v4', label: 'Ship release' }
    ])

    let horizontalItems = $state<SimpleItem[]>([
        { id: 'h1', label: 'Draft' },
        { id: 'h2', label: 'Review' },
        { id: 'h3', label: 'Publish' }
    ])

    let gridItems = $state(
        Array.from({ length: 9 }, (_, index) => ({
            id: `g${index + 1}`,
            label: String(index + 1)
        }))
    )

    let handleItems = $state<SimpleItem[]>([
        { id: 'd1', label: 'Only the grip starts a drag' },
        { id: 'd2', label: 'Buttons below stay clickable' }
    ])

    let wholeRowItems = $state<SimpleItem[]>([
        { id: 'w1', label: 'Drag anywhere on this row' },
        { id: 'w2', label: 'No grip handle' }
    ])

    let sortDisabled = $state(false)

    let interactiveItems = $state([
        { id: 'i1', label: 'Rename me', value: 'Backlog grooming' },
        { id: 'i2', label: 'Editable row', value: 'Sprint planning' }
    ])

    let listA = $state<SimpleItem[]>([
        { id: 'a1', label: 'List A — item 1' },
        { id: 'a2', label: 'List A — item 2' }
    ])

    let listB = $state<SimpleItem[]>([
        { id: 'b1', label: 'List B — item 1' },
        { id: 'b2', label: 'List B — item 2' }
    ])

    let richTasks = $state<Task[]>([
        { id: 't1', title: 'Fix login redirect', priority: 'high' },
        { id: 't2', title: 'Update dependencies', priority: 'medium' },
        { id: 't3', title: 'Polish empty states', priority: 'low' }
    ])

    // --- Kanban ---
    let board2 = $state<{ todo: SimpleItem[]; done: SimpleItem[] }>({
        todo: [
            { id: 'k1', label: 'Design tokens' },
            { id: 'k2', label: 'Hook API' }
        ],
        done: [{ id: 'k3', label: 'Kickoff' }]
    })

    let board3 = $state<Record<KanbanTask['lane'], KanbanTask[]>>({
        todo: [
            { id: 't1', label: 'Wireframes', lane: 'todo' },
            { id: 't2', label: 'User flows', lane: 'todo' }
        ],
        progress: [{ id: 'p1', label: 'Component library', lane: 'progress' }],
        done: [{ id: 'd1', label: 'Project setup', lane: 'done' }]
    })

    let dropDisabled = $state(false)
    let lastDrop = $state('')

    const kanban2DragDrop = useDragDrop()
    const kanban3DragDrop = useDragDrop()
    const conditionalDragDrop = useDragDrop()

    let folders = $state<Record<'inbox' | 'archive', FolderItem[]>>({
        inbox: [
            { id: 'f1', label: 'Invoice.pdf', zone: 'inbox' },
            { id: 'f2', label: 'Notes.txt', zone: 'inbox' }
        ],
        archive: [{ id: 'f3', label: 'Old draft', zone: 'archive' }]
    })

    // --- Manual useSortable ---
    let manualItems = $state<SimpleItem[]>([
        { id: 'm1', label: 'Manual markup' },
        { id: 'm2', label: 'Full control' },
        { id: 'm3', label: 'Custom styling' }
    ])

    const manualSortable = useSortable({
        getItems: () => manualItems,
        getId: (item) => item.id,
        handle: '[data-sortable-handle]',
        onReorder: (next) => {
            manualItems = next
        }
    })

    const demoSections = [
        { id: 'Basic', label: 'Basic', description: 'Drag between three zones (A/B/C)' },
        { id: 'Task-list-columns', label: 'Task columns', description: 'In progress / done with live drag-over' },
        { id: 'Nested-containers', label: 'Nested containers', description: 'Reorder groups and move tasks' },
        { id: 'Sortable-vertical', label: 'Sortable list', description: 'Vertical reorder' },
        { id: 'Sortable-horizontal', label: 'Horizontal', description: 'Horizontal axis' },
        { id: 'Sortable-grid', label: 'Grid', description: '2D CSS grid sort' },
        { id: 'Drag-handle', label: 'Drag handle', description: 'Handle-only dragging' },
        { id: 'Whole-row', label: 'Whole row', description: 'Drag the entire row' },
        { id: 'Disabled', label: 'Disabled', description: 'Toggle sorting off' },
        { id: 'Interactive-elements', label: 'Interactive', description: 'Inputs inside rows' },
        { id: 'Multiple-lists', label: 'Multiple lists', description: 'Independent sortable groups' },
        { id: 'Kanban-2-columns', label: 'Kanban (2 col)', description: 'Move cards between columns' },
        { id: 'Kanban-3-columns', label: 'Kanban (3 col)', description: 'Todo / progress / done' },
        { id: 'Conditional-drop', label: 'Conditional', description: 'accept filter on drop' },
        { id: 'Rich-content', label: 'Rich content', description: 'Badges and metadata' },
        { id: 'Manual-markup', label: 'Manual markup', description: 'useSortable directly' }
    ] as const

    const priorityColor = {
        low: 'success',
        medium: 'warning',
        high: 'error'
    } as const

    function moveBoard2(item: SimpleItem, target: 'todo' | 'done') {
        const source: 'todo' | 'done' = target === 'todo' ? 'done' : 'todo'
        const found = board2[source].find((entry) => entry.id === item.id)
        if (!found) return

        board2 = {
            ...board2,
            [source]: board2[source].filter((entry) => entry.id !== item.id),
            [target]: [...board2[target], found]
        }
    }

    function moveBoard3(task: KanbanTask, target: KanbanTask['lane']) {
        const lanes: KanbanTask['lane'][] = ['todo', 'progress', 'done']
        const source = lanes.find((lane) => board3[lane].some((entry) => entry.id === task.id))
        if (!source) return

        board3 = {
            todo: board3.todo.filter((entry) => entry.id !== task.id),
            progress: board3.progress.filter((entry) => entry.id !== task.id),
            done: board3.done.filter((entry) => entry.id !== task.id),
            [target]: [...board3[target], { ...task, lane: target }]
        }
        lastDrop = `${task.label} → ${target}`
    }

    function moveFolder(item: FolderItem, target: 'inbox' | 'archive') {
        const source: 'inbox' | 'archive' = target === 'inbox' ? 'archive' : 'inbox'
        const found = folders[source].find((entry) => entry.id === item.id)
        if (!found) return

        folders = {
            inbox: folders.inbox.filter((entry) => entry.id !== item.id),
            archive: folders.archive.filter((entry) => entry.id !== item.id),
            [target]: [...folders[target], { ...found, zone: target }]
        }
        lastDrop = `${item.label} → ${target}`
    }
</script>

{#snippet sectionHeading(id: string, title: string)}
    <h2 {id} class="text-lg font-semibold">
        <a
            href="#{id}"
            class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
        >
            <span
                class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                aria-hidden="true">#</span>
            {title}
        </a>
    </h2>
{/snippet}

<div class="space-y-10">
    <div class="space-y-3">
        <h1 class="text-2xl font-bold">Drag & Drop</h1>
        <p class="max-w-3xl text-on-surface-variant">
            Interactive guide and playground for sortable lists and cross-container drag, powered by
            <a
                href="https://dndkit.com/svelte/quickstart/"
                class="text-primary underline"
                target="_blank"
                rel="noreferrer">@dnd-kit/svelte</a>.
            Built with
            <Link href="/docs/hooks/use-sortable" class="text-primary underline">useSortable</Link>,
            <Link href="/docs/hooks/use-drag-drop" class="text-primary underline">useDragDrop</Link>, and
            <Link href="/docs/components/sortable-list" class="text-primary underline">SortableList</Link>.
            Advanced demos below also mirror the
            <a
                href="https://github.com/hanielu/dnd-kit-svelte/tree/main/docs/src/lib/components/examples"
                class="text-primary underline"
                target="_blank"
                rel="noreferrer">dnd-kit-svelte examples</a>
            (basic, sortable columns, nested containers), adapted for official
            <code class="text-xs">@dnd-kit/svelte</code>.
        </p>
    </div>

    <div class="space-y-3">
        <Card class="border border-outline-variant/70 p-4">
            <p class="mb-3 text-sm font-semibold text-on-surface">Jump to demo</p>
            <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {#each demoSections as demo (demo.id)}
                    <a
                        href="#{demo.id}"
                        class="rounded-lg border border-outline-variant/50 bg-surface-container-low px-3 py-2 transition-colors hover:border-primary/40 hover:bg-surface-container-high"
                    >
                        <p class="text-sm font-medium text-on-surface">{demo.label}</p>
                        <p class="text-xs text-on-surface-variant">{demo.description}</p>
                    </a>
                {/each}
            </div>
        </Card>
    </div>

    <section class="space-y-3">
        {@render sectionHeading('When-to-use-what', 'When to use what')}
        <div class="grid gap-3 md:grid-cols-3">
            <Card class="space-y-2 border border-outline-variant/70 p-4">
                <p class="font-semibold text-on-surface">SortableList</p>
                <p class="text-sm text-on-surface-variant">
                    Fastest path for vertical, horizontal, or grid lists with
                    <code class="rounded bg-surface-container-high px-1">bind:items</code>.
                </p>
                <Link href="/docs/components/sortable-list" class="text-sm text-primary underline">SortableList docs</Link>
            </Card>
            <Card class="space-y-2 border border-outline-variant/70 p-4">
                <p class="font-semibold text-on-surface">useSortable</p>
                <p class="text-sm text-on-surface-variant">Full control over row markup, handles, and axis modifiers.</p>
                <Link href="/docs/hooks/use-sortable" class="text-sm text-primary underline">useSortable docs</Link>
            </Card>
            <Card class="space-y-2 border border-outline-variant/70 p-4">
                <p class="font-semibold text-on-surface">useDragDrop</p>
                <p class="text-sm text-on-surface-variant">Move cards between columns, folders, or kanban lanes.</p>
                <Link href="/docs/hooks/use-drag-drop" class="text-sm text-primary underline">useDragDrop docs</Link>
            </Card>
        </div>
    </section>

    <!-- Basic -->
    <section class="space-y-3">
        {@render sectionHeading('Basic', 'Basic')}
        <p class="text-sm text-on-surface-variant">
            Cross-container drag with three drop zones — ported from the
            <a
                href="https://github.com/hanielu/dnd-kit-svelte/tree/main/docs/src/lib/components/examples/basic"
                class="text-primary underline"
                target="_blank"
                rel="noreferrer">dnd-kit-svelte basic example</a>
            via <Link href="/docs/hooks/use-drag-drop" class="text-primary underline">useDragDrop</Link>.
        </p>
        <BasicThreeZonesDemo />
    </section>

    <!-- Task list columns -->
    <section class="space-y-3">
        {@render sectionHeading('Task-list-columns', 'Task columns')}
        <p class="text-sm text-on-surface-variant">
            Two-column task board with live column switching on drag-over and reorder on drop — from the
            <a
                href="https://github.com/hanielu/dnd-kit-svelte/tree/main/docs/src/lib/components/examples/sortable"
                class="text-primary underline"
                target="_blank"
                rel="noreferrer">sortable example</a>
            using <code class="text-xs">@dnd-kit/svelte</code> directly.
        </p>
        <TaskListColumnsDemo />
    </section>

    <!-- Nested containers -->
    <section class="space-y-3">
        {@render sectionHeading('Nested-containers', 'Nested containers')}
        <p class="text-sm text-on-surface-variant">
            Sortable task groups with nested items that can move between containers — from the
            <a
                href="https://github.com/hanielu/dnd-kit-svelte/tree/main/docs/src/lib/components/examples/nested"
                class="text-primary underline"
                target="_blank"
                rel="noreferrer">nested example</a>.
        </p>
        <NestedContainersDemo />
    </section>

    <!-- Sortable vertical -->
    <section class="space-y-3">
        {@render sectionHeading('Sortable-vertical', 'Sortable list')}
        <Card class="border border-outline-variant/70 p-4">
            <SortableList bind:items={verticalItems} getKey={(item) => item.id}>
                {#snippet children({ item, index, dragging })}
                    <div class="flex w-full items-center justify-between gap-3">
                        <span class="text-sm font-medium" class:opacity-60={dragging}>{item.label}</span>
                        <span class="text-xs text-on-surface-variant">#{index + 1}</span>
                    </div>
                {/snippet}
            </SortableList>
        </Card>
    </section>

    <!-- Horizontal -->
    <section class="space-y-3">
        {@render sectionHeading('Sortable-horizontal', 'Horizontal')}
        <Card class="border border-outline-variant/70 p-4">
            <SortableList bind:items={horizontalItems} axis="horizontal" getKey={(item) => item.id}>
                {#snippet children({ item })}
                    <span class="whitespace-nowrap text-sm font-medium">{item.label}</span>
                {/snippet}
            </SortableList>
        </Card>
    </section>

    <!-- Grid -->
    <section class="space-y-3">
        {@render sectionHeading('Sortable-grid', 'Grid')}
        <p class="text-sm text-on-surface-variant">
            CSS Grid layout — dnd-kit detects 2D flow automatically when axis is
            <code class="rounded bg-surface-container-high px-1">grid</code>.
        </p>
        <Card class="border border-outline-variant/70 p-4">
            <SortableList
                bind:items={gridItems}
                axis="grid"
                class="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                itemClass="aspect-square items-center justify-center text-lg font-semibold"
                getKey={(item) => item.id}
            >
                {#snippet children({ item })}
                    {item.label}
                {/snippet}
            </SortableList>
        </Card>
    </section>

    <!-- Drag handle -->
    <section class="space-y-3">
        {@render sectionHeading('Drag-handle', 'Drag handle')}
        <Card class="border border-outline-variant/70 p-4">
            <SortableList bind:items={handleItems} getKey={(item) => item.id}>
                {#snippet children({ item })}
                    <div class="flex flex-1 items-center justify-between gap-3">
                        <span class="text-sm">{item.label}</span>
                        <Button size="sm" variant="outline" label="Action" onclick={() => {}} />
                    </div>
                {/snippet}
            </SortableList>
        </Card>
    </section>

    <!-- Whole row -->
    <section class="space-y-3">
        {@render sectionHeading('Whole-row', 'Whole row drag')}
        <Card class="border border-outline-variant/70 p-4">
            <SortableList bind:items={wholeRowItems} handle={false} getKey={(item) => item.id}>
                {#snippet children({ item })}
                    <span class="cursor-grab text-sm font-medium active:cursor-grabbing">{item.label}</span>
                {/snippet}
            </SortableList>
        </Card>
    </section>

    <!-- Disabled -->
    <section class="space-y-3">
        {@render sectionHeading('Disabled', 'Disabled')}
        <Card class="border border-outline-variant/70 p-4">
            <SortableList bind:items={verticalItems} disabled={sortDisabled} getKey={(item) => item.id}>
                {#snippet children({ item })}
                    <span class="text-sm">{item.label}</span>
                {/snippet}
            </SortableList>
        </Card>
        <label class="inline-flex items-center gap-2 text-sm">
            <Switch bind:checked={sortDisabled} />
            Disable sorting
        </label>
    </section>

    <!-- Interactive -->
    <section class="space-y-3">
        {@render sectionHeading('Interactive-elements', 'Interactive elements')}
        <p class="text-sm text-on-surface-variant">
            Drag from the grip only — inputs and buttons stay interactive (built into @dnd-kit).
        </p>
        <Card class="border border-outline-variant/70 p-4">
            <SortableList
                items={interactiveItems}
                getKey={(item) => item.id}
                onReorder={(next) => {
                    interactiveItems = next as typeof interactiveItems
                }}
            >
                {#snippet children({ item })}
                    <div class="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                        <Input bind:value={item.value} class="max-w-xs" />
                        <Button size="sm" variant="outline" label="Save" onclick={() => {}} />
                    </div>
                {/snippet}
            </SortableList>
        </Card>
    </section>

    <!-- Multiple lists -->
    <section class="space-y-3">
        {@render sectionHeading('Multiple-lists', 'Multiple lists')}
        <div class="grid gap-4 md:grid-cols-2">
            <Card class="space-y-2 border border-outline-variant/70 p-4">
                <p class="text-sm font-semibold">Backlog</p>
                <SortableList bind:items={listA} getKey={(item) => item.id}>
                    {#snippet children({ item })}
                        <span class="text-sm">{item.label}</span>
                    {/snippet}
                </SortableList>
            </Card>
            <Card class="space-y-2 border border-outline-variant/70 p-4">
                <p class="text-sm font-semibold">This sprint</p>
                <SortableList bind:items={listB} getKey={(item) => item.id}>
                    {#snippet children({ item })}
                        <span class="text-sm">{item.label}</span>
                    {/snippet}
                </SortableList>
            </Card>
        </div>
    </section>

    <!-- Kanban 2 col -->
    <section class="space-y-3">
        {@render sectionHeading('Kanban-2-columns', 'Kanban (2 columns)')}
        <kanban2DragDrop.Provider>
            <div class="grid gap-4 md:grid-cols-2">
                {#each ['todo', 'done'] as lane (lane)}
                    <div
                        class="space-y-3 rounded-lg border border-outline-variant/70 bg-surface-container-low p-4"
                        use:kanban2DragDrop.droppable={{
                            id: `board2-${lane}`,
                            disabled: () => dropDisabled,
                            onDrop: ({ data }) => moveBoard2(data as SimpleItem, lane as 'todo' | 'done')
                        }}
                    >
                        <h3 class="font-semibold capitalize">{lane}</h3>
                        <div class="space-y-2">
                            {#each board2[lane as 'todo' | 'done'] as item (item.id)}
                                <div
                                    use:kanban2DragDrop.draggable={{
                                        id: item.id,
                                        container: `board2-${lane}`,
                                        data: item
                                    }}
                                    class={[
                                        'cursor-grab rounded-lg border border-outline-variant/60 bg-surface px-3 py-2 text-sm active:cursor-grabbing',
                                        kanban2DragDrop.draggingId === item.id && 'opacity-80'
                                    ]}
                                >
                                    {item.label}
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </kanban2DragDrop.Provider>
        <label class="inline-flex items-center gap-2 text-sm">
            <Switch bind:checked={dropDisabled} />
            Disable drops on 2-column board
        </label>
    </section>

    <!-- Kanban 3 col -->
    <section class="space-y-3">
        {@render sectionHeading('Kanban-3-columns', 'Kanban (3 columns)')}
        <kanban3DragDrop.Provider>
            <div class="grid gap-4 lg:grid-cols-3">
                {#each ['todo', 'progress', 'done'] as lane (lane)}
                    <div
                        class="space-y-3 rounded-lg border border-outline-variant/70 bg-surface-container-low p-4"
                        use:kanban3DragDrop.droppable={{
                            id: `board3-${lane}`,
                            onDrop: ({ data }) =>
                                moveBoard3(data as KanbanTask, lane as KanbanTask['lane'])
                        }}
                    >
                        <h3 class="font-semibold capitalize">{lane === 'progress' ? 'In progress' : lane}</h3>
                        <div class="space-y-2">
                            {#each board3[lane as KanbanTask['lane']] as task (task.id)}
                                <div
                                    use:kanban3DragDrop.draggable={{
                                        id: task.id,
                                        container: `board3-${lane}`,
                                        data: task
                                    }}
                                    class={[
                                        'cursor-grab rounded-lg border border-outline-variant/60 bg-surface px-3 py-2 text-sm active:cursor-grabbing',
                                        kanban3DragDrop.draggingId === task.id && 'opacity-80'
                                    ]}
                                >
                                    {task.label}
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </kanban3DragDrop.Provider>
        {#if lastDrop}
            <Badge label="Last drop: {lastDrop}" color="success" variant="soft" />
        {/if}
    </section>

    <!-- Conditional drop -->
    <section class="space-y-3">
        {@render sectionHeading('Conditional-drop', 'Conditional drop')}
        <p class="text-sm text-on-surface-variant">
            Archive rejects items whose label contains
            <code class="rounded bg-surface-container-high px-1">draft</code> (case-insensitive).
        </p>
        <conditionalDragDrop.Provider>
            <div class="grid gap-4 md:grid-cols-2">
                <div
                    class="space-y-3 rounded-lg border border-outline-variant/70 bg-surface-container-low p-4"
                    use:conditionalDragDrop.droppable={{
                        id: 'inbox',
                        onDrop: ({ data }) => moveFolder(data as FolderItem, 'inbox')
                    }}
                >
                    <h3 class="font-semibold">Inbox</h3>
                    <div class="space-y-2">
                        {#each folders.inbox as item (item.id)}
                            <div
                                use:conditionalDragDrop.draggable={{
                                    id: item.id,
                                    container: 'inbox',
                                    data: item
                                }}
                                class="cursor-grab rounded-lg border border-outline-variant/60 bg-surface px-3 py-2 text-sm active:cursor-grabbing"
                            >
                                {item.label}
                            </div>
                        {/each}
                    </div>
                </div>
                <div
                    class="space-y-3 rounded-lg border border-outline-variant/70 bg-surface-container-low p-4"
                    use:conditionalDragDrop.droppable={{
                        id: 'archive',
                        accept: (payload) =>
                            !String((payload.data as FolderItem)?.label ?? '')
                                .toLowerCase()
                                .includes('draft'),
                        onDrop: ({ data }) => moveFolder(data as FolderItem, 'archive')
                    }}
                >
                    <h3 class="font-semibold">Archive</h3>
                    <p class="text-xs text-on-surface-variant">accept — blocks "draft" files</p>
                    <div class="space-y-2">
                        {#each folders.archive as item (item.id)}
                            <div
                                use:conditionalDragDrop.draggable={{
                                    id: item.id,
                                    container: 'archive',
                                    data: item
                                }}
                                class="cursor-grab rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-sm active:cursor-grabbing"
                            >
                                {item.label}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </conditionalDragDrop.Provider>
    </section>

    <!-- Rich content -->
    <section class="space-y-3">
        {@render sectionHeading('Rich-content', 'Rich content')}
        <Card class="border border-outline-variant/70 p-4">
            <SortableList bind:items={richTasks} getKey={(item) => item.id}>
                {#snippet children({ item, dragging })}
                    <div class="flex flex-1 items-center justify-between gap-3">
                        <span class="text-sm font-medium" class:line-through={dragging}>{item.title}</span>
                        <Badge label={item.priority} color={priorityColor[item.priority]} variant="soft" size="sm" />
                    </div>
                {/snippet}
            </SortableList>
        </Card>
    </section>

    <!-- Manual markup -->
    <section class="space-y-3">
        {@render sectionHeading('Manual-markup', 'Manual markup')}
        <manualSortable.Provider>
            <div use:manualSortable.container class="space-y-2 rounded-lg bg-surface-container-high p-4">
                {#each manualItems as item, index (item.id)}
                    <div
                        use:manualSortable.item={{ index, item }}
                        class={[
                            'flex items-center gap-3 rounded-lg border border-outline-variant/60 bg-surface px-3 py-2',
                            manualSortable.draggingId === item.id && 'opacity-80 shadow-md'
                        ]}
                    >
                        <button
                            type="button"
                            data-sortable-handle
                            class="cursor-grab rounded-md p-1 text-on-surface-variant hover:bg-surface-container-high active:cursor-grabbing"
                            aria-label="Drag to reorder"
                        >
                            ::
                        </button>
                        <span class="text-sm font-medium">{item.label}</span>
                    </div>
                {/each}
            </div>
        </manualSortable.Provider>
    </section>

    <div class="space-y-3">
        {@render sectionHeading('Related-docs', 'Related docs')}
        <div class="grid gap-3 md:grid-cols-3">
            <Card class="border border-outline-variant/70 p-4">
                <Link href="/docs/hooks/use-sortable" class="font-semibold text-primary underline">useSortable</Link>
                <p class="mt-1 text-sm text-on-surface-variant">Hook API and manual markup.</p>
            </Card>
            <Card class="border border-outline-variant/70 p-4">
                <Link href="/docs/hooks/use-drag-drop" class="font-semibold text-primary underline">useDragDrop</Link>
                <p class="mt-1 text-sm text-on-surface-variant">Cross-container kanban patterns.</p>
            </Card>
            <Card class="border border-outline-variant/70 p-4">
                <Link href="/docs/components/sortable-list" class="font-semibold text-primary underline">SortableList</Link>
                <p class="mt-1 text-sm text-on-surface-variant">Styled component with bind:items.</p>
            </Card>
        </div>
    </div>
</div>
