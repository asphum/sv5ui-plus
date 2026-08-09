# Release Checklist

Use this checklist for every SV5UI Plus release.

## 1. Decide the release scope

- [ ] Confirm what changed since the last release.
- [ ] Decide whether the next version is `patch`, `minor`, or `major`.
- [ ] Verify that breaking changes are documented clearly.

## 2. Prepare the release

- [ ] Write clear git commit messages because `CHANGELOG.md` will be generated from unreleased commits automatically.
- [ ] Keep `CHANGELOG.md` checked in with the `Unreleased` template section present.
- [ ] Review README or docs if install, API, exports, or peer dependencies changed.
- [ ] Confirm newly exported symbols are included in `src/lib/index.ts`.
- [ ] Confirm runtime dependencies are in `dependencies`, not only `devDependencies`.
- [ ] Confirm optional integrations remain in `peerDependencies` and `peerDependenciesMeta`.

## 3. Run verification

- [ ] Run `bun install` if dependencies changed.
- [ ] Run `bun run check`.
- [ ] Run `bun run prepack`.
- [ ] Run `bun run release:verify`.
- [ ] Run `bun run release:verify:full` if the full test suite is expected to pass for this release.
- [ ] Inspect the generated tarball preview from `npm pack --dry-run`.
- [ ] Remember that the release script will bump `package.json`, generate changelog entries from git commits, and move them into the new version section automatically.

## 4. Validate package contents

- [ ] Confirm `dist/` contains the expected entrypoints and type declarations.
- [ ] Confirm `package.json` `exports`, `svelte`, and `types` still point to valid built files.
- [ ] Confirm the package can be installed with `bun add sv5ui-plus`.
- [ ] Smoke test imports in a fresh app if the release changes packaging or install flow.

## 5. Publish

- [ ] Confirm `npm whoami` shows the correct account.
- [ ] Confirm npm auth is valid before publish.
- [ ] Run `npm publish --access public`.
- [ ] Verify `npm view sv5ui-plus version` shows the new version.
- [ ] Open the npm package page and confirm metadata looks correct.

## 6. Post-release

- [ ] Tag the release in git.
- [ ] Create the GitHub release if needed.
- [ ] Announce notable changes or migration notes.
- [ ] If the template was edited accidentally, restore it before release.

## Commands

```bash
bun run changelog:template
```

```bash
bun run public
```

```bash
bun run public:minor
# bun run public:major
```

```bash
bun run check
bun run prepack
bun run release:verify
bun run release:verify:full
npm publish --access public
npm view sv5ui-plus version
```

```bash
bun run public:full
```

```bash
bun run public:minor:full
# bun run public:major:full
```
