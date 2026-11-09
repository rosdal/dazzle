/** A single tunable design value. The full lever model arrives with Todo 3. */
export interface Lever {
  description?: string;
}

export type LeverMap = Record<string, Lever>;

/** Identity helper that gives a levers file type checking. */
export function defineLevers<const T extends LeverMap>(levers: T): T {
  return levers;
}
