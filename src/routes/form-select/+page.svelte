<script lang="ts">
    import { FormSelect } from '$lib/compat.js'

    let status = $state('draft')
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">FormSelect</h1>
        <p class="text-on-surface-variant">
            <code class="rounded bg-surface-container-highest px-1">Select</code> wrapper that syncs
            the current value into hidden inputs so native / SvelteKit form posts work.
        </p>
    </div>

    <section class="space-y-3">
        <h2 id="Usage" class="text-lg font-semibold">Usage</h2>
        <form
            class="rounded-lg bg-surface-container-high p-4"
            onsubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)
                alert(`status=${data.get('status')}`)
            }}
        >
            <FormSelect
                name="status"
                bind:value={status}
                items={[
                    { value: 'draft', label: 'Draft' },
                    { value: 'published', label: 'Published' }
                ]}
            />
            <button type="submit" class="mt-3 rounded-lg bg-primary px-3 py-2 text-sm text-on-primary"
                >Submit</button
            >
        </form>
    </section>
</div>
