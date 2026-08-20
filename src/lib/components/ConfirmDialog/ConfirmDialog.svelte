<script lang="ts" module>
    export type Props = {
        confirmText?: string
        cancelText?: string
    }
</script>

<script lang="ts">
    import { Dialog } from 'bits-ui'
    import { Button } from 'sv5ui'
    import { Input } from 'sv5ui'
    import { Textarea } from 'sv5ui'
    import { Icon } from 'sv5ui'
    import type { ConfirmOptions } from './confirm.types.js'

    interface PendingDialog {
        options: ConfirmOptions
        resolve: (value: boolean) => void
        settled: boolean
    }

    let {
        confirmText: defaultConfirmText = 'Confirm',
        cancelText: defaultCancelText = 'Cancel'
    }: Props = $props()

    let open = $state(false)
    let pending = $state<PendingDialog | null>(null)
    let currentInputValue = $state('')

    const iconNames = {
        warning: 'lucide:triangle-alert',
        error: 'lucide:circle-x',
        question: 'lucide:circle-help',
        info: 'lucide:info',
        success: 'lucide:circle-check'
    } as const

    const iconColors = {
        warning: 'text-warning',
        error: 'text-error',
        question: 'text-primary',
        info: 'text-info',
        success: 'text-success'
    } as const

    const dismissible = $derived(pending?.options.dismissible !== false)
    const showCancel = $derived(pending?.options.showCancel !== false)

    export function show(options: ConfirmOptions = {}): Promise<boolean> {
        return new Promise((resolve) => {
            currentInputValue = options.inputValue ?? ''
            pending = { options, resolve, settled: false }
            open = true
        })
    }

    function settle(result: boolean) {
        const current = pending
        if (!current || current.settled) return
        current.settled = true
        current.resolve(result)
        // ถอด dialog หลัง pointer/click จบ — กัน derived_inert จาก bits-ui ที่ยังอ่าน derived
        queueMicrotask(() => {
            if (pending !== current) return
            pending = null
            open = false
        })
    }

    function handleConfirm() {
        pending?.options.onConfirm?.(currentInputValue)
        settle(true)
    }

    function handleCancel() {
        pending?.options.onCancel?.()
        settle(false)
    }

    function handleOpenChange(value: boolean) {
        if (!value && pending && !pending.settled) {
            handleCancel()
            return
        }
        open = value
    }

    const contentProps = $derived.by(() => {
        const behavior = dismissible ? ('close' as const) : ('ignore' as const)
        return {
            trapFocus: true,
            preventScroll: true,
            escapeKeydownBehavior: behavior,
            interactOutsideBehavior: behavior
        }
    })
</script>

<Dialog.Root bind:open onOpenChange={handleOpenChange}>
    <Dialog.Portal>
        <Dialog.Overlay
            class="fixed inset-0 z-50 bg-(--scrim-bg,rgba(0,0,0,0.3)) backdrop-blur-sm"
        />
        {#if pending}
            <Dialog.Content
                {...contentProps}
                class="fixed top-1/2 left-1/2 z-50 w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-outline-variant bg-surface p-6 text-center text-on-surface shadow-2xl focus:outline-none"
            >
                {#if pending.options.title}
                    <Dialog.Title class="sr-only">{pending.options.title}</Dialog.Title>
                {/if}
                {#if pending.options.message}
                    <Dialog.Description class="sr-only"
                        >{pending.options.message}</Dialog.Description
                    >
                {/if}

                {#if pending.options.icon}
                    {#key pending.options.icon}
                        <div class="mb-4 flex min-h-20 justify-center">
                            <Icon
                                name={iconNames[pending.options.icon]}
                                size={80}
                                class={iconColors[pending.options.icon]}
                            />
                        </div>
                    {/key}
                {/if}

                {#if pending.options.title}
                    <h3 class="mb-2 text-lg font-semibold text-on-surface">
                        {pending.options.title}
                    </h3>
                {/if}

                {#if pending.options.message}
                    <p class="mb-6 text-sm text-on-surface-variant">
                        {pending.options.message}
                    </p>
                {:else if !pending.options.inputPlaceholder}
                    <div class="mb-6"></div>
                {/if}

                {#if pending.options.inputPlaceholder}
                    {#if pending.options.inputChoices && pending.options.inputChoices.length > 0}
                        <div class="mb-3 flex flex-wrap justify-center gap-1">
                            {#each pending.options.inputChoices as choice (choice)}
                                <Button
                                    label={choice}
                                    size="xs"
                                    variant={currentInputValue === choice ? 'solid' : 'outline'}
                                    color={currentInputValue === choice ? 'primary' : 'surface'}
                                    onclick={() => (currentInputValue = choice)}
                                />
                            {/each}
                        </div>
                    {/if}

                    <div class="mb-6 text-left">
                        {#if pending.options.inputType === 'textarea'}
                            <Textarea
                                bind:value={currentInputValue}
                                placeholder={pending.options.inputPlaceholder}
                                class="w-full"
                            />
                        {:else}
                            <Input
                                type={pending.options.inputType ?? 'text'}
                                bind:value={currentInputValue}
                                placeholder={pending.options.inputPlaceholder}
                                class="w-full"
                                onkeydown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        handleConfirm()
                                    }
                                }}
                            />
                        {/if}
                    </div>
                {/if}

                <div class="flex justify-center gap-2">
                    {#if showCancel}
                        <Button
                            label={pending.options.cancelText ?? defaultCancelText}
                            variant="outline"
                            class="flex-1"
                            onclick={handleCancel}
                        />
                    {/if}
                    <Button
                        label={pending.options.confirmText ?? defaultConfirmText}
                        variant="solid"
                        color={pending.options.confirmColor ?? 'primary'}
                        class={showCancel ? 'flex-1' : 'w-full'}
                        onclick={handleConfirm}
                    />
                </div>
            </Dialog.Content>
        {/if}
    </Dialog.Portal>
</Dialog.Root>
