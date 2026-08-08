import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    Basic: `<script lang="ts">
 import { useClipboard, Button, Badge } from 'svelora';

 const clipboard = useClipboard();
</script>

<Button
 onclick={() => clipboard.copy('Hello from Svelora!')}
 icon={clipboard.copied ? 'icon-[lucide--check]' : 'icon-[lucide--copy]'}
 color={clipboard.copied ? 'success' : 'primary'}
>
 {clipboard.copied ? 'Copied!' : 'Copy Text'}
</Button>

<Badge
 label={clipboard.copied ? 'Copied' : 'Ready'}
 color={clipboard.copied ? 'success' : 'surface'}
 variant="subtle"
/>`,
    'Custom Timeout': `<script lang="ts">
 import { useClipboard, Button } from 'svelora';

 const clipboard = useClipboard({ timeout: 5000 });
</script>

<Button
 onclick={() => clipboard.copy('Copied with 5s timeout!')}
 icon={clipboard.copied ? 'icon-[lucide--check]' : 'icon-[lucide--copy]'}
 color={clipboard.copied ? 'success' : 'secondary'}
 variant="outline"
>
 {clipboard.copied ? 'Copied! (5s reset)' : 'Copy (5s timeout)'}
</Button>`,
    'Copy from Input': `<script lang="ts">
 import { useClipboard, Button, Input } from 'svelora';

 const clipboard = useClipboard();
 let value = $state('Hello, Svelora!');
</script>

<div class="flex items-center gap-2">
 <Input bind:value />
 <Button
  onclick={() => clipboard.copy(value)}
  icon={clipboard.copied ? 'icon-[lucide--check]' : 'icon-[lucide--copy]'}
  variant="outline"
  square
 />
</div>`,
    'Real World: Install Commands': `<script lang="ts">
 import { useClipboard, Button, Icon } from 'svelora';

 const clipboard = useClipboard();

 const snippets = [
  { label: 'npm', text: 'npm install svelora' },
  { label: 'pnpm', text: 'pnpm add svelora' },
  { label: 'yarn', text: 'yarn add svelora' }
 ];
</script>

{#each snippets as snippet (snippet.label)}
 <div class="flex items-center justify-between rounded-md p-3">
  <div class="flex items-center gap-3">
   <Icon name="icon-[lucide--terminal]" size="16" />
   <code>{snippet.text}</code>
  </div>
  <Button
   onclick={() => clipboard.copy(snippet.text)}
   icon={clipboard.copied ? 'icon-[lucide--check]' : 'icon-[lucide--clipboard]'}
   variant="ghost"
   size="xs"
   square
  />
 </div>
{/each}`,
    'Real World: Share Link': `<script lang="ts">
 import { useClipboard, Button, Card } from 'svelora';

 const clipboard = useClipboard();
 const url = 'https://svelora.vercel.app/use-clipboard';
</script>

<Card class="p-4">
 <div class="space-y-3">
  <p class="text-sm font-medium">Share this page</p>
  <div class="flex items-center gap-2">
   <div class="flex-1 truncate rounded-md px-3 py-2 font-mono text-xs">{url}</div>
   <Button
    onclick={() => clipboard.copy(url)}
    icon={clipboard.copied ? 'icon-[lucide--check]' : 'icon-[lucide--link]'}
    variant="soft"
    size="sm"
   >
    {clipboard.copied ? 'Copied!' : 'Copy Link'}
   </Button>
  </div>
 </div>
</Card>`
}
