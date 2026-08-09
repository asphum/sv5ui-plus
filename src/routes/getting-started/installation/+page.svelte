<script lang="ts">
    import { Card, Link } from '$lib/compat.js'

    const createCode = `npx sv create my-app
cd my-app`

    const installCode = `npm install svelora mode-watcher`

    const mcpInstallCode = `svelora-mcp-install-template`

    const mcpCursorConfigCode = `{
  "mcpServers": {
    "svelora-docs": {
      "type": "stdio",
      "command": "node",
      "args": ["./node_modules/svelora/dist/mcp/server.mjs"],
      "cwd": "\${workspaceFolder}"
    }
  }
}`

    const layoutCssCode = `@import 'tailwindcss';
@import 'svelora/theme.css';

@custom-variant dark (&:where(.dark, .dark *));`

    const layoutCode = `<script lang="ts">
 import './layout.css';
 import { ModeWatcher } from 'mode-watcher';

 let { children } = $props();
<` + `/script>

<ModeWatcher />
{@render children()}`

    const usageCode = `<script lang="ts">
 import { Button, Card, Badge } from 'svelora';
<` + `/script>

<Card>
 {#snippet header()}
 <h3>Welcome to Svelora</h3>
 <Badge label="New" variant="soft" color="success" />
 {/snippet}

 <p>Your first Svelora component!</p>

 {#snippet footer()}
 <Button variant="solid" color="primary" label="Get Started" />
 {/snippet}
</Card>`

    const editorPeers = `# Only needed if you import <Editor /> from "svelora/editor"
npm install @tiptap/core @tiptap/pm @tiptap/starter-kit \\
 @tiptap/extension-bubble-menu @tiptap/extension-character-count \\
 @tiptap/extension-drag-handle @tiptap/extension-image \\
 @tiptap/extension-mention @tiptap/extension-placeholder \\
 @tiptap/extension-table @tiptap/extension-table-cell \\
 @tiptap/extension-table-header @tiptap/extension-table-row \\
 @tiptap/extension-text-align @tiptap/extension-typography \\
 @tiptap/extension-youtube @tiptap/suggestion tiptap-markdown`

    const schemaPeers = `# <Form schema={...}> works with any one of these.
# Pick whichever you already use:
npm install zod
npm install valibot
npm install yup
npm install joi`
</script>

<div class="space-y-10">
    <section class="space-y-4 border-b border-outline-variant/60 pb-8">
        <nav class="text-sm text-on-surface-variant">
            <ol class="flex flex-wrap items-center gap-2">
                <li><Link href="/docs" raw class="hover:text-primary">Docs</Link></li>
                <li>/</li>
                <li><Link href="/docs" raw class="hover:text-primary">Getting Started</Link></li>
                <li>/</li>
                <li>Installation</li>
            </ol>
        </nav>

        <div class="space-y-3">
            <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
                Getting Started
            </p>
            <h1 class="text-4xl font-semibold tracking-tight">Installation</h1>
            <p class="max-w-3xl text-lg leading-8 text-on-surface-variant">
                Get `svelora` up and running in your SvelteKit project in a few minutes.
            </p>
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Prerequisites" class="text-xl font-semibold">
<a href="#Prerequisites" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Prerequisites
                    </a>
</h2>
        <p class="text-on-surface-variant">
            Svelora requires Svelte 5, Tailwind CSS 4, and SvelteKit. Make sure your project uses
            these before installing.
        </p>
    </section>

    <section class="space-y-4">
        <div class="flex items-center gap-3">
            <span class="inline-flex size-8 items-center justify-center rounded-full bg-primary-container font-semibold text-on-primary-container">1</span>
            <h2 id="Create-a-SvelteKit-project" class="text-xl font-semibold">
<a href="#Create-a-SvelteKit-project" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Create a SvelteKit project
                    </a>
</h2>
        </div>
        <p class="text-on-surface-variant">If you don't have a SvelteKit project yet, create one first.</p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{createCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <div class="flex items-center gap-3">
            <span class="inline-flex size-8 items-center justify-center rounded-full bg-primary-container font-semibold text-on-primary-container">2</span>
            <h2 id="Install-Svelora" class="text-xl font-semibold">
<a href="#Install-Svelora" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Install Svelora
                    </a>
</h2>
        </div>
        <p class="text-on-surface-variant">Add `svelora` and its peer dependencies to your project.</p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{installCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <div class="flex items-center gap-3">
            <span class="inline-flex size-8 items-center justify-center rounded-full bg-primary-container font-semibold text-on-primary-container">3</span>
            <h2 id="Configure-Tailwind-CSS" class="text-xl font-semibold">
<a href="#Configure-Tailwind-CSS" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Configure Tailwind CSS
                    </a>
</h2>
        </div>
        <p class="text-on-surface-variant">
            Import the Svelora theme in your `layout.css` file. This sets up the OKLCH color system,
            component styles, and dark mode support.
        </p>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm text-on-surface-variant">`src/routes/layout.css`</p>
            <pre class="overflow-x-auto text-sm"><code>{layoutCssCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <div class="flex items-center gap-3">
            <span class="inline-flex size-8 items-center justify-center rounded-full bg-primary-container font-semibold text-on-primary-container">4</span>
            <h2 id="Set-up-dark-mode" class="text-xl font-semibold">
<a href="#Set-up-dark-mode" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Set up dark mode
                    </a>
</h2>
        </div>
        <p class="text-on-surface-variant">
            Add `ModeWatcher` to your root layout for automatic dark mode support.
        </p>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm text-on-surface-variant">`src/routes/+layout.svelte`</p>
            <pre class="overflow-x-auto text-sm"><code>{layoutCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <div class="flex items-center gap-3">
            <span class="inline-flex size-8 items-center justify-center rounded-full bg-primary-container font-semibold text-on-primary-container">5</span>
            <h2 id="Start-using-components" class="text-xl font-semibold">
<a href="#Start-using-components" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Start using components
                    </a>
</h2>
        </div>
        <p class="text-on-surface-variant">
            Import and use any Svelora component in your Svelte files.
        </p>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm text-on-surface-variant">`src/routes/+page.svelte`</p>
            <pre class="overflow-x-auto text-sm"><code>{usageCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <div class="flex items-center gap-3">
            <span class="inline-flex size-8 items-center justify-center rounded-full bg-primary-container font-semibold text-on-primary-container">6</span>
            <h2 id="Optional-Enable-MCP-for-Cursor" class="text-xl font-semibold">
<a href="#Optional-Enable-MCP-for-Cursor" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        (Optional) Enable MCP for Cursor
                    </a>
</h2>
        </div>
        <p class="text-on-surface-variant">
            If you use Cursor, Svelora can install a ready-to-use MCP config for docs tools right
            after package install.
        </p>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm font-medium">Install the MCP template</p>
            <pre class="overflow-x-auto text-sm"><code>{mcpInstallCode}</code></pre>
        </Card>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm font-medium">Generated `.cursor/mcp.json`</p>
            <pre class="overflow-x-auto text-sm"><code>{mcpCursorConfigCode}</code></pre>
        </Card>
        <p class="text-sm text-on-surface-variant">
            Need the full setup guide? See
            <Link href="/docs/mcp" raw class="font-medium text-primary hover:underline">MCP for Cursor IDE</Link>.
        </p>
    </section>

    <section class="space-y-4">
        <div class="flex items-center gap-3">
            <span class="inline-flex size-8 items-center justify-center rounded-full bg-primary-container font-semibold text-on-primary-container">7</span>
            <h2 id="Optional-Install-peers-for-advanced-features" class="text-xl font-semibold">
<a href="#Optional-Install-peers-for-advanced-features" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        (Optional) Install peers for advanced features
                    </a>
</h2>
        </div>
        <p class="text-on-surface-variant">
            A few components rely on optional peer dependencies. Only install the ones you actually use.
        </p>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm font-medium">Editor (Tiptap stack)</p>
            <pre class="overflow-x-auto text-sm"><code>{editorPeers}</code></pre>
        </Card>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm font-medium">Form validation schema</p>
            <pre class="overflow-x-auto text-sm"><code>{schemaPeers}</code></pre>
        </Card>
    </section>
</div>
