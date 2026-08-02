<script lang="ts" module>
    import type { IconProps } from './icon.types.js'

    export type Props = IconProps
</script>

<script lang="ts">
    import Iconify from '@iconify/svelte'
    import { twMerge } from 'tailwind-merge'
    import { getComponentConfig, iconsDefaults } from '../../config.js'

    const config = getComponentConfig('icons', iconsDefaults)

    let {
        name,
        size,
        responsiveSize,
        color,
        flipH = false,
        flipV = false,
        rotate = 0,
        class: className,
        style: styleProp,
        ...restProps
    }: Props = $props()

    const flip = $derived(
        flipH && flipV
            ? 'horizontal,vertical'
            : flipH
              ? 'horizontal'
              : flipV
                ? 'vertical'
                : undefined
    )

    const rotateValue = $derived(typeof rotate === 'number' && rotate ? rotate / 90 : undefined)

    const iconClass = $derived(
        twMerge(
            'shrink-0',
            responsiveSize ? 'responsive-size' : undefined,
            size === undefined && !responsiveSize ? 'size-6' : undefined,
            className
        )
    )

    const provider = $derived(config.provider ?? 'iconify')

    // Class-style names opt into Iconify's Tailwind 4 renderer automatically.
    // This lets callers mix `icon-[solar--clock-circle-line-duotone]` with
    // regular Iconify names without changing the global provider.
    const isTailwindName = $derived(name.startsWith('icon-[') && name.endsWith(']'))
    const useTailwindProvider = $derived(provider === 'tailwind' || isTailwindName)

    // Automatically map Iconify names to Tailwind icon classes when using the global provider.
    const tailwindClass = $derived(
        name.startsWith('icon-') || name.startsWith('i-')
            ? name
            : `icon-[${name.replace(':', '--')}]`
    )

    // Resolve size value for inline styles
    const resolvedSize = $derived(size ?? 24)
    const sizeStyle = $derived(typeof size === 'number' ? `${size}px` : size)
    const formatSize = (value: number | string | undefined) =>
        typeof value === 'number' ? `${value}px` : value
    const responsiveStyle = $derived(
        responsiveSize
            ? [
                  styleProp,
                  `--svelora-icon-size-base:${formatSize(responsiveSize.base ?? resolvedSize)}`,
                  responsiveSize.sm && `--svelora-icon-size-sm:${formatSize(responsiveSize.sm)}`,
                  responsiveSize.md && `--svelora-icon-size-md:${formatSize(responsiveSize.md)}`,
                  responsiveSize.lg && `--svelora-icon-size-lg:${formatSize(responsiveSize.lg)}`,
                  responsiveSize.xl && `--svelora-icon-size-xl:${formatSize(responsiveSize.xl)}`,
                  responsiveSize['2xl'] && `--svelora-icon-size-2xl:${formatSize(responsiveSize['2xl'])}`
              ]
                  .filter(Boolean)
                  .join(';')
            : styleProp
    )
</script>

{#if useTailwindProvider}
    <span
        class={twMerge(tailwindClass, iconClass)}
        style={responsiveStyle}
        style:width={size === undefined || responsiveSize ? undefined : sizeStyle}
        style:height={size === undefined || responsiveSize ? undefined : sizeStyle}
        style:color={color}
        style:transform={rotateValue ? `rotate(${rotateValue * 90}deg)` : undefined}
        aria-hidden="true"
        {...(restProps as any)}
    ></span>
{:else}
    <Iconify
        icon={name}
        width={resolvedSize}
        height={resolvedSize}
        {color}
        {flip}
        rotate={rotateValue}
        class={iconClass}
        style={responsiveStyle}
        {...restProps}
    />
{/if}

<style>
    .responsive-size {
        width: var(--svelora-icon-size-base);
        height: var(--svelora-icon-size-base);
    }

    @media (min-width: 40rem) {
        .responsive-size {
            width: var(--svelora-icon-size-sm, var(--svelora-icon-size-base));
            height: var(--svelora-icon-size-sm, var(--svelora-icon-size-base));
        }
    }

    @media (min-width: 48rem) {
        .responsive-size {
            width: var(--svelora-icon-size-md, var(--svelora-icon-size-sm, var(--svelora-icon-size-base)));
            height: var(--svelora-icon-size-md, var(--svelora-icon-size-sm, var(--svelora-icon-size-base)));
        }
    }

    @media (min-width: 64rem) {
        .responsive-size {
            width: var(--svelora-icon-size-lg, var(--svelora-icon-size-md, var(--svelora-icon-size-sm, var(--svelora-icon-size-base))));
            height: var(--svelora-icon-size-lg, var(--svelora-icon-size-md, var(--svelora-icon-size-sm, var(--svelora-icon-size-base))));
        }
    }

    @media (min-width: 80rem) {
        .responsive-size {
            width: var(--svelora-icon-size-xl, var(--svelora-icon-size-lg, var(--svelora-icon-size-md, var(--svelora-icon-size-sm, var(--svelora-icon-size-base)))));
            height: var(--svelora-icon-size-xl, var(--svelora-icon-size-lg, var(--svelora-icon-size-md, var(--svelora-icon-size-sm, var(--svelora-icon-size-base)))));
        }
    }

    @media (min-width: 96rem) {
        .responsive-size {
            width: var(--svelora-icon-size-2xl, var(--svelora-icon-size-xl, var(--svelora-icon-size-lg, var(--svelora-icon-size-md, var(--svelora-icon-size-sm, var(--svelora-icon-size-base))))));
            height: var(--svelora-icon-size-2xl, var(--svelora-icon-size-xl, var(--svelora-icon-size-lg, var(--svelora-icon-size-md, var(--svelora-icon-size-sm, var(--svelora-icon-size-base))))));
        }
    }
</style>
