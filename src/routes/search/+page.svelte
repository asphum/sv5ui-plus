<script lang="ts">
    import { Search, Separator, CodeBlock, Badge } from '$lib/index.js'
    import type { CommandGroup } from '$lib/index.js'
    import { quickExample } from './quick-example.js'

    const searchGroups: CommandGroup[] = [
        {
            id: 'pages',
            label: 'Pages',
            items: [
                { value: 'home', label: 'Home', icon: 'icon-[lucide--home]', keywords: ['start', 'main'] },
                { value: 'dashboard', label: 'Dashboard', icon: 'icon-[lucide--layout-dashboard]' },
                { value: 'settings', label: 'Settings', icon: 'icon-[lucide--settings]', keywords: ['preferences', 'options'] }
            ]
        },
        {
            id: 'actions',
            label: 'Actions',
            items: [
                { value: 'new-file', label: 'New File', icon: 'icon-[lucide--file-plus]' },
                { value: 'invite', label: 'Invite Users', icon: 'icon-[lucide--user-plus]' }
            ]
        }
    ]

    let selectedValue = $state<string | null>(null)
    let inputValue = $state('')
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Search</h1>
        <p class="text-on-surface-variant">
            A flexible search component that can act as a standard input, an icon button, or a global command palette modal (⌘K).
        </p>
    </div>

    <!-- Quick Example -->
    <section class="space-y-3">
        <h2 id="Quick-Start" class="text-lg font-semibold">
<a href="#Quick-Start" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Quick Start
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1">variant="modal"</code> to create a "fake" input that triggers a global search modal. This is the modern best practice for application search.
        </p>
        <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 flex flex-col items-center gap-6">
            <div class="w-full max-w-sm">
                <Search 
                    variant="modal" 
                    groups={searchGroups} 
                    kbd={['meta', 'K']} 
                    placeholder="Search documentation..." 
                    onSelect={(val) => selectedValue = val}
                />
            </div>
            {#if selectedValue}
                <div class="flex items-center gap-2">
                    <span class="text-sm text-on-surface-variant">You selected:</span>
                    <Badge color="success" label={selectedValue} />
                </div>
            {/if}
        </div>
        <CodeBlock code={quickExample} />
    </section>

    <Separator />

    <!-- Variant: Input -->
    <section class="space-y-3">
        <h2 id="Standard-Input" class="text-lg font-semibold">
<a href="#Standard-Input" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Standard Input
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1">variant="input"</code> (default) for a standard text input. You can still pass <code class="rounded bg-surface-container-highest px-1">kbd</code> to show a keyboard shortcut visual.
        </p>
        <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 flex flex-col items-center gap-4">
            <div class="w-full max-w-sm">
                <Search 
                    variant="input" 
                    bind:value={inputValue}
                    placeholder="Search standard input..." 
                    kbd={['/']}
                />
            </div>
            <p class="text-sm text-on-surface-variant">Value: {inputValue || 'empty'}</p>
        </div>
    </section>

    <Separator />

    <!-- Variant: Button -->
    <section class="space-y-3">
        <h2 id="Icon-Button" class="text-lg font-semibold">
<a href="#Icon-Button" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Icon Button
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1">variant="button"</code> for an icon-only trigger that opens the command modal. Great for mobile navbars.
        </p>
        <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 flex justify-center">
            <div class="flex items-center gap-4 bg-surface px-4 py-2 rounded-full border border-outline-variant shadow-sm">
                <span class="font-bold text-lg">My App</span>
                <div class="flex-1"></div>
                <Search 
                    variant="button" 
                    groups={searchGroups} 
                />
            </div>
        </div>
    </section>
</div>
