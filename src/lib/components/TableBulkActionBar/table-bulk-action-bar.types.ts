import type { Snippet } from 'svelte'
import type { ClassNameValue } from 'tailwind-merge'
import type { TableBulkActionBarSlots } from './table-bulk-action-bar.variants.js'

export type TableBulkActionBarProps = {
    /**
     * The number of selected items to display.
     */
    count: number

    /**
     * Callback when the clear/close button is clicked.
     * This is usually where you clear the selection state (`selectedRows = []`).
     */
    onClear?: () => void

    /**
     * Text to display next to the count.
     * @default 'items selected'
     */
    text?: string

    /**
     * Additional CSS classes.
     */
    class?: ClassNameValue

    /**
     * Override specific slot classes.
     */
    ui?: Partial<Record<TableBulkActionBarSlots, ClassNameValue>>

    /**
     * The action buttons to display.
     */
    children?: Snippet
}
