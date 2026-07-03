/** Isolated randomness helpers so the simulation tick logic stays testable. */

/** Inclusive random integer in [min, max]. */
export const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** Returns true with the given probability (0..1). */
export const withProbability = (probability: number): boolean =>
  Math.random() < probability;
