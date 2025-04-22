import { CacheFactory } from '../src/utils/cacheFactory';
import { MemoryCache } from '../src/utils/cache/memoryCache';
import { LRUCache } from '../src/utils/cache/lruCache';
import { PersistentCache } from '../src/utils/cache/persistentCache';
import { jest, it, expect, describe } from '@jest/globals';

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

describe('CacheFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  it('should create MemoryCache by default', () => {
    const cache = CacheFactory.createCache();
    expect(cache).toBeInstanceOf(MemoryCache);
  });

  it('should create MemoryCache when specified', () => {
    const cache = CacheFactory.createCache('memory');
    expect(cache).toBeInstanceOf(MemoryCache);
  });

  it('should create LRUCache when specified', () => {
    const cache = CacheFactory.createCache('lru');
    expect(cache).toBeInstanceOf(LRUCache);
  });

  it('should create PersistentCache when specified', () => {
    const cache = CacheFactory.createCache('persistent');
    expect(cache).toBeInstanceOf(PersistentCache);
  });

  it('should throw error for invalid cache type', () => {
    expect(() => {
      // @ts-ignore - Testing invalid input
      CacheFactory.createCache('invalid');
    }).toThrow('Invalid cache type');
  });

  it('should use localStorage by default for persistent cache', () => {
    const cache = CacheFactory.createCache('persistent');
    expect(cache).toBeInstanceOf(PersistentCache);
    // Test that it's using localStorage
    cache.set('test', 'value');
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('should handle storage type parameter', () => {
    const cache = CacheFactory.createCache('persistent', 'localStorage');
    expect(cache).toBeInstanceOf(PersistentCache);
  });
});
