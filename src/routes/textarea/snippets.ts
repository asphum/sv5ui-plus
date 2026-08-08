import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    'Basic Usage': `<script lang="ts">
 import { Textarea } from 'svelora';
</script>

<Textarea placeholder="Enter text..." />`,
    Autoresize: `<script lang="ts">
 import { Textarea } from 'svelora';
</script>

<Textarea autoresize placeholder="Type to grow..." rows={1} />
<Textarea autoresize maxrows={5} placeholder="Grows up to 5 rows..." rows={1} />`,
    'FormField Integration': `<script lang="ts">
 import { Textarea, FormField } from 'svelora';
</script>

<FormField label="Description" required>
 <Textarea leadingIcon="icon-[lucide--file-text]" placeholder="Describe the issue..." />
</FormField>`
}
