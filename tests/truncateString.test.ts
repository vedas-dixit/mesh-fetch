import { truncateString } from '../src/strings/truncateString';
import { describe, it, expect } from '@jest/globals';

describe('truncateString', () => {
  // Basic functionality
  it('should truncate string considering replacement length', () => {
    // 'He...' because maxLength 5 includes the '...'
    expect(truncateString('Hello World', 5)).toBe('He...');
    // 'T...' because maxLength 4 includes the '...'
    expect(truncateString('Testing', 4)).toBe('T...');
  });

  it('should return original string when shorter than maxLength', () => {
    expect(truncateString('Hello', 10)).toBe('Hello');
    expect(truncateString('', 5)).toBe('');
  });

  // Custom replacement
  it('should use custom replacement string', () => {
    // 'Hell!' because maxLength 5 includes the '!'
    expect(truncateString('Hello World', 5, { replacement: '!' })).toBe('Hell!');
    // 'T(...)' because maxLength 6 includes the '(...)'
    expect(truncateString('Testing', 6, { replacement: '(...)' })).toBe('T(...)');
  });

  // Position options
  it('should handle different truncation positions', () => {
    // '...rld' - 7 chars total including '...'
    expect(truncateString('Hello World', 7, { position: 'start' })).toBe('...orld');
    // 'He...ld' - 7 chars total including '...'
    expect(truncateString('Hello World', 7, { position: 'middle' })).toBe('He...ld');
    // 'Hell...' - 7 chars total including '...'
    expect(truncateString('Hello World', 7, { position: 'end' })).toBe('Hell...');
  });

  // Word boundary
  it('should respect word boundaries when specified', () => {
    // Should truncate at the last complete word that fits
    expect(truncateString('Hello World', 8, { wordBoundary: true })).toBe('Hello...');
    // Without word boundary, just cuts at character limit
    expect(truncateString('Hello World', 8, { wordBoundary: false })).toBe('Hello...');
  });

  // Edge cases
  it('should handle edge cases', () => {
    expect(truncateString('Hello', 0)).toBe('...');
    expect(truncateString('Hello', -1)).toBe('...');
    expect(truncateString('', 5)).toBe('');
    expect(truncateString('A', 1)).toBe('.');
  });

  // Combined options
  it('should handle multiple options correctly', () => {
    expect(truncateString('Hello Beautiful World', 12, {
      replacement: '...',
      position: 'middle',
      wordBoundary: true
    })).toBe('Hello...orld');
  });

  // Special characters and spaces
  it('should handle special characters and spaces', () => {
    expect(truncateString('Hello   World', 7)).toBe('Hell...');
    expect(truncateString('Hello...World', 7)).toBe('Hell...');
    expect(truncateString('  Hello  ', 7)).toBe('  He...');
  });

  // Input validation
  it('should handle null and undefined inputs', () => {
    expect(() => truncateString(null as any, 5)).toThrow('Input string cannot be null or undefined');
    expect(() => truncateString(undefined as any, 5)).toThrow('Input string cannot be null or undefined');
  });

  // Long replacement string
  it('should handle replacement string longer than maxLength', () => {
    // When replacement is longer than maxLength, should still add it
    expect(truncateString('Hello', 3, { replacement: '......' })).toBe('......');
    expect(truncateString('Hello', 1, { replacement: '...' })).toBe('.');
  });

  // Position with short strings
  it('should handle position options with short strings', () => {
    expect(truncateString('Hi', 4, { position: 'start' })).toBe('Hi');
    expect(truncateString('Hi', 4, { position: 'middle' })).toBe('Hi');
    expect(truncateString('Hi', 4, { position: 'end' })).toBe('Hi');
  });

  // Word boundary edge cases
  it('should handle word boundary edge cases', () => {
    expect(truncateString('HelloWorld', 8, { wordBoundary: true })).toBe('Hello...');
    expect(truncateString('Hello-World', 8, { wordBoundary: true })).toBe('Hello...');
    expect(truncateString('Hello    World', 8, { wordBoundary: true })).toBe('Hello...');
  });

  // Multiple spaces between words
  it('should handle multiple spaces between words', () => {
    expect(truncateString('Hello   World', 10, { wordBoundary: true })).toBe('Hello...');
    expect(truncateString('Hello   World', 10, { position: 'middle' })).toBe('Hell...rld');
  });

  // Very short maxLength
  it('should handle very short maxLength values', () => {
    expect(truncateString('Hello', 2, { replacement: '.' })).toBe('H.');
    expect(truncateString('Hello', 1, { replacement: '.' })).toBe('.');
  });
}); 