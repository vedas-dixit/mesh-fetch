import { jest } from '@jest/globals';
import { fetchAPI } from "../src/index.mjs";

describe("fetchAPI function", () => {
  test("should fetch data successfully", async () => {
    const mockData = { data: "test data" };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    const result = await fetchAPI("https://api.example.com");
    expect(result).toEqual(mockData);
  });

  test("should handle errors gracefully", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Network error"))
    );

    try {
      await fetchAPI("https://invalidurl.com");
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error.message).toBe("Network error");
    }
  });
});
