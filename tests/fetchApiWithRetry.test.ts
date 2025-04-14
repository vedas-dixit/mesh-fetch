import { fetchAPIWithRetry } from '../src';  // Adjust the import path as needed
import { jest, it, expect, describe, beforeEach } from '@jest/globals';

// Mock global fetch
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;  // This ensures fetch is mocked properly

describe('fetchAPIWithRetry', () => {
  beforeEach(() => {
    jest.clearAllMocks();  // Clear previous mocks before each test
  });

  it('should return data when API call is successful', async () => {
    const mockData = { message: 'Success' };

    // Mock fetch with a successful response
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const response = await fetchAPIWithRetry('https://example.com', {});
    expect(response).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);  // Fetch should be called once
  });

  it('should retry the specified number of times when API call fails', async () => {
    const mockError = new Error('Network error');

    // Mock fetch with multiple failed responses and one successful response
    (global.fetch as jest.MockedFunction<typeof fetch>)
      .mockRejectedValueOnce(mockError)
      .mockRejectedValueOnce(mockError)
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'Success' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      );

    const response = await fetchAPIWithRetry('https://example.com', {}, 3);
    expect(response).toEqual({ message: 'Success' });
    expect(fetch).toHaveBeenCalledTimes(3);  // Fetch should be called 3 times
  });

  it('should return an error message if all retries fail', async () => {
    const mockError = new Error('Network error');

    // Mock fetch to reject all attempts
    (global.fetch as jest.MockedFunction<typeof fetch>)
      .mockRejectedValueOnce(mockError)
      .mockRejectedValueOnce(mockError)
      .mockRejectedValueOnce(mockError);

    const response = await fetchAPIWithRetry('https://example.com', {}, 3);
    expect(response).toEqual({
      success: false,
      message: 'Error fetching API after 3 attempts: Network error',
    });
    expect(fetch).toHaveBeenCalledTimes(3);  // Fetch should be called 3 times
  });

  it('should respect the delay between retries', async () => {
    const mockError = new Error('Network error');
    const delay = 500;  // 500ms delay

    // Mock fetch with multiple failed responses and one successful response
    (global.fetch as jest.MockedFunction<typeof fetch>)
      .mockRejectedValueOnce(mockError)
      .mockRejectedValueOnce(mockError)
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'Success' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      );

    const startTime = Date.now();
    await fetchAPIWithRetry('https://example.com', {}, 3, delay);
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThanOrEqual(delay * 2);  // Two retries should have at least 2 delays
    expect(fetch).toHaveBeenCalledTimes(3);  // Fetch should be called 3 times
  });
});
