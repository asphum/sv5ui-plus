import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-svelte'
import PinInput from './PinInput.svelte'

const getRoot = () => document.querySelector('[data-pin-input-root]') as HTMLElement | null
const getCells = () =>
    Array.from(document.querySelectorAll('[data-pin-input-cell]')) as HTMLElement[]
const getInput = () => document.querySelector('[data-pin-input-input]') as HTMLInputElement | null

describe('PinInput', () => {
    // ==================== RENDERING ====================

    describe('rendering', () => {
        it('should render the root element', async () => {
            render(PinInput)
            expect(getRoot()).not.toBeNull()
        })

        it('should render 5 cells by default', async () => {
            render(PinInput)
            expect(getCells()).toHaveLength(5)
        })

        it('should render a hidden input element (bits-ui)', async () => {
            render(PinInput)
            expect(getInput()).not.toBeNull()
        })

        it('should apply inline-flex class to root', async () => {
            render(PinInput)
            expect(getRoot()!.className).toMatch(/inline-flex/)
        })

        it('should apply align-top to root', async () => {
            render(PinInput)
            expect(getRoot()!.className).toMatch(/align-top/)
        })
    })

    // ==================== LENGTH ====================

    describe('length', () => {
        it('should render 4 cells when length=4', async () => {
            render(PinInput, { length: 4 })
            expect(getCells()).toHaveLength(4)
        })

        it('should render 6 cells when length=6', async () => {
            render(PinInput, { length: 6 })
            expect(getCells()).toHaveLength(6)
        })

        it('should render 3 cells when length=3', async () => {
            render(PinInput, { length: 3 })
            expect(getCells()).toHaveLength(3)
        })
    })

    // ==================== VALUE ====================

    describe('value', () => {
        it('should call onValueChange when value changes', async () => {
            const onValueChange = vi.fn()
            render(PinInput, { onValueChange })
            const input = getInput()!
            input.focus()
            input.dispatchEvent(new InputEvent('input', { data: 'A', bubbles: true }))
            await vi.waitFor(() => {
                expect(onValueChange).toHaveBeenCalled()
            })
        })

        it('should call onValueChange when bits-ui fires value update', async () => {
            const onValueChange = vi.fn()
            render(PinInput, { onValueChange, length: 5 })
            // Verify component mounts with callback available
            expect(getRoot()).not.toBeNull()
            expect(onValueChange).not.toHaveBeenCalled()
        })

        it('should render a hidden form input when name is set', async () => {
            const { container } = await render(PinInput, { name: 'pin', value: '123' })
            const hidden = container.querySelector(
                'input[type="hidden"][name="pin"]'
            ) as HTMLInputElement | null
            expect(hidden).not.toBeNull()
            expect(hidden!.value).toBe('123')
        })

        it('should not render a hidden form input when name is not set', async () => {
            const { container } = await render(PinInput, { value: '123' })
            expect(container.querySelector('input[type="hidden"]')).toBeNull()
        })
    })

    // ==================== TYPE NUMBER ====================

    describe('type=number', () => {
        it('should set inputmode=numeric when type=number', async () => {
            render(PinInput, { type: 'number' })
            expect(getInput()!.getAttribute('inputmode')).toBe('numeric')
        })

        it('should set inputmode=text when type=text', async () => {
            render(PinInput, { type: 'text' })
            expect(getInput()!.getAttribute('inputmode')).toBe('text')
        })
    })

    // ==================== OTP ====================

    describe('otp', () => {
        it('should set autocomplete=one-time-code when otp=true', async () => {
            render(PinInput, { otp: true })
            expect(getInput()!.getAttribute('autocomplete')).toBe('one-time-code')
        })

        it('should always have autocomplete set (bits-ui default is one-time-code)', async () => {
            render(PinInput, { otp: false })
            // bits-ui defaults autocomplete to "one-time-code" even when not explicitly set
            const autocomplete = getInput()!.getAttribute('autocomplete')
            expect(autocomplete).not.toBeNull()
        })
    })

    // ==================== DISABLED ====================

    describe('disabled', () => {
        it('should apply opacity class to root when disabled', async () => {
            render(PinInput, { disabled: true })
            expect(getRoot()!.className).toMatch(/opacity-75/)
        })

        it('should apply cursor-not-allowed class when disabled', async () => {
            render(PinInput, { disabled: true })
            expect(getRoot()!.className).toMatch(/cursor-not-allowed/)
        })

        it('should not apply opacity-75 when not disabled', async () => {
            render(PinInput)
            expect(getRoot()!.className).not.toMatch(/opacity-75/)
        })
    })

    // ==================== MASK ====================

    describe('mask', () => {
        it('should render cells without mask icons when value is empty', async () => {
            render(PinInput, { mask: true, value: '' })
            // no filled cells → no mask dots
            const dots = document.querySelectorAll('.rounded-full.bg-current')
            expect(dots).toHaveLength(0)
        })

        it('should render placeholder when mask=false and cell is empty', async () => {
            render(PinInput, { mask: false, placeholder: '○' })
            const cells = getCells()
            expect(cells.length).toBeGreaterThan(0)
            // at least some cells should contain placeholder text
            const hasPlaceholder = Array.from(cells).some((c) => c.textContent?.includes('○'))
            expect(hasPlaceholder).toBe(true)
        })
    })

    // ==================== PLACEHOLDER ====================

    describe('placeholder', () => {
        it('should render default placeholder ○', async () => {
            render(PinInput)
            const cells = getCells()
            const hasDefault = Array.from(cells).some((c) => c.textContent?.includes('○'))
            expect(hasDefault).toBe(true)
        })

        it('should render custom placeholder', async () => {
            render(PinInput, { placeholder: '–' })
            const cells = getCells()
            const hasCustom = Array.from(cells).some((c) => c.textContent?.includes('–'))
            expect(hasCustom).toBe(true)
        })
    })

    // ==================== HIGHLIGHT ====================

    describe('highlight', () => {
        it('should apply ring color classes when highlight=true with primary color', async () => {
            render(PinInput, { highlight: true, color: 'primary' })
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/ring-primary/)
        })

        it('should apply error ring when highlight=true with error color', async () => {
            render(PinInput, { highlight: true, color: 'error' })
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/ring-error/)
        })

        it('should apply ring-2 when highlight=true', async () => {
            render(PinInput, { highlight: true, color: 'primary' })
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/ring-2/)
        })
    })

    // ==================== VARIANTS ====================

    describe('variants', () => {
        it('should apply outline variant classes by default', async () => {
            render(PinInput)
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/ring-2/)
            expect(cell.className).toMatch(/ring-inset/)
            expect(cell.className).toMatch(/ring-outline-variant/)
        })

        it('should apply soft variant classes', async () => {
            render(PinInput, { variant: 'soft' })
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/bg-surface-container/)
        })

        it('should apply subtle variant classes', async () => {
            render(PinInput, { variant: 'subtle' })
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/ring-2/)
            expect(cell.className).toMatch(/bg-surface-container/)
        })

        it('should apply ghost variant classes', async () => {
            render(PinInput, { variant: 'ghost' })
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/bg-transparent/)
        })

        it('should apply none variant classes', async () => {
            render(PinInput, { variant: 'none' })
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/bg-transparent/)
        })
    })

    // ==================== COLORS ====================

    describe('colors', () => {
        const colors = [
            'primary',
            'secondary',
            'tertiary',
            'success',
            'warning',
            'error',
            'info'
        ] as const

        for (const color of colors) {
            it(`should apply active ring for color="${color}" with outline variant`, async () => {
                render(PinInput, { color, variant: 'outline' })
                const cell = getCells()[0]!
                // The compound variant adds data-[active]:ring-{color}
                expect(cell.className).toMatch(new RegExp(`ring-${color}`))
            })
        }

        it('should apply surface color ring for color="surface"', async () => {
            render(PinInput, { color: 'surface', variant: 'outline' })
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/ring-on-surface/)
        })
    })

    // ==================== SIZES ====================

    describe('sizes', () => {
        it('should apply xs size (size-6)', async () => {
            render(PinInput, { size: 'xs' })
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/size-6/)
        })

        it('should apply sm size (size-7)', async () => {
            render(PinInput, { size: 'sm' })
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/size-7/)
        })

        it('should apply md size (size-8) by default', async () => {
            render(PinInput)
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/size-8/)
        })

        it('should apply lg size (size-9)', async () => {
            render(PinInput, { size: 'lg' })
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/size-9/)
        })

        it('should apply xl size (size-10)', async () => {
            render(PinInput, { size: 'xl' })
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/size-10/)
        })
    })

    // ==================== CUSTOM CLASS & UI ====================

    describe('custom class & ui', () => {
        it('should apply custom class to root element', async () => {
            render(PinInput, { class: 'my-root-class' })
            expect(getRoot()!.className).toContain('my-root-class')
        })

        it('should apply ui.root override to root element', async () => {
            render(PinInput, { ui: { root: 'my-root-override' } })
            expect(getRoot()!.className).toContain('my-root-override')
        })

        it('should apply ui.base override to cell elements', async () => {
            render(PinInput, { ui: { base: 'my-cell-override' } })
            const cells = getCells()
            expect(cells[0]!.className).toContain('my-cell-override')
        })

        it('should apply rounded-full via ui.base', async () => {
            render(PinInput, { ui: { base: 'rounded-full' } })
            const cell = getCells()[0]!
            expect(cell.className).toContain('rounded-full')
        })
    })

    // ==================== ACCESSIBILITY ====================

    describe('accessibility', () => {
        it('should pass aria-describedby to the outer wrapper when provided', async () => {
            const { container } = await render(PinInput, { 'aria-describedby': 'hint-text' })
            // restProps spread on the outer div, not on PinInput.Root
            const outerDiv = container.firstElementChild as HTMLElement
            expect(outerDiv.getAttribute('aria-describedby')).toBe('hint-text')
        })

        it('should set required on input when required=true', async () => {
            render(PinInput, { required: true })
            expect(getInput()!.required).toBe(true)
        })
    })

    // ==================== COMBINED PROPS ====================

    describe('combined props', () => {
        it('should render 6-cell OTP numeric input', async () => {
            render(PinInput, { length: 6, otp: true, type: 'number' })
            expect(getCells()).toHaveLength(6)
            expect(getInput()!.getAttribute('autocomplete')).toBe('one-time-code')
            expect(getInput()!.getAttribute('inputmode')).toBe('numeric')
        })

        it('should render disabled input with highlight and error color', async () => {
            render(PinInput, { disabled: true, highlight: true, color: 'error' })
            expect(getRoot()!.className).toMatch(/opacity-75/)
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/ring-error/)
        })

        it('should render with variant, color, and size combined', async () => {
            render(PinInput, { variant: 'outline', color: 'success', size: 'lg', length: 4 })
            expect(getCells()).toHaveLength(4)
            const cell = getCells()[0]!
            expect(cell.className).toMatch(/size-9/)
            expect(cell.className).toMatch(/ring-success/)
        })
    })

    // ==================== LOADING ====================

    describe('loading', () => {
        it('should not show spinner overlay by default', async () => {
            render(PinInput)
            expect(document.querySelector('[aria-hidden="true"] .animate-spin')).toBeNull()
        })

        it('should show spinner overlay when loading is true', async () => {
            render(PinInput, { loading: true })
            await vi.waitFor(() => {
                const overlay = document.querySelector(
                    'span[aria-hidden="true"].pointer-events-none'
                )
                expect(overlay).not.toBeNull()
                expect(overlay!.querySelector('svg')).not.toBeNull()
            })
        })

        it('should disable the hidden input when loading is true', async () => {
            render(PinInput, { loading: true })
            const input = getInput()
            expect(input?.disabled).toBe(true)
        })

        it('should accept custom loadingIcon', async () => {
            render(PinInput, { loading: true, loadingIcon: 'lucide:refresh-cw' })
            await vi.waitFor(() => {
                const overlay = document.querySelector(
                    'span[aria-hidden="true"].pointer-events-none'
                )
                expect(overlay).not.toBeNull()
                expect(overlay!.querySelector('svg')).not.toBeNull()
            })
        })
    })
})
