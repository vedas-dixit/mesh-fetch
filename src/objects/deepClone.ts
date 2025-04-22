import { ObjectUtilOptions } from '../types';

/**
 * Creates a deep clone of an object or array, maintaining circular references
 * and preserving special object types like Date, RegExp, Map, Set, and Error.
 *
 * @template T - The type of the object to clone
 * @param {T} obj - The object to clone
 * @param {ObjectUtilOptions} [options] - Options for cloning behavior
 * @returns {T} A deep clone of the input object
 *
 * @example
 * ```typescript
 * const obj = {
 *   date: new Date(),
 *   nested: { arr: [1, 2, 3] }
 * };
 * const clone = deepClone(obj);
 * ```
 */
export function deepClone<T>(obj: T, options: ObjectUtilOptions = {}): T {
  const { maxDepth = Infinity, preservePrototype = false, includeNonEnumerable = false } = options;

  const seen = new Map<any, any>();

  function cloneInternal(val: any, depth: number = 0): any {
    if (depth > maxDepth) return val;
    if (typeof val !== 'object' || val === null) return val;

    // Handle special object types
    if (val instanceof Date) return new Date(val.getTime());
    if (val instanceof RegExp) return new RegExp(val.source, val.flags);
    if (val instanceof Map)
      return new Map(
        Array.from(val, ([k, v]) => [cloneInternal(k, depth + 1), cloneInternal(v, depth + 1)])
      );
    if (val instanceof Set) return new Set(Array.from(val, (v) => cloneInternal(v, depth + 1)));
    if (val instanceof Error) return new Error(val.message);
    if (typeof val === 'function') return val;

    // Handle circular references
    if (seen.has(val)) return seen.get(val);

    // Create new object/array with correct prototype
    const clone = Array.isArray(val)
      ? []
      : preservePrototype
        ? Object.create(Object.getPrototypeOf(val))
        : Object.create(null);

    seen.set(val, clone);

    // Get property descriptors if including non-enumerable properties
    const props = includeNonEnumerable ? Object.getOwnPropertyNames(val) : Object.keys(val);

    for (const key of props) {
      const descriptor = Object.getOwnPropertyDescriptor(val, key);
      if (descriptor) {
        Object.defineProperty(clone, key, {
          ...descriptor,
          value: cloneInternal(val[key], depth + 1),
        });
      }
    }

    return clone;
  }

  return cloneInternal(obj);
}
