import { HttpError, type SerializedHttpError } from "../../../packages/errors/src/base/http-error";
import { ERROR_CODES } from "../../../packages/errors/src/types/error-codes";
import {
  API_ROUTES,
  HEADER_AUTHORIZATION,
  HEADER_CORRELATION_ID,
  HEADER_TENANT_ID,
  type ApiServiceKey,
} from "./constants";
import { createCorrelationId } from "./helpers";

export class ApiClientError extends HttpError {
  static fromResponse(status: number, body: unknown): ApiClientError {
    const serialized = body as SerializedHttpError | {
      message?: string;
      error?: { message?: string; code?: string; metadata?: Record<string, unknown> };
    };

    const message =
      serialized?.error?.message ??
      (serialized as SerializedHttpError)?.error?.message ??
      ("message" in (serialized ?? {}) ? (serialized as { message?: string }).message : undefined) ??
      "Request failed";

    const code =
      serialized?.error?.code ??
      (serialized as SerializedHttpError)?.error?.code ??
      ERROR_CODES.SYSTEM.INTERNAL_SERVER_ERROR;

    return new ApiClientError({
      message,
      code: code as (typeof ERROR_CODES)["SYSTEM"]["INTERNAL_SERVER_ERROR"],
      statusCode: status,
      metadata: serialized?.error?.metadata ?? {},
    });
  }
}

export type ApiClientContext = {
  accessToken?: string | null;
  tenantId?: string | null;
  correlationId?: string | null;
};

export type ApiClientOptions = Omit<RequestInit, "body"> & {
  service: ApiServiceKey;
  path?: string;
  params?: Record<string, string | number | boolean | undefined>;
  context?: ApiClientContext;
  jsonBody?: unknown;
};

type TokenProvider = () => string | null;
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

function buildServiceUrl(
  service: ApiServiceKey,
  path = "",
  params?: ApiClientOptions["params"],
): string {
  const base = API_ROUTES[service];
  const normalizedPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  const url = new URL(`${base}${normalizedPath}`, window.location.origin);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

async function buildHeaders(
  context: ApiClientContext,
  headers?: HeadersInit,
): Promise<Record<string, string>> {
  const correlationId = context.correlationId ?? createCorrelationId();
  const accessToken = context.accessToken ?? accessTokenProvider?.() ?? null;
  const tenantId = context.tenantId ?? tenantIdProvider?.() ?? null;

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    [HEADER_CORRELATION_ID]: correlationId,
    ...(tenantId ? { [HEADER_TENANT_ID]: tenantId } : {}),
    ...(accessToken ? { [HEADER_AUTHORIZATION]: `Bearer ${accessToken}` } : {}),
    ...(headers as Record<string, string> | undefined),
  };
}

export function createApiClient(getContext: () => ApiClientContext) {
  async function request<T>(options: ApiClientOptions, retry = true): Promise<T> {
    const { service, path = "", params, context, headers, jsonBody, ...init } = options;
    const session = { ...getContext(), ...context };

    const response = await fetch(buildServiceUrl(service, path, params), {
      ...init,
      body: jsonBody !== undefined ? JSON.stringify(jsonBody) : undefined,
      headers: await buildHeaders(session, headers),
    });

    const payload = await response.json().catch(() => null);

    if (response.status === 401 && retry && refreshHandler) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return request<T>({ ...options, context: { ...session, accessToken: newToken } }, false);
      }
      onUnauthorized?.();
    }

    if (!response.ok) {
      throw ApiClientError.fromResponse(response.status, payload);
    }

    if (payload && typeof payload === "object" && "data" in (payload as Record<string, unknown>)) {
      return (payload as { data: T }).data;
    }

    return payload as T;
  }

  return {
    get: <T>(
      service: ApiServiceKey,
      path?: string,
      options?: Omit<ApiClientOptions, "service" | "path" | "method">,
    ) => request<T>({ ...options, service, path, method: "GET" }),
    post: <T>(
      service: ApiServiceKey,
      path?: string,
      jsonBody?: unknown,
      options?: Omit<ApiClientOptions, "service" | "path" | "jsonBody" | "method">,
    ) => request<T>({ ...options, service, path, jsonBody, method: "POST" }),
    put: <T>(
      service: ApiServiceKey,
      path?: string,
      jsonBody?: unknown,
      options?: Omit<ApiClientOptions, "service" | "path" | "jsonBody" | "method">,
    ) => request<T>({ ...options, service, path, jsonBody, method: "PUT" }),
    patch: <T>(
      service: ApiServiceKey,
      path?: string,
      jsonBody?: unknown,
      options?: Omit<ApiClientOptions, "service" | "path" | "jsonBody" | "method">,
    ) => request<T>({ ...options, service, path, jsonBody, method: "PATCH" }),
    delete: <T>(
      service: ApiServiceKey,
      path?: string,
      options?: Omit<ApiClientOptions, "service" | "path" | "method">,
    ) => request<T>({ ...options, service, path, method: "DELETE" }),
  };
}
