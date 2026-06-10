import { CORRELATION_ID_HEADER } from "@ordella/errors";
import { retry } from "@ordella/utils";
import { apiClient } from "@/lib/api-client";

type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  retry?: boolean;
};

export async function fetcher<T>(path: string, options: FetcherOptions = {}): Promise<T> {
  const request = () =>
    apiClient.request<T>(path, {
      method: options.method ?? "GET",
      body: options.body,
      headers: options.headers,
    });

  if (options.retry === false) {
    return request();
  }

  return retry(request, 2, 500);
}

export { CORRELATION_ID_HEADER };
