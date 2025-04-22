import { ChunkArrayOptions } from '../types';

/**
 * Splits an array into smaller arrays of specified size.
 *
 * @template T - The type of elements in the array
 * @param {Array<T>} array - The array to split into chunks
 * @param {number} size - The size of each chunk
 * @param {ChunkArrayOptions} [options] - Options for chunking behavior
 * @returns {Array<T[]>} An array of chunks
 *
 * @example
 * ```typescript
 * const arr = [1, 2, 3, 4, 5];
 *
 * // Basic chunking
 * const chunks = chunkArray(arr, 2);
 * // [[1, 2], [3, 4], [5]]
 *
 * // With padding
 * const padded = chunkArray(arr, 2, {
 *   padLastChunk: true,
 *   padValue: 0
 * });
 * // [[1, 2], [3, 4], [5, 0]]
 * ```
 *
 * @throws {Error} If size is less than or equal to 0
 */
export function chunkArray<T>(
  array: Array<T>,
  size: number,
  options: ChunkArrayOptions = {}
): Array<T[]> {
  if (size <= 0) {
    throw new Error('Size must be greater than 0');
  }

  const { padLastChunk = false, padValue } = options;

  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);

    if (padLastChunk && chunk.length < size && i + size > array.length) {
      const padding = new Array(size - chunk.length).fill(padValue);
      chunk.push(...(padding as T[]));
    }

    result.push(chunk);
  }

  return result;
}
