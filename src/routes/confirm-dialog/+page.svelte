<script lang="ts">
    import { Button, Card, Link, Toaster, confirmDialog, notify } from '$lib/index.js'

    const confirmMethodsReference = [
        {
            name: 'confirmDialog.show(options?)',
            description: 'Opens a confirmation dialog. Resolves to true when confirmed, false when cancelled.'
        },
        {
            name: 'confirmDialog.delete(options?)',
            description:
                'Shorthand for destructive confirmations — warning icon, error confirm button, delete copy.'
        },
        {
            name: 'registerConfirmDialog(showFn)',
            description:
                'Wire the singleton to a mounted <ConfirmDialog />. Call once in your root layout onMount.'
        }
    ] as const

    const confirmOptionsReference = [
        { name: 'title', type: 'string', description: 'Dialog heading.' },
        { name: 'message', type: 'string', description: 'Supporting description below the title.' },
        { name: 'confirmText', type: 'string', description: 'Primary action label. Default: Confirm.' },
        { name: 'cancelText', type: 'string', description: 'Secondary action label. Default: Cancel.' },
        {
            name: 'icon',
            type: "'success' | 'error' | 'warning' | 'info' | 'question'",
            description: 'Animated icon shown above the title.'
        },
        {
            name: 'confirmColor',
            type: 'ButtonColor',
            description: 'Semantic color for the confirm button. Default: primary.'
        },
        {
            name: 'showCancel',
            type: 'boolean',
            description: 'When false, only the confirm button is shown (alert-style). Default: true.'
        },
        {
            name: 'dismissible',
            type: 'boolean',
            description: 'When false, Escape and backdrop click do not dismiss. Default: true.'
        },
        {
            name: 'inputPlaceholder',
            type: 'string',
            description: 'Shows a text input or textarea for prompt-style dialogs.'
        },
        { name: 'inputValue', type: 'string', description: 'Initial value for the prompt input.' },
        {
            name: 'inputType',
            type: "'text' | 'password' | 'email' | 'number' | 'textarea'",
            description: 'Input control type when inputPlaceholder is set.'
        },
        {
            name: 'inputChoices',
            type: 'string[]',
            description: 'Quick-pick chips above the prompt input.'
        },
        {
            name: 'onConfirm',
            type: '(value?: string) => void',
            description: 'Callback when the user confirms. Receives prompt value when applicable.'
        },
        { name: 'onCancel', type: '() => void', description: 'Callback when the user cancels.' }
    ] as const

    const confirmDialogPropsReference = [
        {
            name: 'confirmText',
            type: 'string',
            description: 'Default confirm label when options.confirmText is omitted.'
        },
        {
            name: 'cancelText',
            type: 'string',
            description: 'Default cancel label when options.cancelText is omitted.'
        }
    ] as const

    async function testBasicConfirm() {
        const ok = await confirmDialog.show({
            title: 'Save changes?',
            message: 'Your edits will be applied immediately.',
            icon: 'question',
            confirmText: 'Save'
        })

        if (ok) {
            notify.success('Changes saved')
        }
    }

    async function testDelete() {
        const ok = await confirmDialog.delete({
            title: 'Delete this item?',
            message: 'This action is permanent and cannot be undone.'
        })

        if (ok) {
            notify.error('Item deleted')
        }
    }

    async function testSuccessAlert() {
        await confirmDialog.show({
            title: 'Payment received',
            message: 'Your transaction was completed successfully.',
            icon: 'success',
            confirmText: 'Got it',
            confirmColor: 'success',
            showCancel: false
        })
    }

    async function testWarningChoice() {
        const ok = await confirmDialog.show({
            title: 'Grant permission?',
            message: 'This app wants to access your camera and microphone.',
            icon: 'warning',
            confirmText: 'Allow',
            confirmColor: 'warning'
        })

        if (ok) {
            notify.warning('Permission granted')
        }
    }

    async function testPrompt() {
        const ok = await confirmDialog.show({
            title: 'Rename project',
            message: 'Enter a new name for this project.',
            icon: 'info',
            confirmText: 'Rename',
            inputPlaceholder: 'Project name',
            inputValue: 'My project',
            inputChoices: ['Alpha', 'Beta', 'Production']
        })

        if (ok) {
            notify.info('Project renamed')
        }
    }

    async function testNonDismissible() {
        const ok = await confirmDialog.show({
            title: 'Accept terms?',
            message: 'You must accept the terms to continue.',
            icon: 'info',
            confirmText: 'I accept',
            dismissible: false
        })

        if (ok) {
            notify.success('Terms accepted')
        }
    }

    const setupExample = `<!-- +layout.svelte -->
<script lang="ts">
  import { ConfirmDialog, registerConfirmDialog } from 'svelora'
  import { onMount } from 'svelte'

  let confirmDialogRef

  onMount(() => {
    registerConfirmDialog((options) => confirmDialogRef.show(options))
  })
<` + `/script>

<ConfirmDialog bind:this={confirmDialogRef} />
{@render children()}`

    const notifyExample = `const ok = await confirmDialog.delete()
if (ok) notify.success('Deleted')`
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Confirm Dialog</h1>
        <p class="text-on-surface-variant">
            Imperative confirmation dialogs with animated icons. Call
            <code class="rounded bg-surface-container-high px-1">confirmDialog.show()</code> from
            anywhere after mounting
            <code class="rounded bg-surface-container-high px-1">&lt;ConfirmDialog /&gt;</code> in
            your root layout. Pairs naturally with
            <Link href="/docs/components/toast" class="text-primary underline">Toast</Link> and
            <code class="rounded bg-surface-container-high px-1">notify</code>.
        </p>
    </div>

    <!-- Setup -->
    <section class="space-y-3">
        <h2 id="Setup" class="text-lg font-semibold">
            <a
                href="#Setup"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Setup
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Register the singleton once in your root layout. This docs site already mounts
            <code class="rounded bg-surface-container-high px-1">ConfirmDialog</code> globally, so
            the demos below work out of the box.
        </p>
        <Card class="border border-outline-variant/70 bg-surface-container-high/50 p-4">
            <pre class="overflow-x-auto text-xs leading-relaxed text-on-surface-variant"><code
                    >{setupExample}</code
                ></pre>
        </Card>
    </section>

    <!-- vs Modal -->
    <section class="space-y-3">
        <h2 id="ConfirmDialog-vs-Modal" class="text-lg font-semibold">
            <a
                href="#ConfirmDialog-vs-Modal"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                ConfirmDialog vs Modal
            </a>
        </h2>
        <div class="grid gap-3 md:grid-cols-2">
            <Card class="space-y-2 border border-outline-variant/70 p-4">
                <p class="font-semibold text-on-surface">Use ConfirmDialog when…</p>
                <ul class="list-inside list-disc space-y-1 text-sm text-on-surface-variant">
                    <li>You need yes/no or acknowledge flows</li>
                    <li>You call it imperatively from handlers or stores</li>
                    <li>You want animated icons and preset delete styling</li>
                </ul>
            </Card>
            <Card class="space-y-2 border border-outline-variant/70 p-4">
                <p class="font-semibold text-on-surface">Use <Link href="/docs/components/modal" class="text-primary underline">Modal</Link> when…</p>
                <ul class="list-inside list-disc space-y-1 text-sm text-on-surface-variant">
                    <li>You need custom body, forms, or multi-step content</li>
                    <li>You control open state declaratively with <code>bind:open</code></li>
                    <li>You need fullscreen, scrollable, or slot-heavy layouts</li>
                </ul>
            </Card>
        </div>
    </section>

    <!-- Basic -->
    <section class="space-y-3">
        <h2 id="Basic-Usage" class="text-lg font-semibold">
            <a
                href="#Basic-Usage"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Basic Usage
            </a>
        </h2>
        <div class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4">
            <Button variant="outline" label="Confirm" onclick={testBasicConfirm} />
            <Button
                color="error"
                variant="soft"
                label="Delete"
                leadingIcon="icon-[lucide--trash-2]"
                onclick={testDelete}
            />
        </div>
    </section>

    <!-- Icons & alert -->
    <section class="space-y-3">
        <h2 id="Icons-and-Alerts" class="text-lg font-semibold">
            <a
                href="#Icons-and-Alerts"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Icons &amp; Alerts
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Set <code class="rounded bg-surface-container-high px-1">icon</code> to
            <code class="rounded bg-surface-container-high px-1">success</code>,
            <code class="rounded bg-surface-container-high px-1">error</code>,
            <code class="rounded bg-surface-container-high px-1">warning</code>,
            <code class="rounded bg-surface-container-high px-1">info</code>, or
            <code class="rounded bg-surface-container-high px-1">question</code>. Use
            <code class="rounded bg-surface-container-high px-1">showCancel: false</code> for
            single-button alerts.
        </p>
        <div class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4">
            <Button
                color="success"
                variant="soft"
                label="Success alert"
                leadingIcon="icon-[lucide--check]"
                onclick={testSuccessAlert}
            />
            <Button
                color="warning"
                variant="soft"
                label="Warning choice"
                leadingIcon="icon-[lucide--shield-alert]"
                onclick={testWarningChoice}
            />
        </div>
    </section>

    <!-- Prompt -->
    <section class="space-y-3">
        <h2 id="Prompt-Input" class="text-lg font-semibold">
            <a
                href="#Prompt-Input"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Prompt Input
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Pass <code class="rounded bg-surface-container-high px-1">inputPlaceholder</code> to
            collect text. Optional <code class="rounded bg-surface-container-high px-1">inputChoices</code>
            render quick-pick chips.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4">
            <Button variant="outline" label="Rename project" onclick={testPrompt} />
        </div>
    </section>

    <!-- Non-dismissible -->
    <section class="space-y-3">
        <h2 id="Non-dismissible" class="text-lg font-semibold">
            <a
                href="#Non-dismissible"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Non-dismissible
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Set <code class="rounded bg-surface-container-high px-1">dismissible: false</code> to
            disable Escape and backdrop dismiss — the user must choose an action.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4">
            <Button variant="outline" label="Accept terms" onclick={testNonDismissible} />
        </div>
    </section>

    <!-- With notify -->
    <section class="space-y-3">
        <h2 id="With-notify" class="text-lg font-semibold">
            <a
                href="#With-notify"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                With notify
            </a>
        </h2>
        <Card class="border border-info/20 bg-info/10 p-4">
            <p class="text-sm text-on-surface-variant">
                After confirmation, show feedback with
                <Link href="/docs/components/toast" class="text-primary underline">notify</Link>:
            </p>
            <pre class="mt-3 overflow-x-auto text-xs text-on-surface-variant"><code
                    >{notifyExample}</code
                ></pre>
        </Card>
    </section>

    <!-- API Reference -->
    <section class="space-y-3">
        <h2 id="API-Reference" class="text-lg font-semibold">
            <a
                href="#API-Reference"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                API Reference
            </a>
        </h2>
        <div class="grid gap-4 lg:grid-cols-2">
            <Card class="border border-outline-variant/70">
                <div class="space-y-4">
                    <h3 class="text-base font-semibold">confirmDialog methods</h3>
                    <div class="space-y-3">
                        {#each confirmMethodsReference as item (item.name)}
                            <div
                                class="border-b border-outline-variant/60 pb-3 last:border-b-0 last:pb-0"
                            >
                                <p class="font-mono text-xs text-primary">{item.name}</p>
                                <p class="mt-1 text-sm text-on-surface-variant">
                                    {item.description}
                                </p>
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
            <Card class="border border-outline-variant/70">
                <div class="space-y-4">
                    <h3 class="text-base font-semibold">ConfirmOptions</h3>
                    <div class="space-y-3">
                        {#each confirmOptionsReference as item (item.name)}
                            <div
                                class="border-b border-outline-variant/60 pb-3 last:border-b-0 last:pb-0"
                            >
                                <p class="font-mono text-xs text-on-surface-variant">
                                    {item.name}
                                </p>
                                <p class="mt-1 text-sm font-medium">{item.type}</p>
                                <p class="mt-1 text-sm text-on-surface-variant">
                                    {item.description}
                                </p>
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
        </div>
        <Card class="border border-outline-variant/70">
            <div class="space-y-4">
                <h3 class="text-base font-semibold">ConfirmDialog props</h3>
                <div class="grid gap-3 md:grid-cols-2">
                    {#each confirmDialogPropsReference as item (item.name)}
                        <div class="rounded-xl border border-outline-variant/60 p-4">
                            <p class="font-mono text-xs text-on-surface-variant">{item.name}</p>
                            <p class="mt-1 text-sm font-medium">{item.type}</p>
                            <p class="mt-1 text-sm text-on-surface-variant">{item.description}</p>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>
    </section>
</div>

<Toaster />
