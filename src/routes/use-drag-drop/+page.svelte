<script lang="ts">
    import { Badge, Button, Card, Link, useDragDrop } from '$lib/compat.js'

    type Task = { id: string; label: string; lane: 'todo' | 'done' }

    let board = $state<{ todo: Task[]; done: Task[] }>({
        todo: [
            { id: 't1', label: 'Design tokens', lane: 'todo' },
            { id: 't2', label: 'Sortable hook', lane: 'todo' },
            { id: 't3', label: 'Docs page', lane: 'todo' }
        ],
        done: [{ id: 'd1', label: 'Kickoff meeting', lane: 'done' }]
    })

    let dropDisabled = $state(false)
    let lastDrop = $state('')

    const dragDrop = useDragDrop()

    function moveTask(task: Task, target: 'todo' | 'done') {
        const source: 'todo' | 'done' = target === 'todo' ? 'done' : 'todo'
        const item = board[source].find((entry) => entry.id === task.id)
        if (!item) return

        board = {
            ...board,
            [source]: board[source].filter((entry) => entry.id !== task.id),
            [target]: [...board[target], { ...item, lane: target }]
        }
        lastDrop = `${task.label} → ${target}`
    }

    const draggableOptionsReference = [
        { name: 'id', type: 'string', description: 'Unique id for the draggable element.' },
        { name: 'container', type: 'string', description: 'Source zone id — must match the droppable id of the column this item is in.' },
        { name: 'data', type: 'unknown', description: 'Payload passed to droppable onDrop.' },
        { name: 'disabled', type: 'boolean | (() => boolean)', description: 'Prevent dragging.' },
        { name: 'handle', type: 'string', description: 'Optional CSS selector for a drag handle.' }
    ] as const

    const droppableOptionsReference = [
        { name: 'id', type: 'string', description: 'Zone id — drops from the same id are ignored.' },
        { name: 'onDrop', type: '(payload) => void', description: 'Called with { id, data? } from the draggable.' },
        { name: 'accept', type: '(payload) => boolean', description: 'Optional filter — return false to reject the drop.' },
        { name: 'disabled', type: 'boolean | (() => boolean)', description: 'Prevent dropping on this zone.' }
    ] as const

    const returnReference = [
        { name: 'Provider', type: 'Component', description: 'Required wrapper — mounts @dnd-kit/svelte DragDropProvider.' },
        { name: 'draggable', type: 'Action<HTMLElement, UseDraggableOptions>', description: 'Attach to drag sources.' },
        { name: 'droppable', type: 'Action<HTMLElement, UseDroppableOptions>', description: 'Attach to drop targets.' },
        { name: 'draggingId', type: 'string | null', description: 'Id of the item currently being dragged.' }
    ] as const
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">useDragDrop</h1>
        <p class="text-on-surface-variant">
            Cross-container drag and drop powered by
            <a href="https://clauderic-dnd-kit.mintlify.app/frameworks/svelte" class="text-primary underline" target="_blank" rel="noreferrer">@dnd-kit/svelte</a>.
            Wrap markup in
            <code class="rounded bg-surface-container-high px-1">dragDrop.Provider</code>,
            use
            <code class="rounded bg-surface-container-high px-1">use:dragDrop.draggable</code>
            on sources and
            <code class="rounded bg-surface-container-high px-1">use:dragDrop.droppable</code>
            on targets. Browse all demos in the
            <Link href="/docs/drag-and-drop" class="text-primary underline">Drag & Drop playground</Link>.
            For reordering within one list, use
            <Link href="/docs/hooks/use-sortable" class="text-primary underline">useSortable</Link>.
        </p>
    </div>

    <section class="space-y-3">
        <h2 id="When-to-use-what" class="text-lg font-semibold">
            <a href="#When-to-use-what" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                When to use what
            </a>
        </h2>
        <Card class="border border-info/20 bg-info/10 p-4 text-sm text-on-surface-variant">
            <p>
                <strong class="text-on-surface">useDragDrop</strong> — kanban, trays, moving cards between columns.
                <strong class="text-on-surface">useSortable</strong> —
                <Link href="/docs/hooks/use-sortable" class="text-primary underline">reorder inside one list</Link>.
                <strong class="text-on-surface">FileUpload</strong> —
                <Link href="/docs/components/file-upload" class="text-primary underline">OS file drops</Link>.
                <strong class="text-on-surface">Editor</strong> —
                <Link href="/docs/components/editor#Drag-handle-Phase-3" class="text-primary underline">block reorder in rich text</Link>.
            </p>
        </Card>
    </section>

    <section class="space-y-3">
        <h2 id="Kanban-board" class="text-lg font-semibold">
            <a href="#Kanban-board" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Kanban board
            </a>
        </h2>
        <dragDrop.Provider>
            <div class="grid gap-4 md:grid-cols-2">
                <div
                    class="space-y-3 rounded-lg border border-outline-variant/70 bg-surface-container-low p-4"
                    use:dragDrop.droppable={{
                        id: 'todo',
                        disabled: () => dropDisabled,
                        onDrop: ({ data }) => moveTask(data as Task, 'todo')
                    }}
                >
                    <h3 class="font-semibold">To do</h3>
                    <div class="space-y-2">
                        {#each board.todo as task (task.id)}
                            <div
                                use:dragDrop.draggable={{ id: task.id, container: 'todo', data: task }}
                                class={[
                                    'cursor-grab rounded-lg border border-outline-variant/60 bg-surface px-3 py-2 active:cursor-grabbing',
                                    dragDrop.draggingId === task.id && 'opacity-80'
                                ]}
                            >
                                {task.label}
                            </div>
                        {/each}
                    </div>
                </div>

                <div
                    class="space-y-3 rounded-lg border border-outline-variant/70 bg-surface-container-low p-4"
                    use:dragDrop.droppable={{
                        id: 'done',
                        disabled: () => dropDisabled,
                        accept: (payload) => String((payload.data as Task)?.label ?? '').length > 0,
                        onDrop: ({ data }) => moveTask(data as Task, 'done')
                    }}
                >
                    <h3 class="font-semibold">Done</h3>
                    <p class="text-xs text-on-surface-variant">accept — rejects empty labels</p>
                    <div class="space-y-2">
                        {#each board.done as task (task.id)}
                            <div
                                use:dragDrop.draggable={{ id: task.id, container: 'done', data: task }}
                                class={[
                                    'cursor-grab rounded-lg border border-success/30 bg-success/10 px-3 py-2 active:cursor-grabbing',
                                    dragDrop.draggingId === task.id && 'opacity-80'
                                ]}
                            >
                                {task.label}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </dragDrop.Provider>

        <div class="flex flex-wrap items-center gap-2">
            {#if dragDrop.draggingId}
                <Badge label="Dragging: {dragDrop.draggingId}" color="primary" variant="soft" />
            {/if}
            {#if lastDrop}
                <Badge label="Last drop: {lastDrop}" color="success" variant="soft" />
            {/if}
            <Button
                variant={dropDisabled ? 'solid' : 'outline'}
                size="sm"
                label={dropDisabled ? 'Drops disabled' : 'Disable drops'}
                onclick={() => (dropDisabled = !dropDisabled)}
            />
        </div>
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
                    <h3 class="text-base font-semibold">draggable options</h3>
                    <div class="space-y-3">
                        {#each draggableOptionsReference as item (item.name)}
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
                    <h3 class="text-base font-semibold">droppable options</h3>
                    <div class="space-y-3">
                        {#each droppableOptionsReference as item (item.name)}
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
        <Card class="border border-outline-variant/70">
            <div class="space-y-3">
                <h3 class="text-base font-semibold">Return value</h3>
                {#each returnReference as item (item.name)}
                    <div class="border-b border-outline-variant/60 pb-3 last:border-b-0 last:pb-0">
                        <p class="font-mono text-xs text-primary">{item.name}</p>
                        <p class="mt-1 text-sm font-medium">{item.type}</p>
                        <p class="mt-1 text-sm text-on-surface-variant">{item.description}</p>
                    </div>
                {/each}
            </div>
        </Card>
    </section>
</div>
