import { fetchAPI } from '../src';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe('fetchAPI', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
  });

  it('should return JSON data on success', async () => {
    const mockJson = { message: 'Success' };

    // Mock the fetch call with proper Response type
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      new Response(JSON.stringify(mockJson), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const data = await fetchAPI('https://api.example.com');
    expect(data).toEqual(mockJson);
  });

  it('should return error object on failure', async () => {
    (global.fetch as jest.MockedFunction<typeof fetch>).mockRejectedValue(
      new Error('Network Error')
    );

    const result = await fetchAPI('https://api.example.com');
    expect(result).toEqual({
      success: false,
      message: expect.stringContaining('Network Error'),
    });
  });
});