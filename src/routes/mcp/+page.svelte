<script lang="ts">
    import { CodeBlock, Link } from '$lib/compat.js'
    import { renderHighlightedCode } from '$internal/docs/code-block.js'

    const packageInstallCode = `bun add sv5ui-plus`

    const packageCursorConfigCode = `{
  "mcpServers": {
    "sv5ui-plus-docs": {
      "type": "stdio",
      "command": "node",
      "args": ["./node_modules/sv5ui-plus/dist/mcp/server.mjs"],
      "cwd": "\${workspaceFolder}"
    }
  }
}`

    const packageCursorConfigBinCode = `{
  "mcpServers": {
    "sv5ui-plus-docs": {
      "type": "stdio",
      "command": "sv5ui-plus-mcp-docs",
      "cwd": "\${workspaceFolder}"
    }
  }
}`

    const packageScriptCode = `{
  "scripts": {
    "mcp:sv5ui-plus-docs": "node ./node_modules/sv5ui-plus/dist/mcp/server.mjs"
  }
}`

    const packageScriptExportCode = `{
  "scripts": {
    "mcp:sv5ui-plus-docs": "node --eval \\"import('sv5ui-plus/mcp/server')\\""
  }
}`

    const packageTemplatePathCode = `./node_modules/sv5ui-plus/dist/mcp/cursor.mcp.json`
    const packageInstallTemplateCommandCode = `sv5ui-plus-mcp-install-template`
    const packageInstallTemplateForceCommandCode = `sv5ui-plus-mcp-install-template --force`
    const packageInstallTemplateScriptCode = `{
  "scripts": {
    "mcp:install-template": "node ./node_modules/sv5ui-plus/dist/mcp/install-template.mjs"
  }
}`

    const localCursorConfigCode = `{
  "mcpServers": {
    "sv5ui-plus-docs": {
      "type": "stdio",
      "command": "bun",
      "args": ["run", "mcp:sv5ui-plus-docs"],
      "cwd": "\${workspaceFolder}"
    }
  }
}`

    const packageRunCode = `node ./node_modules/sv5ui-plus/dist/mcp/server.mjs`
    const localRunCode = `bun run mcp:sv5ui-plus-docs`

    const toolsCode = `- sv5ui_plus_docs_list_slugs
- sv5ui_plus_docs_get_page_source { slug }
- sv5ui_plus_docs_get_section_snippets { slug }
- sv5ui_plus_docs_render_shiki { code, isDarkMode? }`

    const promptExamplesCode = `- "List docs slugs and summarize the available components and hooks"
- "Get section snippets for select-menu and summarize all sections"
- "Render shiki for this snippet (dark=false) and return the HTML"`

    let isDarkMode = $state(true)
    let packageInstallHtml = $state('')
    let packageCursorConfigHtml = $state('')
    let packageCursorConfigBinHtml = $state('')
    let packageScriptHtml = $state('')
    let packageScriptExportHtml = $state('')
    let packageTemplatePathHtml = $state('')
    let packageInstallTemplateCommandHtml = $state('')
    let packageInstallTemplateForceCommandHtml = $state('')
    let packageInstallTemplateScriptHtml = $state('')
    let packageRunHtml = $state('')
    let localCursorConfigHtml = $state('')
    let localRunHtml = $state('')
    let toolsHtml = $state('')
    let promptsHtml = $state('')

    $effect(() => {
        if (typeof document === 'undefined') return

        const root = document.documentElement
        const updateMode = () => {
            isDarkMode = root.classList.contains('dark')
        }

        updateMode()

        const observer = new MutationObserver(() => {
            updateMode()
        })

        observer.observe(root, { attributes: true, attributeFilter: ['class'] })
        return () => observer.disconnect()
    })

    $effect(() => {
        const darkMode = isDarkMode
        let cancelled = false

        const tasks = [
            renderHighlightedCode(packageInstallCode, darkMode).then((html) => {
                if (!cancelled) packageInstallHtml = html
            }),
            renderHighlightedCode(packageCursorConfigCode, darkMode).then((html) => {
                if (!cancelled) packageCursorConfigHtml = html
            }),
            renderHighlightedCode(packageCursorConfigBinCode, darkMode).then((html) => {
                if (!cancelled) packageCursorConfigBinHtml = html
            }),
            renderHighlightedCode(packageScriptCode, darkMode).then((html) => {
                if (!cancelled) packageScriptHtml = html
            }),
            renderHighlightedCode(packageScriptExportCode, darkMode).then((html) => {
                if (!cancelled) packageScriptExportHtml = html
            }),
            renderHighlightedCode(packageTemplatePathCode, darkMode).then((html) => {
                if (!cancelled) packageTemplatePathHtml = html
            }),
            renderHighlightedCode(packageInstallTemplateCommandCode, darkMode).then((html) => {
                if (!cancelled) packageInstallTemplateCommandHtml = html
            }),
            renderHighlightedCode(packageInstallTemplateForceCommandCode, darkMode).then((html) => {
                if (!cancelled) packageInstallTemplateForceCommandHtml = html
            }),
            renderHighlightedCode(packageInstallTemplateScriptCode, darkMode).then((html) => {
                if (!cancelled) packageInstallTemplateScriptHtml = html
            }),
            renderHighlightedCode(packageRunCode, darkMode).then((html) => {
                if (!cancelled) packageRunHtml = html
            }),
            renderHighlightedCode(localCursorConfigCode, darkMode).then((html) => {
                if (!cancelled) localCursorConfigHtml = html
            }),
            renderHighlightedCode(localRunCode, darkMode).then((html) => {
                if (!cancelled) localRunHtml = html
            }),
            renderHighlightedCode(toolsCode, darkMode).then((html) => {
                if (!cancelled) toolsHtml = html
            }),
            renderHighlightedCode(promptExamplesCode, darkMode).then((html) => {
                if (!cancelled) promptsHtml = html
            })
        ]

        void Promise.all(tasks)

        return () => {
            cancelled = true
        }
    })
</script>

<div class="space-y-10">
    <section class="space-y-4 border-b border-outline-variant/60 pb-8">
        <nav class="text-sm text-on-surface-variant">
            <ol class="flex flex-wrap items-center gap-2">
                <li><Link href="/docs" raw class="hover:text-primary">Docs</Link></li>
                <li>/</li>
                <li>MCP</li>
            </ol>
        </nav>

        <div class="space-y-3">
            <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">Automation</p>
            <h1 class="text-4xl font-semibold tracking-tight">MCP for Cursor IDE</h1>
            <p class="max-w-3xl text-lg leading-8 text-on-surface-variant">
                เชื่อมเครื่องมือช่วยงาน docs ของ SV5UI Plus เข้ากับ Cursor IDE ผ่าน MCP เพื่อให้ Agent เรียก tool ได้ตรง ๆ
                เช่น list slugs, ดึง section snippets, และ render shiki
            </p>
        </div>
    </section>

    <section class="space-y-4">
        <h2 id="After-bun-add-sv5ui-plus" class="text-xl font-semibold">
<a href="#After-bun-add-sv5ui-plus" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        After `bun add sv5ui-plus`
                    </a>
</h2>
        <ol class="list-decimal space-y-2 pl-5 text-on-surface-variant">
            <li>ติดตั้งแพ็กเกจในโปรเจกต์ของคุณก่อนด้วย <span class="font-medium text-on-surface">bun add sv5ui-plus</span></li>
            <li>เพิ่ม config MCP ใน <span class="font-medium text-on-surface">.cursor/mcp.json</span> ของโปรเจกต์นั้น</li>
            <li>Restart Cursor 1 ครั้ง เพื่อให้โหลด MCP servers ใหม่</li>
            <li>เข้า Agent Mode แล้วลองเรียก tools ได้ทันที</li>
        </ol>
        <CodeBlock title="Install" code={packageInstallCode} html={packageInstallHtml} />
    </section>

    <section class="space-y-4">
        <h2 id="Cursor-Config-For-Consumer-App" class="text-xl font-semibold">
<a href="#Cursor-Config-For-Consumer-App" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Cursor Config For Consumer App
                    </a>
</h2>
        <p class="text-on-surface-variant">
            ถ้าคุณติดตั้งผ่าน npm package ให้ชี้ไปที่ไฟล์ server ใน <span class="font-medium text-on-surface">node_modules/sv5ui-plus/dist/mcp/server.mjs</span>
        </p>
        <CodeBlock title="mcp.json" code={packageCursorConfigCode} html={packageCursorConfigHtml} />
        <CodeBlock title="mcp.json via bin" code={packageCursorConfigBinCode} html={packageCursorConfigBinHtml} />
        <p class="text-on-surface-variant">
            ถ้าไม่อยากเขียนเอง สามารถ copy template ที่แพ็กไปกับ package ได้จาก path นี้
        </p>
        <CodeBlock title="template path" code={packageTemplatePathCode} html={packageTemplatePathHtml} />
        <p class="text-on-surface-variant">
            หรือใช้ helper command นี้เพื่อสร้าง <span class="font-medium text-on-surface">.cursor/mcp.json</span> ให้ทันที
        </p>
        <CodeBlock
            title="install template"
            code={packageInstallTemplateCommandCode}
            html={packageInstallTemplateCommandHtml}
        />
        <CodeBlock
            title="overwrite existing template"
            code={packageInstallTemplateForceCommandCode}
            html={packageInstallTemplateForceCommandHtml}
        />
    </section>

    <section class="space-y-4">
        <h2 id="Recommended-Script-For-Consumer-App" class="text-xl font-semibold">
<a href="#Recommended-Script-For-Consumer-App" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Recommended Script For Consumer App
                    </a>
</h2>
        <p class="text-on-surface-variant">
            ถ้าต้องการคำสั่งสั้น ๆ ในโปรเจกต์ของคุณ ให้เพิ่ม script นี้ใน <span class="font-medium text-on-surface">package.json</span>
        </p>
        <CodeBlock title="package.json" code={packageScriptCode} html={packageScriptHtml} />
        <CodeBlock title="package.json via export" code={packageScriptExportCode} html={packageScriptExportHtml} />
        <CodeBlock
            title="package.json install template"
            code={packageInstallTemplateScriptCode}
            html={packageInstallTemplateScriptHtml}
        />
    </section>

    <section class="space-y-4">
        <h2 id="Run-Server-From-Package" class="text-xl font-semibold">
<a href="#Run-Server-From-Package" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Run Server From Package
                    </a>
</h2>
        <CodeBlock title="Command" code={packageRunCode} html={packageRunHtml} />
    </section>

    <section class="space-y-4">
        <h2 id="Use-From-The-SV5UI Plus-Repo" class="text-xl font-semibold">
<a href="#Use-From-The-SV5UI Plus-Repo" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Use From The SV5UI Plus Repo
                    </a>
</h2>
        <p class="text-on-surface-variant">
            ถ้าคุณเปิด repo นี้โดยตรง ยังใช้ workflow เดิมได้ผ่าน <span class="font-medium text-on-surface">bun run mcp:sv5ui-plus-docs</span>
        </p>
        <CodeBlock title="repo .cursor/mcp.json" code={localCursorConfigCode} html={localCursorConfigHtml} />
        <CodeBlock title="repo command" code={localRunCode} html={localRunHtml} />
    </section>

    <section class="space-y-4">
        <h2 id="Available-Tools" class="text-xl font-semibold">
<a href="#Available-Tools" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Available Tools
                    </a>
</h2>
        <p class="text-on-surface-variant">Tools จะปรากฏใน Cursor MCP tools เมื่อเปิดใช้งานสำเร็จ</p>
        <CodeBlock title="Tools" code={toolsCode} html={toolsHtml} />
    </section>

    <section class="space-y-4">
        <h2 id="Cursor-Prompt-Examples" class="text-xl font-semibold">
<a href="#Cursor-Prompt-Examples" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Cursor Prompt Examples
                    </a>
</h2>
        <CodeBlock title="Prompts" code={promptExamplesCode} html={promptsHtml} />
    </section>

    <section class="space-y-4">
        <h2 id="Notes" class="text-xl font-semibold">
<a href="#Notes" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Notes
                    </a>
</h2>
        <ul class="list-disc space-y-2 pl-5 text-on-surface-variant">
            <li>consumer app ไม่จำเป็นต้องมี source docs ของ repo เพราะ MCP จะอ่าน data ที่ pack มากับแพ็กเกจ</li>
            <li>config แบบ package แนะนำให้ใช้ <span class="font-medium text-on-surface">node</span> เพื่อไม่ต้องพึ่ง bun ตอนรัน MCP server</li>
            <li>ตอนนี้แพ็กเกจมีทั้ง <span class="font-medium text-on-surface">bin: sv5ui-plus-mcp-docs</span>, <span class="font-medium text-on-surface">bin: sv5ui-plus-mcp-install-template</span>, export path <span class="font-medium text-on-surface">sv5ui-plus/mcp/server</span>, และ template <span class="font-medium text-on-surface">sv5ui-plus/mcp/cursor-template</span></li>
            <li>ถ้าเปิด repo นี้โดยตรงยังใช้คำสั่ง <span class="font-medium text-on-surface">bun run mcp:sv5ui-plus-docs</span> ได้เหมือนเดิม</li>
            <li>helper install จะไม่เขียนทับไฟล์เดิม ยกเว้นคุณส่ง <span class="font-medium text-on-surface">--force</span></li>
            <li>อย่าใส่ secrets ลงใน <span class="font-medium text-on-surface">mcp.json</span> ตรง ๆ ให้ใช้ env vars แทน</li>
        </ul>
    </section>
</div>
