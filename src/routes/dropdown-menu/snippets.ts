import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    Basic: `<script lang="ts">
 import { DropdownMenu, Button } from 'svelora';

 const items = [
  { label: 'New File', icon: 'icon-[lucide--file-plus]' },
  { label: 'Open File...', icon: 'icon-[lucide--folder-open]' },
  { type: 'separator' as const },
  { label: 'Save', icon: 'icon-[lucide--save]' }
 ];
</script>

<DropdownMenu {items}>
 {#snippet children({ props })}
  <Button {...props} variant="outline">File</Button>
 {/snippet}
</DropdownMenu>`,
    'Checkbox Items': `<script lang="ts">
 import { DropdownMenu, Button } from 'svelora';

 let showStatusBar = $state(true);
 let showPanel = $state(true);

 const items = $derived([
  { type: 'label' as const, label: 'Appearance' },
  {
   type: 'checkbox' as const,
   label: 'Status Bar',
   checked: showStatusBar,
   onCheckedChange: (value: boolean) => (showStatusBar = value)
  },
  {
   type: 'checkbox' as const,
   label: 'Panel',
   checked: showPanel,
   onCheckedChange: (value: boolean) => (showPanel = value)
  }
 ]);
</script>

<DropdownMenu {items}>
 {#snippet children({ props })}
  <Button {...props} variant="outline">View</Button>
 {/snippet}
</DropdownMenu>`,
    'Radio Items': `<script lang="ts">
 import { DropdownMenu, Button } from 'svelora';
 import type { DropdownMenuItem, DropdownMenuRadioGroup } from 'svelora';

 let value = $state('system');

 const items: DropdownMenuItem[] = [
  { type: 'label', label: 'Theme' },
  { type: 'radio', label: 'Light', value: 'light' },
  { type: 'radio', label: 'Dark', value: 'dark' },
  { type: 'radio', label: 'System', value: 'system' }
 ];

 const radioGroups: DropdownMenuRadioGroup[] = [
  {
   name: 'theme',
   value,
   onValueChange: (next: string) => (value = next)
  }
 ];
</script>

<DropdownMenu {items} {radioGroups}>
 {#snippet children({ props })}
  <Button {...props} variant="outline">Theme</Button>
 {/snippet}
</DropdownMenu>`,
    Controlled: `<script lang="ts">
 import { DropdownMenu, Button } from 'svelora';

 const items = [
  { label: 'Profile' },
  { label: 'Settings' },
  { type: 'separator' as const },
  { label: 'Log out' }
 ];

 let open = $state(false);
</script>

<DropdownMenu {items} bind:open>
 {#snippet children({ props })}
  <Button {...props} variant={open ? 'solid' : 'outline'}>Menu</Button>
 {/snippet}
</DropdownMenu>

<Button variant="soft" onclick={() => (open = !open)}>
 {open ? 'Close' : 'Open'}
</Button>`,
    'Custom Header/Footer': `<script lang="ts">
 import { DropdownMenu, Button, Separator } from 'svelora';

 const items = [
  { label: 'Profile' },
  { label: 'Billing' },
  { label: 'Settings' }
 ];
</script>

<DropdownMenu {items}>
 {#snippet children({ props })}
  <Button {...props} variant="outline">Account</Button>
 {/snippet}

 {#snippet header()}
  <div class="px-3 py-2">
   <p class="text-sm font-medium">John Doe</p>
   <p class="text-xs text-on-surface-variant">john@example.com</p>
  </div>
  <Separator />
 {/snippet}

 {#snippet footer({ close })}
  <Separator />
  <div class="p-1">
   <Button variant="ghost" size="sm" class="w-full justify-start" onclick={close}>
    Log out
   </Button>
  </div>
 {/snippet}
</DropdownMenu>`
}
