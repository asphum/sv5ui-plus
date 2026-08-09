<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import type { ScrollAreaProps } from './scroll-area.types.js'
    import { scrollAreaVariants } from './scroll-area.variants.js'

    let {
        orientation = 'vertical',
        hideScrollbar = false,
        class: className,
        viewportClass,
        children,
        ...restProps
    }: ScrollAreaProps = $props()

    let styles = $derived(scrollAreaVariants({ orientation, hideScrollbar }))
</script>

<div class={twMerge(styles.root(), className)} {...restProps}>
    <div 
        class={twMerge(
            styles.viewport(), 
            !hideScrollbar && 'sv5ui-plus-scrollbar',
            viewportClass
        )}
        data-orientation={orientation}
    >
        {@render children?.()}
    </div>
</div>

<style>
    /* Custom scrollbar styling for Webkit browsers */
    :global(.sv5ui-plus-scrollbar::-webkit-scrollbar) {
        width: 6px;
        height: 6px;
    }
    :global(.sv5ui-plus-scrollbar::-webkit-scrollbar-track) {
        background: transparent;
    }
    :global(.sv5ui-plus-scrollbar::-webkit-scrollbar-thumb) {
        background-color: var(--color-outline-variant, rgba(156, 163, 175, 0.5));
        border-radius: 9999px;
    }
    :global(.sv5ui-plus-scrollbar::-webkit-scrollbar-thumb:hover) {
        background-color: var(--color-outline, rgba(107, 114, 128, 0.8));
    }
    
    /* Firefox support */
    :global(.sv5ui-plus-scrollbar) {
        scrollbar-width: thin;
        scrollbar-color: var(--color-outline-variant, rgba(156, 163, 175, 0.5)) transparent;
    }
    
    /* Hide scrollbar utility */
    :global(.scrollbar-none::-webkit-scrollbar) {
        display: none;
    }
    :global(.scrollbar-none) {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>
