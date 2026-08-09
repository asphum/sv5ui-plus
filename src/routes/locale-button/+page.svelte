<script lang="ts">
    import { CodeBlock, LocaleButton, Icon, Separator } from '$lib/compat.js'
    import type { LocaleButtonLocale } from '$lib/compat.js'

    const locales: LocaleButtonLocale[] = [
        {
            code: 'en',
            label: 'English',
            shortLabel: 'EN',
            description: 'Default content language'
        },
        {
            code: 'th',
            label: 'Thai',
            shortLabel: 'TH',
            description: 'Thai translation'
        },
        {
            code: 'ja',
            label: 'Japanese',
            shortLabel: 'JA',
            description: 'Japanese translation'
        }
    ]

    const flagLocales: LocaleButtonLocale[] = [
        { code: 'th', label: 'Thai', shortLabel: 'TH' },
        { code: 'la', label: 'Lao', shortLabel: 'LO' },
        { code: 'en', label: 'English', shortLabel: 'EN' }
    ]
    let flagLocale = $state('th')

    const variants = ['solid', 'outline', 'soft', 'subtle', 'ghost', 'link'] as const
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    const integrationStrategies = [
        {
            title: 'Callback Strategy',
            badge: 'Recommended',
            description:
                'Use onLocaleChange when your app controls locale changes in code. This works well with Paraglide cookie-based setups and custom i18n stores.',
            bullets: [
                'Keeps the current pathname unchanged',
                'Works with setLocale(..., { reload: false })',
                'Best default for consumer apps'
            ]
        },
        {
            title: 'Href Strategy',
            badge: 'Optional',
            description:
                'Use getLocaleHref when your app intentionally exposes locale-specific URLs such as /th/docs or /en/docs.',
            bullets: [
                'Generates per-locale links',
                'Useful for URL-prefix routing',
                'Navigation happens through hrefs instead of imperative state'
            ]
        },
        {
            title: 'Custom I18n',
            badge: 'Flexible',
            description:
                'You can use LocaleButton without Paraglide at all. Pass your own locale state, persistence, and translation runtime.',
            bullets: [
                'No hard dependency on Paraglide',
                'Works with stores, cookies, or API-backed preferences',
                'Good for non-SvelteKit or mixed stacks'
            ]
        }
    ] as const

    const localeItemFields = [
        {
            field: 'code',
            required: 'Yes',
            description: 'The locale identifier used by your i18n layer, such as en or th.'
        },
        {
            field: 'label',
            required: 'Yes',
            description: 'The full label rendered in the dropdown menu.'
        },
        {
            field: 'shortLabel',
            required: 'No',
            description: 'Compact text for the trigger or badge, such as EN or TH.'
        },
        {
            field: 'description',
            required: 'No',
            description: 'Secondary helper text shown inside the menu.'
        },
        {
            field: 'href',
            required: 'No',
            description: 'A precomputed locale-specific link if your app uses href navigation.'
        },
        {
            field: 'hreflang',
            required: 'No',
            description: 'Optional hreflang value forwarded to anchor items.'
        },
        {
            field: 'disabled',
            required: 'No',
            description: 'Disables a specific locale item.'
        }
    ] as const

    const integrationChecklist = [
        'Use onLocaleChange when you do not want locale prefixes in the URL.',
        'Use getLocaleHref only when your routing strategy intentionally includes locale-specific paths.',
        'Pass locale from your own source of truth so the trigger always reflects the current language.',
        'Provide shortLabel values when you want compact trigger text such as EN, TH, or JA.',
        'Use the children snippet when your product needs a fully custom trigger design.'
    ] as const

    let locale = $state('en')
    let customLocale = $state('th')

    const paraglideSetLocaleExample =
        `<script lang="ts">
 import { LocaleButton, type LocaleButtonLocale } from 'sv5ui-plus'
 import { setLocale, toLocale } from '$lib/paraglide/runtime'
 
 const locales: LocaleButtonLocale[] = [
   { code: 'en', label: 'English', shortLabel: 'EN' },
   { code: 'th', label: 'Thai', shortLabel: 'TH' }
 ]
 
 let locale = 'en'
<` +
        `/script>

<LocaleButton
 {locale}
 {locales}
 onLocaleChange={(nextLocale) => {
  locale = nextLocale
  const target = toLocale(nextLocale)
  if (target) {
   return setLocale(target)
  }
 }}
/>`

    const paraglideCookieExample =
        `<script lang="ts">
 import { LocaleButton, type LocaleButtonLocale } from 'sv5ui-plus'
 import { setLocale, toLocale } from '$lib/paraglide/runtime'
 
 const locales: LocaleButtonLocale[] = [
   { code: 'en', label: 'English', shortLabel: 'EN' },
   { code: 'th', label: 'Thai', shortLabel: 'TH' }
 ]
 
 let locale = 'en'
<` +
        `/script>

<LocaleButton
 {locale}
 {locales}
 onLocaleChange={(nextLocale) => {
  locale = nextLocale
  const target = toLocale(nextLocale)
  if (target) {
   return setLocale(target, { reload: false })
  }
 }}
/>`

    const consumerAppExample =
        `<script lang="ts">
 import { LocaleButton, type LocaleButtonLocale } from 'sv5ui-plus'
 import { setLocale, toLocale } from '$lib/paraglide/runtime'
 
 const locales: LocaleButtonLocale[] = [
   { code: 'en', label: 'English', shortLabel: 'EN' },
   { code: 'th', label: 'Thai', shortLabel: 'TH' }
 ]
 
 let locale = 'en'
<` +
        `/script>

<LocaleButton
 {locales}
 {locale}
 onLocaleChange={(nextLocale) => {
  locale = nextLocale
  const target = toLocale(nextLocale)
  if (target) {
   return setLocale(target, { reload: false })
  }
 }}
/>`

    const hrefStrategyExample =
        `<script lang="ts">
 import { LocaleButton, type LocaleButtonLocale } from 'sv5ui-plus'
 import { localizeHref } from '$lib/paraglide/runtime'
 
 const locales: LocaleButtonLocale[] = [
   { code: 'en', label: 'English', shortLabel: 'EN' },
   { code: 'th', label: 'Thai', shortLabel: 'TH' }
 ]
 
 let locale = 'en'
 const pathname = '/docs/components/locale-button'
<` +
        `/script>

<LocaleButton
 {locales}
 {locale}
 getLocaleHref={(nextLocale) => localizeHref(pathname, { locale: nextLocale })}
/>`

    const customI18nExample =
        `<script lang="ts">
 import { LocaleButton, type LocaleButtonLocale } from 'sv5ui-plus'
 
 const locales: LocaleButtonLocale[] = [
   { code: 'en', label: 'English', shortLabel: 'EN' },
   { code: 'th', label: 'Thai', shortLabel: 'TH' }
 ]
 
 let locale = 'en'
 
 function applyLocale(nextLocale: string) {
   locale = nextLocale
   localStorage.setItem('preferred-locale', nextLocale)
 }
<` +
        `/script>

<LocaleButton
 {locales}
 {locale}
 onLocaleChange={(nextLocale) => {
  applyLocale(nextLocale)
 }}
/>`

    const localeShapeExample = `import type { LocaleButtonLocale } from 'sv5ui-plus'

const locales: LocaleButtonLocale[] = [
  {
    code: 'en',
    label: 'English',
    shortLabel: 'EN',
    description: 'Default content language'
  },
  {
    code: 'th',
    label: 'Thai',
    shortLabel: 'TH',
    description: 'Thai translation',
    href: '/th/docs',
    hreflang: 'th'
  }
]`
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">LocaleButton</h1>
        <p class="text-on-surface-variant">
            A language switcher button designed to work nicely with Paraglide. Use
            <code class="rounded bg-surface-container-highest px-1">onLocaleChange</code> for
            <code class="rounded bg-surface-container-highest px-1">setLocale()</code> flows
            while keeping the current path unchanged.
        </p>
    </div>

    <section class="space-y-3">
        <h2 id="Basic-Usage" class="text-lg font-semibold">
<a href="#Basic-Usage" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Basic Usage
                    </a>
</h2>
        <div class="flex flex-wrap items-center gap-4 rounded-lg bg-surface-container-high p-4">
            <LocaleButton
                {locales}
                {locale}
                onLocaleChange={(nextLocale) => {
                    locale = nextLocale
                }}
            />
            <span class="text-sm text-on-surface-variant">Current locale: {locale}</span>
        </div>
    </section>

    <section class="space-y-4">
        <h2 id="Choose-Your-Strategy" class="text-lg font-semibold">
<a href="#Choose-Your-Strategy" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Choose Your Strategy
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            <code class="rounded bg-surface-container-highest px-1">LocaleButton</code> is only
            the UI layer. Your app decides how locale changes are applied.
        </p>
        <div class="grid gap-4 lg:grid-cols-3">
            {#each integrationStrategies as strategy (strategy.title)}
                <div class="space-y-3 rounded-2xl border border-outline-variant bg-surface-container/40 p-5">
                    <div class="flex items-center justify-between gap-3">
                        <h3 class="text-base font-semibold">{strategy.title}</h3>
                        <span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                            {strategy.badge}
                        </span>
                    </div>
                    <p class="text-sm text-on-surface-variant">{strategy.description}</p>
                    <ul class="space-y-2 text-sm text-on-surface-variant">
                        {#each strategy.bullets as bullet (bullet)}
                            <li>{bullet}</li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Paraglide-with-setLocale" class="text-lg font-semibold">
<a href="#Paraglide-with-setLocale" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Paraglide with setLocale
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use the selection callback when your app already manages locale changes in code.
        </p>
        <CodeBlock title="Paraglide setLocale()" code={paraglideSetLocaleExample} />
        <div class="rounded-lg bg-surface-container-high p-4">
            <LocaleButton
                {locales}
                {locale}
                onLocaleChange={(nextLocale) => {
                    locale = nextLocale
                }}
            />
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Use-In-Consumer-Apps" class="text-lg font-semibold">
<a href="#Use-In-Consumer-Apps" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Use In Consumer Apps
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            <code class="rounded bg-surface-container-highest px-1">LocaleButton</code> is
            exported from the
            <code class="rounded bg-surface-container-highest px-1">sv5ui-plus</code> package and can
            be used in any app that installs this library.
        </p>
        <p class="text-sm text-on-surface-variant">
            The component does not depend on Paraglide internally. Your app provides
            <code class="rounded bg-surface-container-highest px-1">locale</code>,
            <code class="rounded bg-surface-container-highest px-1">locales</code>, and the
            locale-change logic through
            <code class="rounded bg-surface-container-highest px-1">onLocaleChange</code> or
            <code class="rounded bg-surface-container-highest px-1">getLocaleHref</code>.
        </p>
        <CodeBlock title="Consumer app example" code={consumerAppExample} />
    </section>

    <section class="space-y-3">
        <h2 id="Keep-The-Same-Path" class="text-lg font-semibold">
<a href="#Keep-The-Same-Path" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Keep The Same Path
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            With cookie-based Paraglide strategy, you can switch locale without adding
            <code class="rounded bg-surface-container-highest px-1">/th</code> or other locale
            prefixes to the URL.
        </p>
        <CodeBlock title="Paraglide without locale prefix" code={paraglideCookieExample} />
        <div class="rounded-lg bg-surface-container-high p-4">
            <LocaleButton
                {locales}
                {locale}
                disableCurrentLocale={false}
                onLocaleChange={(nextLocale) => {
                    locale = nextLocale
                }}
            />
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Use-Locale-Prefix-URLs" class="text-lg font-semibold">
<a href="#Use-Locale-Prefix-URLs" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Use Locale Prefix URLs
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            If your product intentionally uses locale-prefixed routes such as
            <code class="rounded bg-surface-container-highest px-1">/th/docs</code>, provide
            <code class="rounded bg-surface-container-highest px-1">getLocaleHref</code>. This
            keeps navigation declarative and lets the button render locale-specific links.
        </p>
        <CodeBlock title="Href strategy with localizeHref()" code={hrefStrategyExample} />
    </section>

    <section class="space-y-3">
        <h2 id="Use-Without-Paraglide" class="text-lg font-semibold">
<a href="#Use-Without-Paraglide" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Use Without Paraglide
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            The component works with any locale source of truth. You can connect it to a Svelte
            store, cookies, localStorage, an API-backed user preference, or another i18n runtime.
        </p>
        <CodeBlock title="Custom i18n integration" code={customI18nExample} />
    </section>

    <section class="space-y-4">
        <h2 id="Locale-Item-Shape" class="text-lg font-semibold">
<a href="#Locale-Item-Shape" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Locale Item Shape
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Each locale entry is just data. Start with
            <code class="rounded bg-surface-container-highest px-1">code</code> and
            <code class="rounded bg-surface-container-highest px-1">label</code>, then add
            optional fields only when your app needs them.
        </p>
        <CodeBlock title="LocaleButtonLocale[]" code={localeShapeExample} />
        <div class="overflow-hidden rounded-2xl border border-outline-variant">
            <table class="w-full text-left text-sm">
                <thead class="bg-surface-container">
                    <tr>
                        <th class="px-4 py-3 font-semibold">Field</th>
                        <th class="px-4 py-3 font-semibold">Required</th>
                        <th class="px-4 py-3 font-semibold">Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    {#each localeItemFields as field (field.field)}
                        <tr class="border-t border-outline-variant/70">
                            <td class="px-4 py-3 font-mono text-xs">{field.field}</td>
                            <td class="px-4 py-3 text-on-surface-variant">{field.required}</td>
                            <td class="px-4 py-3 text-on-surface-variant">{field.description}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>

    <section class="space-y-4">
        <h2 id="Integration-Checklist" class="text-lg font-semibold">
<a href="#Integration-Checklist" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Integration Checklist
                    </a>
</h2>
        <div class="rounded-2xl border border-outline-variant bg-surface-container/40 p-5">
            <ul class="space-y-3 text-sm text-on-surface-variant">
                {#each integrationChecklist as item (item)}
                    <li>{item}</li>
                {/each}
            </ul>
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Variants" class="text-lg font-semibold">
<a href="#Variants" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Variants
                    </a>
</h2>
        <div class="flex flex-wrap items-center gap-3 rounded-lg bg-surface-container-high p-4">
            {#each variants as variant (variant)}
                <LocaleButton
                    {locales}
                    {locale}
                    {variant}
                    size="sm"
                    onLocaleChange={(nextLocale) => {
                        locale = nextLocale
                    }}
                />
            {/each}
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Sizes" class="text-lg font-semibold">
            <a href="#Sizes" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Sizes
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Control trigger button and dropdown menu item scaling from <code class="rounded bg-surface-container-highest px-1">xs</code> to <code class="rounded bg-surface-container-highest px-1">xl</code>. Font sizes, item padding, badge indicators, and icons scale proportionally.
        </p>
        <div class="flex flex-wrap items-end gap-3 rounded-lg bg-surface-container-high p-4">
            {#each sizes as size (size)}
                <LocaleButton
                    {locales}
                    {locale}
                    {size}
                    onLocaleChange={(nextLocale) => {
                        locale = nextLocale
                    }}
                />
            {/each}
        </div>
    </section>


    <section class="space-y-3">
        <h2 id="Custom-Trigger" class="text-lg font-semibold">
<a href="#Custom-Trigger" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Custom Trigger
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use the
            <code class="rounded bg-surface-container-highest px-1">children</code> snippet to
            fully control the trigger content while keeping the dropdown behavior.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4">
            <LocaleButton
                {locales}
                locale={customLocale}
                square={false}
                variant="soft"
                color="primary"
                onLocaleChange={(nextLocale) => {
                    customLocale = nextLocale
                }}
            >
                {#snippet children({ currentLocale, open })}
                    <span class="flex items-center gap-2">
                        <span>{currentLocale?.label ?? 'Language'}</span>
                        <span class="text-xs text-on-surface-variant">
                            {open ? 'Open' : currentLocale?.code.toUpperCase()}
                        </span>
                    </span>
                {/snippet}
            </LocaleButton>
        </div>
    </section>
    <section class="space-y-3">
        <h2 id="Custom-Menu-Items" class="text-lg font-semibold">
<a href="#Custom-Menu-Items" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Custom Menu Items
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use the
            <code class="rounded bg-surface-container-highest px-1">item</code> snippet to completely
            redesign how each language row looks inside the dropdown.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex gap-4">
            <LocaleButton
                {locales}
                locale={customLocale}
                onLocaleChange={(nextLocale) => {
                    customLocale = nextLocale
                }}
            >
                {#snippet item({ item, current, close })}
                    <button
                        class={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                            current ? 'bg-primary/10 text-primary font-medium' : 'text-on-surface hover:bg-surface-container-highest'
                        }`}
                        onclick={() => {
                            customLocale = item.code
                            close()
                        }}
                    >
                        <div class="flex items-center gap-2">
                            <span>{item.code === 'th' ? '🇹🇭' : item.code === 'ja' ? '🇯🇵' : '🇺🇸'}</span>
                            <span>{item.label}</span>
                        </div>
                        {#if current}
                            <span class="text-primary text-xs">Active</span>
                        {/if}
                    </button>
                {/snippet}
            </LocaleButton>
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Custom-Menu-Layout" class="text-lg font-semibold">
<a href="#Custom-Menu-Layout" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Custom Menu Layout
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            If you need to break out of the standard vertical list, use the
            <code class="rounded bg-surface-container-highest px-1">menu</code> snippet to build
            an entirely custom dropdown grid or layout.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4">
            <LocaleButton
                {locales}
                locale={customLocale}
                onLocaleChange={(nextLocale) => {
                    customLocale = nextLocale
                }}
            >
                {#snippet menu({ close })}
                    <div class="grid grid-cols-2 gap-2 p-3 min-w-64 bg-surface rounded-xl border border-outline-variant shadow-lg">
                        <div class="col-span-2 pb-2 mb-2 border-b border-outline-variant/50">
                            <p class="text-xs font-medium text-on-surface-variant">Select Region</p>
                        </div>
                        {#each locales as item (item.code)}
                            <button
                                class={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
                                    customLocale === item.code 
                                        ? 'border-primary bg-primary/5 text-primary' 
                                        : 'border-outline-variant bg-surface hover:bg-surface-container'
                                }`}
                                onclick={() => {
                                    customLocale = item.code
                                    close()
                                }}
                            >
                                <span class="text-2xl">{item.code === 'th' ? '🇹🇭' : item.code === 'ja' ? '🇯🇵' : '🇺🇸'}</span>
                                <span class="text-xs font-medium">{item.shortLabel}</span>
                            </button>
                        {/each}
                    </div>
                {/snippet}
            </LocaleButton>
        </div>
    </section>

    <Separator />

    <section class="space-y-3">
        <h2 id="Flag-Icons-Design" class="text-lg font-semibold">
<a href="#Flag-Icons-Design" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Flag Icons Design
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Here is a highly requested design: a circular flag trigger that reveals a dropdown of languages with flags.
            This uses both the <code class="rounded bg-surface-container-highest px-1">children</code> and 
            <code class="rounded bg-surface-container-highest px-1">item</code> snippets.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex gap-4">
            <LocaleButton
                locales={flagLocales}
                locale={flagLocale}
                square
                variant="outline"
                color="secondary"
                showChevron={false}
                class="rounded-full !p-1 border-[1.5px] border-primary text-primary overflow-hidden bg-surface"
                onLocaleChange={(nextLocale) => {
                    flagLocale = nextLocale
                }}
            >
                {#snippet children({ currentLocale })}
                    <!-- Using iconify circle-flags -->
                    {#if currentLocale?.code === 'th'}
                        <Icon name="circle-flags:th" size="32" />
                    {:else if currentLocale?.code === 'la'}
                        <Icon name="circle-flags:la" size="32" />
                    {:else if currentLocale?.code === 'en'}
                        <Icon name="circle-flags:uk" size="32" />
                    {:else}
                        <Icon name="lucide:globe" size="24" />
                    {/if}
                {/snippet}

                {#snippet item({ item, current, close })}
                    <button
                        class={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-lg ${
                            current ? 'bg-surface-container-high text-on-surface' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                        }`}
                        onclick={() => {
                            flagLocale = item.code
                            close()
                        }}
                    >
                        {#if item.code === 'th'}
                            <Icon name="circle-flags:th" size="24" />
                        {:else if item.code === 'la'}
                            <Icon name="circle-flags:la" size="24" />
                        {:else if item.code === 'en'}
                            <Icon name="circle-flags:uk" size="24" />
                        {/if}
                        
                        <span class="font-medium text-[15px]">{item.shortLabel}</span>
                    </button>
                {/snippet}
            </LocaleButton>
        </div>
    </section>

    <Separator />

    <!-- Fit Content -->
    <section class="space-y-3">
        <h2 id="Fit-Content" class="text-lg font-semibold">
            <a href="#Fit-Content" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Fit Content
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use the <code class="rounded bg-surface-container-highest px-1">fit</code> prop to shrink the dropdown menu width to fit its content (`w-fit min-w-0`) instead of using the default minimum width.
        </p>
        <div class="flex items-center gap-4 rounded-lg bg-surface-container-high p-4">
            <LocaleButton
                {locales}
                {locale}
                fit
                onLocaleChange={(nextLocale) => {
                    locale = nextLocale
                }}
            />
        </div>
    </section>

    <Separator />

    <!-- Positioning & Alignment -->
    <section class="space-y-3">
        <h2 id="Positioning-and-Alignment" class="text-lg font-semibold">
            <a href="#Positioning-and-Alignment" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Positioning & Alignment
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Control the dropdown popover position using <code class="rounded bg-surface-container-highest px-1">side</code> (`bottom`, `top`, `left`, `right`) and <code class="rounded bg-surface-container-highest px-1">align</code> (`start`, `center`, `end`).
        </p>
        <div class="flex flex-wrap items-center gap-4 rounded-lg bg-surface-container-high p-4">
            <LocaleButton {locales} {locale} side="top" align="start" placeholder="Top Start" />
            <LocaleButton {locales} {locale} side="bottom" align="end" placeholder="Bottom End" />
            <LocaleButton {locales} {locale} side="right" align="center" placeholder="Right Center" />
        </div>
    </section>
</div>
