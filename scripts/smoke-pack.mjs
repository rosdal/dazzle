// Packs @rosdal/dazzle, installs the tarball into an empty temp project and checks that the bin
// prints the package version and that every public subpath export imports.
import { execFileSync, execSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(import.meta.url), "../..");
const cli = path.join(root, "packages/cli");
const { version } = JSON.parse(readFileSync(path.join(cli, "package.json"), "utf8"));
const win = process.platform === "win32";

function run(cmd, args, cwd) {
  if (!win) return execFileSync(cmd, args, { cwd, encoding: "utf8" }).trim();
  // On Windows, pnpm, npm and npx are .cmd shims, which only run through a shell.
  const line = [cmd, ...args].map((a) => (/[\s"]/.test(a) ? `"${a}"` : a)).join(" ");
  return execSync(line, { cwd, encoding: "utf8" }).trim();
}

const work = mkdtempSync(path.join(tmpdir(), "dazzle-pack-"));
try {
  run("pnpm", ["pack", "--pack-destination", work], cli);
  const tarball = readdirSync(work).find((f) => f.endsWith(".tgz"));
  if (!tarball) throw new Error("pnpm pack produced no tarball");

  const app = path.join(work, "app");
  mkdirSync(app);
  writeFileSync(path.join(app, "package.json"), '{ "name": "smoke", "private": true }\n');
  // vite is an optional peer that the ./vite subpath needs.
  run("npm", ["install", "--no-audit", "--no-fund", path.join(work, tarball), "vite@8"], app);

  const printed = run("npx", ["--no-install", "dazzle", "--version"], app);
  if (printed !== version)
    throw new Error(`dazzle --version printed "${printed}", expected ${version}`);

  const subpaths = ["config", "levers", "runtime", "vite"];
  const script = `await Promise.all(${JSON.stringify(subpaths)}.map((s) => import("@rosdal/dazzle/" + s)));`;
  writeFileSync(path.join(app, "imports.mjs"), script);
  run("node", ["imports.mjs"], app);

  console.log(`✓ packed @rosdal/dazzle@${version}: bin and ${subpaths.length} subpaths work`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
