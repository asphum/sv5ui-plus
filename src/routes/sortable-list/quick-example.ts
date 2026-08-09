export const quickExample = `<script lang="ts">
 import { SortableList } from 'sv5ui-plus';

 let tasks = $state([
   { id: 'a', title: 'Review PR' },
   { id: 'b', title: 'Write docs' }
 ]);
</script>

<SortableList bind:items={tasks} getKey={(task) => task.id}>
 {#snippet children({ item })}
   <span>{item.title}</span>
 {/snippet}
</SortableList>`
