import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Container, { type Props } from './Container.svelte'

describe('Container', () => {
    // Helpers
    const getRoot = (container: Element) => container.firstElementChild as HTMLElement

    // ==================== RENDERING ====================

    describe('rendering', () => {
        it('should render root element', async () => {
            const { container } = await render(Container)
            expect(getRoot(container)).not.toBeNull()
        })

        it('should render as div by default', async () => {
            const { container } = await render(Container)
            expect(getRoot(container).tagName).toBe('DIV')
        })

        it('should render without children', async () => {
            const { container } = await render(Container)
            const root = getRoot(container)
            expect(root).not.toBeNull()
            expect(root.children.length).toBe(0)
        })
    })

    // ==================== SEMANTIC ELEMENTS ====================

    describe('semantic elements', () => {
        it('should render as section', async () => {
            const { container } = await render(Container, { as: 'section' })
            expect(getRoot(container).tagName).toBe('SECTION')
        })

        it('should render as main', async () => {
            const { container } = await render(Container, { as: 'main' })
            expect(getRoot(container).tagName).toBe('MAIN')
        })

        it('should render as article', async () => {
            const { container } = await render(Container, { as: 'article' })
            expect(getRoot(container).tagName).toBe('ARTICLE')
        })

        it('should render as nav', async () => {
            const { container } = await render(Container, { as: 'nav' })
            expect(getRoot(container).tagName).toBe('NAV')
        })

        it('should render as header', async () => {
            const { container } = await render(Container, { as: 'header' })
            expect(getRoot(container).tagName).toBe('HEADER')
        })

        it('should render as footer', async () => {
            const { container } = await render(Container, { as: 'footer' })
            expect(getRoot(container).tagName).toBe('FOOTER')
        })
    })

    // ==================== DEFAULT CLASSES ====================

    describe('default classes', () => {
        it('should have w-full class', async () => {
            const { container } = await render(Container)
            expect(getRoot(container).className).toContain('w-full')
        })

        it('should have max-w-7xl class', async () => {
            const { container } = await render(Container)
            expect(getRoot(container).className).toContain('max-w-7xl')
        })

        it('should have mx-auto class', async () => {
            const { container } = await render(Container)
            expect(getRoot(container).className).toContain('mx-auto')
        })

        it('should have default horizontal padding', async () => {
            const { container } = await render(Container)
            const root = getRoot(container)
            expect(root.className).toContain('px-3')
        })
    })

    // ==================== CUSTOM CLASS ====================

    describe('custom class', () => {
        it('should apply custom class', async () => {
            const { container } = await render(Container, { class: 'my-container' })
            expect(getRoot(container).className).toContain('my-container')
        })

        it('should merge custom class with default classes', async () => {
            const { container } = await render(Container, { class: 'py-8' })
            const root = getRoot(container)
            expect(root.className).toContain('py-8')
            expect(root.className).toContain('mx-auto')
        })

        it('should allow overriding default classes', async () => {
            const { container } = await render(Container, { class: 'max-w-sm' })
            const root = getRoot(container)
            expect(root.className).toContain('max-w-sm')
        })
    })

    // ==================== UI SLOT OVERRIDES ====================

    describe('ui slot overrides', () => {
        it('should apply ui.root class', async () => {
            const { container } = await render(Container, { ui: { root: 'custom-root' } })
            expect(getRoot(container).className).toContain('custom-root')
        })

        it('should merge ui.root with default classes', async () => {
            const { container } = await render(Container, { ui: { root: 'max-w-xl' } })
            const root = getRoot(container)
            expect(root.className).toContain('max-w-xl')
            expect(root.className).toContain('mx-auto')
        })

        it('should apply both class and ui.root', async () => {
            const { container } = await render(Container, {
                class: 'py-4',
                ui: { root: 'max-w-3xl' }
            })
            const root = getRoot(container)
            expect(root.className).toContain('py-4')
            expect(root.className).toContain('max-w-3xl')
        })
    })

    // ==================== HTML ATTRIBUTES ====================

    describe('html attributes', () => {
        it('should pass through id attribute', async () => {
            const { container } = await render(Container, { id: 'main-content' })
            expect(getRoot(container).getAttribute('id')).toBe('main-content')
        })

        it('should pass through role attribute', async () => {
            const { container } = await render(Container, { role: 'main' })
            expect(getRoot(container).getAttribute('role')).toBe('main')
        })

        it('should pass through aria attributes', async () => {
            const { container } = await render(Container, {
                'aria-label': 'Main content'
            } as Props & {
                'aria-label': string
            })
            expect(getRoot(container).getAttribute('aria-label')).toBe('Main content')
        })

        it('should pass through data attributes', async () => {
            const { container } = await render(Container, {
                'data-testid': 'container-1'
            } as Props & {
                'data-testid': string
            })
            expect(getRoot(container).getAttribute('data-testid')).toBe('container-1')
        })
    })

    // ==================== COMBINED FEATURES ====================

    describe('combined features', () => {
        it('should render as section with custom class and ui', async () => {
            const { container } = await render(Container, {
                as: 'section',
                class: 'py-8',
                ui: { root: 'max-w-3xl' }
            })
            const root = getRoot(container)
            expect(root.tagName).toBe('SECTION')
            expect(root.className).toContain('py-8')
            expect(root.className).toContain('max-w-3xl')
            expect(root.className).toContain('mx-auto')
        })

        it('should render as footer with id and class', async () => {
            const { container } = await render(Container, {
                as: 'footer',
                id: 'site-footer',
                class: 'border-t'
            })
            const root = getRoot(container)
            expect(root.tagName).toBe('FOOTER')
            expect(root.getAttribute('id')).toBe('site-footer')
            expect(root.className).toContain('border-t')
        })

        it('should render as nav with all props', async () => {
            const { container } = await render(Container, {
                as: 'nav',
                id: 'main-nav',
                class: 'sticky top-0',
                ui: { root: 'max-w-5xl' },
                'aria-label': 'Main navigation'
            } as Props & { 'aria-label': string })
            const root = getRoot(container)
            expect(root.tagName).toBe('NAV')
            expect(root.getAttribute('id')).toBe('main-nav')
            expect(root.getAttribute('aria-label')).toBe('Main navigation')
            expect(root.className).toContain('sticky')
            expect(root.className).toContain('max-w-5xl')
        })
    })
})
