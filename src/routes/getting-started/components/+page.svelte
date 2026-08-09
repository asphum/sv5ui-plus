<script lang="ts">
    import { Icon, Link } from '$lib/compat.js'

    type Item = { name: string; href: string; icon: string }

    const groups: { title: string; count: number; items: Item[] }[] = [
        {
            title: 'General',
            count: 7,
            items: [
                { name: 'Button', href: '/button', icon: 'lucide:mouse-pointer-click' },
                { name: 'FieldGroup', href: '/field-group', icon: 'lucide:group' },
                { name: 'Icon', href: '/icon', icon: 'lucide:shapes' },
                { name: 'Link', href: '/link', icon: 'lucide:link' },
                { name: 'LocaleButton', href: '/locale-button', icon: 'lucide:languages' },
                { name: 'Kbd', href: '/kbd', icon: 'lucide:keyboard' },
                { name: 'ThemeModeButton', href: '/theme-mode-button', icon: 'lucide:sun-moon' }
            ]
        },
        {
            title: 'Layout',
            count: 3,
            items: [
                { name: 'Card', href: '/card', icon: 'lucide:square' },
                { name: 'Container', href: '/container', icon: 'lucide:box' },
                { name: 'Separator', href: '/separator', icon: 'lucide:minus' }
            ]
        },
        {
            title: 'Data Display',
            count: 11,
            items: [
                { name: 'Accordion', href: '/accordion', icon: 'lucide:chevrons-down-up' },
                { name: 'Avatar', href: '/avatar', icon: 'lucide:circle-user' },
                { name: 'AvatarGroup', href: '/avatar-group', icon: 'lucide:users' },
                { name: 'Badge', href: '/badge', icon: 'lucide:tag' },
                { name: 'Carousel', href: '/carousel', icon: 'lucide:gallery-horizontal' },
                { name: 'Chip', href: '/chip', icon: 'lucide:circle-dot' },
                { name: 'Empty', href: '/empty', icon: 'lucide:inbox' },
                { name: 'Skeleton', href: '/skeleton', icon: 'lucide:loader-circle' },
                { name: 'Timeline', href: '/timeline', icon: 'lucide:git-commit-horizontal' },
                { name: 'User', href: '/user', icon: 'lucide:user' },
                { name: 'Table', href: '/table', icon: 'lucide:table' }
            ]
        },
        {
            title: 'Forms',
            count: 14,
            items: [
                { name: 'Checkbox', href: '/checkbox', icon: 'lucide:check-square' },
                { name: 'CheckboxGroup', href: '/checkbox-group', icon: 'lucide:list-checks' },
                { name: 'Editor', href: '/editor', icon: 'lucide:pen-line' },
                { name: 'Input', href: '/input', icon: 'lucide:text-cursor-input' },
                { name: 'RadioGroup', href: '/radio-group', icon: 'lucide:circle-dot' },
                { name: 'Select', href: '/select', icon: 'lucide:chevron-down-square' },
                { name: 'SelectMenu', href: '/select-menu', icon: 'lucide:square-chevron-down' },
                { name: 'Slider', href: '/slider', icon: 'lucide:sliders-horizontal' },
                { name: 'Switch', href: '/switch', icon: 'lucide:toggle-left' },
                { name: 'Textarea', href: '/textarea', icon: 'lucide:text-cursor-input' },
                { name: 'FileUpload', href: '/file-upload', icon: 'lucide:upload' },
                { name: 'PinInput', href: '/pin-input', icon: 'lucide:hash' },
                { name: 'FormField', href: '/form-field', icon: 'lucide:form-input' },
                { name: 'Form', href: '/form', icon: 'lucide:scroll-text' }
            ]
        },
        {
            title: 'Feedback',
            count: 4,
            items: [
                { name: 'Alert', href: '/alert', icon: 'lucide:bell' },
                { name: 'Banner', href: '/banner', icon: 'lucide:megaphone' },
                { name: 'Progress', href: '/progress', icon: 'lucide:loader' },
                { name: 'Toast', href: '/toast', icon: 'lucide:message-square-warning' }
            ]
        },
        {
            title: 'Navigation',
            count: 4,
            items: [
                { name: 'Breadcrumb', href: '/breadcrumb', icon: 'lucide:chevron-right' },
                { name: 'Pagination', href: '/pagination', icon: 'lucide:ellipsis' },
                { name: 'Stepper', href: '/stepper', icon: 'lucide:list-ordered' },
                { name: 'Tabs', href: '/tabs', icon: 'lucide:folder' }
            ]
        },
        {
            title: 'Overlay',
            count: 9,
            items: [
                { name: 'Collapsible', href: '/collapsible', icon: 'lucide:chevrons-up-down' },
                { name: 'Command', href: '/command', icon: 'lucide:square-terminal' },
                { name: 'ContextMenu', href: '/context-menu', icon: 'lucide:mouse-pointer-square' },
                { name: 'Modal', href: '/modal', icon: 'lucide:square-stack' },
                { name: 'Drawer', href: '/drawer', icon: 'lucide:panel-bottom' },
                { name: 'DropdownMenu', href: '/dropdown-menu', icon: 'lucide:menu' },
                { name: 'Popover', href: '/popover', icon: 'lucide:messages-square' },
                { name: 'Slideover', href: '/slideover', icon: 'lucide:panel-right' },
                { name: 'Tooltip', href: '/tooltip', icon: 'lucide:message-square' }
            ]
        },
        {
            title: 'Date & Time',
            count: 2,
            items: [
                { name: 'Calendar', href: '/calendar', icon: 'lucide:calendar' },
                { name: 'RangeCalendar', href: '/range-calendar', icon: 'lucide:calendar-range' }
            ]
        }
    ]

    const totalComponents = groups.reduce((sum, g) => sum + g.count, 0)
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-3xl font-bold">All Components</h1>
        <p class="text-on-surface-variant">
            {totalComponents}+ components across {groups.length} categories.
        </p>
    </div>

    {#each groups as group (group.title)}
        <section class="space-y-3">
            <div class="flex items-baseline gap-2">
                <h2 id="grouptitle" class="text-xl font-semibold">
<a href="#grouptitle" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        {group.title}
                    </a>
</h2>
                <span class="text-sm text-on-surface-variant">{group.count}</span>
            </div>
            <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {#each group.items as item (item.href)}
                    <Link
                        href={item.href}
                        raw
                        class="group flex items-center gap-3 rounded-md border border-outline-variant p-3 transition-colors hover:border-primary hover:bg-surface-container-high"
                    >
                        <Icon
                            name={item.icon}
                            size="18"
                            class="text-on-surface-variant group-hover:text-primary"
                        />
                        <span class="text-sm font-medium group-hover:text-primary">{item.name}</span>
                    </Link>
                {/each}
            </div>
        </section>
    {/each}
</div>
