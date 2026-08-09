<script lang="ts">
    import { ColorPicker } from '$lib/compat.js'
    
    let color1 = $state('#3b82f6')
    let color2 = $state('#f43f5e')
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">ColorPicker</h1>
        <p class="text-on-surface-variant">
            A flexible component for selecting colors via swatches, hex input, or native color picker.
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
            Bind a hex string variable to the <code class="rounded bg-surface-container-highest px-1">value</code> prop using <code class="rounded bg-surface-container-highest px-1">bind:value</code>.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex flex-col gap-4 max-w-sm">
            <ColorPicker bind:value={color1} />
            <div class="text-sm text-on-surface-variant">
                Selected Color: <span class="font-mono font-bold" style="color: {color1};">{color1}</span>
            </div>
        </div>
    </section>

    <!-- Disabled State -->
    <section class="space-y-3">
        <h2 id="Disabled" class="text-lg font-semibold">
<a href="#Disabled" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Disabled
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use the <code class="rounded bg-surface-container-highest px-1">disabled</code> prop to prevent interaction.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex flex-col gap-4 max-w-sm">
            <ColorPicker bind:value={color2} disabled />
        </div>
    </section>
</div>
