<script lang="ts">
    import { Command, Separator, Badge, Kbd, Button, Popover, Modal, Drawer } from '$lib/index.js'
    import type { CommandGroup } from '$lib/index.js'

    // --- Basic groups ---
    const basicGroups: CommandGroup[] = [
        {
            id: 'suggestions',
            label: 'Suggestions',
            items: [
                { value: 'calendar', label: 'Calendar', icon: 'icon-[lucide--calendar]' },
                { value: 'search-emoji', label: 'Search Emoji', icon: 'icon-[lucide--smile]' },
                { value: 'calculator', label: 'Calculator', icon: 'icon-[lucide--calculator]' }
            ]
        },
        {
            id: 'settings',
            label: 'Settings',
            items: [
                {
                    value: 'profile',
                    label: 'Profile',
                    icon: 'icon-[lucide--user]',
                    description: 'Manage your profile settings'
                },
                {
                    value: 'billing',
                    label: 'Billing',
                    icon: 'icon-[lucide--credit-card]',
                    description: 'View billing information'
                },
                {
                    value: 'preferences',
                    label: 'Preferences',
                    icon: 'icon-[lucide--settings]',
                    description: 'Configure app preferences'
                }
            ]
        }
    ]

    // --- Groups with disabled items ---
    const disabledGroups: CommandGroup[] = [
        {
            id: 'actions',
            label: 'Actions',
            items: [
                { value: 'new-file', label: 'New File', icon: 'icon-[lucide--file-plus]' },
                { value: 'new-folder', label: 'New Folder', icon: 'icon-[lucide--folder-plus]' },
                {
                    value: 'delete',
                    label: 'Delete (disabled)',
                    icon: 'icon-[lucide--trash-2]',
                    disabled: true
                },
                {
                    value: 'archive',
                    label: 'Archive (disabled)',
                    icon: 'icon-[lucide--archive]',
                    disabled: true
                }
            ]
        }
    ]

    // --- Keywords for search ---
    const keywordGroups: CommandGroup[] = [
        {
            id: 'navigation',
            label: 'Navigation',
            items: [
                {
                    value: 'home',
                    label: 'Home',
                    icon: 'icon-[lucide--home]',
                    keywords: ['dashboard', 'main', 'start']
                },
                {
                    value: 'docs',
                    label: 'Documentation',
                    icon: 'icon-[lucide--book-open]',
                    keywords: ['help', 'guide', 'manual']
                },
                {
                    value: 'components',
                    label: 'Components',
                    icon: 'icon-[lucide--blocks]',
                    keywords: ['ui', 'elements', 'widgets']
                }
            ]
        }
    ]

    // --- External filtering ---
    let externalSearch = $state('')
    const allCountries = [
        { value: 'us', label: 'United States', icon: 'circle-flags:us' },
        { value: 'gb', label: 'United Kingdom', icon: 'circle-flags:gb' },
        { value: 'fr', label: 'France', icon: 'circle-flags:fr' },
        { value: 'de', label: 'Germany', icon: 'circle-flags:de' },
        { value: 'jp', label: 'Japan', icon: 'circle-flags:jp' },
        { value: 'kr', label: 'South Korea', icon: 'circle-flags:kr' },
        { value: 'vn', label: 'Vietnam', icon: 'circle-flags:vn' },
        { value: 'br', label: 'Brazil', icon: 'circle-flags:br' },
        { value: 'au', label: 'Australia', icon: 'circle-flags:au' },
        { value: 'ca', label: 'Canada', icon: 'circle-flags:ca' }
    ]
    const filteredCountries = $derived(
        externalSearch
            ? allCountries.filter((c) =>
                  c.label.toLowerCase().includes(externalSearch.toLowerCase())
              )
            : allCountries
    )
    const externalGroups = $derived<CommandGroup[]>([
        {
            id: 'countries',
            label: externalSearch
                ? `Results for "${externalSearch}" (${filteredCountries.length})`
                : `All countries (${allCountries.length})`,
            items: filteredCountries
        }
    ])

    // --- onSelect callback ---
    let lastSelected = $state('')
    const callbackGroups: CommandGroup[] = [
        {
            id: 'fruits',
            label: 'Fruits',
            items: [
                {
                    value: 'apple',
                    label: 'Apple',
                    icon: 'icon-[lucide--apple]',
                    onSelect: () => (lastSelected = 'Apple')
                },
                {
                    value: 'banana',
                    label: 'Banana',
                    icon: 'icon-[lucide--banana]',
                    onSelect: () => (lastSelected = 'Banana')
                },
                {
                    value: 'grape',
                    label: 'Grape',
                    icon: 'icon-[lucide--grape]',
                    onSelect: () => (lastSelected = 'Grape')
                }
            ]
        }
    ]

    // --- Multiple groups ---
    const multiGroups: CommandGroup[] = [
        {
            id: 'general',
            label: 'General',
            items: [
                {
                    value: 'appearance',
                    label: 'Appearance',
                    icon: 'icon-[lucide--paintbrush]',
                    description: 'Change theme and colors'
                },
                {
                    value: 'language',
                    label: 'Language',
                    icon: 'icon-[lucide--globe]',
                    description: 'Select preferred language'
                }
            ]
        },
        {
            id: 'account',
            label: 'Account',
            items: [
                {
                    value: 'security',
                    label: 'Security',
                    icon: 'icon-[lucide--shield]',
                    description: 'Password and 2FA'
                },
                {
                    value: 'notifications',
                    label: 'Notifications',
                    icon: 'icon-[lucide--bell]',
                    description: 'Email and push alerts'
                }
            ]
        },
        {
            id: 'developer',
            label: 'Developer',
            items: [
                {
                    value: 'api-keys',
                    label: 'API Keys',
                    icon: 'icon-[lucide--key]',
                    description: 'Manage API credentials'
                },
                {
                    value: 'webhooks',
                    label: 'Webhooks',
                    icon: 'icon-[lucide--webhook]',
                    description: 'Configure webhook endpoints'
                }
            ]
        }
    ]
</script>

<div class="mx-auto max-w-3xl space-y-12 p-8">
    <div>
        <h1 class="text-2xl font-bold">Command</h1>
        <p class="mt-1 text-on-surface-variant">
            A command menu with search filtering and keyboard navigation.
        </p>
    </div>

    <Separator />

    <!-- Basic -->
    <section class="space-y-3">
        <h2 id="Basic" class="text-lg font-semibold">
<a href="#Basic" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Basic
                    </a>
</h2>
        <div class="rounded-lg border border-outline-variant shadow-md">
            <Command groups={basicGroups} placeholder="Type a command or search..." />
        </div>
    </section>

    <Separator />

    <!-- With descriptions -->
    <section class="space-y-3">
        <h2 id="Items-with-Descriptions" class="text-lg font-semibold">
<a href="#Items-with-Descriptions" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Items with Descriptions
                    </a>
</h2>
        <div class="rounded-lg border border-outline-variant shadow-md">
            <Command groups={multiGroups} placeholder="Search settings..." />
        </div>
    </section>

    <Separator />

    <!-- Disabled items -->
    <section class="space-y-3">
        <h2 id="Disabled-Items" class="text-lg font-semibold">
<a href="#Disabled-Items" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Disabled Items
                    </a>
</h2>
        <div class="rounded-lg border border-outline-variant shadow-md">
            <Command groups={disabledGroups} placeholder="Search actions..." />
        </div>
    </section>

    <Separator />

    <!-- Keywords search -->
    <section class="space-y-3">
        <h2 id="Keywords-search-help-ui-dashboard" class="text-lg font-semibold">
<a href="#Keywords-search-help-ui-dashboard" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Keywords (search "help", "ui", "dashboard")
                    </a>
</h2>
        <div class="rounded-lg border border-outline-variant shadow-md">
            <Command groups={keywordGroups} placeholder="Try searching help or dashboard..." />
        </div>
    </section>

    <Separator />

    <!-- onSelect callback -->
    <section class="space-y-3">
        <h2 id="onSelect-Callback" class="text-lg font-semibold">
<a href="#onSelect-Callback" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        onSelect Callback
                    </a>
</h2>
        <div class="flex items-center gap-2">
            <span class="text-sm text-on-surface-variant">Last selected:</span>
            <Badge label={lastSelected || 'None'} color={lastSelected ? 'success' : 'surface'} />
        </div>
        <div class="rounded-lg border border-outline-variant shadow-md">
            <Command groups={callbackGroups} placeholder="Select a fruit..." />
        </div>
    </section>

    <Separator />

    <!-- Loading -->
    <section class="space-y-3">
        <h2 id="Loading-State" class="text-lg font-semibold">
<a href="#Loading-State" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Loading State
                    </a>
</h2>
        <div class="rounded-lg border border-outline-variant shadow-md">
            <Command groups={[]} loading placeholder="Fetching results..." />
        </div>
    </section>

    <Separator />

    <!-- Empty state -->
    <section class="space-y-3">
        <h2 id="Empty-State" class="text-lg font-semibold">
<a href="#Empty-State" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Empty State
                    </a>
</h2>
        <div class="rounded-lg border border-outline-variant shadow-md">
            <Command
                groups={[{ id: 'empty', items: [] }]}
                emptyText="Nothing here yet."
                placeholder="Search..."
            />
        </div>
    </section>

    <Separator />

    <!-- Custom empty slot -->
    <section class="space-y-3">
        <h2 id="Custom-Empty-Slot" class="text-lg font-semibold">
<a href="#Custom-Empty-Slot" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Custom Empty Slot
                    </a>
</h2>
        <div class="rounded-lg border border-outline-variant shadow-md">
            <Command groups={basicGroups} placeholder="Search something that doesn't exist...">
                {#snippet empty({ search })}
                    <div class="flex flex-col items-center gap-2 py-6">
                        <span class="text-2xl">🔍</span>
                        <span class="text-sm text-on-surface-variant">
                            {search ? `No results for "${search}"` : 'Start typing to search'}
                        </span>
                    </div>
                {/snippet}
            </Command>
        </div>
    </section>

    <Separator />

    <!-- Sizes -->
    <section class="space-y-3">
        <h2 id="Sizes" class="text-lg font-semibold">
<a href="#Sizes" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Sizes
                    </a>
</h2>
        {#each ['xs', 'sm', 'md', 'lg', 'xl'] as const as s (s)}
            <div>
                <p class="mb-1 text-xs font-medium text-on-surface-variant">{s}</p>
                <div class="rounded-lg border border-outline-variant shadow-md">
                    <Command
                        size={s}
                        groups={[
                            {
                                id: 'size-demo',
                                label: 'Actions',
                                items: [
                                    { value: 'copy', label: 'Copy', icon: 'icon-[lucide--copy]' },
                                    { value: 'paste', label: 'Paste', icon: 'icon-[lucide--clipboard]' }
                                ]
                            }
                        ]}
                        placeholder="Size {s}..."
                    />
                </div>
            </div>
        {/each}
    </section>

    <Separator />

    <!-- Custom UI slots -->
    <section class="space-y-3">
        <h2 id="Custom-UI-Slots" class="text-lg font-semibold">
<a href="#Custom-UI-Slots" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Custom UI Slots
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Available ui slots: root, input, list, empty, loading, group, groupHeading, groupItems,
            separator, item, itemIcon, itemLabel, itemDescription, itemTrailing
        </p>
        <div class="space-y-4">
            <div>
                <p class="mb-1 text-xs font-medium text-on-surface-variant">
                    Custom background + rounded items + uppercase headings
                </p>
                <Command
                    groups={basicGroups}
                    placeholder="Styled command..."
                    ui={{
                        root: 'rounded-lg border border-outline-variant shadow-md bg-surface-container-low',
                        item: 'rounded-lg',
                        groupHeading: 'uppercase tracking-wider text-primary'
                    }}
                />
            </div>
            <div>
                <p class="mb-1 text-xs font-medium text-on-surface-variant">
                    Custom selected item color + item icon color
                </p>
                <div class="rounded-lg border border-outline-variant shadow-md">
                    <Command
                        groups={basicGroups}
                        placeholder="Custom highlight..."
                        ui={{
                            item: 'data-[selected]:bg-primary/10 data-[selected]:text-primary',
                            itemIcon: 'text-primary'
                        }}
                    />
                </div>
            </div>
            <div>
                <p class="mb-1 text-xs font-medium text-on-surface-variant">
                    Custom list max height (scrollable)
                </p>
                <div class="rounded-lg border border-outline-variant shadow-md">
                    <Command
                        groups={multiGroups}
                        placeholder="Scroll to see more..."
                        ui={{
                            list: 'max-h-48'
                        }}
                    />
                </div>
            </div>
        </div>
    </section>

    <Separator />

    <!-- Footer slot -->
    <section class="space-y-3">
        <h2 id="Footer-Slot" class="text-lg font-semibold">
<a href="#Footer-Slot" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Footer Slot
                    </a>
</h2>
        <div class="rounded-lg border border-outline-variant shadow-md">
            <Command groups={basicGroups} placeholder="Search...">
                {#snippet footer()}
                    <div
                        class="flex items-center justify-between px-3 py-2 text-xs text-on-surface-variant"
                    >
                        <div class="flex items-center gap-2">
                            <span class="flex items-center gap-1"
                                ><Kbd value="↑" size="sm" /><Kbd value="↓" size="sm" /> Navigate</span
                            >
                            <span class="flex items-center gap-1"
                                ><Kbd value="↵" size="sm" /> Select</span
                            >
                        </div>
                        <span class="flex items-center gap-1"
                            ><Kbd value="Esc" size="sm" /> Close</span
                        >
                    </div>
                {/snippet}
            </Command>
        </div>
    </section>

    <Separator />

    <!-- shouldFilter=false -->
    <section class="space-y-3">
        <h2 id="External-Filtering-shouldFilterfalse" class="text-lg font-semibold">
<a href="#External-Filtering-shouldFilterfalse" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        External Filtering (shouldFilter=false)
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Built-in filter is disabled. The search term is bound via
            <code class="rounded bg-surface-container-highest px-1 py-0.5 text-xs">bind:search</code
            >
            and filtering is handled externally.
        </p>
        <div class="rounded-lg border border-outline-variant shadow-md">
            <Command
                shouldFilter={false}
                bind:search={externalSearch}
                groups={externalGroups}
                placeholder="Search countries..."
            />
        </div>
    </section>

    <Separator />

    <!-- Inside Popover -->
    <section class="space-y-3">
        <h2 id="Inside-Popover" class="text-lg font-semibold">
<a href="#Inside-Popover" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Inside Popover
                    </a>
</h2>
        <Popover>
            <Button variant="outline" leadingIcon="icon-[lucide--search]">Open Command...</Button>
            {#snippet content()}
                <Command
                    groups={basicGroups}
                    placeholder="Search..."
                    ui={{ list: 'max-h-64' }}
                    class="w-80"
                />
            {/snippet}
        </Popover>
    </section>

    <Separator />

    <!-- Inside Modal -->
    <section class="space-y-3">
        <h2 id="Inside-Modal" class="text-lg font-semibold">
<a href="#Inside-Modal" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Inside Modal
                    </a>
</h2>
        <Modal>
            <Button variant="outline" leadingIcon="icon-[lucide--search]">
                Search...
                <Kbd value="meta" size="sm" />
                <Kbd value="K" size="sm" />
            </Button>
            {#snippet content()}
                <Command groups={multiGroups} placeholder="Search settings..." />
            {/snippet}
        </Modal>
    </section>

    <Separator />

    <!-- Inside Drawer -->
    <section class="space-y-3">
        <h2 id="Inside-Drawer" class="text-lg font-semibold">
<a href="#Inside-Drawer" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Inside Drawer
                    </a>
</h2>
        <Drawer handle={false}>
            <Button variant="outline" leadingIcon="icon-[lucide--terminal]">Open Command Drawer</Button>
            {#snippet content()}
                <Command groups={multiGroups} placeholder="Search settings..." />
            {/snippet}
        </Drawer>
    </section>
</div>
