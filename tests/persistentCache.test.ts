import { PersistentCache } from '../src/utils/cache/persistentCache';
import { jest, it, expect, describe, beforeEach } from '@jest/globals';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('PersistentCache', () => {
  let cache: PersistentCache;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    cache = new PersistentCache(localStorageMock as Storage);
  });

  it('should store and retrieve values', () => {
    const testData = { id: 1, name: 'test' };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(testData));

    cache.set('key1', testData);
    const result = cache.get('key1');

    expect(localStorageMock.setItem).toHaveBeenCalledWith('key1', JSON.stringify(testData));
    expect(result).toEqual(testData);
  });

  it('should handle non-existent keys', () => {
    localStorageMock.getItem.mockReturnValue(null);
    expect(cache.get('nonexistent')).toBeNull();
  });

  it('should handle delete operation', () => {
    cache.delete('key1');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('key1');
  });

  it('should handle clear operation', () => {
    cache.clear();
    expect(localStorageMock.clear).toHaveBeenCalled();
  });

  it('should handle complex objects', () => {
    const complexObject = {
      id: 1,
      data: { nested: true },
      date: new Date('2024-01-01'),
      array: [1, 2, 3],
    };

    const serializedObject = {
      ...complexObject,
      date: complexObject.date.toISOString(),
    };

    localStorageMock.getItem.mockReturnValue(JSON.stringify(serializedObject));

    cache.set('complex', complexObject);
    const result = cache.get('complex');

    expect(result).toEqual(serializedObject);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'complex',
      JSON.stringify(serializedObject)
    );
  });

  it('should handle null and undefined values', () => {
    // Test null
    cache.set('null', null);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('null', 'null');

    localStorageMock.getItem.mockReturnValue('null');
    expect(cache.get('null')).toBeNull();

    // Test undefined
    cache.set('undefined', undefined);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('undefined', 'null');

    localStorageMock.getItem.mockReturnValue('null');
    expect(cache.get('undefined')).toBeNull();
  });

  it('should handle JSON parse errors', () => {
    localStorageMock.getItem.mockReturnValue('invalid json');
    expect(cache.get('invalid')).toBeNull();
  });

  it('should handle storage errors', () => {
    const largeObject = { data: 'x'.repeat(1024 * 1024 * 10) }; // 10MB string
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    expect(() => cache.set('large', largeObject)).toThrow('QuotaExceededError');
  });

  it('should handle special types', () => {
    const specialData = {
      date: new Date('2024-01-01'),
      regexp: /test/,
      map: new Map([['key', 'value']]),
      set: new Set([1, 2, 3]),
    };

    const expectedData = {
      date: specialData.date.toISOString(),
      regexp: specialData.regexp.toString(),
      map: Array.from(specialData.map.entries()),
      set: Array.from(specialData.set),
    };

    cache.set('special', specialData);

    const retrieved = cache.get('special');
    expect(retrieved.date).toBe(expectedData.date);
    expect(retrieved.regexp).toBe(expectedData.regexp);
    expect(retrieved.map).toEqual(expectedData.map);
    expect(retrieved.set).toEqual(expectedData.set);
  });
});
