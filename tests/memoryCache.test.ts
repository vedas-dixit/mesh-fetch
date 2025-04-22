import { MemoryCache } from '../src/utils/cache/memoryCache';
import { jest, it, expect, describe, beforeEach } from '@jest/globals';

describe('MemoryCache', () => {
  let cache: MemoryCache;

  beforeEach(() => {
    cache = new MemoryCache();
  });

  it('should store and retrieve values', () => {
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
  });

  it('should return undefined for non-existent keys', () => {
    expect(cache.get('nonexistent')).toBeUndefined();
  });

  it('should handle delete operation', () => {
    cache.set('key1', 'value1');
    cache.delete('key1');
    expect(cache.get('key1')).toBeUndefined();
  });

  it('should handle clear operation', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.clear();
    expect(cache.get('key1')).toBeUndefined();
    expect(cache.get('key2')).toBeUndefined();
  });

  it('should handle complex objects', () => {
    const complexObject = {
      id: 1,
      data: { name: 'test' },
      date: new Date(),
      array: [1, 2, 3],
      map: new Map([['key', 'value']]),
      set: new Set([1, 2, 3]),
    };

    cache.set('complex', complexObject);
    expect(cache.get('complex')).toBe(complexObject); // Should be exact same reference
  });

  it('should handle null and undefined values', () => {
    cache.set('null', null);
    cache.set('undefined', undefined);

    expect(cache.get('null')).toBeNull();
    expect(cache.get('undefined')).toBeUndefined();
  });

  it('should handle overwriting existing values', () => {
    cache.set('key1', 'value1');
    cache.set('key1', 'value2');
    expect(cache.get('key1')).toBe('value2');
  });

  it('should maintain separate storage for different instances', () => {
    const cache2 = new MemoryCache();

    cache.set('key1', 'value1');
    cache2.set('key1', 'value2');

    expect(cache.get('key1')).toBe('value1');
    expect(cache2.get('key1')).toBe('value2');
  });

  it('should handle large number of items', () => {
    const items = 10000;

    // Add many items
    for (let i = 0; i < items; i++) {
      cache.set(`key${i}`, `value${i}`);
    }

    // Verify random access
    const randomKey = Math.floor(Math.random() * items);
    expect(cache.get(`key${randomKey}`)).toBe(`value${randomKey}`);
  });

  it('should handle various data types', () => {
    const testCases: [string, any][] = [
      ['string-key', 'test string'],
      ['number-key', 123],
      ['boolean-key', true],
      ['array-key', [1, 2, 3]],
      ['object-key', { a: 1, b: 2 }],
      ['date-key', new Date()],
      ['regexp-key', /test/],
      ['function-key', () => {}],
      ['symbol-key', Symbol('test')],
      ['map-key', new Map()],
      ['set-key', new Set()],
    ];

    testCases.forEach(([key, value]) => {
      cache.set(key, value);
      expect(cache.get(key)).toBe(value);
    });
  });

  it('should handle concurrent operations', () => {
    const operations = 1000;

    // Perform multiple operations concurrently
    const promises = Array.from({ length: operations }, (_, i) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          cache.set(`key${i}`, `value${i}`);
          expect(cache.get(`key${i}`)).toBe(`value${i}`);
          resolve();
        }, Math.random() * 10);
      });
    });

    return Promise.all(promises);
  });
});
