import { fetchWithCache } from '../src/network/fetchWithCache';
import { jest, it, expect, describe, beforeEach, afterEach } from '@jest/globals';

// Mock fetch API
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('fetchWithCache', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should fetch and cache data when not in cache', async () => {
    const mockData = { id: 1, name: 'Test' };
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      new Response(JSON.stringify(mockData))
    );

    const result = await fetchWithCache('https://api.example.com/data');

    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return cached data when available and not expired', async () => {
    const mockData = { id: 1, name: 'Test' };
    const url = 'https://api.example.com/data';

    // First call to cache the data
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      new Response(JSON.stringify(mockData))
    );
    await fetchWithCache(url);

    // Second call should use cache
    const result = await fetchWithCache(url);

    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1); // Should not call fetch again
  });

  it('should respect cacheTTL option', async () => {
    const mockData = { id: 1, name: 'Test' };
    const url = 'https://api.example.com/data';

    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      new Response(JSON.stringify(mockData))
    );

    // First call with 1 second TTL
    await fetchWithCache(url, { cacheTTL: 1000 });

    // Advance time by 2 seconds
    jest.advanceTimersByTime(2000);

    // Second call should fetch again
    await fetchWithCache(url, { cacheTTL: 1000 });

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('should force refresh when forceRefresh option is true', async () => {
    const mockData = { id: 1, name: 'Test' };
    const url = 'https://api.example.com/data';

    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      new Response(JSON.stringify(mockData))
    );

    // First call to cache the data
    await fetchWithCache(url);

    // Second call with forceRefresh
    await fetchWithCache(url, { forceRefresh: true });

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('should handle fetch errors properly', async () => {
    const url = 'https://api.example.com/data';
    const errorMessage = 'Network Error';

    (global.fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    await expect(fetchWithCache(url)).rejects.toThrow(errorMessage);
  });

  it('should use different cache keys for different fetchOptions', async () => {
    const mockData = { id: 1, name: 'Test' };
    const url = 'https://api.example.com/data';

    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      new Response(JSON.stringify(mockData))
    );

    // First call with headers
    await fetchWithCache(url, {
      fetchOptions: { headers: { Authorization: 'token1' } },
    });

    // Second call with different headers
    await fetchWithCache(url, {
      fetchOptions: { headers: { Authorization: 'token2' } },
    });

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('should work with different cache types', async () => {
    const mockData = { id: 1, name: 'Test' };
    const url = 'https://api.example.com/data';

    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      new Response(JSON.stringify(mockData))
    );

    // Test memory cache
    await fetchWithCache(url, { cacheType: 'memory' });

    // Test LRU cache
    await fetchWithCache(url, { cacheType: 'lru' });

    // Test persistent cache
    await fetchWithCache(url, { cacheType: 'persistent' });

    expect(fetch).toHaveBeenCalledTimes(3);
  });

  it('should handle non-JSON responses', async () => {
    const mockTextResponse = 'Hello World';
    const url = 'https://api.example.com/text';

    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      new Response(mockTextResponse, {
        headers: { 'Content-Type': 'text/plain' },
      })
    );

    await expect(fetchWithCache(url)).rejects.toThrow();
  });
});
