import { throttle } from '../src'; // or adjust path as needed
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

describe('throttle', () => {
  let now: number;

  beforeEach(() => {
    now = 0;
    jest.spyOn(Date, 'now').mockImplementation(() => now); // Mock Date.now() to control time
    jest.useFakeTimers(); // Use fake timers to mock time passing
  });

  it('should throttle calls based on time difference', () => {
    const fn = jest.fn();
    const throttledFn = throttle(fn, 1000);

    throttledFn(); // now = 0
    throttledFn(); // still 0, should be ignored
    expect(fn).toBeCalledTimes(1); // should have been called once

    now += 500; // Advance the mocked time by 500ms
    jest.advanceTimersByTime(500); // Advancing the timers manually
    throttledFn(); // now = 500ms, should still be ignored (not enough time passed)
    expect(fn).toBeCalledTimes(1); // should still be called once

    now += 600; // Advance time by another 600ms, total 1100ms
    jest.advanceTimersByTime(600); // Advancing the timers again
    throttledFn(); // now = 1100ms, should run
    expect(fn).toBeCalledTimes(2); // should now be called twice
  });
});
