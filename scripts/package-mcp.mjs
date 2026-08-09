import { chmod, copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const projectRoot = process.cwd()
const packageJsonPath = path.join(projectRoot, 'package.json')
const navigationPath = path.join(projectRoot, 'src/internal/docs/navigation.ts')
const serverSourcePath = path.join(projectRoot, 'mcp/sv5ui-plus-docs/server.mjs')
const installTemplateSourcePath = path.join(projectRoot, 'mcp/sv5ui-plus-docs/install-template.mjs')
const distMcpDir = path.join(projectRoot, 'dist/mcp')
const distServerPath = path.join(distMcpDir, 'server.mjs')
const distDataPath = path.join(distMcpDir, 'sv5ui-plus-docs.data.json')
const distCursorTemplatePath = path.join(distMcpDir, 'cursor.mcp.json')
const distInstallTemplatePath = path.join(distMcpDir, 'install-template.mjs')

function extractDocSlugs(navigationSource) {
    const componentSlugs = []
    const hookSlugs = []

    for (const match of navigationSource.matchAll(/href:\s*'\/docs\/components\/([^']+)'/g)) {
        componentSlugs.push(match[1])
    }

    for (const match of navigationSource.matchAll(/href:\s*'\/docs\/hooks\/([^']+)'/g)) {
        hookSlugs.push(match[1])
    }

    return {
        components: Array.from(new Set(componentSlugs)),
        hooks: Array.from(new Set(hookSlugs))
    }
}

async function readRouteSource(slug) {
    const routePath = path.join(projectRoot, 'src/routes', slug, '+page.svelte')
    return await readFile(routePath, 'utf8')
}

const [packageJsonSource, navigationSource] = await Promise.all([
    readFile(packageJsonPath, 'utf8'),
    readFile(navigationPath, 'utf8')
])

const packageJson = JSON.parse(packageJsonSource)
const slugs = extractDocSlugs(navigationSource)
const allSlugs = Array.from(new Set([...slugs.components, ...slugs.hooks]))
const pages = Object.fromEntries(
    await Promise.all(allSlugs.map(async (slug) => [slug, await readRouteSource(slug)]))
)

const payload = {
    version: 1,
    packageName: packageJson.name,
    packageVersion: packageJson.version,
    generatedAt: new Date().toISOString(),
    slugs,
    pages
}

const cursorTemplate = {
    mcpServers: {
        'sv5ui-plus-docs': {
            type: 'stdio',
            command: 'node',
            args: ['./node_modules/sv5ui-plus/dist/mcp/server.mjs'],
            cwd: '${workspaceFolder}'
        }
    }
}

await mkdir(distMcpDir, { recursive: true })
await copyFile(serverSourcePath, distServerPath)
await copyFile(installTemplateSourcePath, distInstallTemplatePath)
await chmod(distServerPath, 0o755)
await chmod(distInstallTemplatePath, 0o755)
await writeFile(distDataPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
await writeFile(distCursorTemplatePath, `${JSON.stringify(cursorTemplate, null, 2)}\n`, 'utf8')

console.log(`Packaged MCP assets for ${allSlugs.length} docs routes into dist/mcp`)
