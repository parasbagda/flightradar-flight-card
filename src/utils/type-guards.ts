/**
 * Type guard to check whether a value is neither `undefined` nor `null`.
 *
 * @template T
 * @param {T | undefined | null} value - The value to check.
 * @returns {value is T} Returns true if the value is not undefined and not null.
 */
export function defined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}
