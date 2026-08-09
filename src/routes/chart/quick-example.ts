export const quickExample = `<script lang="ts">
 import { Chart } from 'sv5ui-plus';

 const data = {
   labels: ['Jan', 'Feb', 'Mar'],
   datasets: [{ label: 'Sales', data: [10, 20, 30] }]
 };
</script>

<div class="h-64 w-full">
  <Chart type="bar" {data} />
</div>`
