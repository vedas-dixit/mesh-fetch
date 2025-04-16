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

export function fetchAPI<T = any>(url: string, options?: RequestInit): Promise<T | APIResponse<T>>;

export function fetchAPIWithRetry<T = any>(
  url: string,
  options?: RequestInit,
  retries?: number,
  delay?: number
): Promise<T | APIResponse<T>>;

export function formatResponse<T = any, F extends ResponseFormatType = 'json'>(
  data: T,
  format?: F
): FormattedResponse<T, F>;

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void;

export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T;

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
