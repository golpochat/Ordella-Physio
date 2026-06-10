import { v4 as uuidv4 } from "uuid";
import { API_ROUTES, AUTHORIZATION_HEADER, CORRELATION_ID_HEADER, TENANT_HEADER } from "./constants";

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
};

export type ApiClientOptions = Omit<RequestInit, "body"> & {
  service: keyof typeof API_ROUTES;
  path?: string;
  params?: Record<string, string | number | boolean | undefined>;
  context?: ApiClientContext;
  jsonBody?: unknown;
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

export function createApiClient(getContext: () => ApiClientContext) {
  async function request<T>(options: ApiClientOptions): Promise<T> {
    const { service, path = "", params, context, headers, jsonBody, ...init } = options;
    const session = { ...getContext(), ...context };
    const correlationId = session.correlationId ?? uuidv4();

    const response = await fetch(buildServiceUrl(service, path, params), {
      ...init,
      body: jsonBody !== undefined ? JSON.stringify(jsonBody) : undefined,
      headers: {
        "Content-Type": "application/json",
        [CORRELATION_ID_HEADER]: correlationId,
        ...(session.tenantId ? { [TENANT_HEADER]: session.tenantId } : {}),
        ...(session.accessToken ? { [AUTHORIZATION_HEADER]: `Bearer ${session.accessToken}` } : {}),
        ...headers,
      },
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new ApiError(
        (payload as { message?: string } | null)?.message ?? "API request failed",
        response.status,
        payload,
      );
    }

    if (payload && typeof payload === "object" && "data" in (payload as Record<string, unknown>)) {
      return (payload as { data: T }).data;
    }

    return payload as T;
  }

  return {
    get: <T>(service: keyof typeof API_ROUTES, path?: string, options?: Omit<ApiClientOptions, "service" | "path" | "method">) =>
      request<T>({ ...options, service, path, method: "GET" }),
    post: <T>(service: keyof typeof API_ROUTES, path?: string, jsonBody?: unknown, options?: Omit<ApiClientOptions, "service" | "path" | "jsonBody" | "method">) =>
      request<T>({ ...options, service, path, jsonBody, method: "POST" }),
    put: <T>(service: keyof typeof API_ROUTES, path?: string, jsonBody?: unknown, options?: Omit<ApiClientOptions, "service" | "path" | "jsonBody" | "method">) =>
      request<T>({ ...options, service, path, jsonBody, method: "PUT" }),
    delete: <T>(service: keyof typeof API_ROUTES, path?: string, options?: Omit<ApiClientOptions, "service" | "path" | "method">) =>
      request<T>({ ...options, service, path, method: "DELETE" }),
  };
}
