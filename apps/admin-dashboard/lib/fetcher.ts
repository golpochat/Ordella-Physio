import { ApiClientError } from "./api-client";

export type FetcherOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

function buildUrl(path: string, params?: FetcherOptions["params"]): string {
  const url = new URL(path, typeof window !== "undefined" ? window.location.origin : "http://localhost");

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

export async function fetcher<T>(path: string, options: FetcherOptions = {}): Promise<T> {
  const { params, headers, ...init } = options;
  const response = await fetch(buildUrl(path, params), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw ApiClientError.fromResponse(response.status, payload);
  }

  if (payload && typeof payload === "object" && "data" in (payload as Record<string, unknown>)) {
    return (payload as { data: T }).data;
  }

  return payload as T;
}
