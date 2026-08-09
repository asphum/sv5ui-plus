import type { DropdownMenuContentPropsWithoutHTML, DropdownMenuRootPropsWithoutHTML } from 'bits-ui'
import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type { ClassNameValue } from 'tailwind-merge'
import type { ButtonProps } from 'sv5ui'
import type { LocaleButtonSlots } from './locale-button.variants.js'

export type LocaleButtonLocale = {
    /**
     * Locale code used by your i18n layer, for example `en` or `th`.
     */
    code: string

    /**
     * Full label rendered in the dropdown menu.
     */
    label: string

    /**
     * Optional short label for the trigger, such as `EN` or `TH`.
     */
    shortLabel?: string

    /**
     * Optional helper text shown below the label.
     */
    description?: string

    /**
     * Optional static href for this locale.
     */
    href?: string

    /**
     * Optional language tag forwarded to anchor items.
     */
    hreflang?: string

    /**
     * Optional leading icon for the locale item.
     */
    icon?: string

    /**
     * Disables this locale in the dropdown.
     * @default false
     */
    disabled?: boolean

    /**
     * Additional CSS classes for the locale item.
     */
    class?: ClassNameValue
}

type RootProps = Pick<DropdownMenuRootPropsWithoutHTML, 'open' | 'onOpenChange'>

type ContentProps = Pick<
    DropdownMenuContentPropsWithoutHTML,
    | 'side'
    | 'sideOffset'
    | 'align'
    | 'alignOffset'
    | 'avoidCollisions'
    | 'collisionBoundary'
    | 'collisionPadding'
    | 'sticky'
    | 'hideWhenDetached'
    | 'onEscapeKeydown'
    | 'onInteractOutside'
    | 'onCloseAutoFocus'
    | 'forceMount'
    | 'loop'
>

export type LocaleButtonProps = Omit<HTMLAttributes<HTMLElement>, 'children' | 'class' | 'color'> &
    RootProps &
    ContentProps & {
        /**
         * Bind a reference to the underlying trigger HTMLButtonElement.
         */
        ref?: HTMLButtonElement | null

        /**
         * Available locales shown in the menu.
         */
        locales: LocaleButtonLocale[]

        /**
         * Current active locale code.
         */
        locale?: string

        /**
         * Controls the visual style of the trigger button.
         * @default 'outline'
         */
        variant?: NonNullable<ButtonProps['variant']>

        /**
         * Sets the color scheme of the trigger button.
         * @default 'surface'
         */
        color?: NonNullable<ButtonProps['color']>

        /**
         * Controls the trigger button size.
         * @default 'md'
         */
        size?: NonNullable<ButtonProps['size']>

        /**
         * Shrinks the dropdown menu width to fit its content (`w-fit min-w-0`).
         * @default false
         */
        fit?: boolean

        /**
         * Renders a loading spinner and disables interaction.
         * @default false
         */
        loading?: boolean

        /**
         * Disables the trigger and all locale actions.
         * @default false
         */
        disabled?: boolean

        /**
         * Stretches the trigger to fill the available width.
         * @default false
         */
        block?: boolean

        /**
         * Forces equal width and height for the trigger button.
         * @default false
         */
        square?: boolean

        /**
         * Fallback text shown when no current locale is matched.
         * @default 'Select language'
         */
        placeholder?: string

        /**
         * Accessible label for the trigger button.
         * @default 'Change language'
         */
        ariaLabel?: string

        /**
         * Optional heading rendered above the locale list.
         * @default 'Language'
         */
        menuLabel?: string

        /**
         * Leading icon displayed in the trigger.
         * @default 'lucide:languages'
         */
        icon?: string

        /**
         * Trailing chevron icon displayed in the trigger.
         * @default Uses `icons.chevronDown` from app config
         */
        chevronIcon?: string

        /**
         * Whether to render the leading trigger icon.
         * @default true
         */
        showIcon?: boolean

        /**
         * Whether to render the trailing chevron icon.
         * @default true
         */
        showChevron?: boolean

        /**
         * Whether to render the locale code badge inside the menu.
         * @default true
         */
        showCode?: boolean

        /**
         * Whether to render the selected locale check icon.
         * @default true
         */
        showIndicator?: boolean

        /**
         * Disables the currently active locale item.
         * @default true
         */
        disableCurrentLocale?: boolean

        /**
         * Closes the menu after selecting a locale without href navigation.
         * @default true
         */
        closeOnSelect?: boolean

        /**
         * Resolves a locale-specific href, useful for Paraglide URL strategies.
         */
        getLocaleHref?: (locale: string, item: LocaleButtonLocale) => string | undefined

        /**
         * Called when a locale is selected.
         * Use this for integrations like `setLocale(...)`.
         */
        onLocaleChange?: (locale: string, item: LocaleButtonLocale) => void | Promise<void>

        /**
         * Render custom trigger content.
         */
        children?: Snippet<[{ open: boolean; currentLocale: LocaleButtonLocale | undefined }]>

        /**
         * Render custom content for each locale item in the menu.
         */
        item?: Snippet<
            [{ item: LocaleButtonLocale; current: boolean; disabled: boolean; close: () => void }]
        >

        /**
         * Render a custom menu layout entirely.
         */
        menu?: Snippet<[{ close: () => void }]>

        /**
         * Whether to render the menu in a portal.
         * @default true
         */
        portal?: boolean

        /**
         * Display an arrow alongside the dropdown.
         * @default false
         */
        arrow?: boolean

        /**
         * Additional CSS classes for the trigger element.
         */
        class?: ClassNameValue

        /**
         * Override classes for LocaleButton slots.
         */
        ui?: Partial<Record<LocaleButtonSlots, ClassNameValue>>
    }
