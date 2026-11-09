// Release step run by the Release workflow after `changeset version` has landed on main.
// npm's trusted publisher for @rosdal/dazzle may only *stage* a release (a maintainer approves it
// on npmjs.com), which `changeset publish` cannot do. So this script packs the CLI with pnpm (which
// resolves workspace: ranges), stages the tarball with `npm stage publish` (OIDC auth, provenance),
// then tags the commit and prints changesets' "New tag:" line so changesets/action pushes the tag
// and creates the GitHub release.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(import.meta.url), "../..");
const cli = path.join(root, "packages/cli");
const { name, version } = JSON.parse(readFileSync(path.join(cli, "package.json"), "utf8"));
const spec = `${name}@${version}`;
const run = (cmd, args, cwd = root) =>
  execFileSync(cmd, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim();

function published() {
  try {
    return run("npm", ["view", spec, "version"]) === version;
  } catch {
    return false; // npm view exits non-zero when the version does not exist
  }
}

if (published()) {
  console.log(`${spec} is already on npm; nothing to stage.`);
  process.exit(0);
}

const work = mkdtempSync(path.join(tmpdir(), "dazzle-stage-"));
try {
  run("pnpm", ["pack", "--pack-destination", work], cli);
  const tarball = readdirSync(work).find((f) => f.endsWith(".tgz"));
  if (!tarball) throw new Error("pnpm pack produced no tarball");
  execFileSync(
    "npm",
    ["stage", "publish", path.join(work, tarball), "--provenance", "--access", "public"],
    { cwd: root, stdio: "inherit" },
  );
} finally {
  rmSync(work, { recursive: true, force: true });
}

run("git", ["tag", spec]);
console.log(`Staged ${spec}. Approve it on npmjs.com to publish.`);
console.log(`New tag: ${spec}`);
