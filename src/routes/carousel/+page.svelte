<script lang="ts">
    import { Carousel, Button, Icon, Badge, Link } from '$lib/index.js'
    import type { CarouselApi } from '$lib/index.js'

    const colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error'] as const
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

    const fruits = [
        { id: 1, label: 'Apple', emoji: '🍎', from: 'from-rose-400', to: 'to-rose-600' },
        { id: 2, label: 'Banana', emoji: '🍌', from: 'from-amber-300', to: 'to-yellow-500' },
        { id: 3, label: 'Cherry', emoji: '🍒', from: 'from-pink-400', to: 'to-red-600' },
        { id: 4, label: 'Grape', emoji: '🍇', from: 'from-purple-400', to: 'to-violet-600' },
        { id: 5, label: 'Orange', emoji: '🍊', from: 'from-orange-300', to: 'to-orange-500' },
        { id: 6, label: 'Peach', emoji: '🍑', from: 'from-pink-300', to: 'to-orange-300' },
        { id: 7, label: 'Pear', emoji: '🍐', from: 'from-lime-300', to: 'to-green-500' },
        { id: 8, label: 'Pineapple', emoji: '🍍', from: 'from-yellow-300', to: 'to-amber-500' }
    ]

    const photoTitles = [
        'Sunset Ridge',
        'Quiet Harbor',
        'Open Road',
        'City Lights',
        'Misty Pines',
        'Coastal Drift',
        'Golden Fields',
        'Riverside Bend',
        'Alpine Trail',
        'Bamboo Grove',
        'Northern Sky',
        'Stone Path'
    ]
    const photos = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        src: `https://picsum.photos/seed/svelora-carousel-${i}/800/450`,
        alt: `Photo ${i + 1}`,
        title: photoTitles[i]
    }))

    const features = [
        { icon: 'icon-[lucide--zap]', label: 'Tree-shakable plugins', desc: 'Only ship what you use.' },
        { icon: 'icon-[lucide--hand]', label: 'Touch & mouse drag', desc: 'Native-feeling gestures.' },
        { icon: 'icon-[lucide--repeat]', label: 'Looping & autoplay', desc: 'With pause-on-hover.' },
        {
            icon: 'icon-[lucide--layout-grid]',
            label: 'Multi-slide & responsive',
            desc: 'Breakpoint overrides.'
        },
        {
            icon: 'icon-[lucide--arrow-down-up]',
            label: 'Horizontal & vertical',
            desc: 'Same API, both axes.'
        },
        { icon: 'icon-[lucide--sparkles]', label: 'Fade & class plugins', desc: 'Custom transitions.' }
    ]

    let controlledIndex = $state(0)
    let controlledApi = $state<CarouselApi | undefined>()
    let autoplayApi = $state<CarouselApi | undefined>()
    let autoplayPlaying = $state(true)

    let galleryIndex = $state(0)
    let galleryThumbsApi = $state<CarouselApi | undefined>()

    let vGalleryIndex = $state(0)
    let vGalleryThumbsApi = $state<CarouselApi | undefined>()

    $effect(() => {
        galleryThumbsApi?.goTo(galleryIndex)
    })
    $effect(() => {
        vGalleryThumbsApi?.goTo(vGalleryIndex)
    })

    type AutoplayPlugin = { isPlaying: () => boolean; play: () => void; stop: () => void }

    function toggleAutoplay() {
        if (!autoplayApi) return
        const plugin = autoplayApi.plugins().autoplay as AutoplayPlugin | undefined
        if (!plugin) return
        if (plugin.isPlaying()) {
            plugin.stop()
            autoplayPlaying = false
        } else {
            plugin.play()
            autoplayPlaying = true
        }
    }
</script>

<div class="space-y-10">
    <header class="space-y-3">
        <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-2xl font-bold">Carousel</h1>
            <Badge color="primary" variant="soft">Embla v8</Badge>
        </div>
        <p class="max-w-3xl text-on-surface-variant">
            A slideshow component built on top of
            <Link href="https://www.embla-carousel.com" external>Embla Carousel</Link>. Looping,
            autoplay, fade transitions, multiple slides per view, vertical orientation, drag-free
            scrolling and responsive breakpoints — all driven by a single component.
        </p>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {#each features as f (f.label)}
                <div
                    class="flex items-start gap-3 rounded-lg border border-outline-variant/60 bg-surface-container p-3"
                >
                    <Icon name={f.icon} class="mt-0.5 size-5 shrink-0 text-primary" />
                    <div class="min-w-0">
                        <p class="text-sm font-medium text-on-surface">{f.label}</p>
                        <p class="text-xs text-on-surface-variant">{f.desc}</p>
                    </div>
                </div>
            {/each}
        </div>
    </header>

    <!-- Basic -->
    <section class="space-y-3">
        <div class="flex items-baseline justify-between gap-2">
            <h2 id="Basic" class="text-lg font-semibold">
<a href="#Basic" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Basic
                    </a>
</h2>
            <p class="text-xs text-on-surface-variant">items + slide snippet</p>
        </div>
        <div class="rounded-xl border border-outline-variant/60 bg-surface-container p-4">
            <Carousel items={fruits}>
                {#snippet slide({ item })}
                    <div
                        class="flex aspect-[2/1 flex-col items-center justify-center rounded-lg bg-linear-to-br {item.from} {item.to} text-white shadow-inner"
                    >
                        <div class="text-7xl drop-shadow-sm">{item.emoji}</div>
                        <p class="mt-2 text-lg font-semibold">{item.label}</p>
                    </div>
                {/snippet}
            </Carousel>
        </div>
    </section>

    <!-- Autoplay + Loop -->
    <section class="space-y-3">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="Loop-amp-autoplay" class="text-lg font-semibold">
<a href="#Loop-amp-autoplay" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Loop &amp; autoplay
                    </a>
</h2>
            <p class="text-xs text-on-surface-variant">
                <code>loop</code> + <code>autoplay</code> (pauses on hover by default)
            </p>
        </div>
        <div class="space-y-3 rounded-xl border border-outline-variant/60 bg-surface-container p-4">
            <Carousel
                bind:api={autoplayApi}
                items={photos}
                loop
                autoplay={{ delay: 2500 }}
                ui={{ slide: 'pr-3' }}
            >
                {#snippet slide({ item })}
                    <div class="relative overflow-hidden rounded-lg">
                        <img
                            src={item.src}
                            alt={item.alt}
                            class="aspect-video w-full object-cover"
                        />
                        <div
                            class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-4"
                        >
                            <p class="text-sm font-semibold text-white">{item.title}</p>
                        </div>
                    </div>
                {/snippet}
            </Carousel>
            <div class="flex flex-wrap items-center gap-2 text-sm">
                <Button
                    variant="outline"
                    size="sm"
                    leadingIcon={autoplayPlaying ? 'icon-[lucide--pause]' : 'icon-[lucide--play]'}
                    onclick={toggleAutoplay}
                >
                    {autoplayPlaying ? 'Pause' : 'Play'}
                </Button>
                <Badge
                    color={autoplayPlaying ? 'success' : 'surface'}
                    variant="soft"
                    leadingIcon={autoplayPlaying ? 'icon-[lucide--circle-dot]' : 'icon-[lucide--circle]'}
                >
                    {autoplayPlaying ? 'Playing · 2.5s' : 'Paused'}
                </Badge>
                <span class="ml-auto text-xs text-on-surface-variant"
                    >Hover the slides to pause</span
                >
            </div>
        </div>
    </section>

    <!-- Responsive multi-slide -->
    <section class="space-y-3">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="Responsive--multiple-slides-per-view" class="text-lg font-semibold">
<a href="#Responsive--multiple-slides-per-view" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Responsive · multiple slides per view
                    </a>
</h2>
            <p class="text-xs text-on-surface-variant">
                <code>ui.slide</code> basis classes + <code>breakpoints</code>
            </p>
        </div>
        <div class="rounded-xl border border-outline-variant/60 bg-surface-container p-4">
            <Carousel
                items={fruits}
                breakpoints={{
                    '(min-width: 640px)': { slidesToScroll: 2 },
                    '(min-width: 1024px)': { slidesToScroll: 3 }
                }}
                ui={{ slide: 'basis-full sm:basis-1/2 lg:basis-1/3 pr-3' }}
            >
                {#snippet slide({ item })}
                    <div
                        class="flex aspect-square flex-col items-center justify-center rounded-xl bg-linear-to-br {item.from} {item.to} text-white"
                    >
                        <div class="text-6xl">{item.emoji}</div>
                        <p class="mt-2 text-sm font-semibold tracking-wide uppercase">
                            {item.label}
                        </p>
                    </div>
                {/snippet}
            </Carousel>
            <p class="mt-3 text-xs text-on-surface-variant">
                Resize the window: 1 slide on mobile, 2 on tablet, 3 on desktop.
            </p>
        </div>
    </section>

    <!-- Fade -->
    <section class="space-y-3">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="Fade-transition" class="text-lg font-semibold">
<a href="#Fade-transition" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Fade transition
                    </a>
</h2>
            <p class="text-xs text-on-surface-variant">
                <code>fade</code> + <code>loop</code> + <code>autoplay</code>
            </p>
        </div>
        <div class="rounded-xl border border-outline-variant/60 bg-surface-container p-4">
            <Carousel items={photos} fade loop autoplay={{ delay: 3500 }}>
                {#snippet slide({ item })}
                    <img
                        src={item.src}
                        alt={item.alt}
                        class="aspect-video w-full rounded-lg object-cover"
                    />
                {/snippet}
            </Carousel>
        </div>
    </section>

    <!-- Vertical -->
    <section class="space-y-3">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="Vertical-orientation" class="text-lg font-semibold">
<a href="#Vertical-orientation" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Vertical orientation
                    </a>
</h2>
            <p class="text-xs text-on-surface-variant">
                <code>orientation="vertical"</code> — arrows &amp; dots reposition automatically
            </p>
        </div>
        <div class="rounded-xl border border-outline-variant/60 bg-surface-container p-4">
            <div class="mx-auto h-96 w-full max-w-md">
                <Carousel items={fruits} orientation="vertical" loop>
                    {#snippet slide({ item })}
                        <div
                            class="flex h-full w-full items-center justify-center rounded-lg bg-linear-to-b {item.from} {item.to} text-white"
                        >
                            <div class="text-center">
                                <div class="text-7xl">{item.emoji}</div>
                                <p class="mt-3 text-xl font-semibold">{item.label}</p>
                            </div>
                        </div>
                    {/snippet}
                </Carousel>
            </div>
        </div>
    </section>

    <!-- Controlled -->
    <section class="space-y-3">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="Controlled--bindindex--bindapi" class="text-lg font-semibold">
<a href="#Controlled--bindindex--bindapi" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Controlled · bind:index + bind:api
                    </a>
</h2>
            <p class="text-xs text-on-surface-variant">Drive from outside, expose Embla API</p>
        </div>
        <div class="space-y-4 rounded-xl border border-outline-variant/60 bg-surface-container p-4">
            <Carousel bind:api={controlledApi} bind:index={controlledIndex} items={fruits} loop>
                {#snippet slide({ item, selected })}
                    <div
                        class="flex aspect-[2/1 flex-col items-center justify-center rounded-lg bg-linear-to-br {item.from} {item.to} text-white transition-transform"
                        class:scale-100={selected}
                        class:scale-95={!selected}
                    >
                        <div class="text-7xl">{item.emoji}</div>
                        <p class="mt-2 text-lg font-semibold">{item.label}</p>
                    </div>
                {/snippet}
            </Carousel>
            <div class="flex flex-wrap items-center gap-2 rounded-lg bg-surface-container-high p-3">
                <Button
                    variant="outline"
                    size="sm"
                    leadingIcon="icon-[lucide--chevrons-left]"
                    onclick={() => (controlledIndex = 0)}
                >
                    First
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    leadingIcon="icon-[lucide--chevron-left]"
                    onclick={() => controlledApi?.goToPrev()}
                >
                    Prev
                </Button>
                <div class="flex items-center gap-1">
                    {#each fruits as fruit, i (fruit.id)}
                        <button
                            type="button"
                            class="size-8 rounded-md text-sm font-medium transition-colors {i ===
                            controlledIndex
                                ? 'bg-primary text-on-primary'
                                : 'bg-surface text-on-surface-variant hover:bg-surface-container-highest'}"
                            onclick={() => (controlledIndex = i)}
                        >
                            {i + 1}
                        </button>
                    {/each}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    trailingIcon="icon-[lucide--chevron-right]"
                    onclick={() => controlledApi?.goToNext()}
                >
                    Next
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    trailingIcon="icon-[lucide--chevrons-right]"
                    onclick={() => (controlledIndex = fruits.length - 1)}
                >
                    Last
                </Button>
                <span class="ml-auto text-sm font-medium text-on-surface"
                    >{fruits[controlledIndex]?.label}
                    <span class="text-on-surface-variant"
                        >· {controlledIndex + 1} / {fruits.length}</span
                    ></span
                >
            </div>
        </div>
    </section>

    <!-- Custom snippets -->
    <section class="space-y-3">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="Custom-arrows-amp-dots" class="text-lg font-semibold">
<a href="#Custom-arrows-amp-dots" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Custom arrows &amp; dots
                    </a>
</h2>
            <p class="text-xs text-on-surface-variant">
                <code>prevSlot</code>, <code>nextSlot</code>, <code>dot</code> snippets
            </p>
        </div>
        <div class="rounded-xl border border-outline-variant/60 bg-surface-container p-4">
            <Carousel items={photos} loop>
                {#snippet slide({ item })}
                    <img
                        src={item.src}
                        alt={item.alt}
                        class="aspect-video w-full rounded-lg object-cover"
                    />
                {/snippet}
                {#snippet prevSlot({ canScroll, scroll })}
                    <button
                        type="button"
                        disabled={!canScroll}
                        class="absolute top-1/2 left-3 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Previous"
                        onclick={scroll}
                    >
                        <Icon name="icon-[lucide--arrow-left]" class="size-5" />
                    </button>
                {/snippet}
                {#snippet nextSlot({ canScroll, scroll })}
                    <button
                        type="button"
                        disabled={!canScroll}
                        class="absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Next"
                        onclick={scroll}
                    >
                        <Icon name="icon-[lucide--arrow-right]" class="size-5" />
                    </button>
                {/snippet}
                {#snippet dot({ index, selected, select })}
                    <button
                        type="button"
                        class="h-1.5 rounded-full transition-all {selected
                            ? 'w-10 bg-primary'
                            : 'w-5 bg-on-surface/30 hover:bg-on-surface/50'}"
                        aria-label={`Go to slide ${index + 1}`}
                        onclick={select}
                    ></button>
                {/snippet}
            </Carousel>
        </div>
    </section>

    <!-- Gallery · horizontal thumbnails -->
    <section class="space-y-3">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="Gallery--horizontal-thumbnails" class="text-lg font-semibold">
<a href="#Gallery--horizontal-thumbnails" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Gallery · horizontal thumbnails
                    </a>
</h2>
            <p class="text-xs text-on-surface-variant">
                Two carousels synced via <code>bind:index</code> + <code>bind:api</code>
            </p>
        </div>
        <div class="space-y-3 rounded-xl border border-outline-variant/60 bg-surface-container p-4">
            <Carousel bind:index={galleryIndex} items={photos} loop dots={false}>
                {#snippet slide({ item })}
                    <div class="relative overflow-hidden rounded-lg">
                        <img
                            src={item.src}
                            alt={item.alt}
                            class="aspect-video w-full object-cover"
                        />
                        <div
                            class="absolute right-3 bottom-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                        >
                            {galleryIndex + 1} / {photos.length}
                        </div>
                        <div
                            class="absolute bottom-0 left-0 rounded-tr-lg bg-black/60 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm"
                        >
                            {item.title}
                        </div>
                    </div>
                {/snippet}
            </Carousel>
            <Carousel
                bind:api={galleryThumbsApi}
                items={photos}
                arrows={false}
                dots={false}
                dragFree
                ui={{
                    viewport: 'px-1.5 py-1.5',
                    slide: 'basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pr-2'
                }}
            >
                {#snippet slide({ item, index })}
                    <button
                        type="button"
                        class="block w-full overflow-hidden rounded-md transition-all {index ===
                        galleryIndex
                            ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface-container'
                            : 'opacity-50 hover:opacity-100'}"
                        aria-label={`View ${item.title}`}
                        aria-current={index === galleryIndex ? 'true' : undefined}
                        onclick={() => (galleryIndex = index)}
                    >
                        <img
                            src={item.src}
                            alt={item.alt}
                            class="aspect-video w-full object-cover"
                        />
                    </button>
                {/snippet}
            </Carousel>
        </div>
    </section>

    <!-- Gallery · vertical thumbnails -->
    <section class="space-y-3">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="Gallery--vertical-thumbnails" class="text-lg font-semibold">
<a href="#Gallery--vertical-thumbnails" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Gallery · vertical thumbnails
                    </a>
</h2>
            <p class="text-xs text-on-surface-variant">
                Vertical thumb rail synced with main slide
            </p>
        </div>
        <div class="rounded-xl border border-outline-variant/60 bg-surface-container p-4">
            <div class="mx-auto flex max-w-3xl flex-col gap-3 sm:h-96 sm:flex-row">
                <div class="aspect-video w-full sm:aspect-auto sm:flex-1">
                    <Carousel
                        bind:index={vGalleryIndex}
                        items={photos}
                        orientation="vertical"
                        loop
                        arrows={false}
                        dots={false}
                    >
                        {#snippet slide({ item })}
                            <div class="relative h-full w-full overflow-hidden rounded-lg">
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    class="h-full w-full object-cover"
                                />
                                <div
                                    class="absolute right-3 bottom-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                                >
                                    {vGalleryIndex + 1} / {photos.length}
                                </div>
                                <div
                                    class="absolute bottom-0 left-0 rounded-tr-lg bg-black/60 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm"
                                >
                                    {item.title}
                                </div>
                            </div>
                        {/snippet}
                    </Carousel>
                </div>
                <div class="hidden w-28 sm:block">
                    <Carousel
                        bind:api={vGalleryThumbsApi}
                        items={photos}
                        orientation="vertical"
                        slidesToShow={6}
                        arrows={false}
                        dots={false}
                        dragFree
                        ui={{ viewport: 'px-1.5 py-1.5', slide: 'pb-2' }}
                    >
                        {#snippet slide({ item, index })}
                            <button
                                type="button"
                                class="block h-full w-full overflow-hidden rounded-md transition-all {index ===
                                vGalleryIndex
                                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface-container'
                                    : 'opacity-50 hover:opacity-100'}"
                                aria-label={`View ${item.title}`}
                                aria-current={index === vGalleryIndex ? 'true' : undefined}
                                onclick={() => (vGalleryIndex = index)}
                            >
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    class="h-full w-full object-cover"
                                />
                            </button>
                        {/snippet}
                    </Carousel>
                </div>
            </div>
        </div>
    </section>

    <!-- Colors -->
    <section class="space-y-3">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="Colors" class="text-lg font-semibold">
<a href="#Colors" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Colors
                    </a>
</h2>
            <p class="text-xs text-on-surface-variant">
                <code>color</code> drives the active dot &amp; arrow tint
            </p>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {#each colors as color (color)}
                <div
                    class="space-y-2 rounded-xl border border-outline-variant/60 bg-surface-container p-3"
                >
                    <p class="text-xs font-medium text-on-surface-variant capitalize">{color}</p>
                    <Carousel items={fruits.slice(0, 4)} {color}>
                        {#snippet slide({ item })}
                            <div
                                class="flex aspect-[2/1 items-center justify-center rounded-md bg-linear-to-br {item.from} {item.to} text-5xl text-white"
                            >
                                {item.emoji}
                            </div>
                        {/snippet}
                    </Carousel>
                </div>
            {/each}
        </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-3">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="Sizes" class="text-lg font-semibold">
<a href="#Sizes" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Sizes
                    </a>
</h2>
            <p class="text-xs text-on-surface-variant">
                <code>size</code> scales arrows and dot pills
            </p>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {#each sizes as size (size)}
                <div
                    class="space-y-2 rounded-xl border border-outline-variant/60 bg-surface-container p-3"
                >
                    <p class="text-xs font-medium text-on-surface-variant uppercase">{size}</p>
                    <Carousel items={fruits.slice(0, 4)} {size}>
                        {#snippet slide({ item })}
                            <div
                                class="flex aspect-[2/1 items-center justify-center rounded-md bg-linear-to-br {item.from} {item.to} text-5xl text-white"
                            >
                                {item.emoji}
                            </div>
                        {/snippet}
                    </Carousel>
                </div>
            {/each}
        </div>
    </section>

    <!-- Drag-free -->
    <section class="space-y-3">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="Drag-free-content-browser" class="text-lg font-semibold">
<a href="#Drag-free-content-browser" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Drag-free content browser
                    </a>
</h2>
            <p class="text-xs text-on-surface-variant">
                <code>dragFree</code> — free-form scroll without snapping
            </p>
        </div>
        <div class="rounded-xl border border-outline-variant/60 bg-surface-container p-4">
            <Carousel
                items={fruits}
                dragFree
                arrows={false}
                dots={false}
                ui={{ slide: 'basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pr-3' }}
            >
                {#snippet slide({ item })}
                    <div
                        class="flex aspect-square flex-col items-center justify-center rounded-xl bg-linear-to-br {item.from} {item.to} text-white shadow-sm"
                    >
                        <div class="text-4xl">{item.emoji}</div>
                        <p class="mt-1 text-xs font-semibold tracking-wide uppercase">
                            {item.label}
                        </p>
                    </div>
                {/snippet}
            </Carousel>
            <p class="mt-3 text-xs text-on-surface-variant">
                Try dragging — slides peek and ease to rest, no snapping.
            </p>
        </div>
    </section>

    <!-- Minimal -->
    <section class="space-y-3">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="Minimal--no-arrows-or-dots" class="text-lg font-semibold">
<a href="#Minimal--no-arrows-or-dots" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Minimal · no arrows or dots
                    </a>
</h2>
            <p class="text-xs text-on-surface-variant">
                <code>arrows={false}</code> + <code>dots={false}</code>
            </p>
        </div>
        <div class="rounded-xl border border-outline-variant/60 bg-surface-container p-4">
            <Carousel items={photos} arrows={false} dots={false} loop autoplay={{ delay: 4000 }}>
                {#snippet slide({ item })}
                    <img
                        src={item.src}
                        alt={item.alt}
                        class="aspect-21/9 w-full rounded-lg object-cover"
                    />
                {/snippet}
            </Carousel>
        </div>
    </section>
</div>
