const { debounce } = require("../src");

jest.useFakeTimers();

describe("debounce function", () => {
  test("should delay execution", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(mockFn).not.toBeCalled();

    jest.advanceTimersByTime(1000);

    expect(mockFn).toBeCalledTimes(1);
  });
});
