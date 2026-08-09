export const quickExample = `<script lang="ts">
 import { Fonts } from 'sv5ui-plus';
</script>

<Fonts
 families={[
  { name: 'Inter', variable: '--font-sans-family', weights: [400, 500, 600, 700] },
  { name: 'JetBrains Mono', variable: '--font-mono-family', weights: [400, 500, 700] },
  {
   provider: 'local',
   name: 'Sarabun',
   variable: '--font-sarabun-family',
   sources: [{ src: '/fonts/Sarabun-Regular.woff2', format: 'woff2', weight: 400 }]
  }
 ]}
/>`
