# Svelora

Companion components and hooks for [SV5UI](https://github.com/ndlabdev/sv5ui) and Svelte 5.

Svelora no longer maintains copies of SV5UI components. Version 4 contains only additions that SV5UI does not provide, plus a small compatibility entry point for gradual migration.

## Install

```bash
bun add sv5ui svelora
```

```css
/* src/routes/layout.css */
@import 'sv5ui/theme.css';
@source '../../node_modules/svelora/dist';
```

Import core UI from SV5UI and addons from Svelora:

```svelte
<script lang="ts">
  import { Button, Icon } from 'sv5ui'
  import { ColorPicker, ConfirmDialog, Search } from 'svelora'
</script>
```

For an incremental migration, `svelora/compat` re-exports SV5UI together with Svelora addons:

```ts
import { Button, ColorPicker } from 'svelora/compat'
```

New code should use the explicit `sv5ui` and `svelora` imports.

## Addons

- Content and display: `BentoGrid`, `Chart`, `Chat`, `CodeBlock`, `Fonts`, `List`, `Marquee`, `NumberTicker`, `Prose`, `Spotlight`
- Forms and overlays: `ColorPicker`, `ConfirmDialog`, `LocaleButton`, `PasswordInput`, `Search`
- Layout and data: `Resizable`, `ScrollArea`, `TableBulkActionBar`, `TreeView`
- Drag and drop: `SortableGroup`, `SortableList`, `useDragDrop`, `useSortable`
- SvelteKit adapter: `SvelteKitNavigationMenu`
- Feedback adapter: `notify`

The editor entry point remains available as `svelora/editor` and proxies `sv5ui/editor`.

## Breaking changes in v4

- Removed components and hooks already supplied by SV5UI.
- Icon names use Iconify syntax such as `lucide:edit`.
- The former `NavigationMenu` addon is exported as `SvelteKitNavigationMenu` to avoid colliding with SV5UI.
- Core configuration comes from `sv5ui`; Svelora-specific aliases remain available for migration.

## Verification

```bash
bun run release:verify:full
```

## License

[MIT](LICENSE) © [asphum](https://github.com/asphum)
