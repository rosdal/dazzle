import { defineConfig } from "tsup";

// The internal workspace packages are private, so they are bundled in from source.
const internal = [/^@rosdal\/dazzle-/];
const fromSource = (options: { conditions?: string[] }) => {
  options.conditions = ["source"];
};

export default defineConfig([
  {
    entry: ["src/cli.ts"],
    format: ["esm"],
    target: "node22",
    platform: "node",
    // No sourcemap: the published package ships only dist/, so a map would point at missing files.
    sourcemap: false,
    banner: { js: "#!/usr/bin/env node" },
    noExternal: internal,
    esbuildOptions: fromSource,
  },
  {
    entry: ["src/config.ts", "src/levers.ts", "src/runtime.ts", "src/vite.ts"],
    format: ["esm"],
    target: "node22",
    platform: "node",
    sourcemap: false,
    noExternal: internal,
    external: ["vite"],
    esbuildOptions: fromSource,
  },
]);
