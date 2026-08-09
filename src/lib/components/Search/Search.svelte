<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import { Input } from 'sv5ui'
    import { Button } from 'sv5ui'
    import { Modal } from 'sv5ui'
    import { Command } from 'sv5ui'
    import { Kbd } from 'sv5ui'
    import type { SearchProps } from './search.types.js'
    import { onMount } from 'svelte'

    let {
        variant = 'input',
        value = $bindable(''),
        kbd = [],
        groups = [],
        onSelect,
        placeholder = 'Search...',
        class: className,
        ...rest
    }: SearchProps = $props()

    let open = $state(false)

    onMount(() => {
        if (kbd.length > 0 && (variant === 'modal' || variant === 'button')) {
            const handleKeydown = (e: KeyboardEvent) => {
                const isMac = navigator.userAgent.toLowerCase().includes('mac')
                const isMeta = kbd.includes('meta') || kbd.includes('ctrl')
                const key = kbd.find((k) => k.length === 1)?.toLowerCase()

                if (isMeta && key) {
                    if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === key) {
                        e.preventDefault()
                        open = true
                    }
                }
            }

            window.addEventListener('keydown', handleKeydown)
            return () => window.removeEventListener('keydown', handleKeydown)
        }
    })
</script>

{#if variant === 'input'}
    <Input
        type="search"
        {placeholder}
        bind:value
        leadingIcon="lucide:search"
        class={className}
        {...(rest as any)}
    >
        {#snippet trailingSlot()}
            {#if kbd.length > 0}
                <div class="pointer-events-none flex items-center gap-1">
                    {#each kbd as key}
                        <Kbd value={key} size="sm" />
                    {/each}
                </div>
            {/if}
        {/snippet}
    </Input>
{:else if variant === 'modal'}
    <button
        type="button"
        class={twMerge(
            'flex h-10 w-full items-center justify-between rounded-md border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface-variant shadow-sm transition-colors hover:bg-surface-container hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary',
            className
        )}
        onclick={() => (open = true)}
        {...(rest as any)}
    >
        <span class="flex items-center gap-2">
            <span class="iconify lucide--search text-lg"></span>
            <span>{placeholder}</span>
        </span>
        {#if kbd.length > 0}
            <span class="flex items-center gap-1">
                {#each kbd as key}
                    <Kbd value={key} size="sm" />
                {/each}
            </span>
        {/if}
    </button>
{:else if variant === 'button'}
    <Button
        variant="ghost"
        color="surface"
        leadingIcon="lucide:search"
        class={className}
        onclick={() => (open = true)}
        {...(rest as any)}
    />
{/if}

{#if variant === 'modal' || variant === 'button'}
    <Modal bind:open size="lg">
        {#snippet content()}
            <Command
                {groups}
                bind:search={value}
                placeholder="Type a command or search..."
                ui={{
                    root: 'border-0 shadow-none'
                }}
            />
        {/snippet}
    </Modal>
{/if}
