import { CapitalizeOptions } from '../types';

/**
 * Capitalizes words in a string based on specified options.
 * @param str - The string to capitalize
 * @param options - Configuration options for capitalization
 * @returns The capitalized string
 * @throws {Error} If str is null or undefined
 */
export function capitalizeWords(str: string, options: CapitalizeOptions = {}): string {
  // Input validation
  if (str == null) {
    throw new Error('Input string cannot be null or undefined');
  }

  const {
    locale = undefined,
    preserveCase = false,
    onlyFirstWord = false,
    excludeWords = [],
  } = options;

  // Handle empty string while preserving spaces
  if (str.trim().length === 0) {
    return str;
  }

  // Convert exclude words to lowercase for case-insensitive comparison
  const lowerExcludeWords = new Set(excludeWords.map((word: string) => word.toLowerCase()));

  // Split the string into parts (words and separators)
  const parts = str.split(/([^a-zA-Z0-9\u00C0-\u017F]+)/);

  let isFirstWord = true;
  const processedParts = parts.map((part: string) => {
    // If it's a separator, return it unchanged
    if (/^[^a-zA-Z0-9\u00C0-\u017F]+$/.test(part)) {
      return part;
    }

    // Skip empty parts
    if (part.length === 0) {
      return part;
    }

    // Check if this is a word that should be excluded
    const isExcluded = lowerExcludeWords.has(part.toLowerCase());

    // Handle the first actual word
    if (isFirstWord && part.trim().length > 0) {
      isFirstWord = false;
      // Always capitalize the first word, even if it's in excludeWords
      const firstChar = locale
        ? part.slice(0, 1).toLocaleUpperCase(locale)
        : part.slice(0, 1).toUpperCase();
      const restOfWord = preserveCase ? part.slice(1) : part.slice(1).toLowerCase();
      return firstChar + restOfWord;
    }

    // Handle subsequent words
    if (isExcluded || onlyFirstWord) {
      // Keep excluded words in lowercase
      return part.toLowerCase();
    }

    // Handle regular words
    const firstChar = locale
      ? part.slice(0, 1).toLocaleUpperCase(locale)
      : part.slice(0, 1).toUpperCase();
    const restOfWord = preserveCase ? part.slice(1) : part.slice(1).toLowerCase();

    return firstChar + restOfWord;
  });

  return processedParts.join('');
}
