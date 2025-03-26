import { throttle } from "../src/index.mjs";

jest.useFakeTimers();

describe("throttle function (ES Modules)", () => {
  test("should call function at most once in time period", () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 1000);

    throttledFn();
    throttledFn();
    throttledFn();

    expect(mockFn).toBeCalledTimes(1);

    jest.advanceTimersByTime(1000);
    throttledFn();
    expect(mockFn).toBeCalledTimes(2);
  });
});
