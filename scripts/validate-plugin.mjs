// Validates the Claude Code plugin and marketplace manifests against the schemas in schemas/, and
// checks that the plugin, its marketplace entry and @rosdal/dazzle all carry the same version.
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";

const root = path.resolve(fileURLToPath(import.meta.url), "../..");
const read = (file) => JSON.parse(readFileSync(path.join(root, file), "utf8"));

const ajv = new Ajv({ allErrors: true, strict: true });
ajv.addFormat("uri", /^https?:\/\/\S+$/);
ajv.addFormat("email", /^[^\s@]+@[^\s@]+$/);
ajv.addSchema(read("schemas/plugin.schema.json"), "plugin.schema.json");
ajv.addSchema(read("schemas/marketplace.schema.json"), "marketplace.schema.json");

const errors = [];
function validate(schema, file) {
  const data = read(file);
  if (!ajv.validate(schema, data)) {
    for (const e of ajv.errors ?? []) errors.push(`${file}${e.instancePath || ""}: ${e.message}`);
  }
  return data;
}

const marketplace = validate("marketplace.schema.json", ".claude-plugin/marketplace.json");
const { version } = read("packages/cli/package.json");

for (const entry of marketplace.plugins ?? []) {
  const manifestFile = path.posix.join(entry.source, ".claude-plugin/plugin.json");
  if (!existsSync(path.join(root, manifestFile))) {
    errors.push(`${entry.name}: ${manifestFile} does not exist`);
    continue;
  }
  const plugin = validate("plugin.schema.json", manifestFile);
  if (plugin.name !== entry.name) {
    errors.push(`${manifestFile}: name "${plugin.name}" differs from marketplace "${entry.name}"`);
  }
  if (plugin.version !== entry.version) {
    errors.push(
      `${manifestFile}: version ${plugin.version} differs from marketplace ${entry.version}`,
    );
  }
  if (plugin.version !== version) {
    errors.push(
      `${manifestFile}: version ${plugin.version} differs from @rosdal/dazzle ${version}`,
    );
  }
}

if (!existsSync(path.join(root, "plugin/commands/dazzle.md"))) {
  errors.push("plugin/commands/dazzle.md is missing");
}

if (errors.length > 0) {
  for (const e of errors) console.error(`✗ ${e}`);
  process.exit(1);
}
console.log(`✓ plugin.json and marketplace.json are valid (version ${version})`);
