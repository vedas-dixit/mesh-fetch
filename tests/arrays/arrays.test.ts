import { uniqueArray } from '../../src/arrays/uniqueArray';
import { mergeArrays } from '../../src/arrays/mergeArrays';
import { flattenArray } from '../../src/arrays/flattenArray';
import { chunkArray } from '../../src/arrays/chunkArray';
import { describe, it, expect } from '@jest/globals';

describe('Array Utilities', () => {
  describe('uniqueArray', () => {
    it('should remove duplicates from number array', () => {
      expect(uniqueArray([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
    });

    it('should remove duplicates from string array', () => {
      expect(uniqueArray(['a', 'b', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty array', () => {
      expect(uniqueArray([])).toEqual([]);
    });

    it('should handle array with mixed types', () => {
      expect(uniqueArray([1, '1', true, 1, true])).toEqual([1, '1', true]);
    });

    it('should handle array with objects', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      expect(uniqueArray([obj1, obj2, obj1])).toEqual([obj1, obj2]);
    });
  });

  describe('mergeArrays', () => {
    it('should merge two arrays without unique option', () => {
      expect(mergeArrays([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
      expect(mergeArrays(['a', 'b'], ['c', 'd'])).toEqual(['a', 'b', 'c', 'd']);
    });

    it('should merge arrays with duplicates when unique is false', () => {
      expect(mergeArrays([1, 2], [2, 3], { unique: false })).toEqual([1, 2, 2, 3]);
    });

    it('should merge arrays without duplicates when unique is true', () => {
      expect(mergeArrays([1, 2], [2, 3], { unique: true })).toEqual([1, 2, 3]);
      expect(mergeArrays(['a', 'b'], ['b', 'c'], { unique: true })).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty arrays', () => {
      expect(mergeArrays([], [])).toEqual([]);
      expect(mergeArrays([1, 2], [])).toEqual([1, 2]);
      expect(mergeArrays([], [3, 4])).toEqual([3, 4]);
    });

    it('should handle arrays with objects', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      expect(mergeArrays([obj1], [obj2, obj1], { unique: true })).toEqual([obj1, obj2]);
    });
  });

  describe('flattenArray', () => {
    it('should flatten nested arrays with default depth', () => {
      expect(flattenArray([1, [2, 3], [4, [5, 6]]])).toEqual([1, 2, 3, 4, 5, 6]);
      expect(flattenArray([['a', 'b'], ['c'], 'd'])).toEqual(['a', 'b', 'c', 'd']);
    });

    it('should respect depth parameter', () => {
      const nested = [1, [2, [3, [4]]]];
      expect(flattenArray(nested, 0)).toEqual([1, [2, [3, [4]]]]);
      expect(flattenArray(nested, 1)).toEqual([1, 2, [3, [4]]]);
      expect(flattenArray(nested, 2)).toEqual([1, 2, 3, [4]]);
      expect(flattenArray(nested, 3)).toEqual([1, 2, 3, 4]);
    });

    it('should handle empty arrays', () => {
      expect(flattenArray([])).toEqual([]);
      expect(flattenArray([[], []])).toEqual([]);
      expect(flattenArray([[], [[]]], 1)).toEqual([]);
    });

    it('should handle mixed types', () => {
      const input = [1, ['a', 2], [true, [null]]];
      expect(flattenArray(input)).toEqual([1, 'a', 2, true, null]);
    });

    it('should handle deeply nested arrays', () => {
      const deep = [1, [2, [3, [4, [5, [6]]]]]];
      expect(flattenArray(deep)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('chunkArray', () => {
    it('should chunk array into specified size', () => {
      expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunkArray(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'], ['d']]);
    });

    it('should handle exact divisions', () => {
      expect(chunkArray([1, 2, 3, 4], 2)).toEqual([
        [1, 2],
        [3, 4],
      ]);
      expect(chunkArray(['a', 'b', 'c'], 3)).toEqual([['a', 'b', 'c']]);
    });

    it('should handle empty array', () => {
      expect(chunkArray([], 2)).toEqual([]);
    });

    it('should handle single-element array', () => {
      expect(chunkArray([1], 2)).toEqual([[1]]);
    });

    it('should throw error for invalid size', () => {
      expect(() => chunkArray([1, 2, 3], 0)).toThrow('Size must be greater than 0');
      expect(() => chunkArray([1, 2, 3], -1)).toThrow('Size must be greater than 0');
    });

    it('should handle array with different types', () => {
      const mixed = [1, 'a', true, null];
      expect(chunkArray(mixed, 2)).toEqual([
        [1, 'a'],
        [true, null],
      ]);
    });
  });
});
