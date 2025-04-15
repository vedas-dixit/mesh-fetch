import type { APIResponse } from '../types';

export async function fetchAPI<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T | APIResponse<T>> {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: `Error fetching API: ${error.message}`,
    };
  }
}
