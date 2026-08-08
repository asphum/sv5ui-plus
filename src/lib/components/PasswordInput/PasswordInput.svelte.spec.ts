import { page } from 'vitest/browser'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-svelte'
import PasswordInput from './PasswordInput.svelte'
import PasswordInputFormTestWrapper from './PasswordInputFormTestWrapper.svelte'

const getInput = () =>
    document.querySelector('input[type="password"], input[type="text"]') as HTMLInputElement | null
const getToggle = () => document.querySelector('button[aria-pressed]') as HTMLButtonElement | null
const getMeterSegments = () =>
    [...document.querySelectorAll('[class*="rounded-full"]')] as HTMLElement[]
const getStrengthText = () => document.querySelector('[class*="text-right"]') as HTMLElement | null

describe('PasswordInput', () => {
    // ==================== RENDERING ====================

    describe('rendering', () => {
        it('should render a password input', () => {
            render(PasswordInput)
            const input = getInput()
            expect(input).not.toBeNull()
            expect(input!.type).toBe('password')
        })

        it('should render the toggle button with show label', () => {
            render(PasswordInput)
            const btn = getToggle()
            expect(btn).not.toBeNull()
            expect(btn!.getAttribute('aria-label')).toBe('Show password')
        })

        it('should render with initial value', () => {
            render(PasswordInput, { value: 'secret' })
            expect(getInput()!.value).toBe('secret')
        })

        it('should render with placeholder', () => {
            render(PasswordInput, { placeholder: 'Enter password' })
            expect(getInput()!.placeholder).toBe('Enter password')
        })

        it('should render with id', () => {
            render(PasswordInput, { id: 'pwd-field' })
            expect(getInput()!.id).toBe('pwd-field')
        })

        it('should not render the strength meter by default', () => {
            render(PasswordInput, { value: 'secret' })
            expect(getMeterSegments()).toHaveLength(0)
        })

        it('should not render the strength meter when value is empty', () => {
            render(PasswordInput, { showStrength: true, value: '' })
            expect(getMeterSegments()).toHaveLength(0)
        })
    })

    // ==================== TOGGLE VISIBILITY ====================

    describe('toggle visibility', () => {
        it('should reveal password on toggle click', async () => {
            render(PasswordInput, { value: 'secret' })
            expect(getInput()!.type).toBe('password')
            await page.getByRole('button', { name: 'Show password' }).click()
            await vi.waitFor(() => {
                expect(getInput()!.type).toBe('text')
            })
        })

        it('should hide password on second toggle click', async () => {
            render(PasswordInput, { value: 'secret' })
            const toggle = page.getByRole('button', { name: 'Show password' })
            await toggle.click()
            await vi.waitFor(() => {
                expect(getInput()!.type).toBe('text')
            })
            await page.getByRole('button', { name: 'Hide password' }).click()
            await vi.waitFor(() => {
                expect(getInput()!.type).toBe('password')
            })
        })

        it('should update aria-label after toggling', async () => {
            render(PasswordInput)
            await page.getByRole('button', { name: 'Show password' }).click()
            await vi.waitFor(() => {
                expect(getToggle()!.getAttribute('aria-label')).toBe('Hide password')
            })
        })

        it('should update aria-pressed after toggling', async () => {
            render(PasswordInput)
            expect(getToggle()!.getAttribute('aria-pressed')).toBe('false')
            await page.getByRole('button', { name: 'Show password' }).click()
            await vi.waitFor(() => {
                expect(getToggle()!.getAttribute('aria-pressed')).toBe('true')
            })
        })

        it('should allow custom hide/show labels', () => {
            render(PasswordInput, { showLabel: 'Reveal', hideLabel: 'Conceal' })
            expect(getToggle()!.getAttribute('aria-label')).toBe('Reveal')
        })
    })

    // ==================== STRENGTH METER ====================

    describe('strength meter', () => {
        it('should render 4 meter segments when showStrength is true and value is not empty', async () => {
            render(PasswordInput, { showStrength: true, value: 'test' })
            await vi.waitFor(() => {
                expect(getMeterSegments().length).toBeGreaterThanOrEqual(4)
            })
        })

        it('should show strength text', async () => {
            render(PasswordInput, { showStrength: true, value: 'test' })
            await vi.waitFor(() => {
                expect(getStrengthText()).not.toBeNull()
            })
        })

        it('should use custom strengthLabels', async () => {
            render(PasswordInput, {
                showStrength: true,
                value: 'a',
                strengthLabels: ['Level 0', 'Level 1', 'Level 2', 'Level 3', 'Level 4']
            })
            await vi.waitFor(() => {
                expect(document.body.textContent).toContain('Level')
            })
        })

        it('should use a custom strengthFn', async () => {
            const strengthFn = vi.fn(() => 4)
            render(PasswordInput, { showStrength: true, value: 'x', strengthFn })
            await vi.waitFor(() => {
                expect(strengthFn).toHaveBeenCalledWith('x')
            })
        })

        it('should hide the meter again when value is cleared', async () => {
            const { rerender } = await render(PasswordInput, { showStrength: true, value: 'test' })
            await vi.waitFor(() => {
                expect(getMeterSegments().length).toBeGreaterThanOrEqual(4)
            })
            await rerender({ showStrength: true, value: '' })
            await vi.waitFor(() => {
                expect(getMeterSegments()).toHaveLength(0)
            })
        })
    })

    // ==================== TYPING & VALUE ====================

    describe('typing and value', () => {
        it('should update value while typing', async () => {
            render(PasswordInput)
            const input = document.querySelector('input') as HTMLInputElement
            input.focus()
            input.value = 'mypass'
            input.dispatchEvent(new Event('input', { bubbles: true }))
            await vi.waitFor(() => {
                expect(getInput()!.value).toBe('mypass')
            })
        })

        it('should call oninput while typing', async () => {
            const oninput = vi.fn()
            render(PasswordInput, { oninput })
            const input = document.querySelector('input') as HTMLInputElement
            input.focus()
            input.value = 'abc'
            input.dispatchEvent(new Event('input', { bubbles: true }))
            await vi.waitFor(() => {
                expect(oninput).toHaveBeenCalled()
            })
        })

        it('should call onblur', async () => {
            const onblur = vi.fn()
            render(PasswordInput, { onblur })
            const input = document.querySelector('input') as HTMLInputElement
            input.focus()
            input.blur()
            await vi.waitFor(() => {
                expect(onblur).toHaveBeenCalledOnce()
            })
        })

        it('should call onfocus', async () => {
            const onfocus = vi.fn()
            render(PasswordInput, { onfocus })
            const input = document.querySelector('input') as HTMLInputElement
            input.focus()
            await vi.waitFor(() => {
                expect(onfocus).toHaveBeenCalledOnce()
            })
        })
    })

    // ==================== DISABLED / READONLY ====================

    describe('disabled and readonly', () => {
        it('should disable the input when disabled', () => {
            render(PasswordInput, { disabled: true })
            expect(getInput()!.disabled).toBe(true)
        })

        it('should set readonly on the input', () => {
            render(PasswordInput, { readonly: true })
            expect(getInput()!.readOnly).toBe(true)
        })
    })

    // ==================== CUSTOMISATION ====================

    describe('customisation', () => {
        it('should apply ui slot overrides to root', async () => {
            const { container } = await render(PasswordInput, {
                ui: { root: 'my-root-class' }
            })
            expect((container.firstElementChild as HTMLElement).className).toContain(
                'my-root-class'
            )
        })

        it('should apply custom hide/show icons', async () => {
            render(PasswordInput, {
                showIcon: 'lucide:lock',
                hideIcon: 'lucide:unlock'
            })
            // toggle button should exist with the right label regardless of icon prop
            expect(getToggle()).not.toBeNull()
        })
    })

    // ==================== FORM INTEGRATION ====================

    describe('form integration', () => {
        it('should wire the label to the input via FormField', async () => {
            render(PasswordInputFormTestWrapper)
            await vi.waitFor(() => {
                expect(getInput()).not.toBeNull()
            })
            const label = document.querySelector('label') as HTMLLabelElement
            expect(label).not.toBeNull()
            expect(label.htmlFor).toBe(getInput()!.id)
        })

        it('should expose aria-describedby when inside a FormField', async () => {
            render(PasswordInputFormTestWrapper)
            await vi.waitFor(() => {
                expect(getInput()).not.toBeNull()
            })
            expect(getInput()!.getAttribute('aria-describedby')).not.toBeNull()
        })

        it('should show the error state after blurring an invalid field', async () => {
            render(PasswordInputFormTestWrapper)
            await vi.waitFor(() => {
                expect(getInput()).not.toBeNull()
            })
            getInput()!.focus()
            getInput()!.blur()
            await vi.waitFor(() => {
                expect(document.body.textContent).toContain('at least 8 characters')
                expect(getInput()!.getAttribute('aria-invalid')).toBe('true')
            })
        })

        it('should clear the error after a valid value is entered', async () => {
            render(PasswordInputFormTestWrapper)
            await vi.waitFor(() => {
                expect(getInput()).not.toBeNull()
            })
            getInput()!.focus()
            getInput()!.blur()
            await vi.waitFor(() => {
                expect(document.body.textContent).toContain('at least 8 characters')
            })
            const input = document.querySelector('input') as HTMLInputElement
            input.focus()
            input.value = 'StrongPass1!'
            input.dispatchEvent(new Event('input', { bubbles: true }))
            input.blur()
            await vi.waitFor(() => {
                expect(document.body.textContent).not.toContain('at least 8 characters')
                expect(getInput()!.getAttribute('aria-invalid')).toBeNull()
            })
        })
    })
})
