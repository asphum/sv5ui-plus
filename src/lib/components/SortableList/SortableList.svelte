<script lang="ts" module>
    export type { SortableListProps } from './sortable-list.types.js'
</script>

<script lang="ts" generics="T">
    import { twMerge } from 'tailwind-merge'
    import { Icon } from 'sv5ui'
    import { useSortable } from '../../hooks/useSortable/index.js'
    import type { SortableListProps } from './sortable-list.types.js'

    let {
        items = $bindable(),
        getKey,
        onReorder,
        axis = 'vertical',
        handle = true,
        disabled = false,
        class: className,
        itemClass,
        children,
        overlay,
        group
    }: SortableListProps<T> = $props()

    const sortable = useSortable({
        getItems: () => items,
        getId: (item) => getKey(item),
        group: () => group,
        axis: () => axis,
        handle: () => (handle === true ? '[data-sortable-handle]' : typeof handle === 'string' ? handle : undefined),
        disabled: () => disabled,
        onReorder(nextItems) {
            items = nextItems
            onReorder?.(nextItems)
        }
    })

    const listClass = $derived(
        twMerge(
            axis === 'vertical' ? 'flex flex-col gap-2' : axis === 'horizontal' ? 'flex flex-row flex-wrap gap-2' : 'gap-3',
            className
        )
    )

    const itemClasses = $derived(
        twMerge(
            'relative flex items-center gap-3 rounded-lg border border-outline-variant/60 bg-surface-container-low px-3 py-2 select-none',
            itemClass
        )
    )
</script>

<sortable.Provider {overlay}>
    <div use:sortable.container class={listClass} role="list">
        {#each items as item, index (getKey(item))}
            {@const id = getKey(item)}
            {@const dragging = sortable.draggingId === String(id)}
            <div
                use:sortable.item={{ index, item }}
                role="listitem"
                class={twMerge(
                    'relative sortable-item',
                    itemClasses,
                    dragging && (overlay ? 'bg-transparent border-transparent' : 'z-10 opacity-95 shadow-md')
                )}
                aria-grabbed={dragging}
            >
                {#if overlay && dragging}
                    <div class="absolute inset-0 z-10 rounded-[inherit] border-2 border-dashed border-primary/50 bg-primary/5 pointer-events-none"></div>
                {/if}
                <div class={['flex w-full items-center gap-3', overlay && dragging && 'invisible']}>
                    {#if handle === true}
                        <button
                            type="button"
                            data-sortable-handle
                            class="inline-flex shrink-0 cursor-grab rounded-md p-1 text-on-surface-variant hover:bg-surface-container-high active:cursor-grabbing"
                            aria-label="Drag to reorder"
                        >
                            <Icon name="lucide:grip-vertical" size="16" />
                        </button>
                    {/if}
                    {@render children({ item, index, dragging })}
                </div>
            </div>
        {/each}
    </div>
</sortable.Provider>

<style>
    :global([data-sortable-active='true']) {
        user-select: none;
    }

    /*
     * dnd-kit animates items via Web Animations API using the CSS `translate` property.
     * Using will-change:translate tells the browser to promote these elements to their own
     * GPU layer so the WAAPI animation (smooth push/shift) runs without layout thrashing.
     * Do NOT add CSS transition:transform here — it conflicts with WAAPI and causes jank.
     */
    :global(.sortable-item) {
        will-change: translate;
    }

    /* Smooth color/opacity transitions for the dragging state indicator */
    :global(.sortable-item:not([aria-grabbed='true'])) {
        transition: background-color 150ms ease,
                    border-color 150ms ease,
                    opacity 150ms ease;
    }
</style>
