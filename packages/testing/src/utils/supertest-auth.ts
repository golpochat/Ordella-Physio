import type { INestApplication } from "@nestjs/common";
import request, { type Test } from "supertest";

export type AuthenticatedRequestOptions = {
  tenantId?: string;
  userId?: string;
  role?: string;
  accessToken?: string;
  correlationId?: string;
};

function applyAuthHeaders(
  req: Test,
  options: AuthenticatedRequestOptions = {},
): Test {
  const tenantId = options.tenantId ?? "tenant-test-1";
  const userId = options.userId ?? "user-test-1";
  const role = options.role ?? "OWNER";

  req.set("x-tenant-id", tenantId);
  req.set("x-user-id", userId);
  req.set("x-user-role", role);

  if (options.correlationId) {
    req.set("x-correlation-id", options.correlationId);
  }

  if (options.accessToken) {
    req.set("authorization", `Bearer ${options.accessToken}`);
  }

  return req;
}

export function authenticatedRequest(
  app: INestApplication,
  options: AuthenticatedRequestOptions = {},
) {
  const server = app.getHttpServer();

  return {
    get: (url: string) => applyAuthHeaders(request(server).get(url), options),
    post: (url: string) => applyAuthHeaders(request(server).post(url), options),
    put: (url: string) => applyAuthHeaders(request(server).put(url), options),
    patch: (url: string) => applyAuthHeaders(request(server).patch(url), options),
    delete: (url: string) => applyAuthHeaders(request(server).delete(url), options),
  };
}

export function publicRequest(app: INestApplication, tenantId = "tenant-test-1") {
  const server = app.getHttpServer();

  return {
    get: (url: string) => request(server).get(url).set("x-tenant-id", tenantId),
    post: (url: string) => request(server).post(url).set("x-tenant-id", tenantId),
    put: (url: string) => request(server).put(url).set("x-tenant-id", tenantId),
    patch: (url: string) => request(server).patch(url).set("x-tenant-id", tenantId),
    delete: (url: string) => request(server).delete(url).set("x-tenant-id", tenantId),
  };
}
