// Makes dist/ self-contained. The internal packages are private, so their declarations are copied
// into dist/internal/ and the bare specifiers that point at them are rewritten to relative paths.
// The built studio app is copied to dist/studio/.
import { cp, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const cli = path.resolve(fileURLToPath(import.meta.url), "../..");
const packages = path.dirname(cli);
const dist = path.join(cli, "dist");
const internal = ["config", "runtime", "vite-plugin", "check", "mcp"];

for (const name of internal) {
  await cp(path.join(packages, name, "dist"), path.join(dist, "internal", name), {
    recursive: true,
    filter: (src) => !/\.js(\.map)?$/.test(src),
  });
}
await cp(path.join(packages, "studio", "dist"), path.join(dist, "studio"), { recursive: true });

const specifier = /(["'])@rosdal\/dazzle-([a-z-]+)\1/g;
for (const entry of await readdir(dist, { recursive: true })) {
  if (!entry.endsWith(".d.ts")) continue;
  const file = path.join(dist, entry);
  const text = await readFile(file, "utf8");
  const next = text.replace(specifier, (match, quote, name) => {
    if (!internal.includes(name)) return match;
    const target = path.join(dist, "internal", name, "index.js");
    const rel = path.relative(path.dirname(file), target).split(path.sep).join("/");
    return `${quote}${rel.startsWith(".") ? rel : `./${rel}`}${quote}`;
  });
  if (next !== text) await writeFile(file, next);
}
