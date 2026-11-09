import { expect, test } from "vitest";
import { defineDazzle, defineLevers } from "../src/index.js";

test("defineDazzle and defineLevers return their input unchanged", () => {
  const config = { stateDir: ".dazzle" };
  const levers = { radius: { description: "Corner radius" } };
  expect(defineDazzle(config)).toBe(config);
  expect(defineLevers(levers)).toBe(levers);
});
