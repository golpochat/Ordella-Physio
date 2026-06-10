function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function deepMerge<T extends Record<string, unknown>, U extends Record<string, unknown>>(
  objA: T,
  objB: U,
): T & U {
  const result = { ...objA } as Record<string, unknown>;

  for (const [key, value] of Object.entries(objB)) {
    const existing = result[key];

    if (isPlainObject(existing) && isPlainObject(value)) {
      result[key] = deepMerge(existing, value);
      continue;
    }

    result[key] = value;
  }

  return result as T & U;
}
