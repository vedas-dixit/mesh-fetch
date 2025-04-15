// Type definitions for mesh-fetcher
export interface APIResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export type ResponseFormatType = 'json' | 'array' | 'object';

export type FormattedResponse<T, F extends ResponseFormatType> = 
  F extends 'array' ? T[] :
  F extends 'object' ? Record<string, unknown> :
  T;

export function fetchAPI<T = any>(
  url: string,
  options?: RequestInit
): Promise<T | APIResponse<T>>;

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

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): T; 