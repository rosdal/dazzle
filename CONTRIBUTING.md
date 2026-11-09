# Contributing

## Setup

You need Node 22.15 or later (24 LTS recommended, see `.nvmrc`) and pnpm. The pnpm version is pinned in the `packageManager` field; run `corepack enable`, or use a globally installed pnpm, which switches to the pinned version on its own.

```sh
pnpm install
pnpm lint && pnpm typecheck && pnpm test && pnpm build
pnpm validate:plugin   # plugin.json and marketplace.json against schemas/
pnpm smoke:pack        # pack @rosdal/dazzle, install the tarball, run dazzle --version
pnpm dev:studio        # studio app with hot reload
```

`pnpm format` rewrites files with Biome.

## Plugin knowledge

The skill, references and direction archetypes in `plugin/` are linted in CI by `pnpm lint:knowledge`: required headings, frontmatter, the `SKILL.md` line budget, and every rule id, recipe name, path and link must resolve. Anti-pattern rules adapted from impeccable keep their attribution in `NOTICE`.

Trigger tests (`pnpm test:triggers`) check that design requests load the skill and unrelated requests don't. They call the Claude API, so they run nightly (`.github/workflows/triggers.yml`, needs the `ANTHROPIC_API_KEY` secret) or by hand, never on pull requests. Without an API key, `pnpm test:triggers --no-bare` uses your logged-in Claude Code with your own plugins switched off.

## Trying the plugin locally

In Claude Code, from any folder:

```text
/plugin marketplace add C:/path/to/dazzle
/plugin install dazzle@rosdal
```

Then `/dazzle` should be listed.

## Workflow

`main` is protected. Work on a branch and open a pull request; CI must pass before it can merge.

### Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `ci:`. Add a scope when it helps, for example `feat(studio): lever panel`.

### Changesets

A change that affects the published package `@rosdal/dazzle` (which bundles every package under `packages/`) or the plugin needs a changeset:

```sh
pnpm changeset
```

Pick `@rosdal/dazzle`, the bump type, and write a one-line summary. The release job sets the plugin's version in `plugin/.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` to match, so never edit those versions by hand. Docs-only and tooling-only changes don't need a changeset.

## Ground rules

- Read the [intended use](README.md#intended-use) section. Features that clone or imitate a named site won't be accepted.
- Corpus material (harvested sites, teardowns, calibration data) lives in a private repository and must never be committed here. `**/corpus/` is gitignored for that reason.
- Add a dependency only with the feature that uses it.
