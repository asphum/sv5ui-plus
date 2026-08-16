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
    let localColumnVisibility = $state<Record<string, boolean>>({})
    let localColumnPinning = $state<{ left?: string[]; right?: string[] }>({})

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
        columnVisibility = $bindable(localColumnVisibility),
        columnPinning = $bindable(localColumnPinning),
        ...rest
    }: SafeTableProps<T> = $props()

    function isPlainObject(value: unknown): value is Record<string, unknown> {
        return typeof value === 'object' && value !== null && !Array.isArray(value)
    }
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
        () => (isPlainObject(columnFilters) ? columnFilters : localColumnFilters),
        (value) => {
            columnFilters = isPlainObject(value)
                ? (value as Record<string, string>)
                : ({} as Record<string, string>)
        }
    }
    bind:columnSizing={
        () => (isPlainObject(columnSizing) ? columnSizing : localColumnSizing),
        (value) => {
            columnSizing = isPlainObject(value)
                ? (value as Record<string, number>)
                : ({} as Record<string, number>)
        }
    }
    bind:globalFilter={
        () => (typeof globalFilter === 'string' ? globalFilter : localGlobalFilter),
        (value) => {
            globalFilter = typeof value === 'string' ? value : ''
        }
    }
    bind:page={
        () => (typeof page === 'number' && Number.isFinite(page) ? page : localPage),
        (value) => {
            page = typeof value === 'number' && Number.isFinite(value) ? value : 0
        }
    }
    bind:columnVisibility={
        () => (isPlainObject(columnVisibility) ? columnVisibility : localColumnVisibility),
        (value) => {
            columnVisibility = isPlainObject(value)
                ? (value as Record<string, boolean>)
                : ({} as Record<string, boolean>)
        }
    }
    bind:columnPinning={
        () => (isPlainObject(columnPinning) ? columnPinning : localColumnPinning),
        (value) => {
            columnPinning = isPlainObject(value)
                ? (value as { left?: string[]; right?: string[] })
                : ({} as { left?: string[]; right?: string[] })
        }
    }
    {...rest}
/>
