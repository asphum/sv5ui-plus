import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    Basic: `<script lang="ts">
 import { Table } from 'sv5ui';

 const data = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'User' },
  { name: 'Charlie', email: 'charlie@example.com', role: 'Editor' }
 ];
</script>

<Table {data} />`,
    Sorting: `<script lang="ts">
 import { Table } from 'sv5ui';

 const data = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'User' }
 ];

 const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true }
 ];

 let sorting = $state([{ key: 'name', direction: 'asc' as const }]);
</script>

<Table data={data} {columns} bind:sorting rowKey="id" />`,
    Pagination: `<script lang="ts">
 import { Table } from 'sv5ui';

 const data = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: \`User \${index + 1}\`,
  email: \`user\${index + 1}@example.com\`
 }));

 let page = $state(1);
 const pageSize = 10;
</script>

<Table {data} bind:page {pageSize} rowKey="id" />`,
    'Row Selection': `<script lang="ts">
 import { Table } from 'sv5ui';

 const data = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'User' }
 ];

 let rowSelection = $state<Record<string, boolean>>({});
</script>

<Table data={data} selectable bind:rowSelection rowKey="id" />`
}
