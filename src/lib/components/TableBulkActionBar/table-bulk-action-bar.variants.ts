import { tv, type VariantProps } from 'tailwind-variants'

export const tableBulkActionBarVariants = tv({
    slots: {
        root: 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-6 rounded-2xl border border-outline-variant/50 bg-surface/95 px-4 py-3 shadow-xl shadow-surface-container-highest/20 backdrop-blur-md',
        content: 'flex items-center gap-3 text-sm text-on-surface whitespace-nowrap',
        countBadge:
            'font-semibold bg-primary text-on-primary px-2 py-0.5 rounded-full text-xs flex items-center justify-center min-w-[20px]',
        actions: 'flex items-center gap-2 border-l border-outline-variant/50 pl-4',
        clearButton: ''
    }
})

export type TableBulkActionBarVariantProps = VariantProps<typeof tableBulkActionBarVariants>
export type TableBulkActionBarSlots = keyof ReturnType<typeof tableBulkActionBarVariants>
