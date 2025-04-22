import { FlattenArrayOptions } from '../types';

/**
 * Flattens a nested array structure into a single-level array.
 *
 * @template T - The type of elements in the array
 * @param {Array<T | T[]>} array - The array to flatten
 * @param {FlattenArrayOptions} [options] - Options for flattening behavior
 * @returns {T[]} A flattened array
 *
 * @example
 * ```typescript
 * const arr = [1, [2, 3], [4, [5, 6]]];
 * const flat = flattenArray(arr); // [1, 2, 3, 4, 5, 6]
 *
 * // With depth option
 * const partial = flattenArray(arr, { depth: 1 }); // [1, 2, 3, 4, [5, 6]]
 * ```
 *
 * @throws {TypeError} If input is not an array
 */
export function flattenArray<T>(
  array: Array<T | T[]>,
  options: FlattenArrayOptions | number = {}
): T[] {
  if (!Array.isArray(array)) {
    throw new TypeError('Input must be an array');
  }

  // Handle legacy depth parameter
  const opts = typeof options === 'number' ? { depth: options } : options;

  const { depth = -1, preserveEmpty = false, removeNulls = false, preserveArrays = false } = opts;

  function shouldIncludeValue(val: any): boolean {
    if (removeNulls && (val === null || val === undefined)) {
      return false;
    }
    if (Array.isArray(val) && !preserveEmpty && val.length === 0) {
      return false;
    }
    return true;
  }

  function flattenInternal(arr: Array<T | T[]>, remainingDepth: number): T[] {
    if (!arr.length) return [];

    return arr.reduce<T[]>((acc, val) => {
      if (Array.isArray(val)) {
        // Skip empty arrays unless preserveEmpty is true
        if (!val.length && !preserveEmpty) {
          return acc;
        }

        // If we've reached our depth limit
        if (remainingDepth === 0) {
          if (shouldIncludeValue(val)) {
            acc.push(val as T);
          }
        } else {
          const nextDepth = depth === -1 ? -1 : remainingDepth - 1;
          const flattened = flattenInternal(val, nextDepth);
          if (flattened.length > 0 || (preserveEmpty && val.length > 0)) {
            acc.push(...flattened);
          }
        }
      } else if (shouldIncludeValue(val)) {
        acc.push(val as T);
      }
      return acc;
    }, []);
  }

  return flattenInternal(array, depth);
}
