<script lang="ts">
    import { buildLocaleOptions } from '$internal/i18n.js'
    import { Badge, Button, Card, Icon, Link, LocaleButton } from '$lib/index.js'
    import { allComponentItems, docsIntroItems, docsMeta, totalComponents } from '$internal/docs/navigation.js'
    import { m } from '$lib/paraglide/messages.js'
    import { getLocale, setLocale, toLocale } from '$lib/paraglide/runtime.js'

    const installCode = docsMeta.npmCommand

    const usageCode = `<script lang="ts">
 import { Button, Card, Badge } from 'svelora';
<` + `/script>

<Card>
 <h3>Welcome to Svelora</h3>
 <p>Build beautiful UIs with Svelte 5.</p>

 <div class="flex gap-2">
  <Button label="Get Started" color="primary" />
  <Badge label="${docsMeta.version}" variant="soft" color="success" />
 </div>
</Card>`

    const layoutCode = `@import 'tailwindcss';
@import 'svelora/theme.css';

@custom-variant dark (&:where(.dark, .dark *));`

    const features = [
        {
            title: 'Svelte 5 Runes',
            description: 'Built from the ground up with runes, snippets, and the latest reactivity model.',
            icon: 'icon-[lucide--zap]'
        },
        {
            title: 'OKLCH Colors',
            description: '8 semantic color scales that stay balanced across light and dark themes.',
            icon: 'icon-[lucide--palette]'
        },
        {
            title: 'Fully Accessible',
            description: 'Powered by bits-ui primitives with keyboard navigation and ARIA patterns.',
            icon: 'icon-[lucide--accessibility]'
        },
        {
            title: 'Tailwind CSS 4',
            description: 'Utility-first styling with easy overrides through classes and tokens.',
            icon: 'icon-[lucide--wand-sparkles]'
        },
        {
            title: `${totalComponents}+ Components`,
            description: 'From buttons to calendars, overlays to tables, ready for production apps.',
            icon: 'icon-[lucide--blocks]'
        },
        {
            title: 'Fully Typed',
            description: 'Exported TypeScript types help keep every component safe and discoverable.',
            icon: 'icon-[lucide--code-xml]'
        }
    ] as const

    const stats = [
        { label: 'Components', value: `${totalComponents}+` },
        { label: 'TypeScript', value: '100%' },
        { label: 'Color Scales', value: '8' },
        { label: 'MIT License', value: 'MIT' }
    ] as const

    const colorGroups = [
        { title: 'Primary', description: 'Main actions & branding', color: 'primary' },
        { title: 'Secondary', description: 'Supporting elements', color: 'secondary' },
        { title: 'Tertiary', description: 'Accents & highlights', color: 'tertiary' },
        { title: 'Success', description: 'Positive feedback', color: 'success' },
        { title: 'Warning', description: 'Caution signals', color: 'warning' },
        { title: 'Error', description: 'Error & destructive', color: 'error' },
        { title: 'Info', description: 'Informational hints', color: 'info' },
        { title: 'Surface', description: 'Backgrounds & neutral', color: 'surface' }
    ] as const

    const previewItems = allComponentItems.slice(0, 12)
    const currentLocale = $derived(getLocale())
    const localeOptions = $derived(buildLocaleOptions())
</script>

<div class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[540px] bg-[radial-gradient(circle_at_top,theme(colors.primary/.18),transparent_55%)]"></div>

    <header class="border-b border-outline-variant/60">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-6">
            <Link href="/" raw class="flex items-center gap-3 text-on-surface">
                <span class="inline-flex size-10 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-on-primary">
                    S
                </span>
                <div class="space-y-0.5">
                    <p class="text-sm font-semibold">{docsMeta.name}</p>
                    <p class="text-xs text-on-surface-variant">{m.landing_library_tagline()}</p>
                </div>
            </Link>

            <nav class="hidden items-center gap-2 md:flex">
                <Link href="/docs" raw class="rounded-lg px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container">
                    {m.layout_docs()}
                </Link>
                <Link href="/docs/components/button" raw class="rounded-lg px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container">
                    {m.layout_components()}
                </Link>
                <Link href={docsMeta.githubHref} raw external class="rounded-lg px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container">
                    {m.layout_github()}
                </Link>
            </nav>

            <div class="flex items-center gap-2">
                <LocaleButton
                    locales={localeOptions}
                    locale={currentLocale}
                    size="sm"
                    square={false}
                    ariaLabel={m.locale_change_language()}
                    menuLabel={m.locale_language()}
                    onLocaleChange={(nextLocale) => {
                        const locale = toLocale(nextLocale)
                        if (locale) {
                            return setLocale(locale, { reload: false })
                        }
                    }}
                />
                <Button label={m.landing_get_started()} href="/docs" size="sm" />
                <Button
                    variant="outline"
                    color="secondary"
                    label={m.landing_star_github()}
                    href={docsMeta.githubHref}
                    external
                    size="sm"
                />
            </div>
        </div>
    </header>

    <main class="space-y-24 pb-20">
        <section class="mx-auto grid max-w-7xl gap-12 px-4 pt-16 lg:grid-cols-[minmax(0,1fr)_520px] lg:px-6 lg:pt-20">
            <div class="space-y-8">
                <div class="flex flex-wrap gap-2">
                    <Badge label="Open Source" variant="soft" color="success" />
                    <Badge label={docsMeta.version} variant="soft" color="primary" />
                    <Badge label="Svelte 5" variant="soft" color="secondary" />
                </div>

                <div class="space-y-5">
                    <h1 class="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
                        {m.landing_title()}
                    </h1>
                    <p class="max-w-2xl text-lg leading-8 text-on-surface-variant">
                        {@html m.landing_description({ count: `${totalComponents}` })}
                    </p>
                </div>

                <div class="flex flex-wrap gap-3">
                    <Button
                        label={m.landing_get_started()}
                        href="/docs"
                        leadingIcon="icon-[lucide--rocket]"
                    />
                    <Button
                        label={m.landing_browse_components()}
                        href="#components"
                        variant="outline"
                        color="secondary"
                        leadingIcon="icon-[lucide--layout-grid]"
                    />
                </div>

                <div class="flex flex-wrap items-center gap-4 text-sm text-on-surface-variant">
                    <div class="flex -space-x-2">
                        {#each ['A', 'S', 'M', 'J', 'K'] as initial (initial)}
                            <span class="inline-flex size-9 items-center justify-center rounded-full border border-surface bg-surface-container font-medium text-on-surface">
                                {initial}
                            </span>
                        {/each}
                    </div>
                    <span>{m.landing_loved_by()}</span>
                </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
                <Card class="border border-outline-variant/70 bg-surface/90 shadow-xl shadow-primary/5">
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium">Deployment</p>
                                <p class="text-sm text-on-surface-variant">Maya just deployed v2.4</p>
                            </div>
                            <Badge label="New" variant="soft" color="success" size="sm" />
                        </div>
                        <div class="grid grid-cols-3 gap-3">
                            <div class="rounded-2xl bg-surface-container p-3">
                                <p class="text-xs text-on-surface-variant">Tasks</p>
                                <p class="mt-1 text-2xl font-semibold">12</p>
                            </div>
                            <div class="rounded-2xl bg-surface-container p-3">
                                <p class="text-xs text-on-surface-variant">Reviews</p>
                                <p class="mt-1 text-2xl font-semibold">3</p>
                            </div>
                            <div class="rounded-2xl bg-surface-container p-3">
                                <p class="text-xs text-on-surface-variant">Build</p>
                                <p class="mt-1 text-2xl font-semibold text-success">Pass</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card class="border border-outline-variant/70 bg-surface/90 shadow-xl shadow-primary/5">
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium">Sprint progress</p>
                                <p class="text-sm text-on-surface-variant">Design system rollout</p>
                            </div>
                            <span class="text-lg font-semibold">78%</span>
                        </div>
                        <div class="h-3 overflow-hidden rounded-full bg-surface-container-high">
                            <div class="h-full w-[78%] rounded-full bg-primary"></div>
                        </div>
                        <div class="flex gap-2 text-xs text-on-surface-variant">
                            <span class="rounded-full bg-surface-container px-2 py-1">Theming</span>
                            <span class="rounded-full bg-surface-container px-2 py-1">Forms</span>
                            <span class="rounded-full bg-surface-container px-2 py-1">Navigation</span>
                        </div>
                    </div>
                </Card>

                <Card class="sm:col-span-2 border border-outline-variant/70 bg-surface/90 shadow-xl shadow-primary/5">
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium">Actions & Status</p>
                                <p class="text-sm text-on-surface-variant">Core building blocks, ready to compose.</p>
                            </div>
                            <Badge label="Live Preview" variant="soft" color="info" size="sm" />
                        </div>

                        <div class="flex flex-wrap gap-2">
                            <Button label="Primary" size="sm" />
                            <Button label="Outline" variant="outline" color="secondary" size="sm" />
                            <Button label="Soft" variant="soft" color="secondary" size="sm" />
                            <Button label="Ghost" variant="ghost" color="secondary" size="sm" />
                            <Badge label="Success" variant="soft" color="success" />
                            <Badge label="Warning" variant="soft" color="warning" />
                            <Badge label="Error" variant="soft" color="error" />
                        </div>

                        <div class="grid gap-3 sm:grid-cols-2">
                            <div class="rounded-2xl border border-outline-variant bg-surface-container p-4">
                                <p class="text-sm font-medium">Framework</p>
                                <div class="mt-2 flex items-center justify-between">
                                    <span class="text-on-surface-variant">Svelte</span>
                                    <span class="rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success">
                                        Enabled
                                    </span>
                                </div>
                            </div>
                            <div class="rounded-2xl border border-outline-variant bg-surface-container p-4">
                                <p class="text-sm font-medium">Dark mode</p>
                                <div class="mt-2 flex items-center justify-between">
                                    <span class="text-on-surface-variant">Automatic theme sync</span>
                                    <span class="relative inline-flex h-6 w-11 rounded-full bg-primary">
                                        <span class="absolute top-1 right-1 size-4 rounded-full bg-white"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </section>

        <section class="mx-auto max-w-7xl space-y-8 px-4 lg:px-6">
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {#each stats as stat (stat.label)}
                    <Card variant="soft" class="border border-outline-variant/70">
                        <div class="space-y-2">
                            <p class="text-sm text-on-surface-variant">{stat.label}</p>
                            <p class="text-3xl font-semibold">{stat.value}</p>
                        </div>
                    </Card>
                {/each}
            </div>
        </section>

        <section class="mx-auto max-w-7xl space-y-8 px-4 lg:px-6">
            <div class="space-y-3 text-center">
                <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">Features</p>
                <h2 id="Everything-you-need-nothing-you-dont" class="text-3xl font-semibold sm:text-4xl">
<a href="#Everything-you-need-nothing-you-dont" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Everything you need, nothing you don't
                    </a>
</h2>
                <p class="mx-auto max-w-3xl text-on-surface-variant">
                    A thoughtfully designed component library that gives you the building blocks for modern applications.
                </p>
            </div>

            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {#each features as feature (feature.title)}
                    <Card class="border border-outline-variant/70 bg-surface/90">
                        <div class="space-y-4">
                            <div class="flex size-11 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
                                <Icon name={feature.icon} size="20" />
                            </div>
                            <div class="space-y-2">
                                <h3 class="text-lg font-semibold">{feature.title}</h3>
                                <p class="text-sm leading-6 text-on-surface-variant">{feature.description}</p>
                            </div>
                        </div>
                    </Card>
                {/each}
            </div>
        </section>

        <section id="components" class="mx-auto max-w-7xl space-y-8 px-4 lg:px-6">
            <div class="space-y-3">
                <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">Components</p>
                <h2 id="totalComponents-components-ready-to-use" class="text-3xl font-semibold sm:text-4xl">
<a href="#totalComponents-components-ready-to-use" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        {totalComponents}+ components ready to use
                    </a>
</h2>
                <p class="max-w-3xl text-on-surface-variant">
                    Interactive previews of real Svelora components. Explore the design language before you jump into the docs.
                </p>
            </div>

            <div class="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <Card class="border border-outline-variant/70">
                    <div class="space-y-6">
                        <div class="space-y-2">
                            <p class="text-sm font-medium">Actions & Status</p>
                            <p class="text-sm text-on-surface-variant">Buttons, badges, and alerts working together.</p>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <Button label="Primary" size="sm" />
                            <Button label="Outline" variant="outline" color="secondary" size="sm" />
                            <Button label="Soft" variant="soft" color="success" size="sm" />
                            <Button label="Subtle" variant="subtle" color="warning" size="sm" />
                            <Button label="Ghost" variant="ghost" color="secondary" size="sm" />
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <Badge label="Primary" variant="soft" color="primary" />
                            <Badge label="Success" variant="soft" color="success" />
                            <Badge label="Warning" variant="soft" color="warning" />
                            <Badge label="Error" variant="soft" color="error" />
                            <Badge label="Info" variant="soft" color="info" />
                        </div>
                        <div class="grid gap-3 sm:grid-cols-3">
                            <div class="rounded-2xl border border-success/20 bg-success/10 p-4 text-sm text-success">
                                Deployment complete
                            </div>
                            <div class="rounded-2xl border border-info/20 bg-info/10 p-4 text-sm text-info">
                                Update available
                            </div>
                            <div class="rounded-2xl border border-warning/20 bg-warning/10 p-4 text-sm text-warning">
                                Rate limit warning
                            </div>
                        </div>
                    </div>
                </Card>

                <Card class="border border-outline-variant/70">
                    <div class="space-y-6">
                        <div class="space-y-2">
                            <p class="text-sm font-medium">Preview Grid</p>
                            <p class="text-sm text-on-surface-variant">A quick look at categories inside the library.</p>
                        </div>
                        <div class="grid gap-2 sm:grid-cols-2">
                            {#each previewItems as item (item.href)}
                                <Link
                                    href={item.href}
                                    raw
                                    class="group flex items-center gap-3 rounded-2xl border border-outline-variant bg-surface-container px-4 py-3 transition-colors hover:border-primary hover:bg-surface-container-high"
                                >
                                    <span class="inline-flex size-9 items-center justify-center rounded-xl bg-surface-container-high">
                                        <Icon name={item.icon} size="17" class="text-on-surface-variant group-hover:text-primary" />
                                    </span>
                                    <span class="text-sm font-medium group-hover:text-primary">{item.title}</span>
                                </Link>
                            {/each}
                        </div>
                    </div>
                </Card>
            </div>
        </section>

        <section class="mx-auto max-w-7xl space-y-8 px-4 lg:px-6">
            <div class="space-y-3">
                <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">Color System</p>
                <h2 id="8-semantic-colors-infinite-possibilities" class="text-3xl font-semibold sm:text-4xl">
<a href="#8-semantic-colors-infinite-possibilities" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        8 semantic colors, infinite possibilities
                    </a>
</h2>
                <p class="max-w-3xl text-on-surface-variant">
                    A complete OKLCH color system that adapts cleanly to light and dark themes.
                </p>
            </div>

            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {#each colorGroups as group (group.title)}
                    <Card class="border border-outline-variant/70 bg-surface/90">
                        <div class="space-y-4">
                            <div class="space-y-1">
                                <h3 class="font-semibold">{group.title}</h3>
                                <p class="text-sm text-on-surface-variant">{group.description}</p>
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <Button label="Button" color={group.color} size="sm" />
                                <Badge label="Badge" color={group.color} variant="soft" />
                            </div>
                        </div>
                    </Card>
                {/each}
            </div>
        </section>

        <section class="mx-auto max-w-7xl space-y-8 px-4 lg:px-6">
            <div class="space-y-3">
                <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">Getting Started</p>
                <h2 id="Up-and-running-in-3-simple-steps" class="text-3xl font-semibold sm:text-4xl">
<a href="#Up-and-running-in-3-simple-steps" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Up and running in 3 simple steps
                    </a>
</h2>
                <p class="max-w-3xl text-on-surface-variant">
                    No complex configuration. Install, import the theme, and start building.
                </p>
            </div>

            <div class="grid gap-4 lg:grid-cols-3">
                <Card class="border border-outline-variant/70">
                    <div class="space-y-4">
                        <div class="inline-flex size-10 items-center justify-center rounded-2xl bg-primary-container font-semibold text-on-primary-container">
                            1
                        </div>
                        <div class="space-y-2">
                            <h3 class="text-lg font-semibold">Install the package</h3>
                            <p class="text-sm text-on-surface-variant">Add Svelora to your SvelteKit project.</p>
                        </div>
                        <div class="overflow-x-auto rounded-2xl bg-surface-container p-4 font-mono text-sm">
                            <code>{installCode}</code>
                        </div>
                    </div>
                </Card>

                <Card class="border border-outline-variant/70">
                    <div class="space-y-4">
                        <div class="inline-flex size-10 items-center justify-center rounded-2xl bg-primary-container font-semibold text-on-primary-container">
                            2
                        </div>
                        <div class="space-y-2">
                            <h3 class="text-lg font-semibold">Set up your styles</h3>
                            <p class="text-sm text-on-surface-variant">Import Tailwind and the Svelora theme tokens.</p>
                        </div>
                        <div class="overflow-x-auto rounded-2xl bg-surface-container p-4 font-mono text-xs">
                            <pre>{layoutCode}</pre>
                        </div>
                    </div>
                </Card>

                <Card class="border border-outline-variant/70">
                    <div class="space-y-4">
                        <div class="inline-flex size-10 items-center justify-center rounded-2xl bg-primary-container font-semibold text-on-primary-container">
                            3
                        </div>
                        <div class="space-y-2">
                            <h3 class="text-lg font-semibold">Start building</h3>
                            <p class="text-sm text-on-surface-variant">Import components and compose your first UI.</p>
                        </div>
                        <div class="overflow-x-auto rounded-2xl bg-surface-container p-4 font-mono text-xs">
                            <pre>{usageCode}</pre>
                        </div>
                    </div>
                </Card>
            </div>
        </section>

        <section class="mx-auto max-w-7xl px-4 lg:px-6">
            <Card class="overflow-hidden border border-outline-variant/70 bg-[linear-gradient(135deg,theme(colors.primary/.12),theme(colors.secondary/.08))]">
                <div class="grid gap-8 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-10 lg:py-12">
                    <div class="space-y-4">
                        <div class="flex flex-wrap gap-2">
                            <Badge label="Open Source" variant="soft" color="success" />
                            <Badge label="MIT" variant="soft" color="secondary" />
                        </div>
                        <div class="space-y-3">
                            <h2 id="Ready-to-build-something-amazing" class="text-3xl font-semibold sm:text-4xl">
<a href="#Ready-to-build-something-amazing" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Ready to build something amazing?
                    </a>
</h2>
                            <p class="max-w-2xl text-on-surface-variant">
                                Join developers building polished Svelte applications with a modern, accessible component system.
                            </p>
                        </div>
                    </div>

                    <div class="flex flex-wrap items-center gap-3">
                        <Button label="Get Started Free" href="/docs" leadingIcon="icon-[lucide--rocket]" />
                        <Button
                            label="Star on GitHub"
                            href={docsMeta.githubHref}
                            external
                            variant="outline"
                            color="secondary"
                            leadingIcon="icon-[lucide--star]"
                        />
                    </div>
                </div>
            </Card>
        </section>
    </main>

    <footer class="border-t border-outline-variant/60">
        <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-on-surface-variant lg:flex-row lg:items-center lg:justify-between lg:px-6">
            <div class="space-y-1">
                <p class="font-medium text-on-surface">{docsMeta.name}</p>
                <p>A modern, accessible Svelte 5 UI component library built with Tailwind CSS 4.</p>
            </div>

            <div class="flex flex-wrap items-center gap-4">
                {#each docsIntroItems.slice(0, 2) as item (item.href)}
                    <Link href={item.href} raw class="hover:text-primary">
                        {item.title}
                    </Link>
                {/each}
                <Link href="/docs/components/button" raw class="hover:text-primary">Components</Link>
                <Link href="/docs/hooks/use-debounce" raw class="hover:text-primary">Hooks</Link>
                <Link href={docsMeta.githubHref} raw external class="hover:text-primary">GitHub</Link>
            </div>
        </div>
    </footer>
</div>
