<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import Icon from '../Icon/Icon.svelte'
    import type { TreeViewProps, TreeItem } from './tree-view.types.js'
    import { treeViewVariants } from './tree-view.variants.js'

    let {
        items = [],
        selectedIds = [],
        expandedIds = $bindable([]),
        size = 'md',
        expandOnRowClick = true,
        class: className,
        onItemClick,
        onItemExpand,
        labelSnippet,
        ...restProps
    }: TreeViewProps = $props()

    let styles = $derived(treeViewVariants({ size }))

    // Internal state tracking for faster lookup
    let expandedSet = $derived(new Set(expandedIds))
    let selectedSet = $derived(new Set(selectedIds))

    function toggleExpand(e: Event, item: TreeItem) {
        e.stopPropagation()
        if (item.disabled || !item.children?.length) return

        const isExpanded = expandedSet.has(item.id)
        if (isExpanded) {
            expandedIds = expandedIds.filter(id => id !== item.id)
        } else {
            expandedIds = [...expandedIds, item.id]
        }
        
        onItemExpand?.(item, !isExpanded)
    }

    function handleRowClick(e: Event, item: TreeItem) {
        if (item.disabled) return
        
        if (expandOnRowClick && item.children?.length) {
            toggleExpand(e, item)
        }
        
        onItemClick?.(item)
    }
</script>

{#snippet renderTree(treeItems: TreeItem[])}
    <div class={styles.root()}>
        {#each treeItems as item}
            {@const hasChildren = item.children && item.children.length > 0}
            {@const isExpanded = expandedSet.has(item.id)}
            {@const isSelected = selectedSet.has(item.id)}
            
            <div class={styles.item()}>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div 
                    class={twMerge(
                        styles.itemRow(), 
                        isSelected && styles.itemRowActive(),
                        item.disabled && styles.itemRowDisabled()
                    )}
                    onclick={(e) => handleRowClick(e, item)}
                >
                    <!-- Chevron / Spacer -->
                    <div class={styles.chevronWrapper()}>
                        {#if hasChildren}
                            <button 
                                type="button" 
                                class="w-full h-full flex items-center justify-center outline-none"
                                onclick={(e) => {
                                    if (!expandOnRowClick) toggleExpand(e, item)
                                }}
                                tabindex="-1"
                                disabled={item.disabled}
                            >
                                <Icon 
                                    name="icon-[lucide--chevron-right]" 
                                    class={twMerge(styles.chevron(), isExpanded && 'rotate-90')} 
                                />
                            </button>
                        {/if}
                    </div>

                    <!-- Icon -->
                    {#if item.icon}
                        <Icon name={item.icon} class={styles.icon()} />
                    {/if}

                    <!-- Label -->
                    <div class={styles.label()}>
                        {#if labelSnippet}
                            {@render labelSnippet(item)}
                        {:else}
                            {item.label}
                        {/if}
                    </div>
                </div>

                <!-- Children -->
                {#if hasChildren && isExpanded}
                    <div class={styles.childrenWrapper()}>
                        {@render renderTree(item.children!)}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
{/snippet}

<div class={className} {...restProps}>
    {@render renderTree(items)}
</div>
