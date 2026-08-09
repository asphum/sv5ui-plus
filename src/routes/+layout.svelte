<script lang="ts">
    import { page } from '$app/state'
    import './layout.css'
    import type { DocsGroup, DocsItem } from '$internal/docs/navigation.js'
    import { buildLocaleOptions } from '$internal/i18n.js'
    import {
        Button,
        ConfirmDialog,
        Icon,
        Link,
        LocaleButton,
        Main,
        NavigationMenu,
        type NavigationMenuItem,
        registerConfirmDialog,
        Search,
        type ConfirmOptions
    } from '$lib/compat.js'
    import { ModeWatcher, mode, toggleMode } from 'mode-watcher'
    import { m } from '$lib/paraglide/messages.js'
    import { getLocale, setLocale, toLocale } from '$lib/paraglide/runtime.js'
    import { onMount } from 'svelte'

    import {
        docsComponentGroups,
        docsHookItems,
        docsIntroItems,
        docsMeta,
        docsPathAliases,
        docsThemeItems,
        docsTopNav
    } from '$internal/docs/navigation.js'

    import '../sv5ui-plus.config.js'

    const { children, data } = $props<{
        children: () => unknown
        data: {
            pathname: string
        }
    }>()

    const sidebarSections = [
        { title: 'Getting Started', icon: 'lucide:rocket', items: docsIntroItems },
        { title: 'Theme & Config', icon: 'lucide:palette', items: docsThemeItems },
        ...docsComponentGroups.map((group) => ({ title: group.title, icon: group.icon, items: group.items })),
        { title: 'Hooks', icon: 'lucide:webhook', items: docsHookItems }
    ] satisfies DocsGroup[]

    let sidebarOpen = $state(false)
    let searchQuery = $state('')
    let confirmDialogRef = $state<{ show: (options?: ConfirmOptions) => Promise<boolean> } | undefined>(
        undefined
    )

    onMount(() => {
        registerConfirmDialog((options) => {
            if (!confirmDialogRef) {
                return Promise.resolve(false)
            }
            return confirmDialogRef.show(options)
        })
    })

    const isLanding = $derived(data.pathname === '/')
    const activePath = $derived(docsPathAliases.get(data.pathname) ?? data.pathname)
    const normalizedSearchQuery = $derived(searchQuery.trim().toLowerCase())
    const currentLocale = $derived(getLocale())
    const localeOptions = $derived(buildLocaleOptions())

    const filteredSidebarSections = $derived.by(() => {
        if (!normalizedSearchQuery) {
            return sidebarSections
        }

        return sidebarSections
            .map((section) => {
                const items = section.items.filter((item) => matchesSearch(item, normalizedSearchQuery))
                return items.length > 0 ? ({ ...section, items } as DocsGroup) : null
            })
            .filter((section): section is DocsGroup => section !== null)
    })

    const sidebarNavItems = $derived.by<NavigationMenuItem[]>(() => {
        return filteredSidebarSections.map(section => ({
            label: section.title,
            icon: section.icon,
            defaultOpen: true,
            badge: section.items.length,
            children: section.items.map(item => ({
                label: item.title,
                href: item.href,
                icon: item.icon,
                active: isNavActive(item.href)
            }))
        }))
    })

    const topNavItems = $derived.by<NavigationMenuItem[]>(() => {
        return docsTopNav.map(item => {
            let label = item.title
            let matchPattern = item.href

            if (item.href === '/docs') {
                label = m.layout_docs()
            }
            else if (item.href.includes('/components/')) {
                label = m.layout_components()
                matchPattern = '/docs/components'
            }
            else if (item.href.includes('/hooks/')) {
                label = m.layout_hooks()
                matchPattern = '/docs/hooks'
            }

            return {
                label,
                href: item.href,
                active: page.url.pathname.startsWith(matchPattern),
                exact: false
            }
        })
    })


    function isNavActive(href: string): boolean {
        return activePath === href
    }

    function matchesSearch(item: DocsItem, query: string): boolean {
        return [item.title, item.description ?? '', item.href, item.legacyHref ?? '']
            .join(' ')
            .toLowerCase()
            .includes(query)
    }

    const pageTitle = $derived.by(() => {
        if (isLanding) return 'SV5UI Plus - Premium Svelte 5 UI Components'
        for (const section of sidebarSections) {
            for (const item of section.items) {
                if (item.href === activePath) return `${item.title} - SV5UI Plus`
            }
        }
        if (activePath === '/editor') return 'Editor - SV5UI Plus'
        return 'SV5UI Plus'
    })
</script>

<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>

<ModeWatcher />

{#if isLanding}
    <div class="min-h-screen bg-surface text-on-surface">{@render children()}</div>
{:else}
    <div class="min-h-screen bg-surface text-on-surface">
        <header class="sticky top-0 z-50 h-(--ui-header-height) border-b border-outline-variant/70 bg-surface/90 backdrop-blur">
            <div class="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-4 px-4 lg:px-6">
                <div class="flex items-center gap-3">
                    <button
                        class="rounded-lg border border-outline-variant bg-surface-container p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high lg:hidden"
                        onclick={() => (sidebarOpen = !sidebarOpen)}
                        aria-label={m.layout_toggle_sidebar()}
                    >
                        <Icon name="lucide:menu" size="18" />
                    </button>

                    <Link href="/" raw class="flex items-center gap-2 text-base font-semibold text-on-surface">
                        <span class="inline-flex size-8 items-center justify-center rounded-xl bg-primary text-sm font-bold text-on-primary">
                            S
                        </span>

                        <span>{docsMeta.name}</span>

                        <span class="hidden rounded-full border border-outline-variant bg-surface-container px-2 py-0.5 text-xs text-on-surface-variant sm:inline">
                            {docsMeta.version}
                        </span>
                    </Link>
                </div>

                <nav class="hidden lg:block">
                    <NavigationMenu items={topNavItems} orientation="horizontal" variant="link" />
                </nav>

                <div class="flex items-center gap-2">
                    <LocaleButton
                        locales={localeOptions}
                        locale={currentLocale}
                        square
                        variant="outline"
                        color="secondary"
                        showChevron={false}
                        ariaLabel={m.locale_change_language()}
                        menuLabel={m.locale_language()}
                        class="rounded-full p-1! overflow-hidden"
                        onLocaleChange={(nextLocale) => {
                            const locale = toLocale(nextLocale)
                            if (locale) {
                                return setLocale(locale, { reload: true })
                            }
                        }}
                    >
                        {#snippet children({ currentLocale })}
                            {#if currentLocale?.code === 'th'}
                                <Icon name="circle-flags:th" size="24" />
                            {:else if currentLocale?.code === 'la'}
                                <Icon name="circle-flags:la" size="24" />
                            {:else if currentLocale?.code === 'en'}
                                <Icon name="circle-flags:uk" size="24" />
                            {:else}
                                <Icon name="lucide:globe" size="20" />
                            {/if}
                        {/snippet}

                        {#snippet item({ item, current, close })}
                            <button
                                class={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-lg ${
                                    current ? 'bg-surface-container-high text-on-surface' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                                }`}
                                onclick={() => {
                                    const locale = toLocale(item.code)
                                    if (locale) {
                                        setLocale(locale, { reload: true })
                                    }
                                    close()
                                }}
                            >
                                {#if item.code === 'th'}
                                    <Icon name="circle-flags:th" size="20" />
                                {:else if item.code === 'la'}
                                    <Icon name="circle-flags:la" size="20" />
                                {:else if item.code === 'en'}
                                    <Icon name="circle-flags:uk" size="20" />
                                {:else}
                                    <Icon name="lucide:globe" size="20" />
                                {/if}
                                
                                <span class="font-medium text-[14px] uppercase">{item.shortLabel ?? item.code}</span>
                            </button>
                        {/snippet}
                    </LocaleButton>
                    <Link
                        href={docsMeta.githubHref}
                        raw
                        external
                        class="hidden rounded-lg border border-outline-variant px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface sm:inline-flex"
                    >
                        {m.layout_github()}
                    </Link>

                    <Button
                        variant="ghost"
                        color="secondary"
                        icon={mode.current === 'dark' ? 'lucide:sun' : 'lucide:moon'}
                        onclick={toggleMode}
                        square
                        size="sm"
                    />
                </div>
            </div>
        </header>

        <div class="mx-auto flex max-w-[1600px]">
            {#if sidebarOpen}
                <button
                    class="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onclick={() => (sidebarOpen = false)}
                    aria-label={m.layout_close_sidebar()}
                ></button>
            {/if}

            <aside
                class={`fixed inset-y-0 left-0 top-(--ui-header-height) z-40 flex h-[calc(100svh-var(--ui-header-height))] w-80 shrink-0 flex-col border-r border-outline-variant bg-surface/95 backdrop-blur transition-transform duration-200 lg:sticky lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div class="border-b border-outline-variant/50">
                    <section class="space-y-3 p-1">
                        <Search
                            bind:value={searchQuery}
                            variant="input"
                            placeholder={m.layout_search_docs_placeholder()}
                            class="w-full"
                            aria-label={m.layout_search_docs_aria()}
                            kbd={['/']}
                        />

                        {#if normalizedSearchQuery}
                            <p class="px-1 text-xs text-on-surface-variant">
                                {#if filteredSidebarSections.length > 0}
                                    {m.layout_search_results({ query: searchQuery.trim() })}
                                {:else}
                                    {m.layout_search_empty({ query: searchQuery.trim() })}
                                {/if}
                            </p>
                        {/if}
                    </section>
                </div>

                <div class="flex-1 overflow-y-auto p-4 space-y-6 pb-12">
                    {#if sidebarNavItems.length > 0}
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <div class="-mx-3" onclick={() => (sidebarOpen = false)}>
                            <NavigationMenu 
                                items={sidebarNavItems} 
                                orientation="vertical" 
                                variant="link"
                            />
                        </div>
                    {/if}
                </div>
            </aside>

            <Main class="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
                <div class="mx-auto max-w-5xl">
                    {@render children()}
                </div>
            </Main>
        </div>
    </div>
{/if}

<ConfirmDialog bind:this={confirmDialogRef} />

<style global>
    :global(html) {
        scroll-behavior: smooth;
        scroll-padding-top: var(--ui-header-height, 4rem);
    }

    :global(body) {
        background: var(--color-surface);
        color: var(--color-on-surface);
    }
</style>
