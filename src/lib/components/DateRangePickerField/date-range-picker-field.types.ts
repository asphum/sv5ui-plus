import type { DateFieldGranularity } from '../DatePickerField/date-picker-field.types.js'

export type DateRangePickerFieldProps = {
    start?: string
    end?: string
    startName: string
    endName: string
    granularity?: DateFieldGranularity
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean
    timeInput?: boolean
    class?: string
    /** @default 'th-TH' */
    locale?: string
    /** @default 1 (Monday) */
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    /** @default 24 */
    hourCycle?: 12 | 24
    /** Accessible label for the clear button. @default 'Clear dates' */
    clearLabel?: string
}
