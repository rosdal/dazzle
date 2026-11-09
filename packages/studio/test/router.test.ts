import { createMemoryHistory } from "@tanstack/react-router";
import { expect, test } from "vitest";
import { createStudioRouter } from "../src/router.js";

test("the studio router resolves the index route", async () => {
  const router = createStudioRouter(createMemoryHistory({ initialEntries: ["/"] }));
  await router.load();
  expect(router.state.matches.map((m) => m.routeId)).toEqual(["__root__", "/"]);
});
