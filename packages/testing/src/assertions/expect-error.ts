export type ErrorAssertionOptions = {
  statusCode?: number;
  message?: string | RegExp;
};

export function expectError(error: unknown, code: string, options: ErrorAssertionOptions = {}): void {
  const candidate = error as {
    code?: string;
    statusCode?: number;
    message?: string;
    response?: { statusCode?: number; code?: string; message?: string };
  };

  const resolvedCode = candidate.code ?? candidate.response?.code;
  if (resolvedCode !== code) {
    throw new Error(`Expected error code "${code}", received "${resolvedCode ?? "unknown"}"`);
  }

  const statusCode = candidate.statusCode ?? candidate.response?.statusCode ?? options.statusCode;
  if (options.statusCode !== undefined && statusCode !== options.statusCode) {
    throw new Error(`Expected status ${options.statusCode}, received ${statusCode ?? "unknown"}`);
  }

  const message = candidate.message ?? candidate.response?.message ?? "";
  if (options.message instanceof RegExp && !options.message.test(message)) {
    throw new Error(`Expected message to match ${options.message}, received "${message}"`);
  }
  if (typeof options.message === "string" && message !== options.message) {
    throw new Error(`Expected message "${options.message}", received "${message}"`);
  }
}

export async function expectAsyncError<T extends Error>(
  callback: () => Promise<unknown>,
  code: string,
  options?: ErrorAssertionOptions,
): Promise<T> {
  try {
    await callback();
  } catch (error) {
    expectError(error, code, options);
    return error as T;
  }

  throw new Error(`Expected error with code "${code}" to be thrown`);
}
