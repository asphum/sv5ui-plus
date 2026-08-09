# Contributing to SV5UI Plus

Thanks for your interest in contributing! This guide explains how to set up the project, the conventions every component follows, and the workflow from issue to merged PR.

## Prerequisites

- **Node.js** 22+
- **Bun** 1.3+

## Setup

```bash
bun install
bun dev        # start the docs/demo app (src/routes)
```

## Quality gates

Every change must pass these locally before opening a PR (CI runs the same on `main`):

```bash
bun check       # svelte-check — type checking (must be 0 errors, 0 warnings)
bun lint        # biome check
bun test        # vitest (browser + node projects)
bun build       # package build
```

Use `bun format` to auto-fix formatting. Use `bun lint:fix` to apply safe lint fixes.

## Workflow

We use an **issue-driven** flow. `dev` is the integration branch; `main` is the released branch.

1. **Open an issue** first (bug, feature, or component review) using the issue templates. Wait for triage (labels + priority) unless it's trivial.
2. **Branch from `dev`** using the naming convention below.
3. **Implement** following the conventions, with tests and clear git commit messages for the auto-generated changelog.
4. **Open a PR targeting `dev`** with `Closes #<issue>` in the body and the checklist filled.
5. After review and approval, it's merged into `dev`. Releases merge `dev → main`.

> Note: CI currently runs on PRs to `main`. Until that also covers `dev`, **run the quality gates locally** before every PR to `dev`.

### Branch naming

```
fix/<issue#>-short-slug      # bug fix
feat/<issue#>-short-slug     # new feature / component
docs/<issue#>-short-slug     # documentation
chore/<short-slug>           # tooling, CI, deps, governance
```

### Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
fix(button): correct loading icon spin
feat(timeline): add Timeline component
docs(readme): document defineConfig
chore(ci): run checks on dev branch
```

Allowed types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`, `perf`. The scope is usually the component name (lowercase).

## Coding conventions

These are enforced by review and keep 40+ components consistent:

- **No comments in code** except inside `*.types.ts` files. Rely on naming and types instead.
- **Material Design 3 design tokens only** — use `bg-primary`, `text-on-surface`, `ring-outline-variant`, etc. Never hardcode colors.
- **Mirror Nuxt UI v4** — match its slot names, variant names, and `defaultVariants` where reasonable. Diverge only with a documented reason.
- **Styling via `tailwind-variants`** (`*.variants.ts`), with slots and `compoundVariants` for color × variant combinations.
- **Svelte 5 runes** — `$derived` for simple derivations, `$derived.by` only for multi-line logic; avoid `$effect` unless necessary; `$bindable` for two-way props.
- **Public types** must not leak `any`/`unknown` or internal slot/variant types. Export only what users need (`Props`, and user-facing `Size`/`Color`/`Variant`).

## Component structure

Each component lives in `src/lib/<Component>/`:

```
<Component>.svelte           # component (imports types + variants)
<component>.types.ts          # public Props type (the only place comments are allowed)
<component>.variants.ts       # tailwind-variants definition + defaults for the config system
<Component>.svelte.spec.ts    # tests (vitest, *.svelte.spec.ts runs in the browser project)
index.ts                      # exports the component + user-facing types only
```

### Adding a new component

- [ ] Create the five files above following an existing component (e.g. `Button`) as a template.
- [ ] Wire defaults into the config system (`defineConfig` support via the `*Defaults` export).
- [ ] Export it from `src/lib/index.ts`.
- [ ] Add a demo page under `src/routes/<component>/+page.svelte`.
- [ ] Write tests covering rendering, props, variants, and behavior.
- [ ] Use clear commit messages so the generated release notes stay readable.

## Changelog

This project follows [Keep a Changelog](https://keepachangelog.com/) and [SemVer](https://semver.org/). Release notes are generated automatically from unreleased git commits and grouped into `Added` / `Changed` / `Fixed`. Prefer commit messages that are concise, descriptive, and scoped when helpful (for example `feat(button): add loading icon`).

## Release process (maintainers)

Use the dedicated release checklist before every publish:

- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md)

Normalize the `Unreleased` template when needed:

```bash
bun run changelog:template
```

Recommended one-command release flow:

```bash
bun run public
```

Alternative version bumps:

```bash
bun run public:minor
# bun run public:major
```

Run the full verification suite before publishing when needed:

```bash
bun run public:full
```

The release command now generates `CHANGELOG.md` automatically from unreleased git commits before it publishes.

1. Run the publish command and let the script commit local changes automatically when needed.
2. Let the script bump `package.json`, generate changelog entries, and move them into the new versioned section automatically.
3. PR `dev → main`.
4. Tag the release and run `gh release create` so it appears in the Releases sidebar.

## Reporting security issues

Please do **not** open public issues for security vulnerabilities. See [SECURITY.md](./SECURITY.md).
