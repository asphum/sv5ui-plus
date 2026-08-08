<script lang="ts">
    import { Switch, FormField, Separator } from '$lib/index.js'

    const colors = [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'error',
        'info',
        'surface'
    ] as const
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

    let bindChecked = $state(false)
</script>

<div class="space-y-8">
    <h1 class="text-2xl font-bold text-on-surface">Switch</h1>

    <!-- Basic Usage -->
    <section class="space-y-4">
        <h2 id="Basic-Usage" class="text-lg font-semibold text-on-surface">
<a href="#Basic-Usage" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Basic Usage
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">A toggle switch component for binary states.</p>
        <Switch />
    </section>

    <!-- Two-way Binding -->
    <section class="space-y-4">
        <h2 id="Two-way-Binding" class="text-lg font-semibold text-on-surface">
<a href="#Two-way-Binding" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Two-way Binding
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >bind:checked</code
            > for reactive two-way data binding.
        </p>
        <div class="flex flex-wrap items-center gap-6">
            <Switch bind:checked={bindChecked} label="Toggle me" />
            <p class="text-sm text-on-surface-variant">
                Checked: <span class="font-mono text-on-surface">{bindChecked}</span>
            </p>
        </div>
    </section>

    <!-- Label & Description -->
    <section class="space-y-4">
        <h2 id="Label-amp-Description" class="text-lg font-semibold text-on-surface">
<a href="#Label-amp-Description" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Label &amp; Description
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">label</code
            >
            and
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >description</code
            > to add text next to the switch.
        </p>
        <div class="flex flex-col gap-4">
            <Switch label="Notifications" />
            <Switch label="Dark mode" description="Enable dark mode for the application." />
            <Switch
                label="Marketing emails"
                description="Receive emails about new products and features."
            />
        </div>
    </section>

    <!-- Colors -->
    <section class="space-y-4">
        <h2 id="Colors" class="text-lg font-semibold text-on-surface">
<a href="#Colors" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Colors
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">color</code
            > to control the checked background color.
        </p>
        <div class="flex flex-wrap gap-6">
            {#each colors as color (color)}
                <Switch {color} checked={true} label={color} />
            {/each}
        </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-4">
        <h2 id="Sizes" class="text-lg font-semibold text-on-surface">
<a href="#Sizes" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Sizes
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">size</code> to
            control the dimensions.
        </p>
        <div class="flex flex-wrap items-center gap-6">
            {#each sizes as size (size)}
                <Switch {size} checked={true} label={size} />
            {/each}
        </div>
    </section>

    <!-- Icons -->
    <section class="space-y-4">
        <h2 id="Icons" class="text-lg font-semibold text-on-surface">
<a href="#Icons" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Icons
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >checkedIcon</code
            >
            and
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >uncheckedIcon</code
            > to display icons inside the thumb.
        </p>
        <div class="flex flex-col gap-4">
            <Switch
                checkedIcon="icon-[lucide--check]"
                uncheckedIcon="icon-[lucide--x]"
                label="With check / x icons"
            />
            <Switch
                checkedIcon="icon-[lucide--sun]"
                uncheckedIcon="icon-[lucide--moon]"
                label="Theme toggle"
                description="Switch between light and dark mode."
            />
            <Switch checkedIcon="icon-[lucide--volume-2]" uncheckedIcon="icon-[lucide--volume-x]" label="Sound" />
            <Switch
                checkedIcon="icon-[lucide--wifi]"
                uncheckedIcon="icon-[lucide--wifi-off]"
                label="Wi-Fi"
                color="success"
            />
        </div>
    </section>

    <!-- Loading -->
    <section class="space-y-4">
        <h2 id="Loading" class="text-lg font-semibold text-on-surface">
<a href="#Loading" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Loading
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >loading</code
            > to show a spinner inside the thumb and disable interaction.
        </p>
        <div class="flex flex-col gap-4">
            <Switch loading label="Syncing..." />
            <Switch loading checked={true} label="Saving preferences..." color="success" />
        </div>
    </section>

    <!-- Disabled -->
    <section class="space-y-4">
        <h2 id="Disabled" class="text-lg font-semibold text-on-surface">
<a href="#Disabled" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Disabled
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >disabled</code
            > to prevent interaction.
        </p>
        <div class="flex flex-wrap gap-6">
            <Switch disabled label="Disabled (off)" />
            <Switch disabled checked={true} label="Disabled (on)" />
        </div>
    </section>

    <!-- Required -->
    <section class="space-y-4">
        <h2 id="Required" class="text-lg font-semibold text-on-surface">
<a href="#Required" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Required
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >required</code
            > to show an asterisk next to the label.
        </p>
        <Switch required label="Accept terms and conditions" />
    </section>

    <!-- Custom Slots -->
    <section class="space-y-4">
        <h2 id="Custom-Slots" class="text-lg font-semibold text-on-surface">
<a href="#Custom-Slots" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Custom Slots
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >labelSlot</code
            >
            and
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >descriptionSlot</code
            > for fully custom label content.
        </p>
        <div class="flex flex-col gap-4">
            <Switch checked={true} color="success">
                {#snippet labelSlot()}
                    <span class="flex items-center gap-1.5 text-sm font-medium text-on-surface">
                        <span class="inline-block size-2 rounded-full bg-success"></span>
                        System online
                    </span>
                {/snippet}
                {#snippet descriptionSlot()}
                    <span class="text-xs text-on-surface-variant">
                        All services are running normally. Last checked <strong>just now</strong>.
                    </span>
                {/snippet}
            </Switch>

            <Switch>
                {#snippet labelSlot()}
                    <span class="flex items-center gap-2 text-sm font-medium text-on-surface">
                        Beta features
                        <span
                            class="rounded bg-tertiary-container px-1.5 py-0.5 text-[10px] font-bold text-on-tertiary-container"
                            >BETA</span
                        >
                    </span>
                {/snippet}
            </Switch>
        </div>
    </section>

    <!-- FormField Integration -->
    <section class="space-y-4">
        <h2 id="FormField-Integration" class="text-lg font-semibold text-on-surface">
<a href="#FormField-Integration" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        FormField Integration
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            When used inside a <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">FormField</code
            >, the Switch automatically inherits size and error state.
        </p>
        <div class="max-w-sm space-y-4">
            <FormField label="Notifications" description="Choose how you want to be notified.">
                <Switch label="Push notifications" />
            </FormField>
            <FormField label="Agreement" error="You must accept the terms.">
                <Switch label="I accept the terms of service" />
            </FormField>
        </div>
    </section>

    <Separator />

    <!-- Real World Examples -->
    <section class="space-y-4">
        <h2 id="Real-World-Examples" class="text-lg font-semibold text-on-surface">
<a href="#Real-World-Examples" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Real World Examples
                    </a>
</h2>

        <div class="space-y-6">
            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Notification preferences</p>
                <div
                    class="max-w-sm space-y-4 rounded-lg border border-outline-variant bg-surface-container-low p-4"
                >
                    <Switch
                        checked={true}
                        label="Push notifications"
                        description="Receive alerts on your device."
                        color="primary"
                    />
                    <Switch
                        checked={true}
                        label="Email digest"
                        description="Daily summary of activity."
                        color="primary"
                    />
                    <Switch
                        label="SMS alerts"
                        description="Text messages for critical updates."
                        color="primary"
                    />
                    <Switch
                        loading
                        label="Marketing emails"
                        description="Updating preference..."
                        color="primary"
                    />
                </div>
            </div>

            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Privacy settings</p>
                <div
                    class="max-w-sm space-y-4 rounded-lg border border-outline-variant bg-surface-container-low p-4"
                >
                    <Switch
                        checked={true}
                        checkedIcon="icon-[lucide--eye]"
                        uncheckedIcon="icon-[lucide--eye-off]"
                        label="Profile visibility"
                        description="Make your profile public."
                        color="secondary"
                    />
                    <Switch
                        checkedIcon="icon-[lucide--share-2]"
                        uncheckedIcon="icon-[lucide--share-2]"
                        label="Data sharing"
                        description="Share usage data to improve the product."
                        color="secondary"
                    />
                    <Switch
                        checked={true}
                        checkedIcon="icon-[lucide--shield-check]"
                        uncheckedIcon="icon-[lucide--shield-off]"
                        label="Two-factor auth"
                        description="Add an extra layer of security."
                        color="success"
                        disabled
                    />
                </div>
            </div>
        </div>
    </section>
</div>
