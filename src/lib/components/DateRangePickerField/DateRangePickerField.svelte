<script lang="ts" module>
    export type { DateRangePickerFieldProps as Props } from './date-range-picker-field.types.js'
</script>

<script lang="ts">
    import { type DateValue, parseDate, parseDateTime } from '@internationalized/date'
    import type { DateRange } from 'bits-ui'
    import { Button, DateRangePicker } from 'sv5ui'
    import type { DateRangePickerFieldProps } from './date-range-picker-field.types.js'

    let {
        start = $bindable(''),
        end = $bindable(''),
        startName,
        endName,
        granularity = 'day',
        required = false,
        disabled = false,
        readonly = false,
        clearable = true,
        timeInput,
        class: className,
        locale = 'th-TH',
        weekStartsOn = 1,
        hourCycle = 24,
        clearLabel = 'Clear dates'
    }: DateRangePickerFieldProps = $props()

    const hasTime = $derived(granularity !== 'day')
    const showTimeInput = $derived(timeInput ?? hasTime)

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

    let pickerValue = $state<DateRange | undefined>(undefined)

    $effect(() => {
        const s = toDateValue(start, hasTime)
        const e = toDateValue(end, hasTime)
        const curStart = pickerValue?.start?.toString()
        const curEnd = pickerValue?.end?.toString()
        const nextStart = s?.toString()
        const nextEnd = e?.toString()

        if (curStart !== nextStart || curEnd !== nextEnd) {
            pickerValue = s || e ? { start: s, end: e } : undefined
        }
    })

    function handleValueChange(next: DateRange | undefined) {
        pickerValue = next
        start = toFormValue(next?.start)
        end = toFormValue(next?.end)
    }

    function handleStartValueChange(next: { toString(): string } | undefined) {
        if (!next) return
        start = toFormValue(next)
    }

    function handleEndValueChange(next: { toString(): string } | undefined) {
        if (!next) return
        end = toFormValue(next)
    }

    function handleClear() {
        pickerValue = undefined
        start = ''
        end = ''
    }
</script>

<div class="flex items-center gap-2">
    <DateRangePicker
        bind:value={pickerValue}
        onValueChange={handleValueChange}
        onStartValueChange={handleStartValueChange}
        onEndValueChange={handleEndValueChange}
        {granularity}
        timeInput={showTimeInput}
        {hourCycle}
        {locale}
        {weekStartsOn}
        {required}
        {disabled}
        {readonly}
        class={className}
    />
    {#if clearable && (start || end) && !disabled && !readonly}
        <Button
            type="button"
            variant="ghost"
            color="secondary"
            size="sm"
            icon="lucide:x"
            onclick={handleClear}
            aria-label={clearLabel}
        />
    {/if}
</div>
<input type="hidden" name={startName} value={start} />
<input type="hidden" name={endName} value={end} />
