import type { AuthRequestContext } from "../utils/test-app";
import type supertest from "supertest";

export type E2eApp = Parameters<typeof supertest>[0];

export type E2eRequestOptions = {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  auth?: Partial<AuthRequestContext>;
};

export type E2eResponse = {
  status: number;
  body: unknown;
  headers: Record<string, string>;
};

export type E2eClient = {
  get: (path: string, options?: E2eRequestOptions) => Promise<E2eResponse>;
  post: (path: string, body?: unknown, options?: E2eRequestOptions) => Promise<E2eResponse>;
  put: (path: string, body?: unknown, options?: E2eRequestOptions) => Promise<E2eResponse>;
  patch: (path: string, body?: unknown, options?: E2eRequestOptions) => Promise<E2eResponse>;
  delete: (path: string, options?: E2eRequestOptions) => Promise<E2eResponse>;
  withAuth: (auth: Partial<AuthRequestContext>) => E2eClient;
};

function buildQueryString(query?: E2eRequestOptions["query"]): string {
  if (!query) {
    return "";
  }

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  }

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

function mergeHeaders(
  baseAuth: Partial<AuthRequestContext> | undefined,
  options?: E2eRequestOptions,
): Record<string, string> {
  return {
    ...(baseAuth?.tenantId ? { "x-tenant-id": baseAuth.tenantId } : {}),
    ...(baseAuth?.userId ? { "x-user-id": baseAuth.userId } : {}),
    ...(baseAuth?.role ? { "x-user-role": baseAuth.role } : {}),
    ...(baseAuth?.accessToken ? { authorization: `Bearer ${baseAuth.accessToken}` } : {}),
    ...options?.headers,
  };
}

export function createE2eClient(app: E2eApp, baseAuth?: Partial<AuthRequestContext>): E2eClient {
  const request = async (
    method: "get" | "post" | "put" | "patch" | "delete",
    path: string,
    body?: unknown,
    options?: E2eRequestOptions,
  ): Promise<E2eResponse> => {
    const supertestModule = (await import("supertest")).default;
    const headers = mergeHeaders(baseAuth, options);
    const url = `${path}${buildQueryString(options?.query)}`;
    let agent = supertestModule(app)[method](url);

    for (const [key, value] of Object.entries(headers)) {
      agent = agent.set(key, value);
    }

    if (body !== undefined && method !== "get" && method !== "delete") {
      agent = agent.send(body as string | object);
    }

    const response = await agent;
    return {
      status: response.status,
      body: response.body,
      headers: Object.fromEntries(
        Object.entries(response.headers).map(([key, value]) => [
          key,
          Array.isArray(value) ? value.join(",") : String(value),
        ]),
      ),
    };
  };

  const client: E2eClient = {
    get: (path, options) => request("get", path, undefined, options),
    post: (path, body, options) => request("post", path, body, options),
    put: (path, body, options) => request("put", path, body, options),
    patch: (path, body, options) => request("patch", path, body, options),
    delete: (path, options) => request("delete", path, undefined, options),
    withAuth: (auth) => createE2eClient(app, { ...baseAuth, ...auth }),
  };

  return client;
}
