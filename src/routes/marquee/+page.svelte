<script lang="ts">
    import { Marquee, Card } from '$lib/compat.js'
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Marquee</h1>
        <p class="text-on-surface-variant">
            An infinite scrolling marquee component for displaying logos, text, or cards.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 id="Horizontal-Marquee" class="text-lg font-semibold">
<a href="#Horizontal-Marquee" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Horizontal Marquee
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            A standard left-scrolling marquee that pauses on hover.
        </p>
        <div class="rounded-lg bg-surface-container-high py-8 overflow-hidden">
            <Marquee pauseOnHover={true} duration="20s">
                {#each Array(6) as _, i}
                    <Card class="w-48 p-4 text-center font-semibold">Brand {i + 1}</Card>
                {/each}
            </Marquee>
        </div>
    </section>

    <!-- Vertical -->
    <section class="space-y-3">
        <h2 id="Vertical-Marquee" class="text-lg font-semibold">
<a href="#Vertical-Marquee" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Vertical Marquee
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Set <code class="rounded bg-surface-container-highest px-1">direction="up"</code> or <code class="rounded bg-surface-container-highest px-1">"down"</code> for vertical scrolling.
        </p>
        <div class="rounded-lg bg-surface-container-high py-8 overflow-hidden flex justify-center">
            <div class="h-[300px] flex gap-4 overflow-hidden">
                <Marquee direction="up" duration="15s">
                    {#each Array(5) as _, i}
                        <Card class="w-48 p-4 text-center">Feature A-{i + 1}</Card>
                    {/each}
                </Marquee>
                <Marquee direction="down" duration="15s">
                    {#each Array(5) as _, i}
                        <Card class="w-48 p-4 text-center">Feature B-{i + 1}</Card>
                    {/each}
                </Marquee>
            </div>
        </div>
    </section>
</div>
