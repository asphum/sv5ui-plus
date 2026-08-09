import { tv, type VariantProps } from 'tailwind-variants'

export const scrollAreaVariants = tv({
    slots: {
        root: 'relative overflow-hidden',
        viewport: 'h-full w-full rounded-[inherit] overflow-auto'
        // Note: For actual custom scrollbars without a JS library, we can use
        // global CSS webkit scrollbar styles or a plugin.
        // Here we just define standard utility classes to hide or style them if Tailwind scrollbar plugin is used.
        // We'll add a custom class `sv5ui-plus-scrollbar` to be styled in global css if needed.
    },
    variants: {
        orientation: {
            vertical: '',
            horizontal: '',
            both: ''
        },
        hideScrollbar: {
            true: {
                viewport: 'scrollbar-none' // Requires tailwind-scrollbar plugin or custom CSS
            }
        }
    },
    defaultVariants: {
        orientation: 'vertical',
        hideScrollbar: false
    }
})

export type ScrollAreaVariantProps = VariantProps<typeof scrollAreaVariants>
