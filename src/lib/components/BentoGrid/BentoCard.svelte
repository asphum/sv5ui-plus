<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import { Icon } from 'sv5ui'
    import { Button } from 'sv5ui'
    import type { BentoCardProps } from './bento-grid.types.js'
    import { bentoGridVariants } from './bento-grid.variants.js'

    let {
        name,
        description,
        icon,
        href,
        cta = 'Learn more',
        class: className,
        background,
        actionSnippet,
        ...restProps
    }: BentoCardProps = $props()

    let styles = $derived(bentoGridVariants())
</script>

<div class={twMerge(styles.cardBase(), className)} {...restProps}>
    <div class={styles.cardBackground()}>
        {#if background}
            {@render background()}
        {/if}
    </div>

    <!-- Push content up slightly on hover by adjusting group styles or locally -->
    <div class={twMerge(styles.cardContent(), href && 'group-hover:-translate-y-4')}>
        {#if icon}
            <div class={styles.cardIconWrapper()}>
                <Icon {name} class="w-6 h-6" />
            </div>
        {/if}
        
        <h3 class={styles.cardTitle()}>{name}</h3>
        
        {#if description}
            <p class={styles.cardDescription()}>{description}</p>
        {/if}
    </div>

    {#if href || actionSnippet}
        <div class={twMerge(styles.cardAction(), !href && !actionSnippet && 'hidden')}>
            {#if actionSnippet}
                {@render actionSnippet()}
            {:else if href}
                <Button {href} variant="ghost" size="sm" class="pl-0 hover:bg-transparent">
                    {cta}
                    {#snippet trailingSlot()}
                        <Icon name="lucide:arrow-right" class="w-4 h-4 ml-1" />
                    {/snippet}
                </Button>
            {/if}
        </div>
    {/if}
</div>
