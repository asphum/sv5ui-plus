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
    name: 'SV5UI Plus',
    version: `v${packageJson.version}`,
    npmCommand: 'npm install sv5ui sv5ui-plus',
    githubHref: 'https://github.com/asphum/svelora'
} as const

export const docsIntroItems: DocsItem[] = [
    {
        title: 'Introduction',
        href: '/docs',
        legacyHref: '/getting-started',
        icon: 'lucide:book-open',
        description: 'SV5UI Plus as an SV5UI companion.'
    },
    {
        title: 'Installation',
        href: '/docs/installation',
        legacyHref: '/getting-started/installation',
        icon: 'lucide:download',
        description: 'Install SV5UI and SV5UI Plus together.'
    },
    {
        title: 'MCP',
        href: '/docs/mcp',
        legacyHref: '/mcp',
        icon: 'lucide:plug',
        description: 'Use the SV5UI Plus docs helper.'
    },
    {
        title: 'Drag & Drop',
        href: '/docs/drag-and-drop',
        legacyHref: '/drag-and-drop',
        icon: 'lucide:layers',
        description: 'Sortable and cross-container examples.'
    }
]

export const docsThemeItems: DocsItem[] = [
    {
        title: 'Theming',
        href: '/docs/theming',
        legacyHref: '/getting-started/theming',
        icon: 'lucide:palette',
        description: 'SV5UI Plus extends the SV5UI theme.'
    },
    {
        title: 'Dark Mode',
        href: '/docs/dark-mode',
        legacyHref: '/getting-started/dark-mode',
        icon: 'lucide:moon-star',
        description: 'Configure light, dark, and system modes.'
    },
    {
        title: 'Customization',
        href: '/docs/customization',
        legacyHref: '/customization',
        icon: 'lucide:sliders-horizontal',
        description: 'Customize addon component slots.'
    },
    {
        title: 'Colors',
        href: '/docs/colors',
        legacyHref: '/colors',
        icon: 'lucide:swatch-book',
        description: 'Inspect shared semantic tokens.'
    }
]

const component = (
    title: string,
    slug: string,
    icon: string,
    legacyHref = `/${slug}`
): DocsItem => ({
    title,
    href: `/docs/components/${slug}`,
    legacyHref,
    icon
})

export const docsComponentGroups: DocsGroup[] = [
    {
        title: 'SV5UI Plus Addons',
        icon: 'lucide:blocks',
        items: [
            component('BentoGrid', 'bento-grid', 'lucide:layout-dashboard'),
            component('Chart', 'chart', 'lucide:chart-no-axes-combined'),
            component('Chat', 'chat', 'lucide:messages-square'),
            component('CodeBlock', 'code-block', 'lucide:code'),
            component('ColorPicker', 'color-picker', 'lucide:palette'),
            component('ConfirmDialog', 'confirm-dialog', 'lucide:message-circle-question'),
            component('DatePickerField', 'date-picker-field', 'lucide:calendar'),
            component('DateRangePickerField', 'date-range-picker-field', 'lucide:calendar-range'),
            component('Fonts', 'fonts', 'lucide:type', '/google-fonts'),
            component('FormSelect', 'form-select', 'lucide:list-filter'),
            component('List', 'list', 'lucide:list'),
            component('LocaleButton', 'locale-button', 'lucide:languages'),
            component('Marquee', 'marquee', 'lucide:move-horizontal'),
            component('NumberTicker', 'number-ticker', 'lucide:gauge'),
            component('PasswordInput', 'password-input', 'lucide:key-round'),
            component('Prose', 'prose', 'lucide:text'),
            component('Resizable', 'resizable', 'lucide:stretch-horizontal'),
            component('ScrollArea', 'scroll-area', 'lucide:scroll-text'),
            component('Search', 'search', 'lucide:search'),
            component('SortableList', 'sortable-list', 'lucide:list-restart'),
            component('Spotlight', 'spotlight', 'lucide:sparkles'),
            component('SafeTable', 'safe-table', 'lucide:shield'),
            component('TableBulkActionBar', 'table', 'lucide:table'),
            component('TreeView', 'tree-view', 'lucide:network'),
            component('SvelteKitNavigationMenu', 'navigation-menu', 'lucide:compass')
        ]
    }
]

export const docsHookItems: DocsItem[] = [
    {
        title: 'useDragDrop',
        href: '/docs/hooks/use-drag-drop',
        legacyHref: '/use-drag-drop',
        icon: 'lucide:grab',
        description: 'Drag-and-drop primitives for Svelte 5.'
    },
    {
        title: 'useSortable',
        href: '/docs/hooks/use-sortable',
        legacyHref: '/use-sortable',
        icon: 'lucide:arrow-up-down',
        description: 'Sortable state and actions.'
    }
]

export const docsTopNav: DocsItem[] = [
    { title: 'Components', href: '/docs/components', icon: 'lucide:blocks' },
    { title: 'Hooks', href: '/docs/hooks', icon: 'lucide:webhook' }
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
