import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    'When to use what': `<script lang="ts">
 import { SortableList, useDragDrop, useSortable } from 'sv5ui-plus';

 // SortableList / useSortable — reorder inside one list
 let items = $state([{ id: 1, label: 'Task' }]);

 // useDragDrop — move items between columns or zones
 const dragDrop = useDragDrop();
</script>`,
    Basic: `<script lang="ts">
 import { useDragDrop } from 'sv5ui-plus';

 let activeZone = $state<'A' | 'B' | 'C' | null>(null);
 const dragDrop = useDragDrop();
</script>

<dragDrop.Provider>
 <div use:dragDrop.droppable={{ id: 'A', onDrop: () => (activeZone = 'A') }}>Zone A</div>
 <div use:dragDrop.droppable={{ id: 'B', onDrop: () => (activeZone = 'B') }}>Zone B</div>
 <div use:dragDrop.droppable={{ id: 'C', onDrop: () => (activeZone = 'C') }}>Zone C</div>

 {#if activeZone == null}
  <div use:dragDrop.draggable={{ id: 'item', container: 'origin', data: 'Drag me' }}>
   Drag me
  </div>
 {:else if activeZone === 'A'}
  <div use:dragDrop.draggable={{ id: 'item', container: 'A', data: 'Drag me' }}>Drag me</div>
 {/if}
</dragDrop.Provider>`,
    'Task columns': `<script lang="ts">
 import { DragDropProvider } from '@dnd-kit/svelte';
 import { createSortable } from '@dnd-kit/svelte/sortable';

 let todos = $state([
   { id: '1', content: 'Learn Svelte', done: false },
   { id: '2', content: 'Review PR', done: true }
 ]);

 // Use onDragOver to toggle \`done\` while dragging across columns,
 // and onDragEnd to reorder within a column.
</script>

<DragDropProvider onDragOver={...} onDragEnd={...}>
 <!-- createSortable per task + createDroppable per column -->
</DragDropProvider>`,
    'Nested containers': `<script lang="ts">
 import { DragDropProvider } from '@dnd-kit/svelte';
 import { createSortable } from '@dnd-kit/svelte/sortable';

 let containers = $state([
   { data: { id: 'dev', title: 'Development' }, nesteds: [{ id: 't1', title: 'Setup' }] }
 ]);

 // Containers: type 'container', data.accepts: ['item']
 // Tasks: type 'item' — handle onDragOver for live cross-container moves
</script>`,
    'Sortable list': `<script lang="ts">
 import { SortableList } from 'sv5ui-plus';

 let items = $state([
   { id: 'v1', label: 'Design review' },
   { id: 'v2', label: 'Implement API' }
 ]);
</script>

<SortableList bind:items={items} getKey={(item) => item.id}>
 {#snippet children({ item, index, dragging })}
   <span class:opacity-60={dragging}>{item.label}</span>
   <span>#{index + 1}</span>
 {/snippet}
</SortableList>`,
    Horizontal: `<SortableList bind:items={items} getKey={(item) => item.id} axis="horizontal" class="flex gap--2">
 {#snippet children({ item })}
   <span>{item.label}</span>
 {/snippet}
</SortableList>`,
    Grid: `<SortableList
 bind:items={items}
 getKey={(item) => item.id}
 axis="grid"
 class="grid grid-cols-3 gap-2"
>
 {#snippet children({ item })}
   <span>{item.label}</span>
 {/snippet}
</SortableList>`,
    'Drag handle': `<SortableList bind:items={items} getKey={(item) => item.id} handle>
 {#snippet children({ item })}
   <span>{item.label}</span>
 {/snippet}
</SortableList>`,
    'Whole row drag': `<SortableList bind:items={items} getKey={(item) => item.id} handle={false}>
 {#snippet children({ item })}
   <span>{item.label}</span>
 {/snippet}
</SortableList>`,
    Disabled: `<SortableList bind:items={items} getKey={(item) => item.id} disabled={sortDisabled}>
 {#snippet children({ item })}
   <span>{item.label}</span>
 {/snippet}
</SortableList>`,
    'Kanban (2 columns)': `<script lang="ts">
 import { useDragDrop } from 'sv5ui-plus';

 type Item = { id: string; label: string };

 let board = $state<{ todo: Item[]; done: Item[] }>({
   todo: [{ id: '1', label: 'Design tokens' }],
   done: [{ id: '2', label: 'Kickoff' }]
 });

 const dragDrop = useDragDrop();

 function move(item: Item, target: 'todo' | 'done') {
   const source = target === 'todo' ? 'done' : 'todo';
   board = {
     ...board,
     [source]: board[source].filter((entry) => entry.id !== item.id),
     [target]: [...board[target], item]
   };
 }
</script>

<dragDrop.Provider>
 {#each ['todo', 'done'] as lane (lane)}
  <div
   use:dragDrop.droppable={{
    id: lane,
    onDrop: ({ data }) => move(data as Item, lane as 'todo' | 'done')
   }}
  >
   {#each board[lane as 'todo' | 'done'] as item (item.id)}
    <div use:dragDrop.draggable={{ id: item.id, container: lane, data: item }}>
     {item.label}
    </div>
   {/each}
  </div>
 {/each}
</dragDrop.Provider>`,
    'Kanban (3 columns)': `<script lang="ts">
 import { useDragDrop } from 'sv5ui-plus';

 type Task = { id: string; label: string; lane: 'todo' | 'progress' | 'done' };

 let board = $state<Record<Task['lane'], Task[]>>({
   todo: [{ id: '1', label: 'Wireframes', lane: 'todo' }],
   progress: [],
   done: []
 });

 const dragDrop = useDragDrop();
 // Use a separate useDragDrop() instance per board to avoid droppable id collisions.
</script>`,
    'Conditional drop': `<div
 use:dragDrop.droppable={{
  id: 'archive',
  accept: ({ data }) => !String(data).toLowerCase().includes('draft'),
  onDrop: ({ data }) => moveToArchive(data)
 }}
>
 Archive
</div>`,
    'Manual markup': `<script lang="ts">
 import { useSortable } from 'sv5ui-plus';

 let items = $state([{ id: 'm1', label: 'Manual markup' }]);

 const sortable = useSortable({
   getItems: () => items,
   getId: (item) => item.id,
   handle: '[data-sortable-handle]',
   onReorder: (next) => (items = next)
 });
</script>

<sortable.Provider>
 <div use:sortable.container>
  {#each items as item, index (item.id)}
   <div use:sortable.item={{ index, item }}>
     <button type="button" data-sortable-handle>::</button>
     {item.label}
   </div>
  {/each}
 </div>
</sortable.Provider>`
}
