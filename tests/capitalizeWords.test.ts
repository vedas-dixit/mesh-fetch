import { capitalizeWords } from '../src/strings/capitalizeWords';
import { describe, it, expect } from '@jest/globals';

describe('capitalizeWords', () => {
  // Basic functionality
  it('should capitalize first letter of each word', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
    expect(capitalizeWords('the quick brown fox')).toBe('The Quick Brown Fox');
  });

  // Case preservation
  it('should handle preserveCase option', () => {
    expect(capitalizeWords('heLLo wORld', { preserveCase: true })).toBe('HeLLo WORld');
    expect(capitalizeWords('heLLo wORld', { preserveCase: false })).toBe('Hello World');
  });

  // Excluded words
  it('should handle excluded words', () => {
    const excludeWords = ['and', 'the', 'in', 'on'];
    expect(capitalizeWords('the cat and the dog', { excludeWords })).toBe('The Cat and the Dog');
    expect(capitalizeWords('start the engine', { excludeWords })).toBe('Start the Engine');
  });

  // Only first word
  it('should handle onlyFirstWord option', () => {
    expect(capitalizeWords('hello beautiful world', { onlyFirstWord: true })).toBe(
      'Hello beautiful world'
    );
    expect(capitalizeWords('THE QUICK BROWN', { onlyFirstWord: true })).toBe('The quick brown');
  });

  // Locale support
  it('should handle different locales', () => {
    expect(capitalizeWords('istanbul', { locale: 'tr-TR' })).toBe('İstanbul');
    expect(capitalizeWords('istanbul', { locale: 'en-US' })).toBe('Istanbul');
  });

  // Combined options
  it('should handle multiple options correctly', () => {
    expect(
      capitalizeWords('the quick brown fox', {
        onlyFirstWord: true,
        preserveCase: true,
        excludeWords: ['the', 'quick'],
        locale: 'en-US',
      })
    ).toBe('The quick brown fox');
  });

  // Special characters and spaces
  it('should handle special characters and multiple spaces', () => {
    expect(capitalizeWords('hello   world')).toBe('Hello   World');
    expect(capitalizeWords('hello-world')).toBe('Hello-World');
    expect(capitalizeWords('hello.world')).toBe('Hello.World');
    expect(capitalizeWords('hello_world')).toBe('Hello_World');
  });

  // Empty strings and whitespace
  it('should handle empty strings and whitespace', () => {
    expect(capitalizeWords('')).toBe('');
    expect(capitalizeWords(' ')).toBe(' ');
    expect(capitalizeWords('   ')).toBe('   ');
  });

  // Input validation
  it('should handle null and undefined inputs', () => {
    expect(() => capitalizeWords(null as any)).toThrow('Input string cannot be null or undefined');
    expect(() => capitalizeWords(undefined as any)).toThrow(
      'Input string cannot be null or undefined'
    );
  });

  // Edge cases with excluded words
  it('should handle edge cases with excluded words', () => {
    const excludeWords = ['and', 'the'];
    // First word should always be capitalized even if it's in excludeWords
    expect(capitalizeWords('the cat', { excludeWords })).toBe('The Cat');
    expect(capitalizeWords('and then', { excludeWords })).toBe('And Then');
  });

  // Mixed case and numbers
  it('should handle mixed case and numbers', () => {
    expect(capitalizeWords('hello123 world456')).toBe('Hello123 World456');
    expect(capitalizeWords('123hello 456world')).toBe('123hello 456world');
  });

  // Unicode characters
  it('should handle unicode characters', () => {
    expect(capitalizeWords('über café')).toBe('Über Café');
    expect(capitalizeWords('études françaises')).toBe('Études Françaises');
  });

  // Leading/trailing spaces
  it('should preserve leading and trailing spaces', () => {
    expect(capitalizeWords('  hello world  ')).toBe('  Hello World  ');
    expect(capitalizeWords('\thello world\n')).toBe('\tHello World\n');
  });
});
