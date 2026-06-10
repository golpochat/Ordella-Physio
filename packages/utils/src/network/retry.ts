import { sleep } from "./sleep";

export type RetryOptions = {
  retries?: number;
  delay?: number;
  backoffFactor?: number;
  onRetry?: (error: unknown, attempt: number) => void;
};

export async function retry<T>(
  fn: () => Promise<T> | T,
  retries = 3,
  delay = 300,
  options: Omit<RetryOptions, "retries" | "delay"> = {},
): Promise<T> {
  const backoffFactor = options.backoffFactor ?? 2;
  let attempt = 0;
  let waitMs = delay;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= retries) {
        throw error;
      }

      options.onRetry?.(error, attempt + 1);
      await sleep(waitMs);
      attempt += 1;
      waitMs *= backoffFactor;
    }
  }
}
