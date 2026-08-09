<script lang="ts" module>
    import type { LocaleButtonProps } from './locale-button.types.js'

    export type Props = LocaleButtonProps
</script>

<script lang="ts">
    import { Button } from 'sv5ui'
    import { getComponentConfig, iconsDefaults } from '../../config.js'
    import { DropdownMenu } from 'sv5ui'
    import { Icon } from 'sv5ui'
    import { Link } from 'sv5ui'
    import {
        localeButtonDefaults,
        localeButtonVariants
    } from './locale-button.variants.js'
    import type { LocaleButtonLocale } from './locale-button.types.js'

    const config = getComponentConfig('localeButton', localeButtonDefaults)
    const icons = getComponentConfig('icons', iconsDefaults)

    let {
        ref = $bindable(null),
        locales = [],
        locale,
        variant = config.defaultVariants.variant ?? 'outline',
        color = config.defaultVariants.color ?? 'surface',
        size = config.defaultVariants.size ?? 'md',
        fit = config.defaultVariants.fit ?? false,
        loading = false,
        disabled = false,
        block = false,
        square = false,
        placeholder = 'Select language',
        ariaLabel = 'Change language',
        menuLabel = 'Language',
        icon = 'lucide:languages',
        chevronIcon = icons.chevronDown,
        showIcon = true,
        showChevron = true,
        showCode = true,
        showIndicator = true,
        disableCurrentLocale = true,
        closeOnSelect = true,
        getLocaleHref,
        onLocaleChange,
        open = $bindable(false),
        onOpenChange,
        side = 'bottom',
        sideOffset = 4,
        align = 'start',
        alignOffset = 0,
        avoidCollisions = true,
        collisionBoundary,
        collisionPadding = 8,
        sticky = 'partial',
        hideWhenDetached = false,
        onEscapeKeydown,
        onInteractOutside,
        onCloseAutoFocus,
        forceMount,
        loop = true,
        portal = true,
        arrow = false,
        ui,
        children: triggerContent,
        item: itemSnippet,
        menu: menuSnippet,
        class: className,
        ...restProps
    }: Props = $props()

    const classes = $derived.by(() => {
        const slots = localeButtonVariants({ size, fit })

        return {
            base: slots.base({ class: [config.slots.base, className, ui?.base] }),
            triggerLabel: slots.triggerLabel({
                class: [config.slots.triggerLabel, ui?.triggerLabel]
            }),
            triggerIcon: slots.triggerIcon({
                class: [config.slots.triggerIcon, ui?.triggerIcon]
            }),
            triggerChevron: slots.triggerChevron({
                class: [config.slots.triggerChevron, ui?.triggerChevron]
            }),
            menu: slots.menu({ class: [config.slots.menu, ui?.menu] }),
            menuLabel: slots.menuLabel({ class: [config.slots.menuLabel, ui?.menuLabel] }),
            item: slots.item({ class: [config.slots.item, ui?.item] }),
            itemIdle: slots.itemIdle({ class: [config.slots.itemIdle, ui?.itemIdle] }),
            itemCurrent: slots.itemCurrent({ class: [config.slots.itemCurrent, ui?.itemCurrent] }),
            itemLeading: slots.itemLeading({ class: [config.slots.itemLeading, ui?.itemLeading] }),
            itemText: slots.itemText({ class: [config.slots.itemText, ui?.itemText] }),
            itemLabel: slots.itemLabel({ class: [config.slots.itemLabel, ui?.itemLabel] }),
            itemDescription: slots.itemDescription({
                class: [config.slots.itemDescription, ui?.itemDescription]
            }),
            itemCode: slots.itemCode({ class: [config.slots.itemCode, ui?.itemCode] }),
            itemIndicator: slots.itemIndicator({
                class: [config.slots.itemIndicator, ui?.itemIndicator]
            })
        }
    })

    const currentLocale = $derived(
        locales.find((item) => item.code === locale) ?? locales[0]
    )
    const triggerLabel = $derived(
        currentLocale?.shortLabel ?? currentLocale?.label ?? placeholder
    )
    const triggerDisabled = $derived(disabled || loading || locales.length <= 1)

    function isCurrentLocale(item: LocaleButtonLocale): boolean {
        return item.code === currentLocale?.code
    }

    function getResolvedHref(item: LocaleButtonLocale): string | undefined {
        return item.href ?? getLocaleHref?.(item.code, item)
    }

    function isItemDisabled(item: LocaleButtonLocale): boolean {
        return disabled || loading || item.disabled || (disableCurrentLocale && isCurrentLocale(item))
    }

    async function handleItemClick(
        event: MouseEvent,
        item: LocaleButtonLocale,
        close: () => void
    ): Promise<void> {
        if (isItemDisabled(item)) {
            event.preventDefault()
            event.stopPropagation()
            return
        }

        if (onLocaleChange) {
            await onLocaleChange(item.code, item)
        }

        if (!getResolvedHref(item) && closeOnSelect) {
            close()
        }
    }
</script>

<DropdownMenu
    bind:open
    {onOpenChange}
    {side}
    {sideOffset}
    {align}
    {alignOffset}
    {avoidCollisions}
    {collisionBoundary}
    {collisionPadding}
    {sticky}
    {hideWhenDetached}
    {onEscapeKeydown}
    {onInteractOutside}
    {onCloseAutoFocus}
    {forceMount}
    {loop}
    {portal}
    {arrow}
    {size}
    ui={fit ? { content: 'w-fit min-w-0' } : undefined}
>
    {#snippet children({ open: isOpen, props })}
        <Button
            {...props}
            bind:ref
            {variant}
            {color}
            {size}
            {loading}
            disabled={triggerDisabled}
            {block}
            {square}
            class={classes.base}
            aria-label={ariaLabel}
            {...restProps}
        >
            {#if triggerContent}
                {@render triggerContent({ open: isOpen, currentLocale })}
            {:else}
                {#if showIcon}
                    <span class={classes.triggerIcon}>
                        <Icon name={icon} />
                    </span>
                {/if}
                <span class={classes.triggerLabel}>{triggerLabel}</span>
                {#if showChevron}
                    <span class={classes.triggerChevron}>
                        <Icon name={chevronIcon} />
                    </span>
                {/if}
            {/if}
        </Button>
    {/snippet}

    {#snippet content({ close })}
        {#if menuSnippet}
            {@render menuSnippet({ close })}
        {:else}
            <div class={classes.menu}>
                {#if menuLabel}
                    <p class={classes.menuLabel}>{menuLabel}</p>
                {/if}

                {#each locales as item (item.code)}
                    {@const current = isCurrentLocale(item)}
                    {@const href = getResolvedHref(item)}
                    {@const itemDisabled = isItemDisabled(item)}

                    {#if itemSnippet}
                        {@render itemSnippet({ item, current, disabled: itemDisabled, close })}
                    {:else}
                        <Link
                            href={href}
                            hreflang={item.hreflang ?? item.code}
                            raw
                            role="menuitemradio"
                            aria-checked={current}
                            disabled={itemDisabled}
                            class={[
                                classes.item,
                                current ? classes.itemCurrent : classes.itemIdle,
                                item.class
                            ]}
                            onclick={(event) => handleItemClick(event, item, close)}
                        >
                            <span class={classes.itemLeading}>
                                {#if item.icon}
                                    <Icon name={item.icon} />
                                {/if}
                                <span class={classes.itemText}>
                                    <span class={classes.itemLabel}>{item.label}</span>
                                    {#if item.description}
                                        <span class={classes.itemDescription}>{item.description}</span>
                                    {/if}
                                </span>
                            </span>

                            <span class="flex items-center gap-2">
                                {#if showCode}
                                    <span class={classes.itemCode}>{item.shortLabel ?? item.code}</span>
                                {/if}
                                {#if showIndicator && current}
                                    <span class={classes.itemIndicator}>
                                        <Icon name={icons.check} />
                                    </span>
                                {/if}
                            </span>
                        </Link>
                    {/if}
                {/each}
            </div>
        {/if}
    {/snippet}
</DropdownMenu>
