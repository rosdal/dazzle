import { expect, test } from "vitest";
import { runChecks } from "../src/index.js";

test("runChecks passes while there are no checks", async () => {
  await expect(runChecks()).resolves.toEqual({ passed: true });
});
