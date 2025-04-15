export function mergeArrays<T>(
  array1: Array<T>,
  array2: Array<T>,
  options: { unique: boolean } = { unique: false }
): Array<T> {
  return !options.unique ? [...array1, ...array2] : [...new Set([...array1, ...array2])];
}
