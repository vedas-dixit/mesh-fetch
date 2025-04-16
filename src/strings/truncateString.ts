import { TruncateOptions } from '../types';

/**
 * Truncates a string to a specified length and adds a replacement string.
 * @param str - The string to truncate
 * @param maxLength - The maximum length of the string
 * @param options - Configuration options for truncation
 * @returns The truncated string
 * @throws {Error} If str is null or undefined
 */
export function truncateString(
  str: string,
  maxLength: number,
  options: TruncateOptions = {}
): string {
  // Input validation
  if (str == null) {
    throw new Error('Input string cannot be null or undefined');
  }

  const { replacement = '...', wordBoundary = false, position = 'end' } = options;

  // Handle invalid maxLength
  if (maxLength <= 0) {
    return replacement;
  }

  // Handle case where maxLength is 1
  if (maxLength === 1) {
    return '.';
  }

  // Return original string if it's shorter than maxLength
  if (str.length <= maxLength) {
    return str;
  }

  // Calculate actual truncation length considering replacement length
  const actualMaxLength = Math.max(0, maxLength - replacement.length);

  let truncated: string;
  switch (position) {
    case 'start':
      truncated = str.slice(-actualMaxLength);
      return replacement + truncated;

    case 'middle': {
      // For very short strings or maxLength, fallback to end truncation
      if (actualMaxLength <= 2) {
        return str.slice(0, maxLength - 1) + '.';
      }

      const leftLength = Math.ceil(actualMaxLength / 2);
      const rightLength = Math.floor(actualMaxLength / 2);
      
      // Find word boundaries if needed
      if (wordBoundary) {
        const leftPart = str.slice(0, leftLength);
        const rightStartIndex = str.length - rightLength;
        const rightPart = str.slice(rightStartIndex);
        
        // Find word boundaries
        const lastSpaceLeft = leftPart.lastIndexOf(' ');
        const firstSpaceRight = rightPart.indexOf(' ');
        
        const leftBoundary = lastSpaceLeft > 0 ? lastSpaceLeft : leftLength;
        const rightStart = firstSpaceRight >= 0 ? 
          rightStartIndex + firstSpaceRight + 1 : 
          rightStartIndex;
        
        return str.slice(0, leftBoundary).trimRight() + replacement + str.slice(rightStart).trimLeft();
      }
      
      // For non-word-boundary case, ensure even distribution
      const leftPart = str.slice(0, leftLength);
      const rightPart = str.slice(-rightLength);
      return leftPart + replacement + rightPart;
    }

    case 'end':
    default:
      if (wordBoundary && actualMaxLength > 0) {
        // Find the last complete word
        const searchSpace = str.slice(0, actualMaxLength + 1);
        const lastSpace = searchSpace.lastIndexOf(' ');
        
        if (lastSpace > 0) {
          return str.slice(0, lastSpace).trimRight() + replacement;
        }
      }
      
      truncated = str.slice(0, actualMaxLength).trimRight();
      return truncated + replacement;
  }
}
