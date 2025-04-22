import { fetchAPI } from './fetchAPI';
import { CacheFactory } from '../utils/cacheFactory';
import { CacheOptions, APIResponse } from '../types';

export const fetchWithCache = async <T>(url: string, options: CacheOptions = {}): Promise<T> => {
  const {
    cacheTTL = 1000 * 60 * 60 * 24,
    forceRefresh = false,
    cacheType = 'memory',
    storage = 'localStorage',
    fetchOptions = {},
  } = options;

  // Create cache based on the selected strategy
  const cacheStore = CacheFactory.createCache(cacheType, storage);

  // Create a unique cache key that includes the URL and fetch options
  const cacheKey = `${url}:${JSON.stringify(fetchOptions)}`;

  // Check cache first if not forcing refresh
  if (!forceRefresh) {
    const cached = cacheStore.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data as T;
    }
  }

  try {
    const response = await fetchAPI<T>(url, fetchOptions);

    // Handle API response
    if (response && typeof response === 'object') {
      const apiResponse = response as APIResponse<T>;
      if ('success' in apiResponse && !apiResponse.success && 'message' in apiResponse) {
        throw new Error(apiResponse.message || 'API request failed');
      }
      if ('data' in apiResponse) {
        const responseData = apiResponse.data as T;
        cacheStore.set(cacheKey, {
          data: responseData,
          expiresAt: Date.now() + cacheTTL,
        });
        return responseData;
      }
    }

    // If response is not an APIResponse, treat it as the data itself
    cacheStore.set(cacheKey, {
      data: response as T,
      expiresAt: Date.now() + cacheTTL,
    });
    return response as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
