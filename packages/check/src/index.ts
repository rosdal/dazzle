/** Result of a design check run. Filled in by a later todo. */
export interface CheckResult {
  passed: boolean;
}

/** Placeholder: no checks exist yet, so every run passes. */
export async function runChecks(): Promise<CheckResult> {
  return { passed: true };
}
