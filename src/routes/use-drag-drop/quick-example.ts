export const quickExample = `<script lang="ts">
 import { useDragDrop } from 'sv5ui-plus';

 const dragDrop = useDragDrop();

 let columns = $state({
   todo: ['Wireframes'],
   done: ['Kickoff']
 });

 function moveToDone(id: string) {
   const task = columns.todo.find((item) => item === id);
   if (!task) return;
   columns = {
     todo: columns.todo.filter((item) => item !== id),
     done: [...columns.done, task]
   };
 }
</script>

<dragDrop.Provider>
 <div class="grid gap-4 md:grid-cols-2">
  <div
    use:dragDrop.droppable={{
      id: 'todo',
      onDrop: ({ data }) => console.log('dropped on todo', data)
    }}
    class="rounded-lg border p-4"
  >
   {#each columns.todo as task (task)}
    <div use:dragDrop.draggable={{ id: task, container: 'todo', data: task }} class="rounded-md border p-2">{task}</div>
   {/each}
  </div>

  <div
    use:dragDrop.droppable={{ id: 'done', onDrop: ({ data }) => moveToDone(String(data)) }}
    class="rounded-lg border p-4"
  >
   {#each columns.done as task (task)}
    <div use:dragDrop.draggable={{ id: task, container: 'done', data: task }} class="rounded-md border p-2">{task}</div>
   {/each}
  </div>
 </div>
</dragDrop.Provider>`
