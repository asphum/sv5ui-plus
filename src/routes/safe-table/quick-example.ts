export const quickExample = `<script lang="ts">
 import { SafeTable } from 'sv5ui-plus';

 const data = [
  { id: '1', name: 'Alice', role: 'Admin' },
  { id: '2', name: 'Bob', role: 'Editor' }
 ];
</script>

<SafeTable {data} rowKey="id" />`
