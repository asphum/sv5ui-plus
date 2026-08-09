import { describe, expect, it } from 'vitest'
import {
    buildDefaultComponentExample,
    buildDefaultHookExample,
    extractSectionSnippet,
    getSectionSnippets,
    normalizeCode,
    renderHighlightedCode,
    slugToComponentName,
    slugToHookName
} from './code-block.js'

describe('slugToComponentName', () => {
    it('converts kebab-case to PascalCase', () => {
        expect(slugToComponentName('button')).toBe('Button')
        expect(slugToComponentName('code-block')).toBe('CodeBlock')
        expect(slugToComponentName('select-menu')).toBe('SelectMenu')
        expect(slugToComponentName('radio-group')).toBe('RadioGroup')
    })

    it('handles empty input', () => {
        expect(slugToComponentName('')).toBe('')
        expect(slugToComponentName('---')).toBe('')
    })

    it('preserves single segment casing for uppercase letters', () => {
        expect(slugToComponentName('kbd')).toBe('Kbd')
    })
})

describe('slugToHookName', () => {
    it('converts kebab-case to camelCase', () => {
        expect(slugToHookName('use-clipboard')).toBe('useClipboard')
        expect(slugToHookName('use-form-field')).toBe('useFormField')
        expect(slugToHookName('use-media-query')).toBe('useMediaQuery')
    })

    it('keeps single segment unchanged', () => {
        expect(slugToHookName('use')).toBe('use')
    })

    it('handles empty input gracefully', () => {
        expect(slugToHookName('')).toBe('')
        expect(slugToHookName('---')).toBe('')
    })
})

describe('buildDefaultComponentExample', () => {
    it('produces a valid Svelte snippet', () => {
        const result = buildDefaultComponentExample('color-picker')
        expect(result).toContain('<script lang="ts">')
        expect(result).toContain("import { ColorPicker } from 'sv5ui-plus'")
        expect(result).toContain('<ColorPicker />')
    })

    it('handles kebab-case slugs', () => {
        const result = buildDefaultComponentExample('password-input')
        expect(result).toContain("import { PasswordInput } from 'sv5ui-plus'")
        expect(result).toContain('<PasswordInput />')
    })
})

describe('buildDefaultHookExample', () => {
    it('produces a valid Svelte snippet', () => {
        const result = buildDefaultHookExample('use-sortable')
        expect(result).toContain("import { useSortable } from 'sv5ui-plus'")
        expect(result).toContain('const value = useSortable()')
    })
})

describe('normalizeCode', () => {
    it('trims leading and trailing empty lines', () => {
        expect(normalizeCode('\n\n  const x = 1\n\n')).toBe('const x = 1')
    })

    it('removes common indent', () => {
        expect(normalizeCode('    a\n    b')).toBe('a\nb')
    })

    it('returns empty string for whitespace only input', () => {
        expect(normalizeCode('   \n   \n')).toBe('')
    })
})

describe('extractSectionSnippet', () => {
    it('extracts content between section tags', () => {
        const section = `<section>
            <h2>Hello</h2>
            <Button label="x" />
        </section>`
        const snippet = extractSectionSnippet(section)
        expect(snippet).toContain('<Button label="x" />')
        expect(snippet).not.toContain('<h2>')
    })

    it('removes leading paragraphs', () => {
        const section = `<section>
            <h2>Title</h2>
            <p>description text</p>
            <Button />
        </section>`
        const snippet = extractSectionSnippet(section)
        expect(snippet).not.toContain('description text')
        expect(snippet).toContain('<Button />')
    })

    it('removes HTML comments', () => {
        const section = `<section>
            <!-- this is a comment -->
            <h2>Title</h2>
            <Button />
        </section>`
        const snippet = extractSectionSnippet(section)
        expect(snippet).not.toContain('this is a comment')
        expect(snippet).toContain('<Button />')
    })
})

describe('getSectionSnippets', () => {
    const source = `
        <section>
            <h2>First</h2>
            <Button label="a" />
        </section>
        <section>
            <h2>Second</h2>
            <Input />
        </section>
    `

    it('returns snippets in document order', () => {
        const result = getSectionSnippets(source)
        expect(result.map((entry) => entry.heading)).toEqual(['First', 'Second'])
    })

    it('uses overrides when heading matches', () => {
        const result = getSectionSnippets(source, {
            First: '<CustomComponent />'
        })
        expect(result[0]?.snippet).toBe('<CustomComponent />')
        expect(result[1]?.snippet).toContain('<Input />')
    })

    it('returns empty list when no sections present', () => {
        expect(getSectionSnippets('<div>nothing</div>')).toEqual([])
    })
})

describe('renderHighlightedCode', () => {
    it('returns HTML containing the shiki class', async () => {
        const html = await renderHighlightedCode('const x: number = 1', false)
        expect(html).toContain('class="shiki"')
    })

    it('switches between light and dark themes', async () => {
        const dark = await renderHighlightedCode('const x = 1', true)
        const light = await renderHighlightedCode('const x = 1', false)
        expect(dark).toContain('class="shiki"')
        expect(light).toContain('class="shiki"')
        // The themes render different color palettes so the output must differ.
        expect(dark).not.toBe(light)
    })

    it('handles Svelte-flavored code', async () => {
        const html = await renderHighlightedCode('<script lang="ts">\nconst x = 1\n</script>', true)
        expect(html).toContain('class="shiki"')
    })

    it('handles CSS-flavored code', async () => {
        const html = await renderHighlightedCode(':root { --color: red; }', true)
        expect(html).toContain('class="shiki"')
    })

    it('handles JSON-flavored code', async () => {
        const html = await renderHighlightedCode('{ "key": "value" }', true)
        expect(html).toContain('class="shiki"')
    })
})
