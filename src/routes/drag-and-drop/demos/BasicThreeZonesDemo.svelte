<script lang="ts">
    import { useDragDrop } from '$lib/compat.js'

    const zones = ['A', 'B', 'C'] as const
    let activeZone = $state<(typeof zones)[number] | null>(null)
    const dragDrop = useDragDrop()
</script>

<dragDrop.Provider>
    <div class="mb-4 flex min-h-16 items-center justify-center rounded-xl border border-dashed border-outline-variant/70 bg-surface-container-low p-4">
        {#if activeZone == null}
            <div
                use:dragDrop.draggable={{ id: 'basic-draggable', container: 'origin', data: 'Drag me' }}
                class={[
                    'cursor-grab rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary active:cursor-grabbing',
                    dragDrop.draggingId === 'basic-draggable' && 'opacity-80 shadow-md'
                ]}
            >
                Drag me
            </div>
        {:else}
            <span class="text-sm font-medium text-on-surface-variant">Drop in a zone below</span>
        {/if}
    </div>

    <div class="grid gap-4 md:grid-cols-3">
        {#each zones as zone (zone)}
            <div
                use:dragDrop.droppable={{
                    id: zone,
                    onDrop: () => {
                        activeZone = zone
                    }
                }}
                class="flex min-h-28 items-center justify-center rounded-2xl border border-outline-variant/60 bg-surface-container-low p-4"
            >
                {#if activeZone === zone}
                    <div
                        use:dragDrop.draggable={{
                            id: 'basic-draggable',
                            container: zone,
                            data: 'Drag me'
                        }}
                        class={[
                            'cursor-grab rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary active:cursor-grabbing',
                            dragDrop.draggingId === 'basic-draggable' && 'opacity-80'
                        ]}
                    >
                        Drag me
                    </div>
                {:else}
                    <span class="text-sm font-medium text-on-surface-variant">Drop here</span>
                {/if}
            </div>
        {/each}
    </div>
</dragDrop.Provider>
