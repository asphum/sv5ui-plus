<script lang="ts">
    import { Chip, Avatar, Button } from '$lib/index.js'

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
    const sizes = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const
    const positions = ['top-right', 'bottom-right', 'top-left', 'bottom-left'] as const

    const statuses = [
        { label: 'Online', color: 'success' },
        { label: 'Away', color: 'warning' },
        { label: 'Busy', color: 'error' },
        { label: 'Offline', color: 'surface' }
    ] as const

    let statusIndex = $state(0)
    let showChip = $state(true)
    let notificationCount = $state(3)

    function cycleStatus() {
        statusIndex = (statusIndex + 1) % statuses.length
    }
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Chip</h1>
        <p class="text-on-surface-variant">
            Small indicator badge for notifications, status, or counts.
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
        <div class="flex flex-wrap items-center gap-6 rounded-lg bg-surface-container-high p-4">
            <Chip>
                <div class="size-10 rounded-lg bg-surface-container-highest"></div>
            </Chip>
            <Chip color="error">
                <Avatar src="https://i.pravatar.cc/150?img=1" alt="User" />
            </Chip>
            <Chip color="success" text="3">
                <Button icon="icon-[lucide--bell]" variant="ghost" />
            </Chip>
        </div>
    </section>

    <!-- Colors -->
    <section class="space-y-3">
        <h2 id="Colors" class="text-lg font-semibold">
<a href="#Colors" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Colors
                    </a>
</h2>
        <div class="flex flex-wrap items-center gap-6 rounded-lg bg-surface-container-high p-4">
            {#each colors as color (color)}
                <Chip {color}>
                    <div class="size-10 rounded-lg bg-surface-container-highest"></div>
                </Chip>
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
        <div class="flex flex-wrap items-center gap-6 rounded-lg bg-surface-container-high p-4">
            {#each sizes as size (size)}
                <div class="flex flex-col items-center gap-2">
                    <Chip {size} color="primary">
                        <div class="size-12 rounded-lg bg-surface-container-highest"></div>
                    </Chip>
                    <span class="text-xs text-on-surface-variant">{size}</span>
                </div>
            {/each}
        </div>
    </section>

    <!-- Positions -->
    <section class="space-y-3">
        <h2 id="Positions" class="text-lg font-semibold">
<a href="#Positions" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Positions
                    </a>
</h2>
        <div class="flex flex-wrap items-center gap-8 rounded-lg bg-surface-container-high p-4">
            {#each positions as position (position)}
                <div class="flex flex-col items-center gap-2">
                    <Chip {position} color="error">
                        <div class="size-12 rounded-lg bg-surface-container-highest"></div>
                    </Chip>
                    <span class="text-xs text-on-surface-variant">{position}</span>
                </div>
            {/each}
        </div>
    </section>

    <!-- With Text -->
    <section class="space-y-3">
        <h2 id="With-Text" class="text-lg font-semibold">
<a href="#With-Text" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        With Text
                    </a>
</h2>
        <div class="flex flex-wrap items-center gap-6 rounded-lg bg-surface-container-high p-4">
            <Chip text="5" size="lg" color="error">
                <Button icon="icon-[lucide--bell]" variant="ghost" size="lg" />
            </Chip>
            <Chip text="99+" size="xl" color="primary">
                <Button icon="icon-[lucide--mail]" variant="ghost" size="lg" />
            </Chip>
            <Chip text="NEW" size="2xl" color="success">
                <Button icon="icon-[lucide--gift]" variant="ghost" size="lg" />
            </Chip>
        </div>
    </section>

    <!-- Inset -->
    <section class="space-y-3">
        <h2 id="Inset" class="text-lg font-semibold">
<a href="#Inset" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Inset
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">Keep the chip inside the component bounds.</p>
        <div class="flex flex-wrap items-center gap-8 rounded-lg bg-surface-container-high p-4">
            <div class="flex flex-col items-center gap-2">
                <Chip color="error">
                    <div class="size-12 rounded-lg bg-surface-container-highest"></div>
                </Chip>
                <span class="text-xs text-on-surface-variant">default</span>
            </div>
            <div class="flex flex-col items-center gap-2">
                <Chip color="error" inset>
                    <div class="size-12 rounded-lg bg-surface-container-highest"></div>
                </Chip>
                <span class="text-xs text-on-surface-variant">inset</span>
            </div>
        </div>
    </section>

    <!-- Standalone -->
    <section class="space-y-3">
        <h2 id="Standalone" class="text-lg font-semibold">
<a href="#Standalone" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Standalone
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Render chip without positioning, useful for inline indicators.
        </p>
        <div class="flex flex-wrap items-center gap-4 rounded-lg bg-surface-container-high p-4">
            {#each colors as color (color)}
                <Chip {color} standalone size="md" />
            {/each}
        </div>
        <div class="flex items-center gap-2 rounded-lg bg-surface-container-high p-4">
            <span>Status:</span>
            <Chip color="success" standalone size="sm" />
            <span class="text-sm text-on-surface-variant">Online</span>
        </div>
    </section>

    <!-- Show/Hide -->
    <section class="space-y-3">
        <h2 id="Show--Hide" class="text-lg font-semibold">
<a href="#Show--Hide" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Show / Hide
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Control visibility with <code class="rounded bg-surface-container-highest px-1"
                >bind:show</code
            > for two-way binding.
        </p>
        <div class="flex flex-wrap items-center gap-8 rounded-lg bg-surface-container-high p-4">
            <div class="flex flex-col items-center gap-2">
                <Chip color="error" show={true}>
                    <Button icon="icon-[lucide--bell]" variant="ghost" />
                </Chip>
                <span class="text-xs text-on-surface-variant">show=true</span>
            </div>
            <div class="flex flex-col items-center gap-2">
                <Chip color="error" show={false}>
                    <Button icon="icon-[lucide--bell]" variant="ghost" />
                </Chip>
                <span class="text-xs text-on-surface-variant">show=false</span>
            </div>
            <div class="flex flex-col items-center gap-3">
                <Chip color="error" text={notificationCount} size="lg" bind:show={showChip}>
                    <Button
                        icon="icon-[lucide--bell]"
                        variant="ghost"
                        onclick={() => {
                            showChip = !showChip
                        }}
                    />
                </Chip>
                <span class="text-xs text-on-surface-variant">
                    bind:show ({showChip ? 'visible' : 'hidden'})
                </span>
            </div>
        </div>
    </section>

    <!-- Status Cycling -->
    <section class="space-y-3">
        <h2 id="Status-Indicator" class="text-lg font-semibold">
<a href="#Status-Indicator" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Status Indicator
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Cycle through statuses by clicking the avatar. Combines color, position, and inset.
        </p>
        <div class="flex items-center gap-6 rounded-lg bg-surface-container-high p-4">
            <button onclick={cycleStatus} class="cursor-pointer">
                <Chip color={statuses[statusIndex].color} position="bottom-right" inset size="sm">
                    <Avatar src="https://i.pravatar.cc/150?img=5" alt="User" size="lg" />
                </Chip>
            </button>
            <div class="flex items-center gap-2">
                <Chip color={statuses[statusIndex].color} standalone size="sm" />
                <span class="text-sm">{statuses[statusIndex].label}</span>
            </div>
        </div>
    </section>

    <!-- Colors x Positions Matrix -->
    <section class="space-y-3">
        <h2 id="Colors--Positions" class="text-lg font-semibold">
<a href="#Colors--Positions" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Colors × Positions
                    </a>
</h2>
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="border-b border-outline-variant">
                        <th class="px-3 py-3 text-left text-sm font-medium text-on-surface-variant"
                            >Color</th
                        >
                        {#each positions as position (position)}
                            <th
                                class="px-3 py-3 text-center text-sm font-medium text-on-surface-variant"
                                >{position}</th
                            >
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each colors as color (color)}
                        <tr class="border-b border-outline-variant/50">
                            <td
                                class="px-3 py-3 text-sm font-medium text-on-surface-variant capitalize"
                                >{color}</td
                            >
                            {#each positions as position (position)}
                                <td class="px-3 py-3">
                                    <div class="flex justify-center">
                                        <Chip {color} {position}>
                                            <div
                                                class="size-10 rounded-lg bg-surface-container-highest"
                                            ></div>
                                        </Chip>
                                    </div>
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>

    <!-- Real World Examples -->
    <section class="space-y-3">
        <h2 id="Real-World-Examples" class="text-lg font-semibold">
<a href="#Real-World-Examples" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Real World Examples
                    </a>
</h2>
        <div class="space-y-6 rounded-lg bg-surface-container-high p-4">
            <!-- Notification Bell -->
            <div>
                <p class="mb-3 text-sm font-medium text-on-surface-variant">Notification Bell</p>
                <div class="flex items-center gap-4">
                    <Chip text="3" size="lg" color="error">
                        <Button icon="icon-[lucide--bell]" variant="ghost" size="lg" />
                    </Chip>
                    <Chip text="12" size="lg" color="primary">
                        <Button icon="icon-[lucide--mail]" variant="ghost" size="lg" />
                    </Chip>
                    <Chip text="99+" size="xl" color="warning">
                        <Button icon="icon-[lucide--message-circle]" variant="ghost" size="lg" />
                    </Chip>
                </div>
            </div>

            <!-- User Avatar Status -->
            <div>
                <p class="mb-3 text-sm font-medium text-on-surface-variant">User Status</p>
                <div class="flex items-center gap-4">
                    <Chip color="success" position="bottom-right" inset size="sm">
                        <Avatar src="https://i.pravatar.cc/150?img=1" alt="Online user" size="lg" />
                    </Chip>
                    <Chip color="warning" position="bottom-right" inset size="sm">
                        <Avatar src="https://i.pravatar.cc/150?img=2" alt="Away user" size="lg" />
                    </Chip>
                    <Chip color="surface" position="bottom-right" inset size="sm">
                        <Avatar
                            src="https://i.pravatar.cc/150?img=3"
                            alt="Offline user"
                            size="lg"
                        />
                    </Chip>
                </div>
            </div>

            <!-- Navigation with badges -->
            <div>
                <p class="mb-3 text-sm font-medium text-on-surface-variant">Navigation</p>
                <nav class="flex items-center gap-2">
                    <Button variant="ghost">Home</Button>
                    <Chip text="5" size="lg" color="error" inset>
                        <Button variant="ghost">Messages</Button>
                    </Chip>
                    <Chip text="2" size="lg" color="primary" inset>
                        <Button variant="ghost">Notifications</Button>
                    </Chip>
                    <Button variant="ghost">Settings</Button>
                </nav>
            </div>
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
        <div class="flex flex-wrap items-center gap-6 rounded-lg bg-surface-container-high p-4">
            <Chip color="error" ui={{ base: 'animate-pulse' }}>
                <Button icon="icon-[lucide--bell]" variant="ghost" />
            </Chip>
            <Chip color="primary" size="2xs" inset ui={{ base: 'ring-2 ring-primary' }}>
                <Avatar src="https://i.pravatar.cc/150?img=4" alt="User" size="2xl" />
            </Chip>
        </div>
    </section>
</div>
