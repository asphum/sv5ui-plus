<script lang="ts">
    import { Textarea, FormField, FieldGroup, Separator } from '$lib/index.js'

    const variants = ['outline', 'soft', 'subtle', 'ghost', 'none'] as const
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

    let bindValue = $state('')
</script>

<div class="space-y-8">
    <h1 class="text-2xl font-bold text-on-surface">Textarea</h1>

    <!-- Basic Usage -->
    <section class="space-y-4">
        <h2 id="Basic-Usage" class="text-lg font-semibold text-on-surface">
<a href="#Basic-Usage" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Basic Usage
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            A multi-line text input component with variants, colors, icons, autoresize, and
            integration with FormField and FieldGroup.
        </p>
        <div class="max-w-sm">
            <Textarea placeholder="Enter text..." />
        </div>
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
                >bind:value</code
            > for reactive two-way data binding.
        </p>
        <div class="max-w-sm space-y-3">
            <Textarea
                bind:value={bindValue}
                leadingIcon="icon-[lucide--pencil]"
                placeholder="Type something..."
            />
            <p class="text-sm text-on-surface-variant">
                Value: <span class="font-mono text-on-surface">{bindValue || '(empty)'}</span>
            </p>
            <p class="text-sm text-on-surface-variant">
                Length: <span class="font-mono text-on-surface">{bindValue.length}</span>
            </p>
        </div>
    </section>

    <!-- Variants × Colors -->
    <section class="space-y-4">
        <h2 id="Variants-times-Colors" class="text-lg font-semibold text-on-surface">
<a href="#Variants-times-Colors" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Variants &times; Colors
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >variant</code
            >
            and
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">color</code> to control
            appearance.
        </p>
        <div class="overflow-x-auto">
            <table class="w-full border-collapse">
                <thead>
                    <tr>
                        <th class="px-3 py-2 text-left text-xs font-medium text-on-surface-variant"
                        ></th>
                        {#each colors as color (color)}
                            <th
                                class="px-3 py-2 text-left text-xs font-medium text-on-surface-variant capitalize"
                                >{color}</th
                            >
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each variants as variant (variant)}
                        <tr>
                            <td
                                class="px-3 py-2 text-xs font-medium text-on-surface-variant capitalize"
                                >{variant}</td
                            >
                            {#each colors as color (color)}
                                <td class="px-3 py-2">
                                    <Textarea {variant} {color} placeholder={color} rows={2} />
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>

    <!-- Size -->
    <section class="space-y-4">
        <h2 id="Size" class="text-lg font-semibold text-on-surface">
<a href="#Size" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Size
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">size</code> to
            control the dimensions and text size.
        </p>
        <div class="flex flex-wrap items-end gap-4">
            {#each sizes as size (size)}
                <div class="w-48">
                    <Textarea {size} placeholder="{size} size" rows={2} />
                </div>
            {/each}
        </div>
    </section>

    <!-- Rows -->
    <section class="space-y-4">
        <h2 id="Rows" class="text-lg font-semibold text-on-surface">
<a href="#Rows" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Rows
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">rows</code> to
            set the number of visible text lines.
        </p>
        <div class="flex flex-wrap gap-4">
            <div class="w-64">
                <Textarea rows={2} placeholder="2 rows" />
            </div>
            <div class="w-64">
                <Textarea rows={4} placeholder="4 rows" />
            </div>
            <div class="w-64">
                <Textarea rows={6} placeholder="6 rows" />
            </div>
        </div>
    </section>

    <!-- Autoresize -->
    <section class="space-y-4">
        <h2 id="Autoresize" class="text-lg font-semibold text-on-surface">
<a href="#Autoresize" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Autoresize
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >autoresize</code
            >
            to automatically adjust height based on content. Combine with
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">maxrows</code> to
            limit growth.
        </p>
        <div class="space-y-4">
            <div class="max-w-sm">
                <p class="mb-2 text-xs text-on-surface-variant">Unlimited autoresize</p>
                <Textarea autoresize placeholder="Type to grow..." rows={1} />
            </div>
            <div class="max-w-sm">
                <p class="mb-2 text-xs text-on-surface-variant">Autoresize with maxrows=5</p>
                <Textarea autoresize maxrows={5} placeholder="Grows up to 5 rows..." rows={1} />
            </div>
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
                >leadingIcon</code
            >
            and
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >trailingIcon</code
            > to add icons.
        </p>
        <div class="flex flex-wrap gap-4">
            <div class="w-64">
                <Textarea leadingIcon="icon-[lucide--message-square]" placeholder="Comment..." rows={2} />
            </div>
            <div class="w-64">
                <Textarea trailingIcon="icon-[lucide--send]" placeholder="Message..." rows={2} />
            </div>
            <div class="w-64">
                <Textarea
                    leadingIcon="icon-[lucide--file-text]"
                    trailingIcon="icon-[lucide--check]"
                    placeholder="Description..."
                    rows={2}
                />
            </div>
        </div>
    </section>

    <!-- Icon (with trailing) -->
    <section class="space-y-4">
        <h2 id="Icon-with-trailing" class="text-lg font-semibold text-on-surface">
<a href="#Icon-with-trailing" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Icon (with trailing)
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">icon</code>
            with
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">trailing</code> to
            position it.
        </p>
        <div class="flex flex-wrap gap-4">
            <div class="w-64">
                <Textarea icon="icon-[lucide--pencil]" placeholder="Leading icon" rows={2} />
            </div>
            <div class="w-64">
                <Textarea icon="icon-[lucide--pencil]" trailing placeholder="Trailing icon" rows={2} />
            </div>
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
            > to show a loading spinner.
        </p>
        <div class="flex flex-wrap gap-4">
            <div class="w-64">
                <Textarea loading placeholder="Loading (leading)..." rows={2} />
            </div>
            <div class="w-64">
                <Textarea loading trailing placeholder="Loading (trailing)..." rows={2} />
            </div>
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
        <div class="flex flex-wrap gap-4">
            <div class="w-64">
                <Textarea disabled placeholder="Disabled" rows={2} />
            </div>
            <div class="w-64">
                <Textarea disabled value="Disabled with value" rows={2} />
            </div>
        </div>
    </section>

    <!-- Highlight -->
    <section class="space-y-4">
        <h2 id="Highlight" class="text-lg font-semibold text-on-surface">
<a href="#Highlight" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Highlight
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >highlight</code
            > to emphasize the ring color like a focus state.
        </p>
        <div class="flex flex-wrap gap-4">
            {#each colors as color (color)}
                <div class="w-48">
                    <Textarea highlight {color} placeholder={color} rows={2} />
                </div>
            {/each}
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
            >, the Textarea automatically inherits size, error state, and accessibility attributes.
        </p>
        <div class="max-w-sm space-y-4">
            <FormField
                label="Description"
                description="Provide a detailed description of the issue."
                required
            >
                <Textarea leadingIcon="icon-[lucide--file-text]" placeholder="Describe the issue..." />
            </FormField>

            <FormField
                label="Notes"
                help="Optional additional notes."
                error="Notes cannot be empty."
            >
                <Textarea placeholder="Enter notes..." />
            </FormField>
        </div>
    </section>

    <!-- FieldGroup Integration -->
    <section class="space-y-4">
        <h2 id="FieldGroup-Integration" class="text-lg font-semibold text-on-surface">
<a href="#FieldGroup-Integration" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        FieldGroup Integration
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            When used inside a <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">FieldGroup</code
            >, textareas are visually connected.
        </p>
        <div class="max-w-sm">
            <FieldGroup orientation="vertical">
                <Textarea placeholder="Title" rows={1} />
                <Textarea placeholder="Description" rows={3} />
                <Textarea placeholder="Additional notes" rows={2} />
            </FieldGroup>
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
                <p class="mb-2 text-xs text-on-surface-variant">Feedback form</p>
                <div
                    class="max-w-sm space-y-4 rounded-lg border border-outline-variant bg-surface-container-low p-4"
                >
                    <FormField label="Subject" required>
                        <Textarea placeholder="Brief summary..." rows={1} autoresize />
                    </FormField>

                    <FormField label="Details" required help="Be as specific as possible.">
                        <Textarea
                            placeholder="Describe your feedback in detail..."
                            autoresize
                            maxrows={8}
                        />
                    </FormField>
                </div>
            </div>

            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Chat message input</p>
                <div class="max-w-md">
                    <Textarea
                        leadingIcon="icon-[lucide--message-square]"
                        trailingIcon="icon-[lucide--send]"
                        placeholder="Type a message..."
                        autoresize
                        maxrows={5}
                        rows={1}
                    />
                </div>
            </div>

            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Code snippet input</p>
                <div class="max-w-md">
                    <Textarea
                        variant="soft"
                        color="surface"
                        placeholder="Paste your code here..."
                        rows={6}
                        ui={{ base: 'font-mono text-xs' }}
                    />
                </div>
            </div>
        </div>
    </section>
</div>
