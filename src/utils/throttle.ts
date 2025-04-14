export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
    let lastCall = 0;
    return function (...args: any[]) {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        func(...args);
      }
    } as T;
  }
  