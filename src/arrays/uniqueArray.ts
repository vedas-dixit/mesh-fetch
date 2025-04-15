export function uniqueArray<T>(array: Array<T>): Array<T> {
  return [...new Set(array)];
}
