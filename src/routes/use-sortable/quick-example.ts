export const quickExample = `<script lang="ts">
 import { useSortable } from 'sv5ui-plus';

 let items = $state([
   { id: 1, label: 'Design' },
   { id: 2, label: 'Build' },
   { id: 3, label: 'Ship' }
 ]);

 const sortable = useSortable({
   getItems: () => items,
   getId: (item) => item.id,
   onReorder: (next) => (items = next),
   handle: '[data-sortable-handle]'
 });
</script>

<sortable.Provider>
 <div use:sortable.container class="space-y-2">
  {#each items as item, index (item.id)}
   <div use:sortable.item={{ index, item }} class="flex items-center gap-2 rounded-lg border p-3">
     <button type="button" data-sortable-handle aria-label="Drag">::</button>
     {item.label}
   </div>
  {/each}
 </div>
</sortable.Provider>`
