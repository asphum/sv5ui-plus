import type { HTMLAttributes } from 'svelte/elements'
import type { ClassNameValue } from 'tailwind-merge'
import type { CommandGroup } from 'sv5ui'

export type SearchVariant = 'input' | 'modal' | 'button'

export interface SearchProps
    extends Omit<HTMLAttributes<HTMLInputElement | HTMLButtonElement>, 'class'> {
    /**
     * Determines the visual style and behavior of the search component.
     * - `input`: A standard input box.
     * - `modal`: A fake input that opens a modal containing a Command palette when clicked.
     * - `button`: A simple icon button that opens a modal containing a Command palette.
     * @default 'input'
     */
    variant?: SearchVariant

    /**
     * The value of the search input (when variant is 'input' or internal modal search).
     */
    value?: string

    /**
     * Keyboard shortcut to display (and listen to) for opening the modal.
     * E.g. `['meta', 'K']` or `['ctrl', '/']`
     */
    kbd?: string[]

    /**
     * Data groups to display in the Command palette (used when variant is 'modal' or 'button').
     */
    groups?: CommandGroup[]

    /**
     * Callback fired when an item is selected from the Command palette.
     */
    onSelect?: (value: string) => void

    /**
     * Placeholder text for the input or fake input.
     * @default 'Search...'
     */
    placeholder?: string

    /**
     * Additional CSS classes for the root element.
     */
    class?: ClassNameValue
}
