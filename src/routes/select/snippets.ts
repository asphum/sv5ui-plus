import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    'Basic Usage': `<script lang="ts">
 import { Select } from 'svelora';

 const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' }
 ];
</script>

<Select {items} placeholder="Pick a fruit..." />`,
    'Two-way Binding': `<script lang="ts">
 import { Select } from 'svelora';

 const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' }
 ];

 let value = $state('');
</script>

<Select bind:value {items} placeholder="Select a fruit..." leadingIcon="icon-[lucide--apple]" />
<p>Value: {value || '(empty)'}</p>`,
    'Items with Icons': `<script lang="ts">
 import { Select } from 'svelora';

 const items = [
  { value: 'home', label: 'Home', icon: 'icon-[lucide--home]' },
  { value: 'settings', label: 'Settings', icon: 'icon-[lucide--settings]' },
  { value: 'profile', label: 'Profile', icon: 'icon-[lucide--user]' }
 ];
</script>

<Select {items} placeholder="Choose a page..." />`,
    'Grouped Items': `<script lang="ts">
 import { Select } from 'svelora';
 import type { SelectItemType } from 'svelora';

 const items: SelectItemType[] = [
  { type: 'label', label: 'Fruits' },
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { type: 'separator' },
  { type: 'label', label: 'Vegetables' },
  { value: 'carrot', label: 'Carrot' }
 ];
</script>

<Select {items} placeholder="Pick an item..." />`,
    'FormField Integration': `<script lang="ts">
 import { Select, FormField } from 'svelora';
</script>

<FormField label="Country" description="Select your country of residence." required>
 <Select
  leadingIcon="icon-[lucide--globe]"
  items={[
   { value: 'us', label: 'United States' },
   { value: 'uk', label: 'United Kingdom' },
   { value: 'ca', label: 'Canada' }
  ]}
  placeholder="Choose a country"
 />
</FormField>

<FormField label="Role" error="Please select a role.">
 <Select
  items={[
   { value: 'admin', label: 'Admin' },
   { value: 'editor', label: 'Editor' },
   { value: 'viewer', label: 'Viewer' }
  ]}
  placeholder="Choose a role"
 />
</FormField>`,
    'Multiple selection': `<script lang="ts">
 import { Select } from 'svelora';

 const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' }
 ];

 const sections = [
  { value: 'home', label: 'Home', icon: 'icon-[lucide--home]' },
  { value: 'settings', label: 'Settings', icon: 'icon-[lucide--settings]' },
  { value: 'profile', label: 'Profile', icon: 'icon-[lucide--user]' }
 ];

 let value = $state<string[]>(['apple', 'banana']);
</script>

<Select multiple bind:value items={fruits} placeholder="Pick fruits..." />
<p>Selected: {JSON.stringify(value)}</p>

<Select
 multiple
 items={sections}
 separator=" • "
 leadingIcon="icon-[lucide--list-checks]"
 placeholder="Pick sections..."
/>`
}
