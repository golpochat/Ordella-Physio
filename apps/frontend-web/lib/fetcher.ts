import { ApiError } from "./api-client";
import { CSRF_HEADER_NAME, ensureCsrfToken } from "@/lib/auth/csrf";
import { getStoredAuthUser } from "@/lib/auth-storage";
import { resolveAuthErrorMessage } from "./auth-error-messages";
import { TENANT_HEADER } from "./constants";
import { getDefaultTenantId } from "./tenant-config";
import { useAuthStore } from "@/store/auth.store";

export type FetcherOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

function buildUrl(path: string, params?: FetcherOptions["params"]): string {
  const url = new URL(
    path,
    typeof window !== "undefined" ? window.location.origin : "http://localhost",
  );

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

function extractErrorMessage(payload: unknown, fallback: string): string {
  return resolveAuthErrorMessage(payload, fallback);
}

function readTenantHeader(headers?: HeadersInit): string | undefined {
  if (!headers) {
    return undefined;
  }

  if (headers instanceof Headers) {
    return headers.get(TENANT_HEADER) ?? undefined;
  }

  if (Array.isArray(headers)) {
    const match = headers.find(([key]) => key.toLowerCase() === TENANT_HEADER.toLowerCase());
    return match?.[1];
  }

  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === TENANT_HEADER.toLowerCase() && value) {
      return String(value);
    }
  }

  return undefined;
}

/** Prefer the signed-in user's tenant over env defaults to avoid gateway tenant mismatch. */
function resolveAuthTenantId(headers?: HeadersInit): string | undefined {
  return (
    readTenantHeader(headers) ??
    useAuthStore.getState().user?.tenantId ??
    getStoredAuthUser()?.tenantId ??
    getDefaultTenantId()
  );
}

function hasAuthorizationHeader(headers?: HeadersInit): boolean {
  if (!headers) {
    return false;
  }

  if (headers instanceof Headers) {
    return Boolean(headers.get("Authorization") ?? headers.get("authorization"));
  }

  if (Array.isArray(headers)) {
    return headers.some(
      ([key, value]) => key.toLowerCase() === "authorization" && Boolean(value),
    );
  }

  return Object.entries(headers).some(
    ([key, value]) => key.toLowerCase() === "authorization" && Boolean(value),
  );
}

export async function fetcher<T>(
  path: string,
  options: FetcherOptions = {},
): Promise<T> {
  const { params, headers, credentials, ...init } = options;
  const method = (init.method ?? "GET").toUpperCase();
  const csrfToken =
    method !== "GET" && method !== "HEAD" && !hasAuthorizationHeader(headers)
      ? await ensureCsrfToken()
      : null;
  const authTenantId = path.startsWith("/api/auth") ? resolveAuthTenantId(headers) : undefined;

  const response = await fetch(buildUrl(path, params), {
    ...init,
    credentials:
      credentials ?? (path.startsWith("/api/auth") ? "include" : "same-origin"),
    headers: {
      "Content-Type": "application/json",
      ...(authTenantId ? { [TENANT_HEADER]: authTenantId } : {}),
      ...(csrfToken ? { [CSRF_HEADER_NAME]: csrfToken } : {}),
      ...headers,
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      extractErrorMessage(payload, "Request failed"),
      response.status,
      payload,
    );
  }

  if (
    payload &&
    typeof payload === "object" &&
    "data" in (payload as Record<string, unknown>)
  ) {
    return (payload as { data: T }).data;
  }

  return payload as T;
}
