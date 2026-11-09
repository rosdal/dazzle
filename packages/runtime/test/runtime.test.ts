import { expect, test } from "vitest";
import { DAZZLE_RUNTIME } from "../src/index.js";

test("the runtime module loads", () => {
  expect(DAZZLE_RUNTIME).toBe("dazzle-runtime");
});
