import { FlattenOptions } from '../types';

/**
 * Flattens a nested object structure into a single-level object with dot-notation keys.
 *
 * @template T - The type of the object to flatten
 * @param {T} obj - The object to flatten
 * @param {FlattenOptions} [options] - Options for flattening behavior
 * @returns {Record<string, unknown>} A flattened object
 *
 * @example
 * ```typescript
 * const obj = {
 *   user: {
 *     name: 'John',
 *     address: { city: 'NY' }
 *   }
 * };
 * const flat = flattenObject(obj);
 * // { 'user.name': 'John', 'user.address.city': 'NY' }
 * ```
 */
export function flattenObject<T extends object>(
  obj: T,
  options: FlattenOptions = {}
): Record<string, unknown> {
  const { delimiter = '.', maxDepth = Infinity, preserveArrays = false } = options;

  const result: Record<string, unknown> = {};
  const seen = new WeakSet();

  function flattenInternal(current: unknown, path: string[] = [], depth: number = 0): void {
    // Handle max depth
    if (depth > maxDepth) {
      const key = path.join(delimiter);
      result[key] = current;
      return;
    }

    // Handle null or non-object types
    if (current === null || typeof current !== 'object') {
      if (path.length > 0) {
        const key = path.join(delimiter);
        result[key] = current;
      }
      return;
    }

    // Handle special object types
    if (current instanceof Date || current instanceof RegExp) {
      const key = path.join(delimiter);
      result[key] = current;
      return;
    }

    // Handle empty objects and arrays
    if (Object.keys(current).length === 0) {
      const key = path.join(delimiter);
      result[key] = Array.isArray(current) ? [] : {};
      return;
    }

    // Handle circular references
    if (seen.has(current)) {
      const key = path.join(delimiter);
      result[key] = '[Circular Reference]';
      return;
    }
    seen.add(current);

    // Handle arrays
    if (Array.isArray(current)) {
      if (preserveArrays) {
        const key = path.join(delimiter);
        result[key] = current;
        return;
      }
      current.forEach((item, index) => {
        flattenInternal(item, [...path, index.toString()], depth + 1);
      });
      return;
    }

    // Handle regular objects
    for (const key of Object.keys(current)) {
      flattenInternal((current as Record<string, unknown>)[key], [...path, key], depth + 1);
    }
  }

  flattenInternal(obj);
  return result;
}
