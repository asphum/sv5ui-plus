<script lang="ts" module>
    import type { IconProps } from './icon.types.js'
    import { addCollection } from '@iconify/svelte'
    import { bundledIcons } from './bundled.js'

    for (const collection of bundledIcons) addCollection(collection)

    export type Props = IconProps
</script>

<script lang="ts">
    import Icon from '@iconify/svelte'
    import { twMerge } from 'tailwind-merge'

    let {
        name,
        size,
        color,
        flipH = false,
        flipV = false,
        rotate = 0,
        class: className,
        style: styleProp,
        'aria-hidden': ariaHidden = true,
        ...restProps
    }: Props = $props()

    const isTailwindIcon = $derived(/^icon-\[[a-z0-9]+--[a-z0-9-]+\]$/i.test(name))
    const resolvedSize = $derived(size ?? 24)
    const explicitSize = $derived(typeof size === 'number' ? `${size}px` : size)

    const flip = $derived(
        flipH && flipV
            ? 'horizontal,vertical'
            : flipH
              ? 'horizontal'
              : flipV
                ? 'vertical'
                : undefined
    )

    const rotateValue = $derived(rotate ? rotate / 90 : undefined)

    const iconClass = $derived(twMerge('shrink-0', className))
    const tailwindIconClass = $derived(
        twMerge('shrink-0', size === undefined ? 'size-6' : undefined, name, className)
    )
    const tailwindTransform = $derived(
        [rotate ? `rotate(${rotate}deg)` : undefined, flipH ? 'scaleX(-1)' : undefined, flipV ? 'scaleY(-1)' : undefined]
            .filter(Boolean)
            .join(' ') || undefined
    )
</script>

{#if isTailwindIcon}
    <span
        class={tailwindIconClass}
        style={styleProp}
        style:width={explicitSize}
        style:height={explicitSize}
        style:color={color}
        style:transform={tailwindTransform}
        aria-hidden={ariaHidden}
        {...(restProps as any)}
    ></span>
{:else}
    <Icon
        icon={name}
        width={resolvedSize}
        height={resolvedSize}
        {color}
        {flip}
        rotate={rotateValue}
        class={iconClass}
        style={styleProp}
        aria-hidden={ariaHidden}
        {...restProps}
    />
{/if}
