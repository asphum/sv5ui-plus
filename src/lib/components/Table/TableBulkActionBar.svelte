<script lang="ts" module>
    import type { TableBulkActionBarProps } from './table-bulk-action-bar.types.js'

    export type Props = TableBulkActionBarProps
</script>

<script lang="ts">
    import { fly } from 'svelte/transition'
    import { tableBulkActionBarVariants } from './table-bulk-action-bar.variants.js'
    import Button from '../Button/Button.svelte'

    let {
        count,
        onClear,
        text = 'items selected',
        class: className,
        ui,
        children,
        ...restProps
    }: Props = $props()

    const slots = $derived(tableBulkActionBarVariants())
</script>

<div
    class={slots.root({ class: [ui?.root, className] })}
    transition:fly={{ y: 20, duration: 250 }}
    {...restProps}
>
    <div class={slots.content({ class: ui?.content })}>
        <span class={slots.countBadge({ class: ui?.countBadge })}>{count}</span>
        <span class="opacity-90">{text}</span>
    </div>

    {#if children}
        <div class={slots.actions({ class: ui?.actions })}>
            {@render children()}
        </div>
    {/if}

    <div class={slots.clearButton({ class: ui?.clearButton })}>
        <Button 
            variant="ghost" 
            color="surface" 
            size="sm" 
            icon="icon-[lucide--x]" 
            onclick={onClear} 
            class="h-8 w-8 !p-0 rounded-full"
            aria-label="Clear selection"
        />
    </div>
</div>
