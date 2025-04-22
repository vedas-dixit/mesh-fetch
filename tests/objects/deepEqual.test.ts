import { deepEqual } from '../../src/objects/deepEqual';

describe('deepEqual', () => {
  it('should compare primitive values', () => {
    expect(deepEqual(42, 42)).toBe(true);
    expect(deepEqual('hello', 'hello')).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(42, '42')).toBe(false);
    expect(deepEqual(null, undefined)).toBe(false);
  });

  it('should compare nested objects', () => {
    const obj1 = {
      a: 1,
      b: { c: 2, d: { e: 3 } },
      f: [1, 2, { g: 3 }],
    };
    const obj2 = {
      a: 1,
      b: { c: 2, d: { e: 3 } },
      f: [1, 2, { g: 3 }],
    };
    const obj3 = {
      a: 1,
      b: { c: 2, d: { e: 4 } }, // Different value
      f: [1, 2, { g: 3 }],
    };

    expect(deepEqual(obj1, obj2)).toBe(true);
    expect(deepEqual(obj1, obj3)).toBe(false);
  });

  it('should handle special object types', () => {
    const date1 = new Date('2024-01-01');
    const date2 = new Date('2024-01-01');
    const date3 = new Date('2024-01-02');

    const regex1 = /test/gi;
    const regex2 = /test/gi;
    const regex3 = /test/g;

    const map1 = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const map2 = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const map3 = new Map([
      ['a', 1],
      ['b', 3],
    ]);

    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([1, 2, 3]);
    const set3 = new Set([1, 2, 4]);

    expect(deepEqual(date1, date2)).toBe(true);
    expect(deepEqual(date1, date3)).toBe(false);

    expect(deepEqual(regex1, regex2)).toBe(true);
    expect(deepEqual(regex1, regex3)).toBe(false);

    expect(deepEqual(map1, map2)).toBe(true);
    expect(deepEqual(map1, map3)).toBe(false);

    expect(deepEqual(set1, set2)).toBe(true);
    expect(deepEqual(set1, set3)).toBe(false);
  });

  it('should handle arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(deepEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(deepEqual([1, [2, 3]], [1, [2, 4]])).toBe(false);
  });

  it('should handle circular references', () => {
    const obj1: any = { a: 1 };
    const obj2: any = { a: 1 };
    obj1.self = obj1;
    obj2.self = obj2;

    const obj3: any = { a: 1 };
    obj3.self = { b: 2 };

    expect(deepEqual(obj1, obj2)).toBe(true);
    expect(deepEqual(obj1, obj3)).toBe(false);
  });

  it('should handle functions', () => {
    const fn1 = () => 42;
    const fn2 = () => 42;
    const fn3 = () => 43;

    // Functions are compared by reference
    expect(deepEqual({ fn: fn1 }, { fn: fn1 })).toBe(true);
    expect(deepEqual({ fn: fn1 }, { fn: fn2 })).toBe(false);
    expect(deepEqual({ fn: fn1 }, { fn: fn3 })).toBe(false);
  });

  it('should handle null prototypes', () => {
    const obj1 = Object.create(null);
    const obj2 = Object.create(null);
    const obj3 = {};

    obj1.a = 1;
    obj2.a = 1;
    obj3.a = 1;

    expect(deepEqual(obj1, obj2)).toBe(true);
    expect(deepEqual(obj1, obj3)).toBe(true); // Should compare only own properties
  });

  it('should handle different types', () => {
    expect(deepEqual({}, [])).toBe(false);
    expect(deepEqual(new Date(), {})).toBe(false);
    expect(deepEqual(new Set(), new Map())).toBe(false);
    expect(deepEqual(/test/, new RegExp('test'))).toBe(true);
  });

  it('should handle empty objects and arrays', () => {
    expect(deepEqual({}, {})).toBe(true);
    expect(deepEqual([], [])).toBe(true);
    expect(deepEqual(new Map(), new Map())).toBe(true);
    expect(deepEqual(new Set(), new Set())).toBe(true);
  });
});
