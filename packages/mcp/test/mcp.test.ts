import { expect, test } from "vitest";
import { MCP_TOOLS } from "../src/index.js";

test("the MCP server registers no tools yet", () => {
  expect(MCP_TOOLS).toEqual([]);
});
