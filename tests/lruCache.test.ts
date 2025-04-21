import { LRUCache } from '../src/utils/cache/lruCache';
import { jest, it, expect, describe, beforeEach } from '@jest/globals';

describe('LRUCache', () => {
  let cache: LRUCache;

  beforeEach(() => {
    cache = new LRUCache(3); // Create cache with max size 3
  });

  it('should store and retrieve values', () => {
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
  });

  it('should return undefined for non-existent keys', () => {
    expect(cache.get('nonexistent')).toBeUndefined();
  });

  it('should evict least recently used item when cache is full', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key3', 'value3');
    cache.set('key4', 'value4'); // This should evict key1

    expect(cache.get('key1')).toBeUndefined();
    expect(cache.get('key2')).toBe('value2');
    expect(cache.get('key3')).toBe('value3');
    expect(cache.get('key4')).toBe('value4');
  });

  it('should update access order on get', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key3', 'value3');

    // Access key1, making it most recently used
    cache.get('key1');
    
    // Add new item, should evict key2 instead of key1
    cache.set('key4', 'value4');

    expect(cache.get('key1')).toBe('value1');
    expect(cache.get('key2')).toBeUndefined();
    expect(cache.get('key3')).toBe('value3');
    expect(cache.get('key4')).toBe('value4');
  });

  it('should update access order on set', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key3', 'value3');

    // Update key1, making it most recently used
    cache.set('key1', 'new value1');
    
    // Add new item, should evict key2
    cache.set('key4', 'value4');

    expect(cache.get('key1')).toBe('new value1');
    expect(cache.get('key2')).toBeUndefined();
    expect(cache.get('key3')).toBe('value3');
    expect(cache.get('key4')).toBe('value4');
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
      date: new Date()
    };
    
    cache.set('complex', complexObject);
    expect(cache.get('complex')).toEqual(complexObject);
  });

  it('should handle null and undefined values', () => {
    cache.set('null', null);
    cache.set('undefined', undefined);
    
    expect(cache.get('null')).toBeNull();
    expect(cache.get('undefined')).toBeUndefined();
  });

  it('should maintain size limit strictly', () => {
    const maxSize = 100;
    const largeCache = new LRUCache(maxSize);
    
    // Fill cache beyond max size
    for (let i = 0; i < maxSize + 10; i++) {
      largeCache.set(`key${i}`, `value${i}`);
    }

    // Check that only maxSize most recent items are kept
    let count = 0;
    for (let i = 0; i < maxSize + 10; i++) {
      if (largeCache.get(`key${i}`) !== undefined) {
        count++;
      }
    }
    
    expect(count).toBe(maxSize);
  });
}); 