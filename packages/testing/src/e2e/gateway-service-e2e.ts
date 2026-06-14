import { jwtFactory } from "../fixtures/jwt.fixture";

export type GatewayAuthContext = {
  accessToken: string;
  refreshToken?: string;
  tenantId: string;
  userId: string;
  email: string;
  role: string;
};

export const GATEWAY_E2E_CONFIG = {
  gatewayUrl: process.env.API_GATEWAY_URL ?? "http://localhost:3049",
  jwtSecret:
    process.env.JWT_SECRET ??
    process.env.JWT_ACCESS_SECRET ??
    "change-me-local-jwt-secret-min-32-chars",
  enabled: process.env.GATEWAY_E2E !== "false",
  probeTimeoutMs: Number(process.env.GATEWAY_PROBE_TIMEOUT_MS ?? 1500),
};

export type ServiceHealthStatus = "up" | "down" | "auth_required";

export async function fetchGateway(
  path: string,
  init: RequestInit = {},
  timeoutMs = GATEWAY_E2E_CONFIG.probeTimeoutMs,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(`${GATEWAY_E2E_CONFIG.gatewayUrl}${path}`, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

export async function isGatewayReachable(): Promise<boolean> {
  try {
    const response = await fetchGateway("/health");
    return response.ok;
  } catch {
    return false;
  }
}

export async function probeServicePath(
  path: string,
  auth?: GatewayAuthContext,
): Promise<ServiceHealthStatus> {
  const headers: Record<string, string> = {};
  if (auth) {
    headers.authorization = `Bearer ${auth.accessToken}`;
    headers["x-tenant-id"] = auth.tenantId;
  }

  try {
    const response = await fetchGateway(path, { headers });
    if (response.status >= 200 && response.status < 300) {
      return "up";
    }
    if (response.status === 401 || response.status === 403) {
      return "auth_required";
    }
    if (response.status >= 500) {
      return "down";
    }
    return "up";
  } catch {
    return "down";
  }
}

export function createServiceAuth(overrides: Partial<GatewayAuthContext> = {}): GatewayAuthContext {
  const tenantId = overrides.tenantId ?? "tenant-e2e-1";
  const userId = overrides.userId ?? "user-e2e-1";
  const role = overrides.role ?? "OWNER";
  const email = overrides.email ?? "owner@e2e.test";

  return {
    tenantId,
    userId,
    email,
    role,
    accessToken:
      overrides.accessToken ??
      jwtFactory({
        tenantId,
        userId,
        role,
        email,
        secret: GATEWAY_E2E_CONFIG.jwtSecret,
      }),
    refreshToken: overrides.refreshToken,
  };
}

export async function registerGatewayUser(input: {
  tenantId: string;
  email: string;
  password: string;
  role?: string;
}): Promise<GatewayAuthContext> {
  const headers = {
    "content-type": "application/json",
    "x-tenant-id": input.tenantId,
  };

  const login = await fetchGateway("/auth/login", {
    method: "POST",
    headers,
    body: JSON.stringify({ email: input.email, password: input.password }),
  });

  if (login.ok) {
    const body = await login.json();
    return {
      accessToken: body.accessToken,
      refreshToken: body.refreshToken,
      tenantId: input.tenantId,
      userId: body.user?.id ?? body.userId ?? "user-e2e-1",
      email: input.email,
      role: body.user?.role ?? input.role ?? "OWNER",
    };
  }

  const register = await fetchGateway("/auth/register", {
    method: "POST",
    headers,
    body: JSON.stringify({
      email: input.email,
      password: input.password,
      role: input.role ?? "OWNER",
    }),
  });

  if (!register.ok && register.status !== 409) {
    throw new Error(`Failed to register gateway user: ${register.status}`);
  }

  const retry = await fetchGateway("/auth/login", {
    method: "POST",
    headers,
    body: JSON.stringify({ email: input.email, password: input.password }),
  });

  if (!retry.ok) {
    throw new Error(`Failed to login gateway user after register: ${retry.status}`);
  }

  const body = await retry.json();
  return {
    accessToken: body.accessToken,
    refreshToken: body.refreshToken,
    tenantId: input.tenantId,
    userId: body.user?.id ?? "user-e2e-1",
    email: input.email,
    role: body.user?.role ?? input.role ?? "OWNER",
  };
}

export async function bootstrapGatewayServiceE2e(): Promise<{
  gatewayUp: boolean;
  tenantA: GatewayAuthContext;
  tenantB: GatewayAuthContext;
}> {
  const gatewayUp = await isGatewayReachable();
  if (!gatewayUp) {
    const fallback = createServiceAuth({ tenantId: "tenant-e2e-fallback" });
    return { gatewayUp: false, tenantA: fallback, tenantB: fallback };
  }

  try {
    const suffix = Date.now();
    const [tenantA, tenantB] = await Promise.all([
      registerGatewayUser({
        tenantId: `tenant-e2e-a-${suffix}`,
        email: `owner-a-${suffix}@e2e.test`,
        password: "ServiceE2e123!",
        role: "OWNER",
      }),
      registerGatewayUser({
        tenantId: `tenant-e2e-b-${suffix}`,
        email: `owner-b-${suffix}@e2e.test`,
        password: "ServiceE2e123!",
        role: "OWNER",
      }),
    ]);

    return { gatewayUp: true, tenantA, tenantB };
  } catch {
    const fallback = createServiceAuth({ tenantId: "tenant-e2e-fallback" });
    return { gatewayUp: true, tenantA: fallback, tenantB: fallback };
  }
}

export function authHeaders(auth: GatewayAuthContext): Record<string, string> {
  return {
    authorization: `Bearer ${auth.accessToken}`,
    "x-tenant-id": auth.tenantId,
    "content-type": "application/json",
  };
}

export async function gatewayJson(
  path: string,
  init: RequestInit & { auth?: GatewayAuthContext; method?: string; body?: string } = {},
): Promise<{ status: number; body: Record<string, unknown>; headers: Headers }> {
  const headers = {
    "content-type": "application/json",
    ...(init.auth ? authHeaders(init.auth) : {}),
    ...(init.headers as Record<string, string> | undefined),
  };

  const response = await fetchGateway(path, {
    method: init.method ?? "GET",
    body: init.body,
    ...init,
    headers,
  });
  let body: Record<string, unknown> = {};
  try {
    body = (await response.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  return { status: response.status, body, headers: response.headers };
}

export function skipUnlessGateway(
  gatewayUp: boolean,
  serviceStatus: ServiceHealthStatus,
): string | null {
  if (!GATEWAY_E2E_CONFIG.enabled) {
    return "GATEWAY_E2E=false";
  }
  if (!gatewayUp) {
    return "API gateway unreachable";
  }
  if (serviceStatus === "down") {
    return "Service downstream unavailable";
  }
  return null;
}
