import { describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import FormSelect from './FormSelect.svelte'

describe('FormSelect', () => {
    it('writes the value to a hidden input and syncs after selection', async () => {
        render(FormSelect, {
            name: 'status',
            value: 'draft',
            items: [
                { value: 'draft', label: 'Draft' },
                { value: 'published', label: 'Published' }
            ]
        })

        const hidden = document.querySelector<HTMLInputElement>('input[name="status"]')
        expect(hidden?.value).toBe('draft')

        await page.getByRole('button').click()
        await page.getByText('Published', { exact: true }).click()
        expect(hidden?.value).toBe('published')
    })
})
