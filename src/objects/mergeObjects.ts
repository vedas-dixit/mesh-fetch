import { MergeOptions } from '../types';
import { deepClone } from './deepClone';

/**
 * Deeply merges multiple objects together, with configurable behavior for arrays and other options.
 *
 * @template T - The type of the target object
 * @template U - The type of the source objects
 * @param {T} target - The target object to merge into
 * @param {...U[]} sources - The source objects to merge from
 * @param {MergeOptions} [options] - Options for merge behavior
 * @returns {T & U} The merged object
 *
 * @example
 * ```typescript
 * const target = { a: 1, b: { x: 1 } };
 * const source = { b: { y: 2 }, c: 3 };
 * const merged = mergeObjects(target, source);
 * // { a: 1, b: { x: 1, y: 2 }, c: 3 }
 * ```
 */
export function mergeObjects<T extends object, U extends object>(
  target: T,
  ...args: (U | MergeOptions)[]
): T & U {
  // Extract options if last argument is options object
  const sources =
    args.length > 0 &&
    typeof args[args.length - 1] === 'object' &&
    ('maxDepth' in args[args.length - 1] ||
      'preservePrototype' in args[args.length - 1] ||
      'includeNonEnumerable' in args[args.length - 1] ||
      'arrayMerge' in args[args.length - 1] ||
      'clone' in args[args.length - 1])
      ? (args.slice(0, -1) as U[])
      : (args as U[]);

  const options =
    args.length > 0 &&
    typeof args[args.length - 1] === 'object' &&
    ('maxDepth' in args[args.length - 1] ||
      'preservePrototype' in args[args.length - 1] ||
      'includeNonEnumerable' in args[args.length - 1] ||
      'arrayMerge' in args[args.length - 1] ||
      'clone' in args[args.length - 1])
      ? (args[args.length - 1] as MergeOptions)
      : {};

  const {
    maxDepth = Infinity,
    preservePrototype = false,
    includeNonEnumerable = false,
    arrayMerge = 'replace',
    clone = true,
  } = options;

  // Clone if requested
  let result = clone
    ? deepClone(target, { preservePrototype, includeNonEnumerable })
    : preservePrototype
      ? Object.create(Object.getPrototypeOf(target))
      : {};

  // Copy initial properties if not cloning
  if (!clone) {
    const props = includeNonEnumerable ? Object.getOwnPropertyNames(target) : Object.keys(target);

    for (const prop of props) {
      const descriptor = Object.getOwnPropertyDescriptor(target, prop);
      if (descriptor) {
        Object.defineProperty(result, prop, descriptor);
      }
    }
  }

  const seen = new WeakMap();

  function mergeInternal(current: any, incoming: any, depth: number = 0): any {
    if (depth > maxDepth) return incoming;

    // Handle null/undefined values
    if (incoming === null || incoming === undefined) return incoming;
    if (current === null || current === undefined) return incoming;
    if (typeof incoming !== 'object' || typeof current !== 'object') return incoming;

    // Handle circular references
    if (seen.has(incoming)) {
      return seen.get(incoming);
    }

    // Create a new object with the same prototype if preserving prototype
    const merged = preservePrototype ? Object.create(Object.getPrototypeOf(current)) : {};

    // Register the merged object before recursing to handle circular refs
    seen.set(incoming, merged);

    // Copy properties from current first
    const currentProps = includeNonEnumerable
      ? Object.getOwnPropertyNames(current)
      : Object.keys(current);

    for (const prop of currentProps) {
      const descriptor = Object.getOwnPropertyDescriptor(current, prop);
      if (descriptor) {
        Object.defineProperty(merged, prop, descriptor);
      }
    }

    // Handle arrays
    if (Array.isArray(incoming)) {
      if (!Array.isArray(current)) return [...incoming];

      switch (arrayMerge) {
        case 'concat':
          return current.concat(incoming);
        case 'union':
          return Array.from(new Set([...current, ...incoming]));
        case 'replace':
        default:
          return [...incoming];
      }
    }

    // Handle special object types
    if (incoming instanceof Date) return new Date(incoming);
    if (incoming instanceof RegExp) return new RegExp(incoming.source, incoming.flags);
    if (incoming instanceof Map) return new Map(incoming);
    if (incoming instanceof Set) return new Set(incoming);
    if (incoming instanceof Error) return new Error(incoming.message);

    // Get all property names based on options
    const incomingProps = includeNonEnumerable
      ? Object.getOwnPropertyNames(incoming)
      : Object.keys(incoming);

    // Merge in properties from incoming
    for (const key of incomingProps) {
      const descriptor = Object.getOwnPropertyDescriptor(incoming, key);
      if (!descriptor) continue;

      const mergedValue =
        key in current
          ? mergeInternal(current[key], descriptor.value, depth + 1)
          : clone
            ? deepClone(descriptor.value, { preservePrototype })
            : descriptor.value;

      Object.defineProperty(merged, key, {
        ...descriptor,
        value: mergedValue,
      });
    }

    return merged;
  }

  // Merge all sources in sequence
  for (const source of sources) {
    result = mergeInternal(result, source);
  }

  return result as T & U;
}
