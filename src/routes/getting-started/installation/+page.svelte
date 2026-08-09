<script lang="ts">
    import { Alert } from 'sv5ui'
    import { CodeBlock } from 'sv5ui-plus'

    const install = 'bun add sv5ui sv5ui-plus'
    const css = `@import 'sv5ui/theme.css';\n@source '../../node_modules/sv5ui-plus/dist';`
    const usage = `<script lang="ts">\n  import { Button } from 'sv5ui'\n  import { ColorPicker } from 'sv5ui-plus'\n</${'script'}>`
</script>

<div class="space-y-8">
    <header class="space-y-2">
        <h1 class="text-4xl font-semibold tracking-tight">Installation</h1>
        <p class="text-on-surface-variant">Install the core and companion package together.</p>
    </header>

    <section class="space-y-3">
        <h2 class="text-xl font-semibold">1. Install packages</h2>
        <CodeBlock code={install} copyText={install} />
    </section>

    <section class="space-y-3">
        <h2 class="text-xl font-semibold">2. Load theme and scan addons</h2>
        <CodeBlock code={css} copyText={css} />
    </section>

    <section class="space-y-3">
        <h2 class="text-xl font-semibold">3. Use explicit imports</h2>
        <CodeBlock code={usage} copyText={usage} />
    </section>

    <Alert title="Migrating from Svelora" description="Use sv5ui-plus/compat temporarily. New code should import core UI from sv5ui and addons from sv5ui-plus." color="info" />
</div>
