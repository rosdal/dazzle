import { describe, expect, test } from "vitest";
import { type CliIO, COMMANDS, runCli } from "../src/main.js";

function io() {
  const out: string[] = [];
  const err: string[] = [];
  const cliIO: CliIO = { stdout: (l) => out.push(l), stderr: (l) => err.push(l) };
  return { cliIO, out, err };
}

describe("dazzle CLI", () => {
  test("--version prints the version", async () => {
    const { cliIO, out } = io();
    expect(await runCli(["--version"], "1.2.3", cliIO)).toBe(0);
    expect(out).toEqual(["1.2.3"]);
  });

  test("--help lists every subcommand", async () => {
    const { cliIO, out } = io();
    expect(await runCli(["--help"], "0.0.0", cliIO)).toBe(0);
    for (const name of Object.keys(COMMANDS)) expect(out.join("\n")).toContain(name);
  });

  test.each(Object.keys(COMMANDS))("%s is a stub that exits 1", async (name) => {
    const { cliIO, err } = io();
    expect(await runCli([name], "0.0.0", cliIO)).toBe(1);
    expect(err).toEqual([`dazzle ${name}: not implemented yet`]);
  });

  test("an unknown command exits 1", async () => {
    const { cliIO, err } = io();
    expect(await runCli(["nope"], "0.0.0", cliIO)).toBe(1);
    expect(err[0]).toMatch(/Unknown command: nope/);
  });
});
