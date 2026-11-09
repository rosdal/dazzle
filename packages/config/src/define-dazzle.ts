/** Project configuration read from `dazzle.config.ts`. The shape is filled in by later todos. */
export interface DazzleConfig {
  /** Directory, relative to the project root, that holds Dazzle's state. Defaults to `.dazzle`. */
  stateDir?: string;
}

/** Identity helper that gives `dazzle.config.ts` type checking. */
export function defineDazzle<const T extends DazzleConfig>(config: T): T {
  return config;
}
