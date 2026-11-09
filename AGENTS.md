# AGENTS.md

Instructions for coding agents (Claude Code, Codex, Cursor) working on this repository.

## What this is

Dazzle gives Vite projects design levers, a local studio and design checks, plus a Claude Code plugin that drives them. The product plan is in `docs/design.md`, and numbered todos live in `docs/todo/`; both are local only and gitignored. Read the design before adding a feature, and stay inside the current todo's scope.

## Stack

- Node 22.15+ (develop on 24 LTS), ESM only, TypeScript `strict` with `module: NodeNext`
- pnpm workspaces (`packages/*`, `recipes/*`, `bench`), version pinned via `packageManager`
- tsup bundles JS; `tsc` emits declarations, because TypeScript 7 has no JS compiler API and tsup's `dts` option fails with it
- Biome for lint and format, Vitest for tests, Changesets for releases
- Studio: React 19, Vite, TanStack Router

## Layout

- `packages/cli`: `@rosdal/dazzle`, the only published package. Bin `dazzle`; subpath exports `./vite`, `./config`, `./runtime`, `./levers`. Its build bundles the private packages in, copies their declarations to `dist/internal/`, and copies the built studio to `dist/studio/`.
- `packages/config`, `runtime`, `vite-plugin`, `check`, `mcp`, `studio`: private `@rosdal/dazzle-*` packages. Each `exports` a `source` condition, so tests and the CLI build read TypeScript directly.
- `plugin/`: the Claude Code plugin (commands, skills, agents, hooks). `.claude-plugin/marketplace.json` at the root points at it.
- `schemas/`: JSON schemas for `plugin.json` and `marketplace.json`, checked by `pnpm validate:plugin`.
- `recipes/`, `bench/`: see their READMEs.

## Commands

```sh
pnpm install
pnpm build            # all packages
pnpm test             # Vitest, all projects
pnpm lint             # biome check
pnpm typecheck        # tsc --noEmit per package
pnpm validate:plugin  # manifest schemas and version sync
pnpm smoke:pack       # pack, install, run dazzle --version
```

Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build` before calling a change done.

## Conventions

- Relative imports carry the `.js` extension (NodeNext).
- Use `import type` for type-only imports (`verbatimModuleSyntax`).
- Tests live in `packages/<name>/test/*.test.ts`.
- Conventional Commits. Add a changeset (`pnpm changeset`) when `@rosdal/dazzle` or the plugin changes.
- Never edit plugin versions by hand; `scripts/sync-plugin-version.mjs` copies the npm version into them on release.
- Add a dependency only with the feature that uses it.
- Never commit corpus material; it belongs in the private `Rosdal/dazzle-corpus` repo.
- No feature that clones or imitates a named site.
