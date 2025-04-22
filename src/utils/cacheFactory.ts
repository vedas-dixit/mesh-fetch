import { CacheStore, CacheType } from '../types';
import { MemoryCache } from './cache/memoryCache';
import { LRUCache } from './cache/lruCache';
import { PersistentCache } from './cache/persistentCache';

export class CacheFactory {
  static createCache(
    cacheType: CacheType = 'memory',
    storageType: 'localStorage' | 'indexedDB' = 'localStorage'
  ): CacheStore {
    switch (cacheType) {
      case 'memory':
        return new MemoryCache();
      case 'lru':
        return new LRUCache();
      case 'persistent':
        return new PersistentCache(localStorage);
      default:
        throw new Error('Invalid cache type');
    }
  }
}
