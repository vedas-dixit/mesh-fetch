import { ObjectUtilOptions } from '../types';

/**
 * Performs a deep equality comparison between two values.
 * Handles special object types like Date, RegExp, Map, Set, and Error.
 * 
 * @template T - The type of the values to compare
 * @param {T} a - First value to compare
 * @param {T} b - Second value to compare
 * @param {ObjectUtilOptions} [options] - Options for comparison behavior
 * @returns {boolean} True if the values are deeply equal, false otherwise
 * 
 * @example
 * ```typescript
 * const obj1 = { date: new Date(2024, 0, 1), nested: { arr: [1, 2] } };
 * const obj2 = { date: new Date(2024, 0, 1), nested: { arr: [1, 2] } };
 * const areEqual = deepEqual(obj1, obj2); // true
 * ```
 */
export function deepEqual<T>(a: T, b: T, options: ObjectUtilOptions = {}): boolean {
    const {
        maxDepth = Infinity,
        includeNonEnumerable = false
    } = options;

    const seen = new Map<any, any>();

    function equalInternal(x: any, y: any, depth: number = 0): boolean {
        if (depth > maxDepth) return x === y;
        
        // Handle primitive types and function references
        if (x === y) return true;
        if (x === null || y === null) return x === y;
        if (typeof x !== 'object' || typeof y !== 'object') return x === y;

        // Handle arrays
        if (Array.isArray(x) !== Array.isArray(y)) return false;
        if (Array.isArray(x)) {
            if (x.length !== y.length) return false;
            for (let i = 0; i < x.length; i++) {
                if (!equalInternal(x[i], y[i], depth + 1)) return false;
            }
            return true;
        }
        
        // Handle special object types
        if (x instanceof Date || y instanceof Date) {
            return x instanceof Date && y instanceof Date && x.getTime() === y.getTime();
        }
        if (x instanceof RegExp || y instanceof RegExp) {
            return x instanceof RegExp && y instanceof RegExp && x.source === y.source && x.flags === y.flags;
        }
        if (x instanceof Error || y instanceof Error) {
            return x instanceof Error && y instanceof Error && x.message === y.message;
        }
        if (x instanceof Map || y instanceof Map) {
            if (!(x instanceof Map && y instanceof Map) || x.size !== y.size) return false;
            for (const [key, val] of x) {
                if (!y.has(key) || !equalInternal(val, y.get(key), depth + 1)) return false;
            }
            return true;
        }
        if (x instanceof Set || y instanceof Set) {
            if (!(x instanceof Set && y instanceof Set) || x.size !== y.size) return false;
            for (const item of x) {
                if (!Array.from(y).some(yItem => equalInternal(item, yItem, depth + 1))) return false;
            }
            return true;
        }

        // Handle objects with different prototypes
        const xProto = Object.getPrototypeOf(x);
        const yProto = Object.getPrototypeOf(y);
        if (xProto !== yProto && xProto !== null && yProto !== null && xProto !== Object.prototype && yProto !== Object.prototype) {
            return false;
        }

        // Handle circular references
        const seenKey = seen.get(x);
        if (seenKey) return seenKey === y;
        seen.set(x, y);

        // Get property names based on options
        const xProps = includeNonEnumerable
            ? Object.getOwnPropertyNames(x)
            : Object.keys(x);
        const yProps = includeNonEnumerable
            ? Object.getOwnPropertyNames(y)
            : Object.keys(y);

        if (xProps.length !== yProps.length) return false;

        for (const prop of xProps) {
            if (!yProps.includes(prop)) return false;
            if (!equalInternal(x[prop], y[prop], depth + 1)) return false;
        }

        return true;
    }

    return equalInternal(a, b);
}