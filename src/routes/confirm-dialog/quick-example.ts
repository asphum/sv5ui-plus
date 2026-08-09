export const quickExample = `<script lang="ts">
 import { ConfirmDialog, confirmDialog, registerConfirmDialog } from 'sv5ui-plus';
 import { onMount } from 'svelte';

 let confirmDialogRef: { show: (options?: import('sv5ui-plus').ConfirmOptions) => Promise<boolean> };

 onMount(() => {
   registerConfirmDialog((options) => confirmDialogRef.show(options));
 });

 async function handleDelete() {
   const ok = await confirmDialog.delete();
   if (ok) console.log('Deleted');
 }
</script>

<button type="button" onclick={handleDelete}>Delete item</button>
<ConfirmDialog bind:this={confirmDialogRef} />`
