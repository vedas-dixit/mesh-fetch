// Type definitions for mesh-fetcher
export interface APIResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export type ResponseFormatType = 'json' | 'array' | 'object';

export type FormattedResponse<T, F extends ResponseFormatType> = F extends 'array'
  ? T[]
  : F extends 'object'
    ? Record<string, unknown>
    : T;

export declare function fetchAPI<T = any>(
  url: string,
  options?: RequestInit
): Promise<T | APIResponse<T>>;

export declare function fetchAPIWithRetry<T = any>(
  url: string,
  options?: RequestInit,
  retries?: number,
  delay?: number
): Promise<T | APIResponse<T>>;

export declare function formatResponse<T = any, F extends ResponseFormatType = 'json'>(
  data: T,
  format?: F
): FormattedResponse<T, F>;

export declare function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void;

export declare function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T;

// String utility function types
export interface TruncateOptions {
  /**
   * The string to use as replacement for truncated text
   * @default "..."
   */
  replacement?: string;
  /**
   * Whether to truncate at word boundaries
   * @default false
   */
  wordBoundary?: boolean;
  /**
   * Where to truncate the string: 'start', 'middle', or 'end'
   * @default "end"
   */
  position?: 'start' | 'middle' | 'end';
}

export interface CapitalizeOptions {
  /**
   * Whether to preserve existing case in the rest of the word
   * @default false
   */
  preserveCase?: boolean;
  /**
   * Words to exclude from capitalization (e.g., articles, prepositions)
   */
  exclude?: string[];
  /**
   * Locale to use for capitalization
   * @default "en-US"
   */
  locale?: string;
  /**
   * Whether to capitalize only the first word
   * @default false
   */
  onlyFirstWord?: boolean;
  /**
   * Words to exclude from capitalization (e.g., articles, prepositions)
   */
  excludeWords?: string[];
  /**
   * Whether to apply title case rules (e.g., don't capitalize certain small words)
   * @default false
   */
  titleCase?: boolean;
}

export interface SlugifyOptions {
  /**
   * Character to use as replacement for spaces and special characters
   * @default "-"
   */
  replacement?: string;
  /**
   * Convert the slug to lowercase
   * @default true
   */
  lower?: boolean;
  /**
   * Remove leading and trailing spaces
   * @default true
   */
  trim?: boolean;
  /**
   * Remove all special characters
   * @default true
   */
  strict?: boolean;
  /**
   * Remove special characters
   * @default true
   */
  removeSpecialChars?: boolean;
  /**
   * Custom character mappings for replacement
   */
  customReplacements?: Record<string, string>;
  /**
   * Maximum length of the generated slug
   */
  maxLength?: number;
  /**
   * Locale to use for transliteration
   * @default "en-US"
   */
  locale?: string;
  /**
   * Whether to transliterate special characters to their ASCII equivalents
   * @default true
   */
  transliterate?: boolean;
}

export declare function truncateString(
  str: string,
  maxLength: number,
  options?: TruncateOptions
): string;
export declare function capitalizeWords(str: string, options?: CapitalizeOptions): string;
export declare function slugify(str: string, options?: SlugifyOptions): string;

// Object utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Primitive = string | number | boolean | null | undefined;

export interface ObjectUtilOptions {
  /**
   * Maximum depth for recursive operations
   * @default Infinity
   */
  maxDepth?: number;
  /**
   * Whether to preserve prototype chain
   * @default false
   */
  preservePrototype?: boolean;
  /**
   * Whether to include non-enumerable properties
   * @default false
   */
  includeNonEnumerable?: boolean;
}

export interface MergeOptions extends ObjectUtilOptions {
  /**
   * How to handle array merging
   * @default "replace"
   */
  arrayMerge?: 'replace' | 'concat' | 'union';
  /**
   * Whether to clone objects during merge
   * @default true
   */
  clone?: boolean;
}

export interface FlattenOptions {
  /**
   * Character to use as delimiter in flattened keys
   * @default "."
   */
  delimiter?: string;
  /**
   * Maximum depth to flatten
   * @default Infinity
   */
  maxDepth?: number;
  /**
   * Whether to preserve arrays
   * @default false
   */
  preserveArrays?: boolean;
}

// Object utility function declarations
export declare function deepClone<T>(obj: T, options?: ObjectUtilOptions): T;

export declare function deepEqual<T>(a: T, b: T, options?: ObjectUtilOptions): boolean;

export declare function mergeObjects<T extends object, U extends object>(
  target: T,
  source: U,
  options?: MergeOptions
): T & U;

export declare function flattenObject<T extends object>(
  obj: T,
  options?: FlattenOptions
): Record<string, unknown>;

export declare function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
  options?: ObjectUtilOptions
): Pick<T, K>;

export declare function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
  options?: ObjectUtilOptions
): Omit<T, K>;

// Array utility types
export interface ArrayUtilOptions {
  /**
   * Whether to preserve empty arrays in the result
   * @default false
   */
  preserveEmpty?: boolean;
  /**
   * Whether to remove undefined and null values
   * @default false
   */
  removeNulls?: boolean;
}

export interface FlattenArrayOptions extends ArrayUtilOptions {
  /**
   * Maximum depth to flatten. -1 means flatten all levels
   * @default -1
   */
  depth?: number;
  /**
   * Whether to preserve arrays at the specified depth
   * @default false
   */
  preserveArrays?: boolean;
}

export interface MergeArrayOptions extends ArrayUtilOptions {
  /**
   * Whether to remove duplicates from the result
   * @default false
   */
  unique?: boolean;
  /**
   * Custom comparison function for determining uniqueness
   * @param a First element to compare
   * @param b Second element to compare
   * @returns true if elements are equal
   */
  comparator?: <T>(a: T, b: T) => boolean;
}

export interface ChunkArrayOptions {
  /**
   * Whether to pad the last chunk with a fill value if incomplete
   * @default false
   */
  padLastChunk?: boolean;
  /**
   * Value to use for padding the last chunk
   */
  padValue?: any;
}

// Array utility function declarations
export declare function flattenArray<T>(
  array: Array<T | T[]>,
  options?: FlattenArrayOptions
): T[];

export declare function uniqueArray<T>(
  array: Array<T>,
  comparator?: (a: T, b: T) => boolean
): Array<T>;

export declare function mergeArrays<T>(
  array1: Array<T>,
  array2: Array<T>,
  options?: MergeArrayOptions
): Array<T>;

export declare function chunkArray<T>(
  array: Array<T>,
  size: number,
  options?: ChunkArrayOptions
): Array<T[]>;

export interface CacheStore {
  get(key: string): any;
  set(key: string, value: any): void;
  delete(key: string): void;
  clear(): void;
}

export type CacheType = 'memory' | 'lru' | 'persistent';

export interface CacheOptions {
  cacheTTL?: number;
  forceRefresh?: boolean;
  cacheType?: CacheType;
  storage?: 'localStorage' | 'indexedDB';
  fetchOptions?: RequestInit;
}