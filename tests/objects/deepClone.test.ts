import { deepClone } from '../../src/objects/deepClone';

describe('deepClone', () => {
    it('should clone primitive values', () => {
        expect(deepClone(42)).toBe(42);
        expect(deepClone('hello')).toBe('hello');
        expect(deepClone(true)).toBe(true);
        expect(deepClone(null)).toBe(null);
        expect(deepClone(undefined)).toBe(undefined);
    });

    it('should deep clone nested objects', () => {
        const original = {
            a: 1,
            b: { c: 2, d: { e: 3 } },
            f: [1, 2, { g: 3 }]
        };
        const clone = deepClone(original);

        expect(clone).toEqual(original);
        expect(clone).not.toBe(original);
        expect(clone.b).not.toBe(original.b);
        expect(clone.f).not.toBe(original.f);
        expect(clone.f[2]).not.toBe(original.f[2]);
    });

    it('should handle special object types', () => {
        const date = new Date();
        const regex = /test/gi;
        const map = new Map([['key', 'value']]);
        const set = new Set([1, 2, 3]);
        const error = new Error('test error');

        const original = { date, regex, map, set, error };
        const clone = deepClone(original);

        expect(clone.date).toEqual(date);
        expect(clone.date).not.toBe(date);
        expect(clone.regex).toEqual(regex);
        expect(clone.map).toEqual(map);
        expect(clone.set).toEqual(set);
        expect(clone.error.message).toBe(error.message);
    });

    it('should handle circular references', () => {
        const original: any = { a: 1 };
        original.self = original;
        original.nested = { ref: original };

        const clone = deepClone(original);

        expect(clone.self).toBe(clone);
        expect(clone.nested.ref).toBe(clone);
        expect(clone).not.toBe(original);
    });

    it('should respect maxDepth option', () => {
        const original = {
            a: { b: { c: { d: 1 } } }
        };
        const clone = deepClone(original, { maxDepth: 2 });

        expect(clone.a.b).toEqual(original.a.b);
        expect(clone.a.b.c).toBe(original.a.b.c);
    });

    it('should handle preservePrototype option', () => {
        class TestClass {
            constructor(public value: number) {}
            method() { return this.value; }
        }

        const original = new TestClass(42);
        const cloneWithProto = deepClone(original, { preservePrototype: true });
        const cloneWithoutProto = deepClone(original);

        expect(cloneWithProto instanceof TestClass).toBe(true);
        expect(cloneWithoutProto instanceof TestClass).toBe(false);
    });

    it('should handle includeNonEnumerable option', () => {
        const original = Object.create(null);
        Object.defineProperty(original, 'nonEnum', {
            value: 42,
            enumerable: false
        });

        const cloneWithNonEnum = deepClone(original, { includeNonEnumerable: true });
        const cloneWithoutNonEnum = deepClone(original);

        expect(Object.getOwnPropertyDescriptor(cloneWithNonEnum, 'nonEnum')).toBeDefined();
        expect(Object.getOwnPropertyDescriptor(cloneWithoutNonEnum, 'nonEnum')).toBeUndefined();
    });

    it('should handle arrays with special objects', () => {
        type SpecialArray = [Date, RegExp, Map<string, number>, Set<number>, { nested: Date }];
        const original: SpecialArray = [
            new Date(),
            /test/g,
            new Map([['a', 1]]),
            new Set([1, 2]),
            { nested: new Date() }
        ];

        const clone = deepClone(original);

        expect(clone).toEqual(original);
        expect(clone[0]).not.toBe(original[0]);
        expect(clone[4].nested).not.toBe(original[4].nested);
    });

    it('should preserve functions', () => {
        const fn = () => 42;
        const original = {
            fn,
            nested: { fn }
        };

        const clone = deepClone(original);

        expect(clone.fn).toBe(fn);
        expect(clone.nested.fn).toBe(fn);
    });
}); 