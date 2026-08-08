import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    'Basic Usage': `<script lang="ts">
 import { Input } from 'svelora';
</script>

<Input placeholder="Enter text..." />`,
    'Two-way Binding': `<script lang="ts">
 import { Input } from 'svelora';

 let value = $state('');
</script>

<Input bind:value leadingIcon="icon-[lucide--pencil]" placeholder="Type something..." />
<p>Value: {value || '(empty)'}</p>
<p>Length: {value.length}</p>`,
    Icons: `<script lang="ts">
 import { Input } from 'svelora';
</script>

<Input leadingIcon="icon-[lucide--search]" placeholder="Search..." />
<Input trailingIcon="icon-[lucide--eye]" placeholder="Password" type="password" />
<Input leadingIcon="icon-[lucide--mail]" trailingIcon="icon-[lucide--check]" placeholder="Email" type="email" />`,
    'FormField Integration': `<script lang="ts">
 import { Input, FormField } from 'svelora';
</script>

<FormField
 label="Email"
 description="We will use this to send you notifications."
 required
>
 <Input leadingIcon="icon-[lucide--mail]" placeholder="Enter your email" type="email" />
</FormField>

<FormField
 label="Password"
 help="Must be at least 8 characters."
 error="Password is too short."
>
 <Input trailingIcon="icon-[lucide--eye]" placeholder="Enter your password" type="password" />
</FormField>`,
    'FieldGroup Integration': `<script lang="ts">
 import { Input, FieldGroup } from 'svelora';
</script>

<FieldGroup orientation="horizontal">
 <Input placeholder="First name" />
 <Input placeholder="Last name" />
 <Input placeholder="Email" />
</FieldGroup>

<FieldGroup orientation="vertical">
 <Input placeholder="Street address" />
 <Input placeholder="City" />
 <Input placeholder="Zip code" />
</FieldGroup>`,
    'Real World Examples': `<script lang="ts">
 import { Input, FormField, FieldGroup } from 'svelora';
</script>

<FieldGroup>
 <Input leadingIcon="icon-[lucide--search]" placeholder="Search products..." />
 <Input leadingIcon="icon-[lucide--map-pin]" placeholder="Location" />
</FieldGroup>

<FormField label="Email" required>
 <Input leadingIcon="icon-[lucide--mail]" placeholder="john@example.com" type="email" />
</FormField>

<FormField label="Password" required help="Must be at least 8 characters.">
 <Input leadingIcon="icon-[lucide--lock]" placeholder="Enter your password" type="password" />
</FormField>`
}
