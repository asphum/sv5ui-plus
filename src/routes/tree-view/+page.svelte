<script lang="ts">
    import { TreeView } from '$lib/index.js'
    import type { TreeViewItem } from '$lib/index.js'
    
    const treeData: TreeViewItem[] = [
        {
            id: '1',
            label: 'src',
            icon: 'icon-[lucide--folder]',
            children: [
                {
                    id: '1-1',
                    label: 'lib',
                    icon: 'icon-[lucide--folder]',
                    children: [
                        { id: '1-1-1', label: 'index.ts', icon: 'icon-[lucide--file-code]' },
                        { id: '1-1-2', label: 'utils.ts', icon: 'icon-[lucide--file-code]' }
                    ]
                },
                {
                    id: '1-2',
                    label: 'routes',
                    icon: 'icon-[lucide--folder]',
                    children: [
                        { id: '1-2-1', label: '+page.svelte', icon: 'icon-[lucide--file]' },
                        { id: '1-2-2', label: '+layout.svelte', icon: 'icon-[lucide--file]' }
                    ]
                }
            ]
        },
        {
            id: '2',
            label: 'package.json',
            icon: 'icon-[lucide--file-json]'
        }
    ]
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">TreeView</h1>
        <p class="text-on-surface-variant">
            A component for displaying hierarchical data in a collapsible tree structure.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 id="Usage" class="text-lg font-semibold">
<a href="#Usage" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Usage
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Pass an array of <code class="rounded bg-surface-container-highest px-1">TreeItem</code> objects to the <code class="rounded bg-surface-container-highest px-1">items</code> prop. Each item must have an <code class="rounded bg-surface-container-highest px-1">id</code> and <code class="rounded bg-surface-container-highest px-1">label</code>.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex justify-center">
            <div class="w-full max-w-sm p-4 bg-surface rounded-lg border border-outline-variant">
                <TreeView items={treeData} />
            </div>
        </div>
    </section>
</div>
