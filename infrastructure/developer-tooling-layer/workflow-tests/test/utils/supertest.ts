import request, { type Test } from "supertest";
import { WORKFLOW_CONFIG } from "./stack";

export type AuthContext = {
  accessToken: string;
  refreshToken?: string;
  tenantId: string;
  userId?: string;
  email?: string;
  role?: string;
};

export type GatewayClientOptions = {
  tenantId?: string;
  accessToken?: string;
  userId?: string;
  role?: string;
  correlationId?: string;
};

function applyHeaders(req: Test, options: GatewayClientOptions = {}): Test {
  if (options.tenantId) {
    req.set("x-tenant-id", options.tenantId);
  }
  if (options.userId) {
    req.set("x-user-id", options.userId);
  }
  if (options.role) {
    req.set("x-user-role", options.role);
  }
  if (options.correlationId) {
    req.set("x-correlation-id", options.correlationId);
  }
  if (options.accessToken) {
    req.set("authorization", `Bearer ${options.accessToken}`);
  }
  return req;
}

export function gatewayClient(options: GatewayClientOptions = {}) {
  const baseUrl = WORKFLOW_CONFIG.gatewayUrl;

  return {
    get: (path: string) => applyHeaders(request(baseUrl).get(path), options),
    post: (path: string) => applyHeaders(request(baseUrl).post(path), options),
    put: (path: string) => applyHeaders(request(baseUrl).put(path), options),
    patch: (path: string) => applyHeaders(request(baseUrl).patch(path), options),
    delete: (path: string) => applyHeaders(request(baseUrl).delete(path), options),
  };
}

export function publicGateway(tenantId?: string) {
  return gatewayClient({ tenantId });
}

export function authenticatedGateway(auth: AuthContext) {
  return gatewayClient({
    tenantId: auth.tenantId,
    accessToken: auth.accessToken,
    userId: auth.userId,
    role: auth.role,
  });
}

export async function registerUser(input: {
  tenantId: string;
  email: string;
  password: string;
  role?: string;
}) {
  const response = await publicGateway(input.tenantId)
    .post("/auth/register")
    .send({
      email: input.email,
      password: input.password,
      role: input.role ?? "OWNER",
    });

  return response;
}

export async function loginUser(input: {
  tenantId: string;
  email: string;
  password: string;
}) {
  const response = await publicGateway(input.tenantId)
    .post("/auth/login")
    .send({
      email: input.email,
      password: input.password,
    });

  return response;
}

export async function loginOrRegister(input: {
  tenantId: string;
  email: string;
  password: string;
  role?: string;
}): Promise<AuthContext> {
  let response = await loginUser(input);

  if (response.status === 401 || response.status === 404) {
    response = await registerUser(input);
  }

  if (response.status >= 400) {
    throw new Error(
      `Auth failed (${response.status}): ${JSON.stringify(response.body)}`,
    );
  }

  const body = response.body;
  const user = body.user ?? body.data?.user ?? body;
  const accessToken = body.accessToken ?? body.data?.accessToken;
  const refreshToken = body.refreshToken ?? body.data?.refreshToken;

  if (!accessToken) {
    throw new Error(`Login response missing accessToken: ${JSON.stringify(body)}`);
  }

  return {
    accessToken,
    refreshToken,
    tenantId: input.tenantId,
    userId: user.id ?? user.userId,
    email: user.email ?? input.email,
    role: user.role ?? input.role ?? "OWNER",
  };
}

export function extractErrorCode(body: Record<string, unknown>): string | undefined {
  if (typeof body.code === "string") {
    return body.code;
  }
  const error = body.error as { code?: string } | undefined;
  return error?.code;
}

export function extractErrorMessage(body: Record<string, unknown>): string | undefined {
  if (typeof body.message === "string") {
    return body.message;
  }
  const error = body.error as { message?: string } | undefined;
  return error?.message;
}
