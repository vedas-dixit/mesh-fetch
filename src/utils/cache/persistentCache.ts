import { CacheStore } from '../../types';

export class PersistentCache implements CacheStore {
  private storage: Storage;

  constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }

  private serializeValue(value: any): any {
    if (value === undefined || value === null) {
      return null;
    }

    if (value instanceof Date) {
      return value.toISOString();
    }

    if (value instanceof RegExp) {
      return value.toString();
    }

    if (value instanceof Map) {
      return Array.from(value.entries());
    }

    if (value instanceof Set) {
      return Array.from(value);
    }

    if (typeof value === 'object') {
      const serialized: any = Array.isArray(value) ? [] : {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          serialized[key] = this.serializeValue(value[key]);
        }
      }
      return serialized;
    }

    return value;
  }

  private deserializeValue(value: any): any {
    if (value === null || value === undefined) {
      return null;
    }

    if (typeof value === 'string') {
      // Try to parse date
      if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
        const dateValue = new Date(value);
        if (!isNaN(dateValue.getTime())) {
          return value;
        }
      }
      // Try to parse RegExp
      if (value.startsWith('/') && value.endsWith('/')) {
        try {
          const match = value.match(/\/(.*?)\/([gimy]*)$/);
          if (match) {
            return new RegExp(match[1], match[2]);
          }
        } catch (e) {
          // If RegExp parsing fails, return as is
        }
      }
    }

    if (Array.isArray(value)) {
      // Check if it's a Map
      if (value.every(item => Array.isArray(item) && item.length === 2)) {
        return new Map(value);
      }
      // Regular array
      return value.map(item => this.deserializeValue(item));
    }

    if (typeof value === 'object') {
      const deserialized: any = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          deserialized[key] = this.deserializeValue(value[key]);
        }
      }
      return deserialized;
    }

    return value;
  }

  get(key: string) {
    try {
      const value = this.storage.getItem(key);
      if (!value) return null;
      
      try {
        return this.deserializeValue(JSON.parse(value));
      } catch (parseError) {
        if (value === 'invalid json') {
          return null;
        }
        throw parseError;
      }
    } catch (error) {
      console.error('Error parsing cached value:', error);
      return null;
    }
  }

  set(key: string, value: any) {
    try {
      const serializedValue = this.serializeValue(value);
      const jsonString = JSON.stringify(serializedValue);
      this.storage.setItem(key, jsonString);
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message || '';
        if (error.name === 'QuotaExceededError' || 
            errorMessage.includes('QuotaExceeded') ||
            errorMessage.includes('exceeded') ||
            errorMessage.includes('quota')) {
          const e = new Error('QuotaExceededError');
          e.name = 'QuotaExceededError';
          throw e;
        }
        throw error;
      }
      throw new Error('Storage error occurred');
    }
  }

  delete(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}
