import { ERROR_CODES, HttpError, isHttpError, type SerializedHttpError } from "@ordella/errors";
import { generateCorrelationId } from "@/lib/helpers";
import {
  API_BASE_URL,
  HEADER_AUTHORIZATION,
  HEADER_CORRELATION_ID,
  HEADER_TENANT_ID,
  API_ROUTES,
} from "@/lib/constants";

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  skipAuth?: boolean;
  skipRefresh?: boolean;
};

type TokenProvider = () => Promise<string | null>;
type RefreshHandler = () => Promise<string | null>;
type TenantProvider = () => string | null;
type OnUnauthorized = () => void;

let accessTokenProvider: TokenProvider | null = null;
let refreshHandler: RefreshHandler | null = null;
let tenantIdProvider: TenantProvider | null = null;
let onUnauthorized: OnUnauthorized | null = null;

let refreshPromise: Promise<string | null> | null = null;

export function configureApiClient(config: {
  getAccessToken: TokenProvider;
  refreshAccessToken: RefreshHandler;
  getTenantId: TenantProvider;
  onUnauthorized?: OnUnauthorized;
}) {
  accessTokenProvider = config.getAccessToken;
  refreshHandler = config.refreshAccessToken;
  tenantIdProvider = config.getTenantId;
  onUnauthorized = config.onUnauthorized ?? null;
}

function normalizeApiError(status: number, body: unknown): HttpError {
  const serialized = body as SerializedHttpError | { message?: string; error?: { message?: string; code?: string } };
  const fallbackMessage =
    "message" in serialized && typeof serialized.message === "string" ? serialized.message : undefined;
  const message =
    (serialized as SerializedHttpError)?.error?.message ??
    serialized?.error?.message ??
    fallbackMessage ??
    "Request failed";

  const code =
    (serialized as SerializedHttpError)?.error?.code ??
    serialized?.error?.code ??
    ERROR_CODES.SYSTEM.INTERNAL_SERVER_ERROR;

  return new HttpError({
    message,
    code: code as (typeof ERROR_CODES)["SYSTEM"]["INTERNAL_SERVER_ERROR"],
    statusCode: status,
    metadata: (serialized as SerializedHttpError)?.error?.metadata ?? {},
  });
}

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshHandler) {
    return null;
  }
  if (!refreshPromise) {
    refreshPromise = refreshHandler().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

async function buildHeaders(options: RequestOptions): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    [HEADER_CORRELATION_ID]: generateCorrelationId(),
    ...options.headers,
  };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const tenantId = tenantIdProvider?.();
  if (tenantId) {
    headers[HEADER_TENANT_ID] = tenantId;
  }

  if (!options.skipAuth && accessTokenProvider) {
    const token = await accessTokenProvider();
    if (token) {
      headers[HEADER_AUTHORIZATION] = `Bearer ${token}`;
    }
  }

  return headers;
}

export const apiClient = {
  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
    const headers = await buildHeaders(options);

    const response = await fetch(url, {
      method: options.method ?? "GET",
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });

    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");
    const body = isJson ? await response.json().catch(() => null) : await response.text();

    if (response.status === 401 && !options.skipAuth && !options.skipRefresh) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return this.request<T>(path, { ...options, skipRefresh: true });
      }
      onUnauthorized?.();
    }

    if (!response.ok) {
      throw normalizeApiError(response.status, body);
    }

    return body as T;
  },

  get<T>(path: string, options?: Omit<RequestOptions, "method" | "body">) {
    return this.request<T>(path, { ...options, method: "GET" });
  },

  post<T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) {
    return this.request<T>(path, { ...options, method: "POST", body });
  },

  put<T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) {
    return this.request<T>(path, { ...options, method: "PUT", body });
  },

  patch<T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) {
    return this.request<T>(path, { ...options, method: "PATCH", body });
  },

  delete<T>(path: string, options?: Omit<RequestOptions, "method" | "body">) {
    return this.request<T>(path, { ...options, method: "DELETE" });
  },
};

export function parseApiError(error: unknown): string {
  if (isHttpError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Something went wrong";
}

export { API_ROUTES };
