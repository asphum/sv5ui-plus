# SV5UI Plus

Companion components and hooks for [SV5UI](https://github.com/ndlabdev/sv5ui) and Svelte 5.

SV5UI Plus no longer maintains copies of SV5UI components. Version 4 contains only additions that SV5UI does not provide, plus a small compatibility entry point for gradual migration.

## Install

```bash
bun add sv5ui sv5ui-plus
```

```css
/* src/routes/layout.css */
@import 'sv5ui/theme.css';
@source '../../node_modules/sv5ui-plus/dist';
```

Import core UI from SV5UI and addons from SV5UI Plus:

```svelte
<script lang="ts">
  import { Button, Icon } from 'sv5ui'
  import { ColorPicker, ConfirmDialog, Search } from 'sv5ui-plus'
</script>
```

For an incremental migration from Svelora, `sv5ui-plus/compat` re-exports SV5UI together with SV5UI Plus addons:

```ts
import { Button, ColorPicker } from 'sv5ui-plus/compat'
```

New code should use the explicit `sv5ui` and `sv5ui-plus` imports.

## Addons

- Content and display: `BentoGrid`, `Chart`, `Chat`, `CodeBlock`, `Fonts`, `List`, `Marquee`, `NumberTicker`, `Prose`, `Spotlight`
- Forms and overlays: `ColorPicker`, `ConfirmDialog`, `LocaleButton`, `PasswordInput`, `Search`
- Layout and data: `Resizable`, `ScrollArea`, `SafeTable`, `TableBulkActionBar`, `TreeView`
- Forms: `FormSelect`, `DatePickerField`, `DateRangePickerField`, `PasswordInput`
- Drag and drop: `SortableGroup`, `SortableList`, `useDragDrop`, `useSortable`
- SvelteKit adapter: `SvelteKitNavigationMenu`
- Feedback adapter: `notify`

The editor entry point remains available as `sv5ui-plus/editor` and proxies `sv5ui/editor`.

## Breaking changes in v4

- Removed components and hooks already supplied by SV5UI.
- Icon names use Iconify syntax such as `lucide:edit`.
- The former `NavigationMenu` addon is exported as `SvelteKitNavigationMenu` to avoid colliding with SV5UI.
- Core configuration comes from `sv5ui`; SV5UI Plus-specific aliases remain available for migration.

## Verification

```bash
bun run release:verify:full
```

## License

[MIT](LICENSE) © [asphum](https://github.com/asphum)
