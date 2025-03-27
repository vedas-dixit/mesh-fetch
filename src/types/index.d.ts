declare module 'mesh-fetcher' {
  export interface FetchOptions extends RequestInit {
    timeout?: number;
    retries?: number;
    retryDelay?: number;
  }

  export interface ResponseFormat {
    data: any;
    status: number;
    headers: Headers;
  }

  export function fetchAPI(
    url: string,
    options?: FetchOptions
  ): Promise<ResponseFormat>;

  export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void;

  export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void;

  export function formatResponse(
    data: any,
    format?: 'json' | 'array' | 'object'
  ): any;
} 