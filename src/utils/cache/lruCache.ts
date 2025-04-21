import { CacheStore } from '../../types';

export class LRUCache implements CacheStore {
  private cache: Map<string, any>;
  private maxSize: number;

  constructor(maxSize: number = 10) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: string) {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key);
    // Reorder the cache (move to the end to show it's recently used)
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key: string, value: any) {
    if (this.cache.size >= this.maxSize) {
      // Remove the first (least recently used) item
      this.cache.delete(this.cache.keys().next().value as string);
    }
    this.cache.set(key, value);
  }

  delete(key: string) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }
}
