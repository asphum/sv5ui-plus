import type { ClassNameValue } from 'tailwind-merge'
import type { InputProps } from '../Input/input.types.js'
import type { InputSlots, InputVariantProps } from '../Input/input.variants.js'
import type { PasswordInputSlots, PasswordInputVariantProps } from './password-input.variants.js'

/**
 * All slots available for class overrides in PasswordInput.
 * Combines PasswordInput-specific slots with a subset of the inner
 * Input's slots that are safe to forward.
 */
export type PasswordInputUISlots =
    | PasswordInputSlots
    /** Root wrapper of the inner `<Input>` component. */
    | 'inputRoot'
    /** The `<input>` element base class inside the inner `<Input>`. */
    | Extract<InputSlots, 'base' | 'leading' | 'leadingIcon' | 'trailing' | 'trailingIcon'>

export type PasswordInputProps = Omit<InputProps, 'type'> & {
    /**
     * Bind a reference to the underlying HTMLInputElement.
     */
    ref?: HTMLInputElement | null

    /**
     * Whether to show the password strength meter below the input.
     * @default false
     */
    showStrength?: boolean

    /**
     * Custom function to calculate password strength.
     * Should return a number from 0 (Very Weak) to 4 (Strong).
     * Falls back to the built-in heuristic when not provided.
     */
    strengthFn?: (password: string) => number

    /**
     * Labels for the five strength levels, indexed 0–4.
     * @default ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
     */
    strengthLabels?: [string, string, string, string, string]

    /**
     * Iconify icon name to use for each strength meter segment instead of the
     * default filled bar. When set, four icons are rendered side-by-side and
     * coloured by strength level.
     *
     * @example 'icon-[lucide--star]'    // ★ ★ ☆ ☆
     * @example 'icon-[lucide--shield]'  // shields
     * @example 'ph:lock-fill'   // locks
     * @example 'icon-[lucide--circle]'  // circles
     */
    segmentIcon?: string

    /**
     * Custom Unicode character to display as mask symbol instead of the default bullet (•).
     * Works natively with password input selection, focus caret, and accessibility.
     *
     * @example '✦'
     * @example '★'
     * @example '●'
     * @example '*'
     */
    maskChar?: string

    /**
     * Icon to display when the password is hidden (eye-off state).
     * Supports any valid Iconify icon name.
     * @default 'icon-[lucide--eye-off]'
     */
    hideIcon?: string

    /**
     * Icon to display when the password is visible (eye state).
     * Supports any valid Iconify icon name.
     * @default 'icon-[lucide--eye]'
     */
    showIcon?: string

    /**
     * Accessible label for the toggle button when password is visible (clicking will hide it).
     * @default 'Hide password'
     */
    hideLabel?: string

    /**
     * Accessible label for the toggle button when password is hidden (clicking will show it).
     * @default 'Show password'
     */
    showLabel?: string

    /**
     * Controls the dimensions and text size of the field.
     * Also scales the toggle button icon and strength meter segments to match.
     * @default 'md'
     */
    size?: NonNullable<PasswordInputVariantProps['size']>

    /**
     * Controls the visual style of the input field.
     * Mirrors `<Input>` variants — the value is forwarded directly to the inner Input.
     * @default 'outline'
     */
    variant?: NonNullable<InputVariantProps['variant']>

    /**
     * Sets the color scheme for focus ring and highlight.
     * Also applied to the toggle button's focus ring for visual consistency.
     * Automatically overridden with `'error'` when inside a FormField with an error.
     * @default 'primary'
     */
    color?: NonNullable<InputVariantProps['color']>

    /**
     * Additional CSS classes for the root element.
     */
    class?: ClassNameValue

    /**
     * Override styles for specific slots.
     *
     * **PasswordInput slots:** `root`, `inputWrapper`, `toggleBtn`, `toggleIcon`,
     * `meterWrapper`, `meterSegment`, `meterIcon`, `strengthText`.
     *
     * **Inner Input slots:** `base`, `inputRoot`, `leading`, `leadingIcon`,
     * `trailing`, `trailingIcon`.
     */
    ui?: Partial<Record<PasswordInputUISlots, ClassNameValue>>
}
