// Trigger tests for the dazzle skill: runs each prompt in plugin/tests/triggers.yaml through
// `claude -p` with only this plugin loaded, and checks whether the model called the Skill tool for
// `dazzle`. Prompts under `trigger` must load it; prompts under `ignore` must not.
//
// Costs tokens, so it runs by hand or nightly, never on pull requests:
//   pnpm test:triggers                 uses --bare (needs ANTHROPIC_API_KEY)
//   pnpm test:triggers --no-bare       uses your logged-in Claude Code, without your plugins or MCP servers
//   pnpm test:triggers --only 3,12     runs a subset (1-based, trigger list first)
import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

const root = path.resolve(fileURLToPath(import.meta.url), "../..");
const plugin = path.join(root, "plugin");
const args = process.argv.slice(2);
const bare = !args.includes("--no-bare");
const onlyArg = args[args.indexOf("--only") + 1];
const only = args.includes("--only") ? new Set(onlyArg.split(",").map(Number)) : null;
const CONCURRENCY = 4;
const TIMEOUT_MS = 180_000;
// Enough turns for the model to look around before deciding; the run stops as soon as the skill loads.
const MAX_TURNS = 4;

const { trigger, ignore } = parseYaml(
  readFileSync(path.join(plugin, "tests/triggers.yaml"), "utf8"),
);
const cases = [
  ...trigger.map((prompt) => ({ prompt, expect: true })),
  ...ignore.map((prompt) => ({ prompt, expect: false })),
].map((c, i) => ({ ...c, n: i + 1 }));
const selected = only ? cases.filter((c) => only.has(c.n)) : cases;

const isDazzleSkill = (block) =>
  block?.type === "tool_use" &&
  block.name === "Skill" &&
  /^(dazzle:)?dazzle$/.test(String(block.input?.skill ?? block.input?.command ?? ""));

function runCase({ prompt }) {
  return new Promise((resolve) => {
    // An empty working directory, so no project files or CLAUDE.md steer the model.
    const cwd = mkdtempSync(path.join(tmpdir(), "dazzle-trigger-"));
    const cliArgs = [
      "-p",
      prompt,
      "--output-format",
      "stream-json",
      "--verbose",
      "--plugin-dir",
      plugin,
      "--max-turns",
      String(MAX_TURNS),
      "--disallowedTools",
      "Bash,Write,Edit,NotebookEdit,WebFetch,WebSearch",
    ];
    // Without --bare, still keep the user's own plugins (enabled in user settings) and MCP servers
    // out, so another design skill can't take the prompt.
    if (bare) cliArgs.push("--bare");
    else cliArgs.push("--setting-sources", "project", "--strict-mcp-config");
    // No shell: prompts contain spaces and quotes. On Windows, Claude Code installs claude.exe.
    const child = spawn("claude", cliArgs, { cwd });
    let buffer = "";
    let loaded = false;
    let pluginSeen = false;
    let settled = false;
    let verdict;
    const finish = (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      verdict = { loaded, pluginSeen, error };
      child.kill();
    };
    // Clean up only once the process has exited: Windows keeps its working directory locked.
    child.on("close", () => {
      finish();
      rmSync(cwd, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
      resolve(verdict);
    });
    const timer = setTimeout(() => finish("timeout"), TIMEOUT_MS);
    child.stdout.on("data", (chunk) => {
      buffer += chunk;
      let nl = buffer.indexOf("\n");
      while (nl !== -1) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        nl = buffer.indexOf("\n");
        if (!line.startsWith("{")) continue;
        let event;
        try {
          event = JSON.parse(line);
        } catch {
          continue;
        }
        if (event.type === "system" && event.subtype === "init") {
          pluginSeen = (event.plugins ?? []).some((p) => p.name === "dazzle");
        }
        if (event.type === "assistant" && event.message?.content?.some(isDazzleSkill)) {
          loaded = true;
          finish();
          return;
        }
        if (event.type === "result") {
          finish(event.is_error ? event.subtype : undefined);
          return;
        }
      }
    });
    // A process that fails to start emits no "close", so resolve here.
    child.on("error", (e) => {
      finish(e.message);
      rmSync(cwd, { recursive: true, force: true });
      resolve(verdict);
    });
  });
}

async function pool(items, worker) {
  const results = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await worker(items[i]);
      }
    }),
  );
  return results;
}

console.log(
  `Running ${selected.length} trigger cases (${bare ? "--bare" : "logged-in, without your plugins"})…`,
);
const results = await pool(selected, async (c) => {
  const r = await runCase(c);
  const pass = r.loaded === c.expect && !(r.error && r.error !== "error_max_turns");
  const verdict = pass ? "✓" : "✗";
  const what = r.loaded ? "loaded" : "not loaded";
  const note = r.error ? ` (${r.error})` : r.pluginSeen ? "" : " (plugin not loaded)";
  console.log(`${verdict} #${c.n} ${c.expect ? "trigger" : "ignore "} ${what}${note}: ${c.prompt}`);
  return { ...c, ...r, pass };
});

const failed = results.filter((r) => !r.pass);
const t = results.filter((r) => r.expect);
const i = results.filter((r) => !r.expect);
console.log(
  `\ntrigger: ${t.filter((r) => r.pass).length}/${t.length}  ignore: ${i.filter((r) => r.pass).length}/${i.length}`,
);
process.exit(failed.length > 0 ? 1 : 0);
