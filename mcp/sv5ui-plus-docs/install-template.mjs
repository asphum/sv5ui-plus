#!/usr/bin/env node

import { access, copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const args = new Set(process.argv.slice(2))
const force = args.has('--force')
const cwd = process.cwd()
const targetDir = path.join(cwd, '.cursor')
const targetPath = path.join(targetDir, 'mcp.json')

async function resolveTemplatePath() {
    const candidates = [
        path.join(__dirname, 'cursor.mcp.json'),
        path.resolve(__dirname, '../../dist/mcp/cursor.mcp.json')
    ]

    for (const candidate of candidates) {
        try {
            await access(candidate)
            return candidate
        } catch {
            // Try next candidate.
        }
    }

    throw new Error('Could not find cursor.mcp.json template for SV5UI Plus MCP.')
}

async function main() {
    const templatePath = await resolveTemplatePath()

    try {
        await access(targetPath)
        if (!force) {
            console.error(`Refusing to overwrite existing file: ${targetPath}`)
            console.error('Run again with --force if you want to replace it.')
            process.exitCode = 1
            return
        }
    } catch {
        // Continue and attempt to create the file.
    }

    await mkdir(targetDir, { recursive: true })
    await copyFile(templatePath, targetPath)

    console.log(`Installed SV5UI Plus MCP template at ${targetPath}`)
}

await main()
