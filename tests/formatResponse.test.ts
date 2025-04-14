import { formatResponse } from '../src';
import { describe, it, expect } from '@jest/globals';

describe('formatResponse', () => {
  it('should return array if format is array', () => {
    expect(formatResponse(5, 'array')).toEqual([5]);
    expect(formatResponse([1, 2], 'array')).toEqual([1, 2]);
  });

  it('should return object if format is object', () => {
    expect(formatResponse(5, 'object')).toEqual({ data: 5 });
    expect(formatResponse({ a: 1 }, 'object')).toEqual({ a: 1 });
  });

  it('should return original if format is json', () => {
    expect(formatResponse(123, 'json')).toBe(123);
  });
});
