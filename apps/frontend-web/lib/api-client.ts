import { v4 as uuidv4 } from "uuid";
import {
  attemptTokenRefresh,
  getApiErrorCode,
  handleApiAuthError,
  redirectToForbidden,
} from "@/lib/session-manager";
import { useUiStore } from "@/store/ui.store";
import { API_ROUTES, AUTHORIZATION_HEADER, CORRELATION_ID_HEADER, TENANT_HEADER } from "./constants";
import { isSystemRole, isSystemUser, mapAuthRoleToPortalRole } from "./auth/roleRedirect";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly payload?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type ApiClientContext = {
  accessToken?: string | null;
  tenantId?: string | null;
  correlationId?: string | null;
  role?: string | null;
  roles?: string[] | null;
};

export type ApiClientOptions = Omit<RequestInit, "body"> & {
  service: keyof typeof API_ROUTES;
  path?: string;
  params?: Record<string, string | number | boolean | undefined>;
  context?: ApiClientContext;
  jsonBody?: unknown;
  formData?: FormData;
  unwrapData?: boolean;
  _retried?: boolean;
  suppressForbiddenRedirect?: boolean;
};

function buildServiceUrl(
  service: keyof typeof API_ROUTES,
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

function isSelfProfileRequest(
  service: keyof typeof API_ROUTES,
  path: string,
  method: string | undefined,
): boolean {
  const normalizedMethod = method?.toUpperCase() ?? "GET";
  return service === "auth" && normalizedMethod === "GET" && (path === "/users/me" || path === "users/me");
}

export function createApiClient(getContext: () => ApiClientContext) {
  async function request<T>(options: ApiClientOptions): Promise<T> {
    const { service, path = "", params, context, headers, jsonBody, formData, unwrapData, suppressForbiddenRedirect, ...init } = options;
    const session = { ...getContext(), ...context };
    const correlationId = session.correlationId ?? uuidv4();

    const roles =
      session.roles?.map((role) => mapAuthRoleToPortalRole(role)) ??
      (session.role ? [mapAuthRoleToPortalRole(session.role)] : []);
    const systemUser =
      isSystemRole(session.role ?? undefined) || (roles.length > 0 && isSystemUser(roles));
    const includeTenantHeader = Boolean(session.tenantId) && !systemUser;

    const response = await fetch(buildServiceUrl(service, path, params), {
      ...init,
      body: formData ?? (jsonBody !== undefined ? JSON.stringify(jsonBody) : undefined),
      headers: {
        ...(formData ? {} : { "Content-Type": "application/json" }),
        [CORRELATION_ID_HEADER]: correlationId,
        ...(includeTenantHeader ? { [TENANT_HEADER]: session.tenantId! } : {}),
        ...(session.accessToken ? { [AUTHORIZATION_HEADER]: `Bearer ${session.accessToken}` } : {}),
        ...headers,
      },
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      if (response.status === 401 && !options._retried) {
        const refreshed = await attemptTokenRefresh();
        if (refreshed) {
          return request<T>({ ...options, _retried: true });
        }

        await handleApiAuthError(response.status, payload);
      }

      if (response.status === 403) {
        if (getApiErrorCode(payload) === "TENANT_SUSPENDED") {
          useUiStore.getState().setTenantSuspended(true);
        } else {
          const method = init.method?.toUpperCase() ?? "GET";
          const shouldRedirect =
            !suppressForbiddenRedirect &&
            method !== "GET" &&
            !isSelfProfileRequest(service, path, init.method);

          if (shouldRedirect) {
            redirectToForbidden();
          }
        }
      }

      throw new ApiError(
        (payload as { message?: string } | null)?.message ?? "API request failed",
        response.status,
        payload,
      );
    }

    if (
      unwrapData !== false &&
      payload &&
      typeof payload === "object" &&
      "data" in (payload as Record<string, unknown>)
    ) {
      return (payload as { data: T }).data;
    }

    return payload as T;
  }

  return {
    get: <T>(service: keyof typeof API_ROUTES, path?: string, options?: Omit<ApiClientOptions, "service" | "path" | "method">) =>
      request<T>({ ...options, service, path, method: "GET" }),
    post: <T>(service: keyof typeof API_ROUTES, path?: string, jsonBody?: unknown, options?: Omit<ApiClientOptions, "service" | "path" | "jsonBody" | "method">) =>
      request<T>({ ...options, service, path, jsonBody, method: "POST" }),
    postForm: <T>(
      service: keyof typeof API_ROUTES,
      path?: string,
      formData?: FormData,
      options?: Omit<ApiClientOptions, "service" | "path" | "formData" | "method">,
    ) => request<T>({ ...options, service, path, formData, method: "POST" }),
    put: <T>(service: keyof typeof API_ROUTES, path?: string, jsonBody?: unknown, options?: Omit<ApiClientOptions, "service" | "path" | "jsonBody" | "method">) =>
      request<T>({ ...options, service, path, jsonBody, method: "PUT" }),
    patch: <T>(
      service: keyof typeof API_ROUTES,
      path?: string,
      jsonBody?: unknown,
      options?: Omit<ApiClientOptions, "service" | "path" | "jsonBody" | "method">,
    ) => request<T>({ ...options, service, path, jsonBody, method: "PATCH" }),
    delete: <T>(service: keyof typeof API_ROUTES, path?: string, options?: Omit<ApiClientOptions, "service" | "path" | "method">) =>
      request<T>({ ...options, service, path, method: "DELETE" }),
  };
}
