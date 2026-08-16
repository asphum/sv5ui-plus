<script lang="ts">
    import { DatePickerField } from '$lib/compat.js'

    let value = $state('')
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">DatePickerField</h1>
        <p class="text-on-surface-variant">
            String-based form adapter around
            <code class="rounded bg-surface-container-highest px-1">DatePicker</code>. Defaults:
            <code class="rounded bg-surface-container-highest px-1">locale="th-TH"</code>, Monday week
            start.
        </p>
    </div>

    <section class="space-y-3">
        <h2 id="Usage" class="text-lg font-semibold">Usage</h2>
        <div class="rounded-lg bg-surface-container-high space-y-2 p-4">
            <DatePickerField name="scheduledAt" granularity="minute" bind:value />
            <p class="text-sm text-on-surface-variant">value: {value || '—'}</p>
        </div>
    </section>
</div>
