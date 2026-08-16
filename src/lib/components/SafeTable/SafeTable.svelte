<script lang="ts" module>
    export type { SafeTableProps as Props } from './safe-table.types.js'
</script>

<!--
  Thin wrapper around sv5ui Table.
  Owns $state for bindable arrays so Table never falls back to $bindable([])
  which can surface Symbol(UNINITIALIZED) under Svelte experimental.async / fork.
-->
<script lang="ts" generics="T extends Record<string, any>">
    import { Table, type SortState } from 'sv5ui'
    import type { SafeTableProps } from './safe-table.types.js'

    let localSorting = $state<SortState>([])
    let localSelectedRows = $state<T[]>([])
    let localPinnedRows = $state<(string | number)[]>([])
    let localExpandedRows = $state<(string | number)[]>([])
    let localColumnFilters = $state<Record<string, string>>({})
    let localColumnSizing = $state<Record<string, number>>({})
    let localGlobalFilter = $state('')
    let localPage = $state(0)
    let localRef = $state<HTMLElement | null>(null)

    let {
        ref = $bindable(localRef),
        sorting = $bindable(localSorting),
        selectedRows = $bindable(localSelectedRows),
        pinnedRows = $bindable(localPinnedRows),
        expandedRows = $bindable(localExpandedRows),
        columnFilters = $bindable(localColumnFilters),
        columnSizing = $bindable(localColumnSizing),
        globalFilter = $bindable(localGlobalFilter),
        page = $bindable(localPage),
        columnVisibility = $bindable(),
        columnPinning = $bindable(),
        ...rest
    }: SafeTableProps<T> = $props()
</script>

<Table
    bind:ref
    bind:sorting={
        () => (Array.isArray(sorting) ? sorting : localSorting),
        (value) => {
            const next = Array.isArray(value) ? value : []
            sorting = next
        }
    }
    bind:selectedRows={
        () => (Array.isArray(selectedRows) ? selectedRows : localSelectedRows),
        (value) => {
            const next = (Array.isArray(value) ? value : []) as T[]
            selectedRows = next
        }
    }
    bind:pinnedRows={
        () => (Array.isArray(pinnedRows) ? pinnedRows : localPinnedRows),
        (value) => {
            const next = Array.isArray(value) ? value : []
            pinnedRows = next
        }
    }
    bind:expandedRows={
        () => (Array.isArray(expandedRows) ? expandedRows : localExpandedRows),
        (value) => {
            const next = Array.isArray(value) ? value : []
            expandedRows = next
        }
    }
    bind:columnFilters={
        () =>
            columnFilters && typeof columnFilters === 'object' && !Array.isArray(columnFilters)
                ? columnFilters
                : localColumnFilters,
        (value) => {
            const next =
                value && typeof value === 'object' && !Array.isArray(value)
                    ? value
                    : ({} as Record<string, string>)
            columnFilters = next
        }
    }
    bind:columnSizing={
        () =>
            columnSizing && typeof columnSizing === 'object' && !Array.isArray(columnSizing)
                ? columnSizing
                : localColumnSizing,
        (value) => {
            const next =
                value && typeof value === 'object' && !Array.isArray(value)
                    ? value
                    : ({} as Record<string, number>)
            columnSizing = next
        }
    }
    bind:globalFilter
    bind:page
    bind:columnVisibility
    bind:columnPinning
    {...rest}
/>
