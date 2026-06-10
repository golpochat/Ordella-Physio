export type AggregationBucket = {
  key: string;
  count: number;
  total: number;
};

export function buildAggregationBuckets<T>(
  items: T[],
  keySelector: (item: T) => string,
  valueSelector: (item: T) => number,
): AggregationBucket[] {
  const buckets = new Map<string, AggregationBucket>();

  for (const item of items) {
    const key = keySelector(item);
    const value = valueSelector(item);
    const existing = buckets.get(key) ?? { key, count: 0, total: 0 };
    existing.count += 1;
    existing.total += value;
    buckets.set(key, existing);
  }

  return Array.from(buckets.values());
}

export function sumValues(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0);
}
