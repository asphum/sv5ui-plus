export type DateFieldGranularity = 'day' | 'hour' | 'minute' | 'second'

export type DatePickerFieldProps = {
    value?: string
    name?: string
    granularity?: DateFieldGranularity
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    class?: string
    /** @default 'th-TH' */
    locale?: string
    /** @default 1 (Monday) */
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    /** @default 24 */
    hourCycle?: 12 | 24
    onValueChange?: (value: string) => void
}
