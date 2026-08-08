import type { Component } from 'svelte'
import { mount, unmount } from 'svelte'
import internalToast from './internal/french-toast/core/toast.js'
import type {
    DefaultToastOptions,
    ToastOptions,
    ValueOrFunction
} from './internal/french-toast/core/types.js'
import ToastProcessing from './internal/toast-icons/ToastProcessing.svelte'
import Avatar from '../Avatar/Avatar.svelte'
import type { AvatarProps } from '../Avatar/avatar.types.js'
import Icon from '../Icon/Icon.svelte'
import type { ToastColor } from './toast.variants.js'

type ToastAvatarOptions = Pick<AvatarProps, 'src' | 'alt' | 'text' | 'icon' | 'size'>

type SveloraToastOptions = Omit<ToastOptions, 'icon' | 'className'> & {
    /**
     * Semantic color for the toast.
     * @example toast('Message', { color: 'primary' })
     */
    color?: ToastColor

    /**
     * Iconify icon name to display in the toast.
     * @example toast('Launched!', { icon: 'icon-[lucide--rocket]' })
     */
    icon?: string | ToastOptions['icon']

    /**
     * Avatar to display in the icon slot.
     * @example toast('John commented', { avatar: { src: '/avatar.jpg', alt: 'John' } })
     */
    avatar?: ToastAvatarOptions

    /**
     * When false, toast stays until programmatically dismissed or updated.
     * Also sets `duration: Infinity` and hides the close button.
     */
    dismissible?: boolean

    /** Alias for className. */
    class?: string
}

function createIconComponent(name: string): Component {
    function SveloraIcon(anchor: Node) {
        if (!anchor.parentNode) return { destroy() {} }
        const instance = mount(Icon, {
            target: anchor.parentNode as Element,
            anchor,
            props: { name, size: '18' }
        })
        return {
            destroy() {
                unmount(instance)
            }
        }
    }
    return SveloraIcon as unknown as Component
}

function createAvatarComponent(props: ToastAvatarOptions): Component {
    function SveloraAvatar(anchor: Node) {
        if (!anchor.parentNode) return { destroy() {} }
        const instance = mount(Avatar, {
            target: anchor.parentNode as Element,
            anchor,
            props: { size: 'sm', ...props }
        })
        return {
            destroy() {
                unmount(instance)
            }
        }
    }
    return SveloraAvatar as unknown as Component
}

function resolveOptions(data?: SveloraToastOptions): ToastOptions | undefined {
    if (!data) return data

    const { color, icon, avatar, class: className, dismissible, ...rest } = data
    const resolved: ToastOptions = { ...rest }

    if (dismissible === false) {
        resolved.duration = Number.POSITIVE_INFINITY
        resolved.closeButton = false
    }

    if (className) {
        resolved.className = className
    }

    if (color) {
        const existing = resolved.className ?? ''
        resolved.className = `${existing} ps-color-${color}`.trim()
    }

    if (avatar) {
        resolved.icon = createAvatarComponent(avatar)
    } else if (typeof icon === 'string') {
        resolved.icon = createIconComponent(icon)
    } else if (icon !== undefined) {
        resolved.icon = icon
    }

    return resolved
}

type SveloraPromiseOptions = SveloraToastOptions & {
    loading?: SveloraToastOptions
    success?: SveloraToastOptions
    error?: SveloraToastOptions
}

function resolveDefaultOptions(opts?: SveloraPromiseOptions): DefaultToastOptions | undefined {
    if (!opts) return opts

    const { loading, success, error, ...rest } = opts

    return {
        ...resolveOptions(rest),
        loading: resolveOptions(loading),
        success: resolveOptions(success),
        error: resolveOptions(error)
    }
}

function toastFn(message: string, data?: SveloraToastOptions) {
    return internalToast(message, resolveOptions(data))
}

toastFn.success = (message: string, data?: SveloraToastOptions) =>
    internalToast.success(message, resolveOptions(data))

toastFn.error = (message: string, data?: SveloraToastOptions) =>
    internalToast.error(message, resolveOptions(data))

toastFn.warning = (message: string, data?: SveloraToastOptions) =>
    internalToast.warning(message, resolveOptions(data))

toastFn.info = (message: string, data?: SveloraToastOptions) =>
    internalToast.info(message, resolveOptions(data))

toastFn.loading = (message: string, data?: SveloraToastOptions) =>
    internalToast.loading(message, resolveOptions(data))

toastFn.processing = (message: string, data?: SveloraToastOptions) => {
    const resolved = resolveOptions({
        duration: Number.POSITIVE_INFINITY,
        ...data,
        icon: data?.icon ?? (ToastProcessing as unknown as ToastOptions['icon'])
    })
    return internalToast.loading(message, resolved)
}

toastFn.promise = <T>(
    promise: Promise<T>,
    msgs: {
        loading: string
        success: ValueOrFunction<string, T>
        error: ValueOrFunction<string, unknown>
    },
    opts?: SveloraPromiseOptions
) => internalToast.promise(promise, msgs, resolveDefaultOptions(opts))

toastFn.dismiss = internalToast.dismiss

toastFn.custom = internalToast.custom

toastFn.message = internalToast.message

export type { SveloraToastOptions as ToastOptions }
export { toastFn as toast }
