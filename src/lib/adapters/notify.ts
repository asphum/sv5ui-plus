import { toast, type ToastOptions } from 'sv5ui'

export interface NotifyOptions extends ToastOptions {
    /** Inline style values merged into the toast style string. */
    styles?: Record<string, string>
    /** Class values merged into the toast class string. */
    classes?: Record<string, string>
}

export interface NotifyPromiseOptions<T = unknown> extends NotifyOptions {
    loading: string
    success: string | ((data: T) => string)
    error: string | ((error: unknown) => string)
    checkSuccess?: (data: T) => boolean
    loadingOptions?: NotifyOptions
    successOptions?: NotifyOptions
    errorOptions?: NotifyOptions
    minDuration?: number
}

function errorMessage(error: unknown): string {
    if (typeof error === 'string') return error
    if (error instanceof Error) return error.message
    if (error && typeof error === 'object') {
        const value = error as Record<string, unknown>
        if (typeof value.message === 'string') return value.message
        if (typeof value.error === 'string') return value.error
        return JSON.stringify(error)
    }
    return 'An unknown error occurred'
}

function resolveOptions(options?: NotifyOptions): ToastOptions | undefined {
    if (!options) return undefined
    const { styles, classes, ...rest } = options
    const style = styles
        ? Object.entries(styles)
              .map(([key, value]) => `${key}: ${value}`)
              .join('; ')
        : undefined
    const className = classes ? Object.values(classes).join(' ') : undefined
    return {
        ...rest,
        style: [rest.style, style].filter(Boolean).join('; ') || undefined,
        class: [rest.class, className].filter(Boolean).join(' ') || undefined
    }
}

export const notify = {
    success(message: string, options?: NotifyOptions) {
        return toast.success(message, resolveOptions(options))
    },
    error(error: unknown, options?: NotifyOptions) {
        return toast.error(errorMessage(error), resolveOptions(options))
    },
    info(message: string, options?: NotifyOptions) {
        return toast.info(message, resolveOptions(options))
    },
    warning(message: string, options?: NotifyOptions) {
        return toast.warning(message, resolveOptions(options))
    },
    loading(message: string, options?: NotifyOptions) {
        return toast.loading(message, {
            duration: Number.POSITIVE_INFINITY,
            ...resolveOptions(options)
        })
    },
    processing(message: string, options?: NotifyOptions) {
        return toast.loading(message, {
            duration: Number.POSITIVE_INFINITY,
            icon: 'lucide:loader-circle',
            ...resolveOptions(options)
        })
    },
    default(message: string, options?: NotifyOptions) {
        return toast(message, resolveOptions(options))
    },
    promise<T>(promise: Promise<T>, options: NotifyPromiseOptions<T>): Promise<T> {
        const {
            loading,
            success,
            error,
            checkSuccess,
            loadingOptions,
            successOptions,
            errorOptions,
            minDuration = 800,
            ...shared
        } = options
        const id = notify.loading(loading, { ...shared, ...loadingOptions })
        const minimum = new Promise<void>((resolve) => setTimeout(resolve, minDuration))

        Promise.all([promise, minimum])
            .then(([data]) => {
                if (checkSuccess && !checkSuccess(data)) throw data
                notify.success(typeof success === 'function' ? success(data) : success, {
                    ...shared,
                    ...successOptions,
                    id
                })
            })
            .catch((reason) => {
                notify.error(typeof error === 'function' ? error(reason) : error, {
                    ...shared,
                    ...errorOptions,
                    id
                })
            })

        return promise
    },
    dismiss(id?: string | number) {
        return toast.dismiss(id)
    }
}

export type NotifyUtility = typeof notify
