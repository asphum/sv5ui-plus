import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    Basic: `<script lang="ts">
 import { Command } from 'svelora';
 import type { CommandGroup } from 'svelora';

 const groups: CommandGroup[] = [
  {
   id: 'suggestions',
   label: 'Suggestions',
   items: [
    { value: 'calendar', label: 'Calendar', icon: 'icon-[lucide--calendar]' },
    { value: 'search-emoji', label: 'Search Emoji', icon: 'icon-[lucide--smile]' },
    { value: 'calculator', label: 'Calculator', icon: 'icon-[lucide--calculator]' }
   ]
  }
 ];
</script>

<Command groups={groups} placeholder="Type a command or search..." />`,
    'Items with Descriptions': `<script lang="ts">
 import { Command } from 'svelora';
 import type { CommandGroup } from 'svelora';

 const groups: CommandGroup[] = [
  {
   id: 'general',
   label: 'General',
   items: [
    {
     value: 'appearance',
     label: 'Appearance',
     icon: 'icon-[lucide--paintbrush]',
     description: 'Change theme and colors'
    },
    {
     value: 'language',
     label: 'Language',
     icon: 'icon-[lucide--globe]',
     description: 'Select preferred language'
    }
   ]
  }
 ];
</script>

<Command groups={groups} placeholder="Search settings..." />`,
    'onSelect Callback': `<script lang="ts">
 import { Command, Badge } from 'svelora';
 import type { CommandGroup } from 'svelora';

 let lastSelected = $state('');

 const groups: CommandGroup[] = [
  {
   id: 'fruits',
   label: 'Fruits',
   items: [
    {
     value: 'apple',
     label: 'Apple',
     icon: 'icon-[lucide--apple]',
     onSelect: () => (lastSelected = 'Apple')
    },
    {
     value: 'banana',
     label: 'Banana',
     icon: 'icon-[lucide--banana]',
     onSelect: () => (lastSelected = 'Banana')
    }
   ]
  }
 ];
</script>

<Badge label={lastSelected || 'None'} color={lastSelected ? 'success' : 'surface'} />
<Command groups={groups} placeholder="Select a fruit..." />`,
    'Custom Empty Slot': `<script lang="ts">
 import { Command } from 'svelora';
 import type { CommandGroup } from 'svelora';

 const groups: CommandGroup[] = [
  {
   id: 'suggestions',
   label: 'Suggestions',
   items: [{ value: 'calendar', label: 'Calendar', icon: 'icon-[lucide--calendar]' }]
  }
 ];
</script>

<Command {groups} placeholder="Search something that does not exist...">
 {#snippet empty({ search })}
  <div class="flex flex-col items-center gap-2 py-6">
   <span class="text-2xl">Search</span>
   <span class="text-sm text-on-surface-variant">
    {search ? 'No results for "' + search + '"' : 'Start typing to search'}
   </span>
  </div>
 {/snippet}
</Command>`,
    'Footer Slot': `<script lang="ts">
 import { Command, Kbd } from 'svelora';
 import type { CommandGroup } from 'svelora';

 const groups: CommandGroup[] = [
  {
   id: 'suggestions',
   label: 'Suggestions',
   items: [{ value: 'calendar', label: 'Calendar', icon: 'icon-[lucide--calendar]' }]
  }
 ];
</script>

<Command {groups} placeholder="Search...">
 {#snippet footer()}
  <div class="flex items-center justify-between px-3 py-2 text-xs text-on-surface-variant">
   <div class="flex items-center gap-2">
    <span class="flex items-center gap-1"><Kbd value="↑" size="sm" /><Kbd value="↓" size="sm" /> Navigate</span>
    <span class="flex items-center gap-1"><Kbd value="↵" size="sm" /> Select</span>
   </div>
   <span class="flex items-center gap-1"><Kbd value="Esc" size="sm" /> Close</span>
  </div>
 {/snippet}
</Command>`,
    'External Filtering (shouldFilter=false)': `<script lang="ts">
 import { Command } from 'svelora';
 import type { CommandGroup } from 'svelora';

 let search = $state('');

 const allCountries = [
  { value: 'us', label: 'United States', icon: 'circle-flags:us' },
  { value: 'jp', label: 'Japan', icon: 'circle-flags:jp' },
  { value: 'vn', label: 'Vietnam', icon: 'circle-flags:vn' }
 ];

 const filteredCountries = $derived(
  search ? allCountries.filter((country) => country.label.toLowerCase().includes(search.toLowerCase())) : allCountries
 );

 const groups = $derived<CommandGroup[]>([
  {
   id: 'countries',
   label: search ? 'Results for "' + search + '" (' + filteredCountries.length + ')' : 'All countries (' + allCountries.length + ')',
   items: filteredCountries
  }
 ]);
</script>

<Command
 shouldFilter={false}
 bind:search
 groups={groups}
 placeholder="Search countries..."
/>`,
    'Inside Modal': `<script lang="ts">
 import { Command, Modal, Button, Kbd } from 'svelora';
 import type { CommandGroup } from 'svelora';

 const groups: CommandGroup[] = [
  {
   id: 'general',
   label: 'General',
   items: [
    { value: 'appearance', label: 'Appearance', icon: 'icon-[lucide--paintbrush]' },
    { value: 'language', label: 'Language', icon: 'icon-[lucide--globe]' }
   ]
  }
 ];
</script>

<Modal>
 <Button variant="outline" leadingIcon="icon-[lucide--search]">
  Search...
  <Kbd value="meta" size="sm" />
  <Kbd value="K" size="sm" />
 </Button>

 {#snippet content()}
  <Command groups={groups} placeholder="Search settings..." />
 {/snippet}
</Modal>`
}
