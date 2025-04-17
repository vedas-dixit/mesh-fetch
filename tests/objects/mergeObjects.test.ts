import { mergeObjects } from '../../src/objects/mergeObjects';

describe('mergeObjects', () => {
    it('should merge simple objects', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { c: 3, d: 4 };
        const expected = { a: 1, b: 2, c: 3, d: 4 };
        expect(mergeObjects(obj1, obj2)).toEqual(expected);
    });

    it('should override properties from right to left', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { b: 3, c: 4 };
        const expected = { a: 1, b: 3, c: 4 };
        expect(mergeObjects(obj1, obj2)).toEqual(expected);
    });

    it('should deep merge nested objects', () => {
        const obj1 = {
            a: 1,
            b: {
                x: 1,
                y: 2
            }
        };
        const obj2 = {
            b: {
                y: 3,
                z: 4
            },
            c: 5
        };
        const expected = {
            a: 1,
            b: {
                x: 1,
                y: 3,
                z: 4
            },
            c: 5
        };
        expect(mergeObjects(obj1, obj2)).toEqual(expected);
    });

    it('should handle arrays', () => {
        const obj1 = {
            arr: [1, 2],
            nested: { arr: [3, 4] }
        };
        const obj2 = {
            arr: [5, 6],
            nested: { arr: [7, 8] }
        };
        const expected = {
            arr: [5, 6],
            nested: { arr: [7, 8] }
        };
        expect(mergeObjects(obj1, obj2)).toEqual(expected);
    });

    it('should handle null and undefined values', () => {
        const obj1 = {
            a: null,
            b: undefined,
            c: 1
        };
        const obj2 = {
            a: 2,
            b: 3,
            c: undefined
        };
        const expected = {
            a: 2,
            b: 3,
            c: undefined
        };
        expect(mergeObjects(obj1, obj2)).toEqual(expected);
    });

    it('should handle special object types', () => {
        const date1 = new Date('2024-01-01');
        const date2 = new Date('2024-01-02');
        const obj1 = {
            date: date1,
            regex: /test/i
        };
        const obj2 = {
            date: date2,
            regex: /test/g
        };
        const result = mergeObjects(obj1, obj2);
        expect(result.date).toEqual(date2);
        expect(result.regex).toEqual(/test/g);
    });

    it('should handle Map and Set objects', () => {
        const map1 = new Map([['a', 1]]);
        const map2 = new Map([['b', 2]]);
        const set1 = new Set([1, 2]);
        const set2 = new Set([3, 4]);

        const obj1 = { map: map1, set: set1 };
        const obj2 = { map: map2, set: set2 };
        const result = mergeObjects(obj1, obj2);

        expect(result.map).toEqual(map2);
        expect(result.set).toEqual(set2);
    });

    it('should handle circular references', () => {
        const obj1: any = { a: 1 };
        obj1.self = obj1;

        const obj2: any = { b: 2 };
        obj2.self = obj2;

        const result = mergeObjects(obj1, obj2);
        expect(result.a).toBe(1);
        expect(result.b).toBe(2);
        expect(result.self).toBe(result);
    });

    it('should merge multiple objects', () => {
        const obj1 = { a: 1 };
        const obj2 = { b: 2 };
        const obj3 = { c: 3 };
        const obj4 = { d: 4 };

        const result = mergeObjects(obj1, obj2, obj3, obj4);
        expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
    });

    it('should handle empty objects', () => {
        const obj1 = {};
        const obj2 = { a: 1 };
        expect(mergeObjects(obj1, obj2)).toEqual({ a: 1 });
        expect(mergeObjects(obj2, obj1)).toEqual({ a: 1 });
        expect(mergeObjects({}, {})).toEqual({});
    });

    it('should preserve object prototypes when specified', () => {
        class TestClass {
            constructor(public value: number) {}
            method() { return this.value; }
        }

        const obj1 = new TestClass(1);
        const obj2 = { value: 2 };

        const result = mergeObjects(obj1, obj2, { preservePrototype: true });
        expect(result instanceof TestClass).toBe(true);
        expect(result.value).toBe(2);
    });

    it('should handle non-enumerable properties when specified', () => {
        const obj1 = Object.create(null);
        Object.defineProperty(obj1, 'hidden', {
            value: 1,
            enumerable: false
        });

        const obj2 = { visible: 2 };

        const result = mergeObjects(obj1, obj2, { includeNonEnumerable: true });
        expect(Object.getOwnPropertyDescriptor(result, 'hidden')).toBeDefined();
        expect(result.visible).toBe(2);
    });

    it('should respect maxDepth option', () => {
        const obj1 = {
            a: {
                b: {
                    c: { d: 1 }
                }
            }
        };
        const obj2 = {
            a: {
                b: {
                    c: { d: 2 }
                }
            }
        };

        const result = mergeObjects(obj1, obj2, { maxDepth: 2 });
        expect(result.a.b).toEqual(obj2.a.b);
    });
}); 