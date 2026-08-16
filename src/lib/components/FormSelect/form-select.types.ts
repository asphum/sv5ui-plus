import type { ComponentProps } from 'svelte'
import type { Select } from 'sv5ui'

export type FormSelectProps = Omit<ComponentProps<typeof Select>, 'name'> & {
    /** Native form field name (written to hidden inputs). */
    name: string
}
