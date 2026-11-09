// Run after `changeset version`: copies the @rosdal/dazzle version into the plugin manifest and its
// marketplace entry, so the plugin and the npm package always release together.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(import.meta.url), "../..");
const file = (p) => path.join(root, p);
const read = (p) => JSON.parse(readFileSync(file(p), "utf8"));
const write = (p, data) => writeFileSync(file(p), `${JSON.stringify(data, null, 2)}\n`);

const { version } = read("packages/cli/package.json");

const plugin = read("plugin/.claude-plugin/plugin.json");
plugin.version = version;
write("plugin/.claude-plugin/plugin.json", plugin);

const marketplace = read(".claude-plugin/marketplace.json");
for (const entry of marketplace.plugins) if (entry.name === plugin.name) entry.version = version;
write(".claude-plugin/marketplace.json", marketplace);

console.log(`plugin version set to ${version}`);
