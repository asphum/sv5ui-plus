import type { DragPayload, UseDroppableOptions } from '../useDragDrop/useDragDrop.svelte.js'

export const DRAG_DROP_CONTEXT_KEY = Symbol('sv5ui-plus-drag-drop')

export interface DragDropContextValue {
    registerDroppable: <T>(id: string, options: UseDroppableOptions<T>) => void
    unregisterDroppable: (id: string) => void
    setDraggingId: (id: string | null) => void
    getDroppable: <T>(id: string) => UseDroppableOptions<T> | undefined
    toPayload: (source: { id: string | number; data?: unknown }) => DragPayload
}
