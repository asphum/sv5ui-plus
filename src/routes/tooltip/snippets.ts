import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    Basic: `<script lang="ts">
 import { Tooltip, Button } from 'svelora';
</script>

<Tooltip text="This is a tooltip">
 <Button variant="outline">Hover me</Button>
</Tooltip>`,
    Positions: `<script lang="ts">
 import { Tooltip, Button } from 'svelora';
</script>

<Tooltip text="I appear on top" side="top">
 <Button variant="soft">Top</Button>
</Tooltip>`,
    'Keyboard Shortcuts': `<script lang="ts">
 import { Tooltip, Button } from 'svelora';
</script>

<Tooltip text="Search" kbds={['meta', 'k']}>
 <Button icon="icon-[lucide--search]" variant="outline">Search</Button>
</Tooltip>`,
    Controlled: `<script lang="ts">
 import { Tooltip, Button } from 'svelora';

 let open = $state(false);
</script>

<Tooltip text="Hover to see state change" bind:open>
 <Button variant={open ? 'solid' : 'outline'}>Hover me</Button>
</Tooltip>`
}
