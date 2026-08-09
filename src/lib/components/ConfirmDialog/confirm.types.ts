import type { ButtonProps } from 'sv5ui'

export type ConfirmIcon = 'warning' | 'error' | 'question' | 'info' | 'success'

export type ConfirmColor = NonNullable<ButtonProps['color']>

export interface ConfirmOptions {
    title?: string
    message?: string
    confirmText?: string
    cancelText?: string
    icon?: ConfirmIcon
    confirmColor?: ConfirmColor
    /** When false, only the confirm button is shown (alert-style). @default true */
    showCancel?: boolean
    /** When false, backdrop click and Escape do not dismiss. @default true */
    dismissible?: boolean
    inputPlaceholder?: string
    inputValue?: string
    inputType?: 'text' | 'password' | 'email' | 'number' | 'textarea'
    inputChoices?: string[]
    onConfirm?: (value?: string) => void
    onCancel?: () => void
}
