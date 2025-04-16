import { slugify } from '../src/strings/slugify';
import { describe, it, expect } from '@jest/globals';

describe('slugify', () => {
  // Basic functionality
  it('should convert string to slug format', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('This is a test')).toBe('this-is-a-test');
  });

  // Case handling
  it('should convert to lowercase', () => {
    expect(slugify('HELLO WORLD')).toBe('hello-world');
    expect(slugify('Hello-World')).toBe('hello-world');
    expect(slugify('helloWorld')).toBe('hello-world');
  });

  // Special characters
  it('should handle special characters', () => {
    expect(slugify('Hello & World')).toBe('hello-and-world');
    expect(slugify('Hello @ World')).toBe('hello-at-world');
    expect(slugify('100% tested')).toBe('100-percent-tested');
  });

  // Multiple spaces and special characters
  it('should handle multiple spaces and special characters', () => {
    expect(slugify('Hello   World')).toBe('hello-world');
    expect(slugify('  Hello  World  ')).toBe('hello-world');
    expect(slugify('Hello...World')).toBe('hello-world');
    expect(slugify('Hello---World')).toBe('hello-world');
  });

  // Custom replacement character
  it('should use custom replacement character', () => {
    expect(slugify('Hello World', { replacement: '_' })).toBe('hello_world');
    expect(slugify('Hello & World', { replacement: '.' })).toBe('hello.and.world');
  });

  // Special character handling
  it('should handle special character removal', () => {
    expect(slugify('hello-world', { removeSpecialChars: true })).toBe('hello-world');
    expect(slugify('hello_world', { removeSpecialChars: false })).toBe('hello_world');
  });

  // Strict mode
  it('should handle strict mode', () => {
    expect(slugify('Hello World!', { strict: true })).toBe('hello-world');
    expect(slugify('Hello & World', { strict: true })).toBe('hello-and-world');
  });

  // Empty and invalid inputs
  it('should handle empty and invalid inputs', () => {
    expect(slugify('')).toBe('');
    expect(slugify('   ')).toBe('');
    expect(() => slugify(null as any)).toThrow('Input string cannot be null or undefined');
    expect(() => slugify(undefined as any)).toThrow('Input string cannot be null or undefined');
  });

  // Numbers and mixed content
  it('should handle numbers and mixed content', () => {
    expect(slugify('Hello 123')).toBe('hello-123');
    expect(slugify('123 Test')).toBe('123-test');
    expect(slugify('Test 123 Test')).toBe('test-123-test');
  });

  // Unicode characters
  it('should handle unicode characters', () => {
    expect(slugify('Hello Wörld')).toBe('hello-world');
    expect(slugify('Hôtel Crémieux')).toBe('hotel-cremieux');
    expect(slugify('Café au lait')).toBe('cafe-au-lait');
  });

  // Combined options
  it('should handle combined options', () => {
    expect(slugify('Hello & World!', {
      replacement: '_',
      strict: true,
      lower: true,
      trim: true
    })).toBe('hello_and_world');
  });

  // Edge cases with special characters
  it('should handle edge cases with special characters', () => {
    expect(slugify('&&&')).toBe('and');
    expect(slugify('---')).toBe('');
    expect(slugify('   ---   ')).toBe('');
    expect(slugify('Hello & @ # World')).toBe('hello-and-at-hash-world');
  });

  // Multiple consecutive special characters
  it('should handle multiple consecutive special characters', () => {
    expect(slugify('Hello && World')).toBe('hello-and-world');
    expect(slugify('Hello @@ World')).toBe('hello-at-world');
    expect(slugify('Hello ## World')).toBe('hello-hash-world');
  });

  // Mixed special characters and spaces
  it('should handle mixed special characters and spaces', () => {
    expect(slugify('Hello  &  @  World')).toBe('hello-and-at-world');
    expect(slugify('Hello...@@@...World')).toBe('hello-at-world');
  });
}); 