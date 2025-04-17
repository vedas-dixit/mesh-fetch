/**
 * Creates a new array with unique elements from the input array.
 * If a comparator function is provided, it will be used to determine uniqueness.
 * 
 * @template T - The type of elements in the array
 * @param {Array<T>} array - The array to remove duplicates from
 * @param {(a: T, b: T) => boolean} [comparator] - Optional function to determine equality
 * @returns {Array<T>} A new array with unique elements
 * 
 * @example
 * ```typescript
 * const arr = [1, 2, 2, 3, 3, 4];
 * const unique = uniqueArray(arr); // [1, 2, 3, 4]
 * 
 * // With custom comparator
 * const users = [
 *   { id: 1, name: 'John' },
 *   { id: 1, name: 'John' },
 *   { id: 2, name: 'Jane' }
 * ];
 * const uniqueUsers = uniqueArray(users, (a, b) => a.id === b.id);
 * // [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
 * ```
 */
export function uniqueArray<T>(array: Array<T>, comparator?: (a: T, b: T) => boolean): Array<T> {
    if (!comparator) {
        return [...new Set(array)];
    }

    return array.reduce<T[]>((unique, item) => {
        const exists = unique.some(existing => comparator(existing, item));
        if (!exists) {
            unique.push(item);
        }
        return unique;
    }, []);
}
