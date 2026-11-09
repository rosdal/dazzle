import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // The CLI serves the built studio from a sub-path, so assets must be relative.
  base: "./",
  build: { outDir: "dist", emptyOutDir: true },
});
