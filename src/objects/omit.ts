import { ObjectUtilOptions } from '../types';

/**
 * Creates a new object with the specified properties omitted.
 *
 * @template T - The type of the source object
 * @template K - The type of the keys to omit
 * @param {T} obj - The source object
 * @param {K[]} keys - Array of keys to omit
 * @param {ObjectUtilOptions} [options] - Options for omit behavior
 * @returns {Omit<T, K>} A new object without the specified keys
 *
 * @example
 * ```typescript
 * const user = { name: 'John', age: 30, password: '123' };
 * const safe = omit(user, ['password']);
 * // { name: 'John', age: 30 }
 * ```
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
  options: ObjectUtilOptions = {}
): Omit<T, K> {
  const { includeNonEnumerable = false } = options;

  const result = Object.create(options.preservePrototype ? Object.getPrototypeOf(obj) : null);

  const props = includeNonEnumerable ? Object.getOwnPropertyNames(obj) : Object.keys(obj);

  for (const prop of props) {
    if (!keys.includes(prop as K)) {
      const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      if (descriptor) {
        Object.defineProperty(result, prop, descriptor);
      }
    }
  }

  return result as Omit<T, K>;
}
