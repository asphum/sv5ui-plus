<script lang="ts">
    import { DateRangePickerField } from '$lib/compat.js'

    let start = $state('')
    let end = $state('')
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">DateRangePickerField</h1>
        <p class="text-on-surface-variant">
            String range adapter around
            <code class="rounded bg-surface-container-highest px-1">DateRangePicker</code> with
            hidden <code class="rounded bg-surface-container-highest px-1">startName</code> /
            <code class="rounded bg-surface-container-highest px-1">endName</code> inputs.
        </p>
    </div>

    <section class="space-y-3">
        <h2 id="Usage" class="text-lg font-semibold">Usage</h2>
        <div class="rounded-lg bg-surface-container-high space-y-2 p-4">
            <DateRangePickerField
                startName="startsAt"
                endName="endsAt"
                bind:start
                bind:end
                clearable
            />
            <p class="text-sm text-on-surface-variant">{start || '—'} → {end || '—'}</p>
        </div>
    </section>
</div>
