import type { TableProps } from 'sv5ui'

/** Same surface as `sv5ui` Table — wrapper only hardens bindable array defaults. */
export type SafeTableProps<T extends Record<string, any> = Record<string, any>> = TableProps<T>
