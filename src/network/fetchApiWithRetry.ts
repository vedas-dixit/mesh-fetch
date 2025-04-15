import type { APIResponse } from '../types';

export async function fetchAPIWithRetry<T = any>(
  url: string,
  options: RequestInit = {},
  retries: number = 3,
  delay: number = 400
): Promise<T | APIResponse<T>> {
  let attempts = 0;

  while (attempts < retries) {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      attempts++;
      if (attempts >= retries) {
        return {
          success: false,
          message: `Error fetching API after ${retries} attempts: ${error instanceof Error ? error.message : 'Unknown error'}`,
        };
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return {
    success: false,
    message: 'Maximum retry attempts reached',
  };
}
