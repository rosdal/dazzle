// Release step run by the Release workflow (`pnpm release`) after `changeset version` has landed on
// main.
//
// npm's trusted publisher for @rosdal/dazzle may only *stage* a release; a maintainer approves it on
// npmjs.com. `changeset publish` cannot stage, and `npm stage publish` (npm 11.19) does not do the
// OIDC token exchange that `npm publish` does. So this script:
//   1. packs the CLI with pnpm (which resolves workspace: ranges),
//   2. exchanges the GitHub Actions OIDC token for a short-lived npm token, the same way npm's
//      lib/utils/oidc.js does,
//   3. stages the tarball with `npm stage publish --provenance`, using only that token,
//   4. tags the commit and creates the GitHub release (changesets/action cannot, because it only
//      reads the output of `changeset publish`).
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REGISTRY = "https://registry.npmjs.org/";
const root = path.resolve(fileURLToPath(import.meta.url), "../..");
const cli = path.join(root, "packages/cli");
const { name, version } = JSON.parse(readFileSync(path.join(cli, "package.json"), "utf8"));
const spec = `${name}@${version}`;
const run = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
    ...opts,
  }).trim();

function published() {
  try {
    return run("npm", ["view", spec, "version"], { stdio: "pipe" }) === version;
  } catch {
    return false; // npm view exits non-zero when the version does not exist
  }
}

async function npmTokenFromOidc() {
  const { ACTIONS_ID_TOKEN_REQUEST_URL: url, ACTIONS_ID_TOKEN_REQUEST_TOKEN: bearer } = process.env;
  if (!url || !bearer) {
    throw new Error(
      "No GitHub OIDC token available; the job needs `permissions: id-token: write`.",
    );
  }
  const idUrl = new URL(url);
  idUrl.searchParams.append("audience", `npm:${new URL(REGISTRY).hostname}`);
  const idRes = await fetch(idUrl, { headers: { Authorization: `Bearer ${bearer}` } });
  if (!idRes.ok) throw new Error(`GitHub OIDC token request failed: ${idRes.status}`);
  const { value: idToken } = await idRes.json();

  const escaped = name.replace("/", "%2f");
  const exchange = new URL(`/-/npm/v1/oidc/token/exchange/package/${escaped}`, REGISTRY);
  const res = await fetch(exchange, {
    method: "POST",
    headers: { Authorization: `Bearer ${idToken}` },
  });
  if (!res.ok) {
    throw new Error(`npm OIDC token exchange failed: ${res.status} ${await res.text()}`);
  }
  const { token } = await res.json();
  if (!token) throw new Error("npm OIDC token exchange returned no token");
  console.log(`::add-mask::${token}`);
  return token;
}

function releaseNotes() {
  const changelog = readFileSync(path.join(cli, "CHANGELOG.md"), "utf8");
  const start = changelog.indexOf(`## ${version}\n`);
  if (start === -1) return `Release ${spec}.`;
  const next = changelog.indexOf("\n## ", start + 1);
  return changelog.slice(start, next === -1 ? undefined : next).trim();
}

if (published()) {
  console.log(`${spec} is already on npm; nothing to stage.`);
  process.exit(0);
}

const work = mkdtempSync(path.join(tmpdir(), "dazzle-stage-"));
try {
  run("pnpm", ["pack", "--pack-destination", work], { cwd: cli });
  const tarball = readdirSync(work).find((f) => f.endsWith(".tgz"));
  if (!tarball) throw new Error("pnpm pack produced no tarball");

  // A user config holding only the exchanged token, and no token variables: setup-node and
  // changesets/action write placeholder tokens that npm would otherwise send instead.
  const token = await npmTokenFromOidc();
  const userconfig = path.join(work, "npmrc");
  const regKey = `//${new URL(REGISTRY).host}/`;
  writeFileSync(userconfig, `registry=${REGISTRY}\n${regKey}:_authToken=${token}\n`);
  const env = { ...process.env, npm_config_userconfig: userconfig };
  delete env.NODE_AUTH_TOKEN;
  delete env.NPM_TOKEN;

  execFileSync(
    "npm",
    ["stage", "publish", path.join(work, tarball), "--provenance", "--access", "public"],
    { cwd: root, stdio: "inherit", env },
  );
} finally {
  rmSync(work, { recursive: true, force: true });
}

run("git", ["tag", spec]);
run("git", ["push", "origin", `refs/tags/${spec}`]);
const notesFile = path.join(tmpdir(), `dazzle-notes-${version}.md`);
writeFileSync(notesFile, releaseNotes());
run("gh", ["release", "create", spec, "--title", spec, "--notes-file", notesFile, "--verify-tag"]);
console.log(`Staged ${spec}. Approve it on npmjs.com to publish.`);
