export function flattenArray<T>(array: any[], depth: number = -1): T[] {
  if (!array.length) return [];
  if (depth === 0) return array.filter((item) => item.length !== 0) as T[];

  return array.reduce<T[]>((acc, val) => {
    if (Array.isArray(val)) {
      const nextDepth = depth === -1 ? -1 : depth - 1;
      const flattened = flattenArray<T>(val, nextDepth);
      if (flattened.length > 0) {
        acc.push(...flattened);
      }
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}
