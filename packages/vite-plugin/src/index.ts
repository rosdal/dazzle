import type { Plugin } from "vite";

/** Options for the Dazzle Vite plugin. Empty until the plugin does something. */
export type DazzleViteOptions = Record<string, never>;

/** Vite plugin that will wire levers and the studio into a project. It does nothing yet. */
export function dazzle(_options: DazzleViteOptions = {}): Plugin {
  return { name: "dazzle" };
}
