# Dazzle

[![CI](https://github.com/Rosdal/dazzle/actions/workflows/ci.yml/badge.svg)](https://github.com/Rosdal/dazzle/actions/workflows/ci.yml)
![status: pre-alpha](https://img.shields.io/badge/status-pre--alpha-red)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

Dazzle helps you design original sites with Claude Code. It gives a Vite project a set of design levers (type, colour, spacing, motion) that you tune in a local studio instead of by prompt, runs checks that catch generic or broken design before you ship, and comes with a Claude Code plugin so the agent works with the same levers you do. One npm package, `@rosdal/dazzle`, and one plugin, released together under the same version.

> **Status: pre-alpha.** Nothing works yet. Every command is a stub that prints "not implemented".

## Planned commands

| Command         | What it will do                 |
| --------------- | ------------------------------- |
| `dazzle init`   | Set up Dazzle in a Vite project |
| `dazzle studio` | Open the local design studio    |
| `dazzle check`  | Run design checks               |
| `dazzle mcp`    | Start the MCP server for agents |
| `dazzle add`    | Add a recipe to the project     |
| `dazzle frames` | Capture frames of the site      |
| `dazzle tokens` | Read or write design tokens     |
| `dazzle story`  | Generate a design story         |

The package also exports `@rosdal/dazzle/vite`, `/config`, `/runtime` and `/levers`.

In Claude Code:

```text
/plugin marketplace add rosdal/dazzle
/plugin install dazzle@rosdal
```

## Design

Docs live at [rosdal.github.io/dazzle](https://rosdal.github.io/dazzle/). The design doc is not public yet.

## Intended use

Dazzle is for designing **original** sites: your own product, your own brand, your own ideas.

- Dazzle never clones a named site. It has no command, recipe or prompt that takes "make it look like _example.com_" as input, and contributions that add one won't be accepted.
- Everything Dazzle generates in your project is yours. The code is MIT-licensed, and generated output carries no Dazzle license terms.

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE). Third-party attributions are listed in [NOTICE](NOTICE).
