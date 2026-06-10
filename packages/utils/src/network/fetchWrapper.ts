export class FetchError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly body: unknown;

  constructor(message: string, init: { status: number; statusText: string; url: string; body: unknown }) {
    super(message);
    this.name = "FetchError";
    this.status = init.status;
    this.statusText = init.statusText;
    this.url = init.url;
    this.body = init.body;
  }
}

export type FetchWrapperOptions = RequestInit & {
  timeout?: number;
  parseJson?: boolean;
};

export async function fetchWrapper<T = unknown>(
  url: string,
  options: FetchWrapperOptions = {},
): Promise<T> {
  const { timeout = 30000, parseJson = true, ...init } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...init.headers,
      },
    });

    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");
    const body = parseJson && isJson ? await response.json().catch(() => null) : await response.text();

    if (!response.ok) {
      throw new FetchError(`Request failed with status ${response.status}`, {
        status: response.status,
        statusText: response.statusText,
        url,
        body,
      });
    }

    return body as T;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new FetchError(`Request timed out after ${timeout}ms`, {
        status: 408,
        statusText: "Request Timeout",
        url,
        body: null,
      });
    }

    if (error instanceof FetchError) {
      throw error;
    }

    throw new FetchError(error instanceof Error ? error.message : "Unknown fetch error", {
      status: 0,
      statusText: "Network Error",
      url,
      body: null,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
