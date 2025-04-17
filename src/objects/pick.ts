import { ObjectUtilOptions } from '../types';
import { deepClone } from './deepClone';

/**
 * Creates a new object with only the specified properties.
 * Supports nested paths, array indices, and wildcards.
 * 
 * @template T - The type of the source object
 * @param {T} obj - The source object
 * @param {string[]} paths - Array of paths to pick (e.g., ['name', 'details.age', 'contacts.*.email'])
 * @param {ObjectUtilOptions} [options] - Options for pick behavior
 * @returns {Partial<T>} A new object with only the specified paths
 * 
 * @example
 * ```typescript
 * const user = { 
 *   name: 'John',
 *   details: { age: 30, email: 'john@example.com' },
 *   contacts: [{ type: 'email', value: 'john@example.com' }]
 * };
 * const result = pick(user, ['name', 'details.age', 'contacts.*.type']);
 * // { 
 * //   name: 'John',
 * //   details: { age: 30 },
 * //   contacts: [{ type: 'email' }]
 * // }
 * ```
 */
export function pick<T extends object>(
    obj: T,
    paths: string[],
    options: ObjectUtilOptions = {}
): Partial<T> {
    const {
        preservePrototype = false,
        includeNonEnumerable = false
    } = options;

    // Create the result object with the same prototype chain if requested
    const result = Object.create(
        preservePrototype ? Object.getPrototypeOf(obj) : null
    );

    function getValueByPath(obj: any, path: string[]): any {
        let current = obj;

        for (let i = 0; i < path.length; i++) {
            if (current === null || current === undefined) {
                return undefined;
            }

            const segment = path[i];

            if (segment === '*' && Array.isArray(current)) {
                const remainingPath = path.slice(i + 1);
                if (remainingPath.length === 0) {
                    return current.map(item => deepClone(item, { preservePrototype }));
                }

                return current.map(item => {
                    if (item === null || item === undefined) {
                        return undefined;
                    }
                    return getValueByPath(item, remainingPath);
                }).filter(item => item !== undefined);
            }

            if (Array.isArray(current) && /^\d+$/.test(segment)) {
                const index = parseInt(segment, 10);
                if (index >= 0 && index < current.length) {
                    current = current[index];
                } else {
                    return undefined;
                }
            } else if (typeof current === 'object' && segment in current) {
                current = current[segment];
            } else {
                return undefined;
            }
        }

        return typeof current === 'object' && current !== null
            ? deepClone(current, { preservePrototype })
            : current;
    }

    function setValueByPath(target: any, path: string[], value: any): void {
        let current = target;
        let i = 0;

        while (i < path.length - 1) {
            const segment = path[i];
            const nextSegment = path[i + 1];
            const isNextArray = nextSegment === '*' || /^\d+$/.test(nextSegment);

            if (!(segment in current)) {
                current[segment] = isNextArray ? [] : {};
            }

            current = current[segment];
            i++;
        }

        const lastSegment = path[path.length - 1];
        if (lastSegment === '*' && Array.isArray(value)) {
            if (!Array.isArray(current)) {
                current.length = 0;
            }
            current.push(...value);
        } else if (/^\d+$/.test(lastSegment)) {
            const index = parseInt(lastSegment, 10);
            if (!Array.isArray(current)) {
                current = [];
            }
            while (current.length <= index) {
                current.push(undefined);
            }
            current[index] = value;
        } else {
            current[lastSegment] = value;
        }
    }

    for (const path of paths) {
        const segments = path.split('.');
        const value = getValueByPath(obj, segments);

        if (value !== undefined) {
            if (segments.length === 1) {
                const descriptor = Object.getOwnPropertyDescriptor(obj, segments[0]);
                if (includeNonEnumerable || !descriptor || descriptor.enumerable) {
                    Object.defineProperty(result, segments[0], {
                        value,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                }
            } else {
                const rootProp = segments[0];
                if (!(rootProp in result)) {
                    result[rootProp] = Array.isArray(obj[rootProp as keyof T]) ? [] : {};
                }
                setValueByPath(result, segments, value);
            }
        }
    }

    return result as Partial<T>;
}
  