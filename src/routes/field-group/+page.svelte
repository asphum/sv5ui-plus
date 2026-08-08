<script lang="ts">
    import { Button, Input, FieldGroup, Separator } from '$lib/index.js'

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<div class="space-y-8">
    <h1 class="text-2xl font-bold text-on-surface">FieldGroup</h1>

    <!-- Basic Usage -->
    <section class="space-y-4">
        <h2 id="Basic-Usage" class="text-lg font-semibold text-on-surface">
<a href="#Basic-Usage" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Basic Usage
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Wrap multiple <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >Button</code
            >
            within a
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >FieldGroup</code
            > to group them together.
        </p>
        <FieldGroup>
            <Button label="Action" />
            <Button label="Action" />
            <Button label="Action" />
        </FieldGroup>
    </section>

    <!-- Orientation -->
    <section class="space-y-4">
        <h2 id="Orientation" class="text-lg font-semibold text-on-surface">
<a href="#Orientation" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Orientation
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >orientation</code
            > to change the layout direction.
        </p>
        <div class="flex flex-wrap items-start gap-6">
            <div class="space-y-2">
                <p class="text-xs text-on-surface-variant">horizontal (default)</p>
                <FieldGroup orientation="horizontal">
                    <Button label="Left" />
                    <Button label="Center" />
                    <Button label="Right" />
                </FieldGroup>
            </div>
            <div class="space-y-2">
                <p class="text-xs text-on-surface-variant">vertical</p>
                <FieldGroup orientation="vertical">
                    <Button label="Top" />
                    <Button label="Middle" />
                    <Button label="Bottom" />
                </FieldGroup>
            </div>
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
            set the size of all child components.
        </p>
        <div class="flex flex-wrap items-end gap-6">
            {#each sizes as size (size)}
                <div class="flex flex-col items-center gap-2">
                    <FieldGroup {size}>
                        <Button label="Action" />
                        <Button label="Action" />
                        <Button label="Action" />
                    </FieldGroup>
                    <span class="text-xs text-on-surface-variant">{size}</span>
                </div>
            {/each}
        </div>
    </section>

    <!-- Variants -->
    <section class="space-y-4">
        <h2 id="With-Variants" class="text-lg font-semibold text-on-surface">
<a href="#With-Variants" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        With Variants
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            FieldGroup works with different button variants.
        </p>
        <div class="flex flex-wrap items-center gap-6">
            <FieldGroup>
                <Button variant="outline" color="surface" label="Left" />
                <Button variant="outline" color="surface" label="Center" />
                <Button variant="outline" color="surface" label="Right" />
            </FieldGroup>

            <FieldGroup>
                <Button variant="soft" label="Left" />
                <Button variant="soft" label="Center" />
                <Button variant="soft" label="Right" />
            </FieldGroup>

            <FieldGroup>
                <Button variant="subtle" label="Left" />
                <Button variant="subtle" label="Center" />
                <Button variant="subtle" label="Right" />
            </FieldGroup>
        </div>
    </section>

    <!-- With Icons -->
    <section class="space-y-4">
        <h2 id="With-Icons" class="text-lg font-semibold text-on-surface">
<a href="#With-Icons" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        With Icons
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Icon-only button groups for toolbar-style layouts.
        </p>
        <div class="flex flex-wrap items-center gap-6">
            <FieldGroup>
                <Button icon="icon-[lucide--align-left]" variant="outline" color="surface" />
                <Button icon="icon-[lucide--align-center]" variant="outline" color="surface" />
                <Button icon="icon-[lucide--align-right]" variant="outline" color="surface" />
                <Button icon="icon-[lucide--align-justify]" variant="outline" color="surface" />
            </FieldGroup>

            <FieldGroup>
                <Button icon="icon-[lucide--bold]" variant="outline" color="surface" />
                <Button icon="icon-[lucide--italic]" variant="outline" color="surface" />
                <Button icon="icon-[lucide--underline]" variant="outline" color="surface" />
                <Button icon="icon-[lucide--strikethrough]" variant="outline" color="surface" />
            </FieldGroup>
        </div>
    </section>

    <!-- Vertical with Icons -->
    <section class="space-y-4">
        <h2 id="Vertical-with-Icons" class="text-lg font-semibold text-on-surface">
<a href="#Vertical-with-Icons" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Vertical with Icons
                    </a>
</h2>
        <div class="flex flex-wrap items-start gap-6">
            <FieldGroup orientation="vertical">
                <Button icon="icon-[lucide--zoom-in]" variant="outline" color="surface" />
                <Button icon="icon-[lucide--zoom-out]" variant="outline" color="surface" />
                <Button icon="icon-[lucide--rotate-cw]" variant="outline" color="surface" />
            </FieldGroup>

            <FieldGroup orientation="vertical">
                <Button leadingIcon="icon-[lucide--home]" label="Home" variant="soft" />
                <Button leadingIcon="icon-[lucide--settings]" label="Settings" variant="soft" />
                <Button leadingIcon="icon-[lucide--user]" label="Profile" variant="soft" />
            </FieldGroup>
        </div>
    </section>

    <!-- With Input -->
    <section class="space-y-4">
        <h2 id="With-Input" class="text-lg font-semibold text-on-surface">
<a href="#With-Input" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        With Input
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Combine <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >Input</code
            >
            and
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">Button</code> in
            a FieldGroup.
        </p>
        <div class="flex flex-wrap items-start gap-6">
            <FieldGroup>
                <Input leadingIcon="icon-[lucide--search]" placeholder="Search..." />
                <Button label="Search" />
            </FieldGroup>

            <FieldGroup>
                <Input placeholder="Enter email" type="email" />
                <Button label="Subscribe" variant="solid" color="primary" />
            </FieldGroup>
        </div>
    </section>

    <!-- With Input (Vertical) -->
    <section class="space-y-4">
        <h2 id="With-Input-Vertical" class="text-lg font-semibold text-on-surface">
<a href="#With-Input-Vertical" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        With Input (Vertical)
                    </a>
</h2>
        <div class="flex flex-wrap items-start gap-6">
            <div class="w-72">
                <FieldGroup orientation="vertical">
                    <Input placeholder="First name" />
                    <Input placeholder="Last name" />
                    <Input placeholder="Email" type="email" />
                </FieldGroup>
            </div>

            <div class="w-72">
                <FieldGroup orientation="vertical">
                    <Input leadingIcon="icon-[lucide--user]" placeholder="Username" />
                    <Input leadingIcon="icon-[lucide--lock]" placeholder="Password" type="password" />
                    <Button label="Sign in" block />
                </FieldGroup>
            </div>
        </div>
    </section>

    <!-- Input + Button Sizes -->
    <section class="space-y-4">
        <h2 id="Input--Button-Sizes" class="text-lg font-semibold text-on-surface">
<a href="#Input--Button-Sizes" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Input + Button Sizes
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            FieldGroup propagates <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">size</code
            > to all children.
        </p>
        <div class="flex flex-wrap items-end gap-6">
            {#each sizes as size (size)}
                <div class="flex flex-col items-center gap-2">
                    <FieldGroup {size}>
                        <Input placeholder="Search..." />
                        <Button icon="icon-[lucide--search]" />
                    </FieldGroup>
                    <span class="text-xs text-on-surface-variant">{size}</span>
                </div>
            {/each}
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
                <p class="mb-2 text-xs text-on-surface-variant">Text editor toolbar</p>
                <div class="flex flex-wrap items-center gap-3">
                    <FieldGroup>
                        <Button icon="icon-[lucide--bold]" variant="outline" color="surface" size="sm" />
                        <Button icon="icon-[lucide--italic]" variant="outline" color="surface" size="sm" />
                        <Button
                            icon="icon-[lucide--underline]"
                            variant="outline"
                            color="surface"
                            size="sm"
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <Button
                            icon="icon-[lucide--align-left]"
                            variant="outline"
                            color="surface"
                            size="sm"
                        />
                        <Button
                            icon="icon-[lucide--align-center]"
                            variant="outline"
                            color="surface"
                            size="sm"
                        />
                        <Button
                            icon="icon-[lucide--align-right]"
                            variant="outline"
                            color="surface"
                            size="sm"
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <Button icon="icon-[lucide--list]" variant="outline" color="surface" size="sm" />
                        <Button
                            icon="icon-[lucide--list-ordered]"
                            variant="outline"
                            color="surface"
                            size="sm"
                        />
                    </FieldGroup>
                </div>
            </div>

            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Login form</p>
                <div class="w-80">
                    <FieldGroup orientation="vertical">
                        <Input leadingIcon="icon-[lucide--mail]" placeholder="Email" type="email" />
                        <Input leadingIcon="icon-[lucide--lock]" placeholder="Password" type="password" />
                        <Button label="Sign in" variant="solid" color="primary" block />
                    </FieldGroup>
                </div>
            </div>

            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Search with filter</p>
                <FieldGroup>
                    <Button label="All" variant="outline" color="surface" />
                    <Input leadingIcon="icon-[lucide--search]" placeholder="Search products..." />
                    <Button icon="icon-[lucide--sliders-horizontal]" variant="outline" color="surface" />
                </FieldGroup>
            </div>
        </div>
    </section>
</div>
