// Lints the plugin's knowledge files: SKILL.md (router, line budget), the 13 references, the 12
// direction archetypes, the /dazzle command and the trigger test prompts. Every rule id, recipe
// name, reference path and Markdown link must resolve. Run with `pnpm lint:knowledge`.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

const root = path.resolve(fileURLToPath(import.meta.url), "../..");
const plugin = path.join(root, "plugin");
const skillDir = path.join(plugin, "skills/dazzle");
const refDir = path.join(skillDir, "references");
const dirDir = path.join(plugin, "knowledge/directions");

const SKILL_MAX_LINES = 300;
const REFERENCES = [
  "art-direction",
  "typography",
  "layout",
  "color-light",
  "motion",
  "scroll",
  "threejs",
  "shaders",
  "transitions",
  "interaction",
  "performance",
  "accessibility",
  "anti-patterns",
];
const REFERENCE_HEADINGS = [
  "Principles",
  "Defaults",
  "Do",
  "Don't",
  "Patterns",
  "Recipes",
  "Checks",
];
const DIRECTIONS = [
  "editorial-serif",
  "swiss-grid",
  "nocturne",
  "soft-glass",
  "brutalist",
  "kinetic-type",
  "monochrome-photographic",
  "tactile-organic",
  "retro-futurist",
  "playful-3d",
  "luxury-minimal",
  "data-sculpture",
];
const DIRECTION_HEADINGS = [
  "Idea",
  "Mood words",
  "Type pairings",
  "Palette strategy",
  "Spacing rhythm",
  "Motion character",
  "Texture",
  "Signature moments",
  "Recipes it favours",
  "Avoid",
];
// Recipes are written in Todo 3. Until a recipe has its folder in recipes/, it must be on this list.
const PLANNED_RECIPES = new Set([
  "smooth-scroll",
  "split-reveal",
  "pinned-scene",
  "light-sweep",
  "grain-overlay",
  "fluid-glass",
  "image-reveal-mask",
  "marquee-strip",
  "magnetic-button",
  "page-transition",
  "view-transition",
  "shader-gradient",
  "noise-displacement",
  "model-viewer",
  "scroll-progress",
  "horizontal-scroll",
  "parallax-layer",
  "cursor-follower",
  "counter-roll",
  "variable-font-scroll",
]);
const LICENCE_SOURCES = /Google Fonts|Fontshare|user[- ]supplied/i;
const RULE_ID = /`((?:slop|quality|cliche|craft|budget)\/[a-z0-9-]+)`/g;

const errors = [];
const fail = (file, msg) =>
  errors.push(`${path.relative(root, file).split(path.sep).join("/")}: ${msg}`);

function readDoc(file) {
  const text = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!match) {
    fail(file, "missing frontmatter");
    return { text, body: text, fm: {} };
  }
  let fm = {};
  try {
    fm = parseYaml(match[1]) ?? {};
  } catch (e) {
    fail(file, `invalid frontmatter: ${e.message}`);
  }
  return { text, body: text.slice(match[0].length), fm };
}

function h2s(body) {
  return [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
}

function section(body, heading) {
  const start = body.indexOf(`\n## ${heading}\n`);
  if (start === -1) return "";
  const rest = body.slice(start + heading.length + 5);
  const end = rest.search(/\n## /);
  return end === -1 ? rest : rest.slice(0, end);
}

function checkHeadings(file, body, expected) {
  const got = h2s(body);
  if (got.join("|") !== expected.join("|")) {
    fail(file, `H2 headings must be exactly [${expected.join(", ")}], got [${got.join(", ")}]`);
  }
  if (!/^# .+$/m.test(body)) fail(file, "missing H1 title");
}

function tableRows(text) {
  return text
    .split("\n")
    .filter((l) => l.trim().startsWith("|"))
    .slice(2)
    .map((l) =>
      l
        .trim()
        .replace(/^\||\|$/g, "")
        .split("|")
        .map((c) => c.trim()),
    );
}

function checkLinks(file, text) {
  for (const m of text.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const target = m[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const resolved = path.resolve(path.dirname(file), target.split("#")[0]);
    if (!existsSync(resolved)) fail(file, `broken link: ${target}`);
  }
}

function checkRecipes(file, text) {
  for (const m of text.matchAll(/`([a-z0-9]+(?:-[a-z0-9]+)+)`/g)) {
    const name = m[1];
    if (!PLANNED_RECIPES.has(name) && !existsSync(path.join(root, "recipes", name))) {
      fail(file, `unknown recipe \`${name}\` (not in recipes/ or the planned list)`);
    }
  }
}

// Rule ids are defined in the first column of the tables in anti-patterns.md (rules) and in the
// Checks section of performance.md (budgets).
function definedRuleIds() {
  const ids = new Set();
  for (const name of ["anti-patterns", "performance"]) {
    const file = path.join(refDir, `${name}.md`);
    if (!existsSync(file)) continue;
    const text = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
    const scope = name === "performance" ? section(text, "Checks") : text;
    for (const line of scope.split("\n")) {
      const first = /^\|\s*`((?:slop|quality|cliche|craft|budget)\/[a-z0-9-]+)`\s*\|/.exec(line);
      if (first) ids.add(first[1]);
    }
  }
  return ids;
}

const ruleIds = definedRuleIds();
function checkRuleIds(file, text) {
  for (const m of text.matchAll(RULE_ID)) {
    if (!ruleIds.has(m[1])) fail(file, `unknown rule id \`${m[1]}\``);
  }
}

// SKILL.md: a short router whose every path resolves.
{
  const file = path.join(skillDir, "SKILL.md");
  const { text, fm } = readDoc(file);
  const lines = text.split("\n").length;
  if (lines > SKILL_MAX_LINES) fail(file, `${lines} lines, budget is ${SKILL_MAX_LINES}`);
  if (fm.name !== "dazzle") fail(file, "frontmatter name must be dazzle");
  if (typeof fm.description !== "string" || fm.description.length < 100) {
    fail(file, "frontmatter description must be a trigger-ready sentence (≥ 100 chars)");
  } else if (fm.description.length > 1024) {
    fail(file, "frontmatter description over 1024 characters");
  }
  for (const m of text.matchAll(/\$\{CLAUDE_SKILL_DIR\}\/([^`\s)]+)/g)) {
    if (!existsSync(path.join(skillDir, m[1]))) fail(file, `missing ${m[1]}`);
  }
  for (const m of text.matchAll(/\$\{CLAUDE_PLUGIN_ROOT\}\/([^`\s)]+)/g)) {
    if (!existsSync(path.join(plugin, m[1]))) fail(file, `missing ${m[1]}`);
  }
  for (const name of REFERENCES) {
    if (!text.includes(`references/${name}.md`)) fail(file, `router does not route to ${name}.md`);
  }
  checkLinks(file, text);
}

// The 13 references.
const refFiles = existsSync(refDir) ? readdirSync(refDir).filter((f) => f.endsWith(".md")) : [];
for (const f of refFiles) {
  if (!REFERENCES.includes(f.replace(/\.md$/, "")))
    fail(path.join(refDir, f), "not a known reference");
}
for (const name of REFERENCES) {
  const file = path.join(refDir, `${name}.md`);
  if (!existsSync(file)) {
    fail(file, "missing");
    continue;
  }
  const { text, body, fm } = readDoc(file);
  if (fm.name !== name) fail(file, `frontmatter name must be ${name}`);
  if (typeof fm.description !== "string" || fm.description.length < 40) {
    fail(file, "frontmatter description missing or too short");
  }
  checkHeadings(file, body, REFERENCE_HEADINGS);
  if (tableRows(section(body, "Defaults")).length === 0)
    fail(file, "Defaults needs a table of values");
  if (!/\d/.test(section(body, "Defaults"))) fail(file, "Defaults has no numbers");
  if (![...section(body, "Checks").matchAll(RULE_ID)].length)
    fail(file, "Checks names no rule ids");
  checkRuleIds(file, text);
  checkRecipes(file, section(body, "Recipes"));
  checkLinks(file, text);
}

// The 12 direction archetypes.
const dirFiles = existsSync(dirDir) ? readdirSync(dirDir).filter((f) => f.endsWith(".md")) : [];
for (const f of dirFiles) {
  if (!DIRECTIONS.includes(f.replace(/\.md$/, "")))
    fail(path.join(dirDir, f), "not a known direction");
}
for (const id of DIRECTIONS) {
  const file = path.join(dirDir, `${id}.md`);
  if (!existsSync(file)) {
    fail(file, "missing");
    continue;
  }
  const { text, body, fm } = readDoc(file);
  if (fm.id !== id) fail(file, `frontmatter id must be ${id}`);
  for (const key of ["name", "idea"]) {
    if (typeof fm[key] !== "string" || !fm[key].trim()) fail(file, `frontmatter ${key} missing`);
  }
  if (!Array.isArray(fm.mood) || fm.mood.length < 3) fail(file, "frontmatter mood needs ≥ 3 words");
  checkHeadings(file, body, DIRECTION_HEADINGS);
  const pairings = tableRows(section(body, "Type pairings"));
  if (pairings.length < 2 || pairings.length > 3) {
    fail(file, `Type pairings needs 2 or 3 rows, has ${pairings.length}`);
  }
  for (const row of pairings) {
    if (!LICENCE_SOURCES.test(row.at(-1) ?? "")) {
      fail(
        file,
        `pairing "${row[0]}" has no licence-safe source (Google Fonts, Fontshare, user-supplied)`,
      );
    }
  }
  if (tableRows(section(body, "Palette strategy")).length < 3) {
    fail(file, "Palette strategy needs a role table with ≥ 3 rows");
  }
  if (!/\d/.test(section(body, "Motion character"))) fail(file, "Motion character has no numbers");
  checkRecipes(file, section(body, "Recipes it favours"));
  checkRuleIds(file, text);
  checkLinks(file, text);
}

// The /dazzle command.
{
  const file = path.join(plugin, "commands/dazzle.md");
  const { text, fm } = readDoc(file);
  if (!fm.description) fail(file, "frontmatter description missing");
  if (!fm["argument-hint"]) fail(file, "frontmatter argument-hint missing");
  if (!text.includes("$ARGUMENTS")) fail(file, "body must pass $ARGUMENTS");
  for (const word of ["studio", "review"]) {
    if (!text.includes(`\`${word}\``)) fail(file, `does not route \`${word}\``);
  }
}

// Trigger test prompts.
{
  const file = path.join(plugin, "tests/triggers.yaml");
  try {
    const t = parseYaml(readFileSync(file, "utf8"));
    if (!Array.isArray(t?.trigger) || t.trigger.length < 20)
      fail(file, "needs ≥ 20 `trigger` prompts");
    if (!Array.isArray(t?.ignore) || t.ignore.length < 10)
      fail(file, "needs ≥ 10 `ignore` prompts");
  } catch (e) {
    fail(file, e.code === "ENOENT" ? "missing" : `invalid YAML: ${e.message}`);
  }
}

if (errors.length > 0) {
  for (const e of errors) console.error(`✗ ${e}`);
  console.error(`\n${errors.length} problem(s) in plugin knowledge`);
  process.exit(1);
}
console.log(
  `✓ plugin knowledge: SKILL.md, ${REFERENCES.length} references, ${DIRECTIONS.length} directions, ${ruleIds.size} rule ids`,
);
