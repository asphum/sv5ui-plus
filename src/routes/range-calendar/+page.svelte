<script lang="ts">
    import { Alert, Button, Card, Icon } from '$lib/index.js'
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">RangeCalendar</h1>
        <p class="text-on-surface-variant">
            A date range picker for selecting a start and end date.
        </p>
    </div>

    <Alert
        variant="soft"
        color="info"
        title="Coming soon"
        description="RangeCalendar is part of the docs navigation but is not yet implemented as a standalone component. Use Calendar for now and check back later."
    />

    <Card>
        <div class="flex flex-col items-center gap-4 py-12 text-center">
            <div
                class="flex size-16 items-center justify-center rounded-full bg-primary-container text-on-primary-container"
            >
                <Icon name="icon-[lucide--calendar-range]" size="32" />
            </div>
            <h3 class="text-lg font-semibold">RangeCalendar</h3>
            <p class="max-w-md text-sm text-on-surface-variant">
                A primitive-based date range picker built on <code
                    class="rounded bg-surface-container px-1">bits-ui</code
                >, styled with the same color tokens and theming as the rest of Svelora.
            </p>
            <Button label="View Calendar" variant="outline" leadingIcon="icon-[lucide--arrow-right]" href="/calendar" />
        </div>
    </Card>
</div>
