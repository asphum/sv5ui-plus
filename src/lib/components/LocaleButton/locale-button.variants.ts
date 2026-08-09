import { tv, type VariantProps } from 'tailwind-variants'
import type { ButtonProps } from 'sv5ui'

export const localeButtonVariants = tv({
    slots: {
        base: '',
        triggerLabel: 'truncate',
        triggerIcon: 'shrink-0',
        triggerChevron: 'shrink-0 opacity-70',
        menu: 'space-y-1 rounded-xl p-1',
        menuLabel: 'font-semibold tracking-[0.14em] text-on-surface-variant uppercase',
        item: [
            'flex w-full items-center justify-between text-left transition-colors',
            'focus-visible:ring-primary/40 focus-visible:outline-none focus-visible:ring-2'
        ],
        itemIdle: 'text-on-surface hover:bg-surface-container-high',
        itemCurrent: 'bg-primary/10 text-primary',
        itemLeading: 'flex min-w-0 items-start gap-2',
        itemText: 'min-w-0 space-y-0.5',
        itemLabel: 'truncate font-medium',
        itemDescription: 'text-on-surface-variant',
        itemCode:
            'shrink-0 rounded-md bg-surface-container font-medium text-on-surface-variant uppercase',
        itemIndicator: 'shrink-0 text-primary'
    },
    variants: {
        fit: {
            true: {
                menu: 'w-fit min-w-0'
            },
            false: {
                menu: 'min-w-52'
            }
        },
        size: {
            xs: {
                triggerIcon: 'size-3.5',
                triggerChevron: 'size-3.5',
                menuLabel: 'px-2 pt-1.5 pb-0.5 text-[10px]',
                item: 'px-2 py-1 text-xs gap-1.5 rounded-md',
                itemLabel: 'text-xs',
                itemDescription: 'text-[10px]',
                itemCode: 'px-1 py-0.5 text-[9px]',
                itemIndicator: 'size-3'
            },
            sm: {
                triggerIcon: 'size-4',
                triggerChevron: 'size-4',
                menuLabel: 'px-2.5 pt-2 pb-0.5 text-[11px]',
                item: 'px-2.5 py-1.5 text-xs gap-2 rounded-md',
                itemLabel: 'text-xs',
                itemDescription: 'text-[11px]',
                itemCode: 'px-1 py-0.5 text-[10px]',
                itemIndicator: 'size-3.5'
            },
            md: {
                triggerIcon: 'size-5',
                triggerChevron: 'size-5',
                menuLabel: 'px-3 pt-2 pb-1 text-xs',
                item: 'px-3 py-2 text-sm gap-3 rounded-lg',
                itemLabel: 'text-sm',
                itemDescription: 'text-xs',
                itemCode: 'px-1.5 py-0.5 text-[11px]',
                itemIndicator: 'size-4'
            },
            lg: {
                triggerIcon: 'size-5',
                triggerChevron: 'size-5',
                menuLabel: 'px-3.5 pt-2.5 pb-1 text-sm',
                item: 'px-3.5 py-2.5 text-base gap-3.5 rounded-lg',
                itemLabel: 'text-base',
                itemDescription: 'text-xs',
                itemCode: 'px-2 py-0.5 text-xs',
                itemIndicator: 'size-5'
            },
            xl: {
                triggerIcon: 'size-6',
                triggerChevron: 'size-6',
                menuLabel: 'px-4 pt-3 pb-1 text-sm',
                item: 'px-4 py-3 text-lg gap-4 rounded-xl',
                itemLabel: 'text-lg',
                itemDescription: 'text-sm',
                itemCode: 'px-2 py-1 text-sm',
                itemIndicator: 'size-6'
            }
        }
    },
    defaultVariants: {
        fit: false,
        size: 'md'
    }
})

export type LocaleButtonVariantProps = VariantProps<typeof localeButtonVariants>
export type LocaleButtonSlots = keyof ReturnType<typeof localeButtonVariants>

export const localeButtonDefaults = {
    defaultVariants: {
        ...localeButtonVariants.defaultVariants,
        color: 'surface' as NonNullable<ButtonProps['color']>,
        variant: 'outline' as NonNullable<ButtonProps['variant']>,
        size: 'md' as NonNullable<ButtonProps['size']>
    },
    slots: {} as Partial<Record<LocaleButtonSlots, string>>
}
