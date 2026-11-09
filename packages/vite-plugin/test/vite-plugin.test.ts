import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createServer } from "vite";
import { expect, test } from "vitest";
import { dazzle } from "../src/index.js";

test("a Vite dev server starts with the plugin registered", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "dazzle-vite-"));
  const server = await createServer({
    root,
    configFile: false,
    logLevel: "silent",
    plugins: [dazzle()],
    server: { middlewareMode: true },
  });
  try {
    expect(server.config.plugins.map((p) => p.name)).toContain("dazzle");
  } finally {
    await server.close();
    await rm(root, { recursive: true, force: true });
  }
});
