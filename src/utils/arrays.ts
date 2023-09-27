export function mapRange<T>(count: number, mapFn: (index: number) => T): T[] {
  return Array.from({ length: count }, (_, i) => mapFn(i))
}
