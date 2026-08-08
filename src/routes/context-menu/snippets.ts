import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    Basic: `<script lang="ts">
 import { ContextMenu } from 'svelora';

 const items = [
  { label: 'Back', icon: 'icon-[lucide--arrow-left]' },
  { label: 'Reload', icon: 'icon-[lucide--refresh-cw]' },
  { type: 'separator' as const },
  { label: 'Save As...', icon: 'icon-[lucide--save]' }
 ];
</script>

<ContextMenu {items}>
 <div class="flex h-36 items-center justify-center rounded-lg border-2 border-dashed border-outline-variant">
  Right-click here
 </div>
</ContextMenu>`,
    'Checkbox Items': `<script lang="ts">
 import { ContextMenu } from 'svelora';

 let showStatusBar = $state(true);
 let showPanel = $state(true);

 const items = $derived([
  { type: 'label' as const, label: 'Appearance' },
  {
   type: 'checkbox' as const,
   label: 'Status Bar',
   checked: showStatusBar,
   closeOnSelect: false,
   onCheckedChange: (value: boolean) => (showStatusBar = value)
  },
  {
   type: 'checkbox' as const,
   label: 'Panel',
   checked: showPanel,
   closeOnSelect: false,
   onCheckedChange: (value: boolean) => (showPanel = value)
  }
 ]);
</script>

<ContextMenu {items}>
 <div class="flex h-36 items-center justify-center rounded-lg border-2 border-dashed border-outline-variant">
  Right-click for checkboxes
 </div>
</ContextMenu>`,
    'Radio Items': `<script lang="ts">
 import { ContextMenu } from 'svelora';
 import type { ContextMenuItem, ContextMenuRadioGroup } from 'svelora';

 let value = $state('system');

 const items: ContextMenuItem[] = [
  { type: 'label', label: 'Theme' },
  { type: 'radio', label: 'Light', value: 'light' },
  { type: 'radio', label: 'Dark', value: 'dark' },
  { type: 'radio', label: 'System', value: 'system' }
 ];

 const radioGroups: ContextMenuRadioGroup[] = [
  {
   name: 'theme',
   value,
   onValueChange: (next: string) => (value = next)
  }
 ];
</script>

<ContextMenu {items} {radioGroups}>
 <div class="flex h-36 items-center justify-center rounded-lg border-2 border-dashed border-outline-variant">
  Right-click for radio items
 </div>
</ContextMenu>`,
    'Custom Header/Footer': `<script lang="ts">
 import { ContextMenu, Separator } from 'svelora';

 const items = [
  { label: 'Profile' },
  { label: 'Billing' },
  { label: 'Settings' }
 ];
</script>

<ContextMenu {items}>
 <div class="flex h-36 items-center justify-center rounded-lg border-2 border-dashed border-outline-variant">
  Right-click for header/footer
 </div>

 {#snippet header()}
  <div class="px-3 py-2">
   <p class="text-sm font-medium">John Doe</p>
   <p class="text-xs text-on-surface-variant">john@example.com</p>
  </div>
  <Separator />
 {/snippet}

 {#snippet footer({ close })}
  <Separator />
  <button class="w-full px-2 py-1.5 text-left text-sm text-error" onclick={close}>
   Log out
  </button>
 {/snippet}
</ContextMenu>`,
    'Custom Content': `<script lang="ts">
 import { ContextMenu } from 'svelora';
</script>

<ContextMenu>
 <div class="flex h-36 items-center justify-center rounded-lg border-2 border-dashed border-outline-variant">
  Right-click for custom content
 </div>

 {#snippet content({ close })}
  <div class="p-4">
   <p class="mb-3 text-sm font-medium">Choose a color</p>
   <div class="grid grid-cols-5 gap-2">
    {#each ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500'] as color (color)}
     <button class={'size-8 rounded-full ' + color} onclick={close} aria-label={color}></button>
    {/each}
   </div>
  </div>
 {/snippet}
</ContextMenu>`
}
