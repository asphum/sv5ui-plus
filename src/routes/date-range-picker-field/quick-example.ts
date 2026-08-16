export const quickExample = `<script lang="ts">
 import { DateRangePickerField } from 'sv5ui-plus';

 let start = $state('');
 let end = $state('');
</script>

<DateRangePickerField
 startName="startsAt"
 endName="endsAt"
 bind:start
 bind:end
/>`
