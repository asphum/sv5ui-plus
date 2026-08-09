import type { Action } from 'svelte/action'
import type { Component } from 'svelte'
import { setContext, type Snippet } from 'svelte'
import { CollisionPriority, type Data } from '@dnd-kit/abstract'
import { createDroppable } from '@dnd-kit/svelte'
import { createSortable } from '@dnd-kit/svelte/sortable'
import SortableProvider from '../internal/SortableProvider.svelte'
import {
    SORTABLE_CONTEXT_KEY,
    SORTABLE_GROUP_CONTEXT_KEY,
    type SortableContextValue,
    type SortableGroupContextValue
} from '../internal/sortable-context.js'
import { getContext } from 'svelte'

export interface UseSortableItemParams<T> {
    index: number
    item: T
}

export interface UseSortableOptions<T> {
    /** Reactive getter for the current item array. */
    getItems: () => T[]

    /** Stable id for each item — used for keys and reorder tracking. */
    getId: (item: T) => string | number

    /** Called with the reordered array after a successful drop. */
    onReorder: (items: T[]) => void

    /**
     * Drag axis.
     * @default 'vertical'
     */
    axis?: 'vertical' | 'horizontal' | 'grid' | (() => 'vertical' | 'horizontal' | 'grid')

    /**
     * CSS selector for the drag handle, relative to each item.
     * When omitted, the whole item is draggable.
     * @example '[data-sortable-handle]'
     */
    handle?: string | (() => string | undefined)

    /**
     * Disable sorting.
     * @default false
     */
    disabled?: boolean | (() => boolean)

    /**
     * Group ID for the sortable list. Used for cross-list drag and drop.
     * If not provided, a unique ID is generated.
     */
    group?: string | (() => string | undefined)
}

export interface UseSortableReturn<T> {
    /**
     * Wrap sortable markup with this provider.
     * Required — [@dnd-kit/svelte](https://clauderic-dnd-kit.mintlify.app/frameworks/svelte) needs a DragDropProvider ancestor.
     */
    readonly Provider: Component<{ children?: Snippet; overlay?: Snippet<[{ item: T }]> }>

    /** Attach to the list container element (optional wrapper). */
    readonly container: Action<HTMLElement>

    /** Attach to each sortable row with the current index and item. */
    readonly item: Action<HTMLElement, UseSortableItemParams<T>>

    /** Id of the item currently being dragged, or null. */
    readonly draggingId: string | number | null
}

let sortableGroupCounter = 0

/**
 * Sortable list hook powered by [@dnd-kit/svelte](https://clauderic-dnd-kit.mintlify.app/frameworks/svelte).
 *
 * Wrap markup in `sortable.Provider`, then attach `use:sortable.item` to each row.
 */
export function useSortable<T>(options: UseSortableOptions<T>): UseSortableReturn<T> {
    const { getItems, getId, onReorder } = options

    function getGroup(): string {
        const group = options.group
        return (
            (typeof group === 'function' ? group() : group) ??
            `sv5ui-plus-sortable-${++sortableGroupCounter}`
        )
    }

    const groupId = getGroup()

    let localDraggingId = $state<string | number | null>(null)
    let listNode = $state<HTMLElement | null>(null)

    // Optional group context tracking draggingId globally
    const groupCtx = getContext<SortableGroupContextValue | undefined>(SORTABLE_GROUP_CONTEXT_KEY)

    const draggingId = $derived(groupCtx ? groupCtx.draggingId : localDraggingId)

    function getAxis(): 'vertical' | 'horizontal' | 'grid' {
        const axis = options.axis
        return typeof axis === 'function' ? axis() : (axis ?? 'vertical')
    }

    function getHandle(): string | undefined {
        const handle = options.handle
        return typeof handle === 'function' ? handle() : handle
    }

    function isDisabled(): boolean {
        return typeof options.disabled === 'function'
            ? options.disabled()
            : (options.disabled ?? false)
    }

    const context: SortableContextValue<T> = {
        groupId,
        getItems,
        getId,
        onReorder,
        isDisabled,
        getAxis,
        getHandle,
        setDraggingId(id) {
            localDraggingId = id
        },
        getDraggingId: () => localDraggingId
    }

    setContext(SORTABLE_CONTEXT_KEY, context as SortableContextValue<unknown>)

    $effect(() => {
        const node = listNode
        if (!node) return

        if (draggingId != null) {
            node.setAttribute('data-sortable-active', 'true')
        } else {
            node.removeAttribute('data-sortable-active')
        }
    })

    const container: Action<HTMLElement> = (node) => {
        listNode = node

        const droppable = createDroppable({
            get id() {
                return getGroup()
            },
            type: 'sortable-group',
            collisionPriority: CollisionPriority.Low
        })
        const detach = droppable.attach(node)

        return {
            destroy() {
                detach()
                if (listNode === node) {
                    listNode = null
                }
                node.removeAttribute('data-sortable-active')
            }
        }
    }

    const item: Action<HTMLElement, UseSortableItemParams<T>> = (node, params) => {
        let current = params!

        const sortable = createSortable({
            get id() {
                return String(getId(current.item))
            },
            get index() {
                return current.index
            },
            get group() {
                return getGroup()
            },
            get data() {
                return current.item as Data
            },
            get disabled() {
                return isDisabled()
            }
        })

        const detach = sortable.attach(node)
        let detachHandle: (() => void) | undefined

        function bindHandle() {
            detachHandle?.()

            const selector = getHandle()
            if (!selector) {
                sortable.sortable.handle = undefined
                detachHandle = undefined
                return
            }

            const handle = node.querySelector<HTMLElement>(selector)
            if (!handle) {
                sortable.sortable.handle = undefined
                detachHandle = undefined
                return
            }

            detachHandle = sortable.attachHandle(handle)
        }

        bindHandle()

        node.setAttribute('data-sortable-item', '')
        node.dataset.sortableId = String(getId(current.item))

        return {
            update(nextParams) {
                current = nextParams
                sortable.sortable.id = String(getId(nextParams.item))
                sortable.sortable.index = nextParams.index
                sortable.sortable.data = nextParams.item as Data
                sortable.sortable.disabled = isDisabled()
                node.dataset.sortableId = String(getId(nextParams.item))
                bindHandle()
            },
            destroy() {
                detach()
                detachHandle?.()
                node.removeAttribute('data-sortable-item')
                delete node.dataset.sortableId
            }
        }
    }

    return {
        Provider: SortableProvider,
        container,
        item,
        get draggingId() {
            return draggingId
        }
    }
}
