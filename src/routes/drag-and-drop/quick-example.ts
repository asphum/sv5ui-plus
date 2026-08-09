export const quickExample = `<script lang="ts">
 import { SortableList, useDragDrop } from 'sv5ui-plus';

 // Reorder within one list
 let tasks = $state([
   { id: 'a', title: 'Design tokens' },
   { id: 'b', title: 'Ship release' }
 ]);

 // Move between drop zones
 let zone = $state<'a' | 'b' | null>(null);
 const dragDrop = useDragDrop();
</script>

<!-- Sortable list -->
<SortableList bind:items={tasks} getKey={(task) => task.id}>
 {#snippet children({ item })}
   <span>{item.title}</span>
 {/snippet}
</SortableList>

<!-- Cross-container drag -->
<dragDrop.Provider>
 <div use:dragDrop.droppable={{ id: 'a', onDrop: () => (zone = 'a') }}>Zone A</div>
 <div use:dragDrop.droppable={{ id: 'b', onDrop: () => (zone = 'b') }}>Zone B</div>
 {#if zone === 'a' || zone == null}
  <div use:dragDrop.draggable={{ id: 'card', container: zone ?? 'a', data: 'Drag me' }}>
   Drag me
  </div>
 {/if}
</dragDrop.Provider>`
