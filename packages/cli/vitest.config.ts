import { defineProject } from "vitest/config";

export default defineProject({
  // Resolve the internal packages to their TypeScript sources, so tests don't need a build.
  resolve: { conditions: ["source"] },
  ssr: { resolve: { conditions: ["source"] } },
  test: { name: "cli" },
});
