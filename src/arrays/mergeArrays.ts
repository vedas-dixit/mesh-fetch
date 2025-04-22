import { MergeArrayOptions } from '../types';
import { uniqueArray } from './uniqueArray';

/**
 * Merges two arrays into a single array with optional uniqueness and other options.
 *
 * @template T - The type of elements in the arrays
 * @param {Array<T>} array1 - First array to merge
 * @param {Array<T>} array2 - Second array to merge
 * @param {MergeArrayOptions} [options] - Options for merging behavior
 * @returns {Array<T>} A new merged array
 *
 * @example
 * ```typescript
 * const arr1 = [1, 2, 3];
 * const arr2 = [3, 4, 5];
 *
 * // Simple merge
 * const merged = mergeArrays(arr1, arr2);
 * // [1, 2, 3, 3, 4, 5]
 *
 * // Merge with uniqueness
 * const unique = mergeArrays(arr1, arr2, { unique: true });
 * // [1, 2, 3, 4, 5]
 *
 * // Merge with custom comparison
 * const users1 = [{ id: 1, name: 'John' }];
 * const users2 = [{ id: 1, name: 'Johnny' }];
 * const mergedUsers = mergeArrays(users1, users2, {
 *   unique: true,
 *   comparator: (a, b) => a.id === b.id
 * });
 * // [{ id: 1, name: 'John' }]
 * ```
 */
export function mergeArrays<T>(
  array1: Array<T>,
  array2: Array<T>,
  options: MergeArrayOptions = {}
): Array<T> {
  const { unique = false, comparator, removeNulls = false, preserveEmpty = true } = options;

  let result = [...array1, ...array2];

  if (removeNulls) {
    result = result.filter((item) => item !== null && item !== undefined);
  }

  if (!preserveEmpty) {
    result = result.filter((item) => {
      if (Array.isArray(item)) {
        return item.length > 0;
      }
      return true;
    });
  }

  if (unique) {
    result = uniqueArray(result, comparator);
  }

  return result;
}
