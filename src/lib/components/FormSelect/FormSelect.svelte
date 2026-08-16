<script lang="ts" module>
    export type { FormSelectProps as Props } from './form-select.types.js'
</script>

<script lang="ts">
    import { Select } from 'sv5ui'
    import type { FormSelectProps } from './form-select.types.js'

    // default เป็น string ว่าง — อย่าใช้ $bindable() เปล่า (UNINITIALIZED ตอน async)
    let { name, value = $bindable(''), disabled = false, ...selectProps }: FormSelectProps = $props()
</script>

<Select {...selectProps} bind:value {disabled} />

{#if Array.isArray(value)}
    {#each value as item (item)}
        <input type="hidden" {name} value={item} {disabled} />
    {/each}
{:else}
    <input type="hidden" {name} value={value ?? ''} {disabled} />
{/if}
