export const quickExample = `<script lang="ts">
 import { FormSelect } from 'sv5ui-plus';

 let status = $state('draft');
</script>

<FormSelect
 name="status"
 bind:value={status}
 items={[
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' }
 ]}
/>`
