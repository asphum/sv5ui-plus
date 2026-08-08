<script lang="ts">
    import { Empty, Separator } from '$lib/index.js'
    import Link from '$lib/components/Link/Link.svelte'

    const variants = ['solid', 'outline', 'soft', 'subtle', 'naked'] as const
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Empty</h1>
        <p class="text-on-surface-variant">
            Display empty state UI when there's no content to show, with support for icons, avatars,
            and action buttons.
        </p>
    </div>

    <!-- Basic -->
    <section class="space-y-3">
        <h2 id="Basic" class="text-lg font-semibold">
<a href="#Basic" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Basic
                    </a>
</h2>
        <div class="grid gap-4 lg:grid-cols-3">
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">
                    Icon + title + description
                </p>
                <div class="rounded-lg bg-surface-container-high p-4">
                    <Empty
                        icon="icon-[lucide--inbox]"
                        title="No messages"
                        description="You don't have any messages yet."
                    />
                </div>
            </div>
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">Title only</p>
                <div class="rounded-lg bg-surface-container-high p-4">
                    <Empty icon="icon-[lucide--file-x]" title="No files found" />
                </div>
            </div>
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">With avatar</p>
                <div class="rounded-lg bg-surface-container-high p-4">
                    <Empty
                        avatar={{ src: 'https://i.pravatar.cc/150?u=empty', alt: 'User' }}
                        title="No notifications"
                        description="You're all caught up!"
                    />
                </div>
            </div>
        </div>
    </section>

    <!-- Variants with Icon -->
    <section class="space-y-3">
        <h2 id="Variants-with-Icon" class="text-lg font-semibold">
<a href="#Variants-with-Icon" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Variants with Icon
                    </a>
</h2>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {#each variants as variant (variant)}
                <div class="space-y-2">
                    <p class="text-sm font-medium text-on-surface-variant capitalize">{variant}</p>
                    <div class="rounded-lg bg-surface-container-high p-4">
                        <Empty
                            {variant}
                            icon="icon-[lucide--inbox]"
                            title="No items"
                            description="Nothing to display here."
                            size="sm"
                        />
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- Variants with Avatar -->
    <section class="space-y-3">
        <h2 id="Variants-with-Avatar" class="text-lg font-semibold">
<a href="#Variants-with-Avatar" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Variants with Avatar
                    </a>
</h2>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {#each variants as variant (variant)}
                <div class="space-y-2">
                    <p class="text-sm font-medium text-on-surface-variant capitalize">{variant}</p>
                    <div class="rounded-lg bg-surface-container-high p-4">
                        <Empty
                            {variant}
                            avatar={{
                                src: 'https://i.pravatar.cc/150?u=variant-{variant}',
                                alt: 'User'
                            }}
                            title="No notifications"
                            description="You're all caught up!"
                            size="sm"
                        />
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-3">
        <h2 id="Sizes" class="text-lg font-semibold">
<a href="#Sizes" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Sizes
                    </a>
</h2>
        <div class="space-y-3">
            {#each sizes as size (size)}
                <div class="flex items-start gap-4">
                    <span class="w-8 pt-4 text-sm font-medium text-on-surface-variant">{size}</span>
                    <div class="flex-1">
                        <Empty
                            {size}
                            icon="icon-[lucide--inbox]"
                            title="Empty state"
                            description="This is the {size} size."
                        />
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- With Actions -->
    <section class="space-y-3">
        <h2 id="With-Actions" class="text-lg font-semibold">
<a href="#With-Actions" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        With Actions
                    </a>
</h2>
        <div class="grid gap-4 lg:grid-cols-2">
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">Single action</p>
                <div class="rounded-lg bg-surface-container-high p-4">
                    <Empty
                        icon="icon-[lucide--inbox]"
                        title="No messages"
                        description="Start a conversation with your team."
                        actions={[{ label: 'New Message', leadingIcon: 'icon-[lucide--plus]' }]}
                    />
                </div>
            </div>
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">Multiple actions</p>
                <div class="rounded-lg bg-surface-container-high p-4">
                    <Empty
                        icon="icon-[lucide--shopping-cart]"
                        title="Cart is empty"
                        description="Add some items to get started."
                        actions={[
                            { label: 'Browse Products' },
                            { label: 'View Wishlist', variant: 'ghost' }
                        ]}
                    />
                </div>
            </div>
        </div>
    </section>

    <!-- Custom Slots -->
    <section class="space-y-3">
        <h2 id="Custom-Slots" class="text-lg font-semibold">
<a href="#Custom-Slots" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Custom Slots
                    </a>
</h2>
        <div class="grid gap-4 lg:grid-cols-2">
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">Custom leading</p>
                <div class="rounded-lg bg-surface-container-high p-4">
                    <Empty
                        variant="outline"
                        title="Welcome!"
                        description="Get started by exploring our components."
                    >
                        {#snippet leading()}
                            <div
                                class="flex size-16 items-center justify-center rounded-full bg-tertiary/10 text-tertiary"
                            >
                                <span class="text-3xl">🎉</span>
                            </div>
                        {/snippet}
                    </Empty>
                </div>
            </div>
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">Custom header</p>
                <div class="rounded-lg bg-surface-container-high p-4">
                    <Empty variant="soft">
                        {#snippet header()}
                            <div class="flex flex-col items-center gap-3 text-center">
                                <div
                                    class="flex size-14 items-center justify-center rounded-full bg-primary/10"
                                >
                                    <span class="text-2xl text-primary">✨</span>
                                </div>
                                <div>
                                    <p class="text-lg font-bold text-primary">Custom Header</p>
                                    <p class="text-sm text-on-surface-variant">
                                        Entirely custom header content
                                    </p>
                                </div>
                            </div>
                        {/snippet}
                    </Empty>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer Slot -->
    <section class="space-y-3">
        <h2 id="With-Footer" class="text-lg font-semibold">
<a href="#With-Footer" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        With Footer
                    </a>
</h2>
        <div class="rounded-lg bg-surface-container-high p-4">
            <Empty
                variant="subtle"
                icon="icon-[lucide--help-circle]"
                title="Need help?"
                description="Check our documentation or contact support."
            >
                {#snippet footer()}
                    <p class="text-xs text-on-surface-variant">
                        Last updated: March 2026 · <Link href="/empty" class="underline"
                            >Documentation</Link
                        >
                    </p>
                {/snippet}
            </Empty>
        </div>
    </section>

    <!-- UI Slot Overrides -->
    <section class="space-y-3">
        <h2 id="UI-Slot-Overrides" class="text-lg font-semibold">
<a href="#UI-Slot-Overrides" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        UI Slot Overrides
                    </a>
</h2>
        <div class="grid gap-4 lg:grid-cols-2">
            <div class="rounded-lg bg-surface-container-high p-4">
                <Empty
                    icon="icon-[lucide--star]"
                    title="Custom Styles"
                    description="With ui slot overrides."
                    actions={[{ label: 'Action' }]}
                    ui={{
                        title: 'text-warning font-bold',
                        description: 'italic',
                        actions: 'mt-2'
                    }}
                />
            </div>
            <div class="rounded-lg bg-surface-container-high p-4">
                <Empty
                    icon="icon-[lucide--heart]"
                    title="Custom Root"
                    description="Dashed border styling."
                    ui={{
                        root: 'border-2 border-dashed border-outline-variant'
                    }}
                />
            </div>
        </div>
    </section>

    <Separator />

    <!-- Real World Examples -->
    <section class="space-y-6">
        <h2 id="Real-World-Examples" class="text-lg font-semibold">
<a href="#Real-World-Examples" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Real World Examples
                    </a>
</h2>

        <!-- Empty Inbox -->
        <div class="space-y-3">
            <p class="text-sm font-medium">Empty Inbox</p>
            <Empty
                variant="soft"
                icon="icon-[lucide--mail]"
                title="Inbox Zero!"
                description="You've read all your messages. Great job staying on top of things!"
            />
        </div>

        <!-- No Search Results -->
        <div class="space-y-3">
            <p class="text-sm font-medium">No Search Results</p>
            <Empty
                variant="outline"
                icon="icon-[lucide--search-x]"
                title="No results found"
                description="We couldn't find anything matching your search. Try different keywords."
                actions={[
                    { label: 'Clear Search', leadingIcon: 'icon-[lucide--x]' },
                    { label: 'Browse All', variant: 'outline' }
                ]}
            />
        </div>

        <!-- Network Error -->
        <div class="space-y-3">
            <p class="text-sm font-medium">Network Error</p>
            <Empty
                variant="subtle"
                icon="icon-[lucide--wifi-off]"
                title="Connection lost"
                description="Unable to load data. Please check your internet connection and try again."
                actions={[{ label: 'Retry', leadingIcon: 'icon-[lucide--refresh-cw]' }]}
            />
        </div>

        <!-- Completed Tasks -->
        <div class="space-y-3">
            <p class="text-sm font-medium">All Tasks Done</p>
            <Empty
                variant="soft"
                icon="icon-[lucide--check-circle-2]"
                title="All tasks completed!"
                description="You've finished everything on your list. Time to relax or add new tasks."
                actions={[
                    { label: 'Add Task', leadingIcon: 'icon-[lucide--plus]' },
                    { label: 'View Archive', variant: 'ghost' }
                ]}
            />
        </div>

        <!-- Empty Cart -->
        <div class="space-y-3">
            <p class="text-sm font-medium">Empty Shopping Cart</p>
            <Empty
                variant="naked"
                icon="icon-[lucide--shopping-cart]"
                title="Your cart is empty"
                description="Looks like you haven't added anything yet."
                actions={[{ label: 'Start Shopping', leadingIcon: 'icon-[lucide--shopping-bag]' }]}
            />
        </div>

        <!-- No Files -->
        <div class="space-y-3">
            <p class="text-sm font-medium">No Files Uploaded</p>
            <Empty
                variant="soft"
                icon="icon-[lucide--file-x]"
                title="No files uploaded"
                description="Upload your first file to get started with your project."
                actions={[
                    { label: 'Upload File', leadingIcon: 'icon-[lucide--upload]' },
                    { label: 'Import from URL', variant: 'ghost' }
                ]}
            />
        </div>
    </section>
</div>
