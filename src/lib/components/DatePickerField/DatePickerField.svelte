<script lang="ts" module>
    export type { DatePickerFieldProps as Props } from './date-picker-field.types.js'
</script>

<script lang="ts">
    import { type DateValue, parseDate, parseDateTime } from '@internationalized/date'
    import { DatePicker, type DatePickerProps } from 'sv5ui'
    import type { DatePickerFieldProps } from './date-picker-field.types.js'

    let {
        value = $bindable(''),
        name,
        granularity = 'day',
        required = false,
        disabled = false,
        readonly = false,
        class: className,
        locale = 'th-TH',
        weekStartsOn = 1,
        hourCycle = 24,
        onValueChange
    }: DatePickerFieldProps = $props()

    const hasTime = $derived(granularity !== 'day')
    const pickerValue = $derived(toDateValue(value, hasTime) as unknown as DatePickerProps['value'])

    function toDateValue(raw: string, withTime: boolean): DateValue | undefined {
        const normalized = raw.trim()
        if (!normalized) return undefined
        try {
            return withTime
                ? parseDateTime(normalized.slice(0, 19))
                : parseDate(normalized.slice(0, 10))
        } catch {
            return undefined
        }
    }

    function toFormValue(next: { toString(): string } | undefined): string {
        if (!next) return ''
        const date = next.toString()
        return hasTime
            ? date.slice(0, granularity === 'second' ? 19 : 16)
            : date.slice(0, 10)
    }

    function handleValueChange(next: Parameters<NonNullable<DatePickerProps['onValueChange']>>[0]) {
        value = toFormValue(next)
        onValueChange?.(value)
    }
</script>

<DatePicker
    value={pickerValue}
    onValueChange={handleValueChange}
    {name}
    {granularity}
    {hourCycle}
    {locale}
    {weekStartsOn}
    {required}
    {disabled}
    {readonly}
    class={className}
/>
