import { performance } from "node:perf_hooks";

export function now(): number {
  return performance.now();
}

export function nowNs(): bigint {
  return process.hrtime.bigint();
}

export function elapsedMs(start: number): number {
  return performance.now() - start;
}

export async function safeExecute<T>(
  fn: () => T | Promise<T>,
  onError?: (error: unknown) => void,
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    onError?.(error);
    return undefined;
  }
}

export function getHeaderValue(
  headers: Record<string, string | string[] | undefined>,
  name: string,
): string | undefined {
  const value = headers[name] ?? headers[name.toLowerCase()];

  if (typeof value === "string" && value.length > 0) {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0];
  }

  return undefined;
}
