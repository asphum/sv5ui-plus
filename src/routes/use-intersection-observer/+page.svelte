<script lang="ts">
    import { useIntersectionObserver } from '$lib/index.js'
    import { Badge, Card, Icon } from '$lib/index.js'

    let target = $state<HTMLElement>()
    let enterCount = $state(0)
    let loaded = $state(false)

    const io = useIntersectionObserver(
        () => target,
        (entry) => {
            if (entry.isIntersecting) {
                enterCount++
                loaded = true
            }
        },
        { threshold: 0.25 }
    )
</script>

<div class="space-y-8">
    <div>
        <h1 class="text-2xl font-bold text-on-surface">useIntersectionObserver</h1>
        <p class="mt-1 text-on-surface-variant">
            Observe an element's intersection with the viewport (or a root), with automatic cleanup.
            Ideal for lazy-loading, reveal-on-scroll, and visibility tracking.
        </p>
    </div>

    <Card>
        <h2 id="Live-visibility" class="mb-1 font-semibold text-on-surface">
<a href="#Live-visibility" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Live visibility
                    </a>
</h2>
        <p class="mb-4 text-sm text-on-surface-variant">
            This badge tracks the target card far below. Scroll down and watch it flip as the target
            enters and leaves the viewport.
        </p>
        <div class="flex flex-wrap items-center gap-3">
            <Badge color={io.isIntersecting ? 'success' : 'secondary'}>
                {io.isIntersecting ? 'In view' : 'Out of view'}
            </Badge>
            <Badge color="primary">Entered: {enterCount}×</Badge>
        </div>
    </Card>

    <div
        class="flex h-[70vh] items-center justify-center gap-2 text-on-surface-variant"
        aria-hidden="true"
    >
        <Icon name="icon-[lucide--arrow-down]" size="18" />
        Scroll down to the target
    </div>

    <Card>
        <h2 id="Lazy-target-threshold-025" class="mb-3 font-semibold text-on-surface">
<a href="#Lazy-target-threshold-025" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Lazy target (threshold: 0.25)
                    </a>
</h2>
        <div
            bind:this={target}
            class="flex h-32 items-center justify-center rounded-lg border border-dashed transition-colors duration-500"
            class:border-success={loaded}
            class:bg-success-container={loaded}
            class:border-outline={!loaded}
            class:bg-surface-container-low={!loaded}
        >
            {#if loaded}
                <span class="flex items-center gap-2 text-on-success-container">
                    <Icon name="icon-[lucide--check]" size="20" /> Loaded — became visible!
                </span>
            {:else}
                <span class="flex items-center gap-2">
                    <Icon name="icon-[lucide--loader]" size="20" /> Waiting to enter view…
                </span>
            {/if}
        </div>
    </Card>
</div>
