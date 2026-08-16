<script lang="ts">
    import { SafeTable, type TableColumn } from '$lib/compat.js'
    import { Badge } from 'sv5ui'

    type Row = {
        id: string
        name: string
        role: string
    }

    const data: Row[] = [
        { id: '1', name: 'Alice', role: 'Admin' },
        { id: '2', name: 'Bob', role: 'Editor' },
        { id: '3', name: 'Carol', role: 'Viewer' }
    ]

    const columns: TableColumn<Row>[] = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'role', label: 'Role', sortable: true }
    ]

    let expandedRows = $state<(string | number)[]>([])
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">SafeTable</h1>
        <p class="text-on-surface-variant">
            Drop-in wrapper around <code class="rounded bg-surface-container-highest px-1">sv5ui</code>
            <code class="rounded bg-surface-container-highest px-1">Table</code>. Owns bindable array
            state so async/fork never feeds
            <code class="rounded bg-surface-container-highest px-1">Symbol(UNINITIALIZED)</code>
            into <code class="rounded bg-surface-container-highest px-1">new Set(pinnedRows)</code>.
        </p>
    </div>

    <section class="space-y-3">
        <h2 id="Usage" class="text-lg font-semibold">
            <a
                href="#Usage"
                class="group relative inline-flex w-fit items-center no-underline hover:underline focus:outline-none focus-visible:underline"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 text-base leading-none font-normal text-primary/60 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true">#</span
                >
                Usage
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Same props/snippets as core Table. Prefer
            <code class="rounded bg-surface-container-highest px-1">SafeTable</code> when the app
            enables Svelte <code class="rounded bg-surface-container-highest px-1">experimental.async</code>.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4">
            <SafeTable {data} {columns} rowKey="id" bind:expandedRows>
                {#snippet cellSlot({ row, column })}
                    {#if column.key === 'role'}
                        <Badge label={row.role} variant="soft" color="secondary" />
                    {:else}
                        {row[column.key]}
                    {/if}
                {/snippet}
                {#snippet expandedSlot({ row })}
                    <p class="p-3 text-sm text-on-surface-variant">Expanded: {row.name}</p>
                {/snippet}
            </SafeTable>
        </div>
    </section>
</div>
