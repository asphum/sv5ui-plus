<script lang="ts">
    import { NumberTicker } from '$lib/compat.js'
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">NumberTicker</h1>
        <p class="text-on-surface-variant">
            An animated counter that smoothly transitions from zero to a target number.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 id="Usage" class="text-lg font-semibold">
<a href="#Usage" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Usage
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Simply provide a <code class="rounded bg-surface-container-highest px-1">value</code>. It will automatically format with commas.
        </p>
        <div class="rounded-lg bg-surface-container-high p-8 flex flex-col items-center justify-center gap-4">
            <div class="text-4xl font-extrabold text-primary">
                <NumberTicker value={150000} />
            </div>
            <div class="text-on-surface-variant">Total Users</div>
        </div>
    </section>

    <!-- Decimals & Duration -->
    <section class="space-y-3">
        <h2 id="Decimals--Duration" class="text-lg font-semibold">
<a href="#Decimals--Duration" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Decimals & Duration
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1">decimals</code> for floating point numbers and <code class="rounded bg-surface-container-highest px-1">duration</code> to control speed.
        </p>
        <div class="rounded-lg bg-surface-container-high p-8 flex flex-col items-center justify-center gap-4">
            <div class="text-4xl font-extrabold text-success">
                $<NumberTicker value={2.5} decimals={2} duration={3000} />M
            </div>
            <div class="text-on-surface-variant">Revenue</div>
        </div>
    </section>
</div>
