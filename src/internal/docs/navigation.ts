import packageJson from '../../../package.json' with { type: 'json' }

export type DocsItem = {
    title: string
    href: string
    icon: string
    legacyHref?: string
    description?: string
}

export type DocsGroup = {
    title: string
    icon?: string
    items: DocsItem[]
}

export const docsMeta = {
    name: 'Svelora',
    version: `v${packageJson.version}`,
    npmCommand: 'npm install svelora',
    githubHref: 'https://github.com/asphum/svelora'
} as const

export const docsIntroItems: DocsItem[] = [
    {
        title: 'Introduction',
        href: '/docs',
        legacyHref: '/getting-started',
        icon: 'icon-[lucide--book-open]',
        description: 'Overview, quick start, and ecosystem highlights.'
    },
    {
        title: 'Installation',
        href: '/docs/installation',
        legacyHref: '/getting-started/installation',
        icon: 'icon-[lucide--download]',
        description: 'Install the package and set up the required styles.'
    },
    {
        title: 'Theming',
        href: '/docs/theming',
        legacyHref: '/getting-started/theming',
        icon: 'icon-[lucide--palette]',
        description: 'Customize OKLCH tokens and component appearance.'
    },
    {
        title: 'Dark Mode',
        href: '/docs/dark-mode',
        legacyHref: '/getting-started/dark-mode',
        icon: 'icon-[lucide--moon-star]',
        description: 'Enable light, dark, and system theme support.'
    },
    {
        title: 'MCP',
        href: '/docs/mcp',
        legacyHref: '/mcp',
        icon: 'icon-[lucide--plug]',
        description: 'Connect Svelora docs helpers to Cursor IDE via MCP.'
    },
    {
        title: 'Drag & Drop',
        href: '/docs/drag-and-drop',
        legacyHref: '/drag-and-drop',
        icon: 'icon-[lucide--layers]',
        description: 'Interactive playground — sortable lists, kanban, and cross-container drag.'
    }
]

export const docsThemeItems: DocsItem[] = [
    {
        title: 'Customization',
        href: '/docs/customization',
        legacyHref: '/customization',
        icon: 'icon-[lucide--sliders-horizontal]',
        description: 'Configure global defaults, icons, and component slots.'
    },
    {
        title: 'Colors',
        href: '/docs/colors',
        legacyHref: '/colors',
        icon: 'icon-[lucide--swatch-book]',
        description: 'Explore semantic color tokens and the surface system.'
    }
]

export const docsComponentGroups: DocsGroup[] = [
    {
        title: 'General',
        icon: 'icon-[lucide--box]',
        items: [
            {
                title: 'Button',
                href: '/docs/components/button',
                legacyHref: '/button',
                icon: 'icon-[lucide--mouse-pointer-click]'
            },
            {
                title: 'CodeBlock',
                href: '/docs/components/code-block',
                legacyHref: '/code-block',
                icon: 'icon-[lucide--code]'
            },
            {
                title: 'FieldGroup',
                href: '/docs/components/field-group',
                legacyHref: '/field-group',
                icon: 'icon-[lucide--group]'
            },
            {
                title: 'Fonts',
                href: '/docs/components/fonts',
                legacyHref: '/google-fonts',
                icon: 'icon-[lucide--type]'
            },
            {
                title: 'Icon',
                href: '/docs/components/icon',
                legacyHref: '/icon',
                icon: 'icon-[lucide--shapes]'
            },
            {
                title: 'Link',
                href: '/docs/components/link',
                legacyHref: '/link',
                icon: 'icon-[lucide--link]'
            },
            {
                title: 'LocaleButton',
                href: '/docs/components/locale-button',
                legacyHref: '/locale-button',
                icon: 'icon-[lucide--languages]'
            },
            {
                title: 'Kbd',
                href: '/docs/components/kbd',
                legacyHref: '/kbd',
                icon: 'icon-[lucide--keyboard]'
            },
            {
                title: 'ThemeModeButton',
                href: '/docs/components/theme-mode-button',
                legacyHref: '/theme-mode-button',
                icon: 'icon-[lucide--sun-moon]'
            }
        ]
    },
    {
        title: 'Layout',
        icon: 'icon-[lucide--layout-panel-top]',
        items: [
            {
                title: 'BentoGrid',
                href: '/docs/components/bento-grid',
                legacyHref: '/bento-grid',
                icon: 'icon-[lucide--layout-dashboard]'
            },
            {
                title: 'Card',
                href: '/docs/components/card',
                legacyHref: '/card',
                icon: 'icon-[lucide--square]'
            },
            {
                title: 'Container',
                href: '/docs/components/container',
                legacyHref: '/container',
                icon: 'icon-[lucide--box]'
            },
            {
                title: 'Error',
                href: '/docs/components/error',
                legacyHref: '/error',
                icon: 'icon-[lucide--triangle-alert]',
                description: 'Pre-built error page with status display and clear action.'
            },
            {
                title: 'Footer',
                href: '/docs/components/footer',
                legacyHref: '/footer',
                icon: 'icon-[lucide--panel-bottom-dashed]',
                description: 'App footer with aligned areas and link columns.'
            },
            {
                title: 'Header',
                href: '/docs/components/header',
                legacyHref: '/header',
                icon: 'icon-[lucide--panel-top-dashed]',
                description: 'Sticky app header with mobile menu modes.'
            },
            {
                title: 'Main',
                href: '/docs/components/main',
                legacyHref: '/main',
                icon: 'icon-[lucide--layout-template]',
                description: 'Content container sized below the app header.'
            },
            {
                title: 'Resizable',
                href: '/docs/components/resizable',
                legacyHref: '/resizable',
                icon: 'icon-[lucide--stretch-horizontal]'
            },
            {
                title: 'Modal',
                href: '/docs/components/modal',
                icon: 'icon-[lucide--app-window]'
            },
            {
                title: 'Navigation Menu',
                href: '/docs/components/navigation-menu',
                icon: 'icon-[lucide--compass]',
                description: 'A horizontal list of links with optional nested dropdowns.'
            },
            {
                title: 'Scroll Area',
                href: '/docs/components/scroll-area',
                icon: 'icon-[lucide--scroll-text]',
                description: 'A customizable scrollable area with custom scrollbars.'
            },
            {
                title: 'Search',
                href: '/docs/components/search',
                icon: 'icon-[lucide--search]',
                description: 'A flexible search input or command palette modal.'
            },
            {
                title: 'Separator',
                href: '/docs/components/separator',
                legacyHref: '/separator',
                icon: 'icon-[lucide--minus]'
            }
        ]
    },
    {
        title: 'Data Display',
        icon: 'icon-[lucide--table-properties]',
        items: [
            {
                title: 'Accordion',
                href: '/docs/components/accordion',
                legacyHref: '/accordion',
                icon: 'icon-[lucide--chevrons-down-up]'
            },
            {
                title: 'Chart',
                href: '/docs/components/chart',
                legacyHref: '/chart',
                icon: 'icon-[lucide--bar-chart-2]'
            },
            {
                title: 'Avatar',
                href: '/docs/components/avatar',
                legacyHref: '/avatar',
                icon: 'icon-[lucide--circle-user]'
            },
            {
                title: 'AvatarGroup',
                href: '/docs/components/avatar-group',
                legacyHref: '/avatar-group',
                icon: 'icon-[lucide--users]'
            },
            {
                title: 'Badge',
                href: '/docs/components/badge',
                legacyHref: '/badge',
                icon: 'icon-[lucide--tag]'
            },
            {
                title: 'Carousel',
                href: '/docs/components/carousel',
                legacyHref: '/carousel',
                icon: 'icon-[lucide--gallery-horizontal]'
            },
            {
                title: 'Chip',
                href: '/docs/components/chip',
                legacyHref: '/chip',
                icon: 'icon-[lucide--circle-dot]'
            },
            {
                title: 'List',
                href: '/docs/components/list',
                legacyHref: '/list',
                icon: 'icon-[lucide--list]'
            },
            {
                title: 'NumberTicker',
                href: '/docs/components/number-ticker',
                legacyHref: '/number-ticker',
                icon: 'icon-[lucide--clock-10]'
            },
            {
                title: 'Prose',
                href: '/docs/components/prose',
                legacyHref: '/prose',
                icon: 'icon-[lucide--type]'
            },
            {
                title: 'Empty',
                href: '/docs/components/empty',
                legacyHref: '/empty',
                icon: 'icon-[lucide--inbox]'
            },
            {
                title: 'Skeleton',
                href: '/docs/components/skeleton',
                legacyHref: '/skeleton',
                icon: 'icon-[lucide--loader-circle]'
            },
            {
                title: 'Timeline',
                href: '/docs/components/timeline',
                legacyHref: '/timeline',
                icon: 'icon-[lucide--git-commit-horizontal]'
            },
            {
                title: 'User',
                href: '/docs/components/user',
                legacyHref: '/user',
                icon: 'icon-[lucide--user]'
            },
            {
                title: 'Table',
                href: '/docs/components/table',
                legacyHref: '/table',
                icon: 'icon-[lucide--table]'
            },
            {
                title: 'Tree',
                href: '/docs/components/tree',
                legacyHref: '/tree',
                icon: 'icon-[lucide--folder-tree]',
                description:
                    'Hierarchical tree with multi-select, checkbox propagation, and keyboard navigation.'
            },
            {
                title: 'TreeView',
                href: '/docs/components/tree-view',
                legacyHref: '/tree-view',
                icon: 'icon-[lucide--folder-tree]'
            }
        ]
    },
    {
        title: 'Forms',
        icon: 'icon-[lucide--type]',
        items: [
            {
                title: 'Checkbox',
                href: '/docs/components/checkbox',
                legacyHref: '/checkbox',
                icon: 'icon-[lucide--square-check]'
            },
            {
                title: 'ColorPicker',
                href: '/docs/components/color-picker',
                legacyHref: '/color-picker',
                icon: 'icon-[lucide--pipette]'
            },
            {
                title: 'CheckboxGroup',
                href: '/docs/components/checkbox-group',
                legacyHref: '/checkbox-group',
                icon: 'icon-[lucide--list-checks]'
            },
            {
                title: 'Editor',
                href: '/docs/components/editor',
                legacyHref: '/editor',
                icon: 'icon-[lucide--pen-line]'
            },
            {
                title: 'Input',
                href: '/docs/components/input',
                legacyHref: '/input',
                icon: 'icon-[lucide--text-cursor-input]'
            },
            {
                title: 'InputNumber',
                href: '/docs/components/input-number',
                legacyHref: '/input-number',
                icon: 'icon-[lucide--hash]'
            },
            {
                title: 'InputTags',
                href: '/docs/components/input-tags',
                legacyHref: '/input-tags',
                icon: 'icon-[lucide--tags]'
            },
            {
                title: 'RadioGroup',
                href: '/docs/components/radio-group',
                legacyHref: '/radio-group',
                icon: 'icon-[lucide--circle-dot]'
            },
            {
                title: 'Select',
                href: '/docs/components/select',
                legacyHref: '/select',
                icon: 'icon-[lucide--chevrons-up-down]'
            },
            {
                title: 'SelectMenu',
                href: '/docs/components/select-menu',
                legacyHref: '/select-menu',
                icon: 'icon-[lucide--list-filter]'
            },
            {
                title: 'Slider',
                href: '/docs/components/slider',
                legacyHref: '/slider',
                icon: 'icon-[lucide--sliders-horizontal]'
            },
            {
                title: 'SortableList',
                href: '/docs/components/sortable-list',
                legacyHref: '/sortable-list',
                icon: 'icon-[lucide--list-ordered]',
                description: 'Styled sortable list built on useSortable.'
            },
            {
                title: 'Switch',
                href: '/docs/components/switch',
                legacyHref: '/switch',
                icon: 'icon-[lucide--toggle-left]'
            },
            {
                title: 'Toggle',
                href: '/docs/components/toggle',
                legacyHref: '/toggle',
                icon: 'icon-[lucide--toggle-right]'
            },
            {
                title: 'ToggleGroup',
                href: '/docs/components/toggle-group',
                legacyHref: '/toggle-group',
                icon: 'icon-[lucide--layout-grid]'
            },
            {
                title: 'Textarea',
                href: '/docs/components/textarea',
                legacyHref: '/textarea',
                icon: 'icon-[lucide--text]'
            },
            {
                title: 'PasswordInput',
                href: '/docs/components/password-input',
                legacyHref: '/password-input',
                icon: 'icon-[lucide--key]'
            },
            {
                title: 'FileUpload',
                href: '/docs/components/file-upload',
                legacyHref: '/file-upload',
                icon: 'icon-[lucide--upload]'
            },
            {
                title: 'PinInput',
                href: '/docs/components/pin-input',
                legacyHref: '/pin-input',
                icon: 'icon-[lucide--square-asterisk]'
            },
            {
                title: 'Rating',
                href: '/docs/components/rating',
                legacyHref: '/rating',
                icon: 'icon-[lucide--star]'
            },
            {
                title: 'FormField',
                href: '/docs/components/form-field',
                legacyHref: '/form-field',
                icon: 'icon-[lucide--text-cursor-input]'
            },
            {
                title: 'Form',
                href: '/docs/components/form',
                legacyHref: '/form',
                icon: 'icon-[lucide--clipboard-list]'
            }
        ]
    },
    {
        title: 'Feedback',
        icon: 'icon-[lucide--message-square]',
        items: [
            {
                title: 'Alert',
                href: '/docs/components/alert',
                legacyHref: '/alert',
                icon: 'icon-[lucide--bell]'
            },
            {
                title: 'Banner',
                href: '/docs/components/banner',
                legacyHref: '/banner',
                icon: 'icon-[lucide--megaphone]'
            },
            {
                title: 'Chat',
                href: '/docs/components/chat',
                legacyHref: '/chat',
                icon: 'icon-[lucide--message-circle]'
            },
            {
                title: 'Marquee',
                href: '/docs/components/marquee',
                legacyHref: '/marquee',
                icon: 'icon-[lucide--move-right]'
            },
            {
                title: 'Progress',
                href: '/docs/components/progress',
                legacyHref: '/progress',
                icon: 'icon-[lucide--loader]'
            },
            {
                title: 'Toast',
                href: '/docs/components/toast',
                legacyHref: '/toast',
                icon: 'icon-[lucide--message-square-warning]'
            },
            {
                title: 'Spotlight',
                href: '/docs/components/spotlight',
                legacyHref: '/spotlight',
                icon: 'icon-[lucide--flashlight]'
            }
        ]
    },
    {
        title: 'Navigation',
        icon: 'icon-[lucide--compass]',
        items: [
            {
                title: 'Breadcrumb',
                href: '/docs/components/breadcrumb',
                legacyHref: '/breadcrumb',
                icon: 'icon-[lucide--chevron-right]'
            },
            {
                title: 'Pagination',
                href: '/docs/components/pagination',
                legacyHref: '/pagination',
                icon: 'icon-[lucide--ellipsis]'
            },
            {
                title: 'Sidebar',
                href: '/docs/components/sidebar',
                legacyHref: '/sidebar',
                icon: 'icon-[lucide--panel-left]'
            },
            {
                title: 'Stepper',
                href: '/docs/components/stepper',
                legacyHref: '/stepper',
                icon: 'icon-[lucide--list-ordered]'
            },
            {
                title: 'Tabs',
                href: '/docs/components/tabs',
                legacyHref: '/tabs',
                icon: 'icon-[lucide--panel-top]'
            }
        ]
    },
    {
        title: 'Overlay',
        icon: 'icon-[lucide--layers]',
        items: [
            {
                title: 'Collapsible',
                href: '/docs/components/collapsible',
                legacyHref: '/collapsible',
                icon: 'icon-[lucide--chevrons-up-down]'
            },
            {
                title: 'Command',
                href: '/docs/components/command',
                legacyHref: '/command',
                icon: 'icon-[lucide--square-terminal]'
            },
            {
                title: 'ContextMenu',
                href: '/docs/components/context-menu',
                legacyHref: '/context-menu',
                icon: 'icon-[lucide--mouse-pointer-square]'
            },
            {
                title: 'Modal',
                href: '/docs/components/modal',
                legacyHref: '/modal',
                icon: 'icon-[lucide--square-stack]'
            },
            {
                title: 'Lightbox',
                href: '/docs/components/lightbox',
                legacyHref: '/lightbox',
                icon: 'icon-[lucide--image-upscale]',
                description:
                    'Full-screen image viewer popover with gallery navigation, zoom, rotation, and download.'
            },
            {
                title: 'Confirm Dialog',
                href: '/docs/components/confirm-dialog',
                legacyHref: '/confirm-dialog',
                icon: 'icon-[lucide--circle-help]',
                description:
                    'Imperative confirmation dialogs with animated icons and notify integration.'
            },
            {
                title: 'Drawer',
                href: '/docs/components/drawer',
                legacyHref: '/drawer',
                icon: 'icon-[lucide--panel-bottom]'
            },
            {
                title: 'DropdownMenu',
                href: '/docs/components/dropdown-menu',
                legacyHref: '/dropdown-menu',
                icon: 'icon-[lucide--menu]'
            },
            {
                title: 'Popover',
                href: '/docs/components/popover',
                legacyHref: '/popover',
                icon: 'icon-[lucide--messages-square]'
            },
            {
                title: 'Slideover',
                href: '/docs/components/slideover',
                legacyHref: '/slideover',
                icon: 'icon-[lucide--panel-right]'
            },
            {
                title: 'Tooltip',
                href: '/docs/components/tooltip',
                legacyHref: '/tooltip',
                icon: 'icon-[lucide--message-square]'
            },
            {
                title: 'Tour',
                href: '/docs/components/tour',
                legacyHref: '/tour',
                icon: 'icon-[lucide--route]',
                description: 'Spotlight product tour with floating step panel.'
            }
        ]
    },
    {
        title: 'Date & Time',
        icon: 'icon-[lucide--calendar]',
        items: [
            {
                title: 'Calendar',
                href: '/docs/components/calendar',
                legacyHref: '/calendar',
                icon: 'icon-[lucide--calendar]'
            },
            {
                title: 'RangeCalendar',
                href: '/docs/components/range-calendar',
                legacyHref: '/range-calendar',
                icon: 'icon-[lucide--calendar-range]'
            },
            {
                title: 'DatePicker',
                href: '/docs/components/date-picker',
                legacyHref: '/date-picker',
                icon: 'icon-[lucide--calendar-check]'
            },
            {
                title: 'DateRangePicker',
                href: '/docs/components/date-range-picker',
                legacyHref: '/date-range-picker',
                icon: 'icon-[lucide--calendar-days]'
            },
            {
                title: 'TimeField',
                href: '/docs/components/time-field',
                legacyHref: '/time-field',
                icon: 'icon-[lucide--clock]'
            }
        ]
    }
]

export const docsHookItems: DocsItem[] = [
    {
        title: 'useMediaQuery',
        href: '/docs/hooks/use-media-query',
        legacyHref: '/use-media-query',
        icon: 'icon-[lucide--monitor-smartphone]'
    },
    {
        title: 'useClipboard',
        href: '/docs/hooks/use-clipboard',
        legacyHref: '/use-clipboard',
        icon: 'icon-[lucide--clipboard]'
    },
    {
        title: 'useFormField',
        href: '/docs/hooks/use-form-field',
        legacyHref: '/use-form-field',
        icon: 'icon-[lucide--text-cursor-input]'
    },
    {
        title: 'useClickOutside',
        href: '/docs/hooks/use-click-outside',
        legacyHref: '/use-click-outside',
        icon: 'icon-[lucide--pointer]'
    },
    {
        title: 'useSortable',
        href: '/docs/hooks/use-sortable',
        legacyHref: '/use-sortable',
        icon: 'icon-[lucide--grip-vertical]',
        description: 'Pointer-based reordering for sortable lists.'
    },
    {
        title: 'useDragDrop',
        href: '/docs/hooks/use-drag-drop',
        legacyHref: '/use-drag-drop',
        icon: 'icon-[lucide--move]',
        description: 'HTML5 drag-and-drop between containers.'
    },
    {
        title: 'useInfiniteScroll',
        href: '/docs/hooks/use-infinite-scroll',
        legacyHref: '/use-infinite-scroll',
        icon: 'icon-[lucide--arrow-down-to-line]'
    },
    {
        title: 'useEscapeKeydown',
        href: '/docs/hooks/use-escape-keydown',
        legacyHref: '/use-escape-keydown',
        icon: 'icon-[lucide--keyboard]'
    },
    {
        title: 'useDebounce',
        href: '/docs/hooks/use-debounce',
        legacyHref: '/use-debounce',
        icon: 'icon-[lucide--timer]'
    },
    {
        title: 'useDebouncedState',
        href: '/docs/hooks/use-debounced-state',
        legacyHref: '/use-debounced-state',
        icon: 'icon-[lucide--clock-3]'
    },
    {
        title: 'useEventListener',
        href: '/docs/hooks/use-event-listener',
        legacyHref: '/use-event-listener',
        icon: 'icon-[lucide--radio]'
    },
    {
        title: 'useResizeObserver / useElementSize',
        href: '/docs/hooks/use-resize-observer',
        legacyHref: '/use-resize-observer',
        icon: 'icon-[lucide--scaling]'
    },
    {
        title: 'useIntersectionObserver',
        href: '/docs/hooks/use-intersection-observer',
        legacyHref: '/use-intersection-observer',
        icon: 'icon-[lucide--scan-search]'
    },
    {
        title: 'useScrollLock',
        href: '/docs/hooks/use-scroll-lock',
        legacyHref: '/use-scroll-lock',
        icon: 'icon-[lucide--lock]'
    },
    {
        title: 'useFocusTrap',
        href: '/docs/hooks/use-focus-trap',
        legacyHref: '/use-focus-trap',
        icon: 'icon-[lucide--focus]'
    },
    {
        title: 'useLocalStorage',
        href: '/docs/hooks/use-local-storage',
        legacyHref: '/use-local-storage',
        icon: 'icon-[lucide--hard-drive]'
    },
    {
        title: 'useThrottle',
        href: '/docs/hooks/use-throttle',
        legacyHref: '/use-throttle',
        icon: 'icon-[lucide--gauge]'
    },
    {
        title: 'useTour',
        href: '/docs/hooks/use-tour',
        legacyHref: '/use-tour',
        icon: 'icon-[lucide--route]',
        description: 'Headless Tour controller for multi-page tours with optional persist.'
    },
    {
        title: 'useTimeout / useInterval',
        href: '/docs/hooks/use-timers',
        legacyHref: '/use-timers',
        icon: 'icon-[lucide--timer-reset]'
    }
]

export const docsTopNav: DocsItem[] = [
    { title: 'Docs', href: '/docs', icon: 'icon-[lucide--book-open]' },
    { title: 'Components', href: '/docs/components/button', icon: 'icon-[lucide--blocks]' },
    { title: 'Hooks', href: '/docs/hooks/use-debounce', icon: 'icon-[lucide--webhook]' }
]

export const allComponentItems = docsComponentGroups.flatMap((group) => group.items)
export const allDocsItems = [
    ...docsIntroItems,
    ...docsThemeItems,
    ...allComponentItems,
    ...docsHookItems
]
export const totalComponents = allComponentItems.length
export const totalHooks = docsHookItems.length

export const docsPathAliases = new Map<string, string>(
    allDocsItems.flatMap((item) => (item.legacyHref ? [[item.legacyHref, item.href] as const] : []))
)
