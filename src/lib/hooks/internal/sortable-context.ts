import type { UseSortableOptions } from '../useSortable/useSortable.svelte.js'
import type { Snippet } from 'svelte'

export const SORTABLE_CONTEXT_KEY = Symbol('sv5ui-plus-sortable')
export const SORTABLE_GROUP_CONTEXT_KEY = Symbol('sv5ui-plus-sortable-group')

export interface SortableGroupContextValue {
    draggingId: string | number | null
    registerOverlay: (groupId: string, snippet: Snippet<[{ item: unknown }]>) => void
    unregisterOverlay: (groupId: string) => void
    getOverlay: (groupId: string) => Snippet<[{ item: unknown }]> | undefined
    setDraggingGroupId: (groupId: string | null) => void
}

export interface SortableContextValue<T> {
    groupId: string
    getItems: UseSortableOptions<T>['getItems']
    getId: UseSortableOptions<T>['getId']
    onReorder: UseSortableOptions<T>['onReorder']
    isDisabled: () => boolean
    getAxis: () => 'vertical' | 'horizontal' | 'grid'
    getHandle: () => string | undefined
    setDraggingId: (id: string | number | null) => void
    getDraggingId: () => string | number | null
}
