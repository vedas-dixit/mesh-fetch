import { debounce } from '../src';
import { describe, expect, it, jest } from '@jest/globals';

jest.useFakeTimers();

describe('debounce', () => {
  it('should debounce calls', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 1000);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(fn).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(fn).toBeCalledTimes(1);
  });
});
