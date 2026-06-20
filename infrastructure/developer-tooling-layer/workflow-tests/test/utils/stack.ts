export const WORKFLOW_CONFIG = {
  gatewayUrl: process.env.API_GATEWAY_URL ?? "http://localhost:3049",
  authUrl: process.env.AUTH_SERVICE_URL ?? "http://localhost:3051",
  frontendUrl: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3010",
  jwtSecret:
    process.env.JWT_SECRET ??
    process.env.JWT_ACCESS_SECRET ??
    "change-me-local-jwt-secret-min-32-chars",
  postgres: {
    host: process.env.POSTGRES_HOST ?? "localhost",
    port: Number(process.env.POSTGRES_HOST_PORT ?? 5433),
    user: process.env.POSTGRES_USER ?? "physio",
    password: process.env.POSTGRES_PASSWORD ?? "physio",
  },
  redisUrl: process.env.REDIS_URL ?? "redis://localhost:6379",
  natsUrl: process.env.NATS_URL ?? "nats://localhost:4222",
  demoTenantId: process.env.TEST_TENANT_ID ?? "demo-tenant",
  demoAdminEmail: process.env.TEST_ADMIN_EMAIL ?? "clinicadmin@ordella.dev",
  demoAdminPassword: process.env.TEST_ADMIN_PASSWORD ?? "ClinicAdmin123!",
  stackTimeoutMs: Number(process.env.WORKFLOW_STACK_TIMEOUT_MS ?? 30_000),
};

export type StackServiceStatus = "up" | "down" | "degraded" | "unknown";

export type StackSnapshot = {
  gateway: boolean;
  redis: boolean;
  postgres: boolean;
  nats: boolean;
  services: Record<string, StackServiceStatus>;
};

const SERVICE_PATHS: Record<string, { path: string; public?: boolean }> = {
  auth: { path: "/auth/health", public: true },
  tenant: { path: "/tenants/health" },
  patient: { path: "/patients/health" },
  appointment: { path: "/appointments/health" },
  notes: { path: "/notes/health" },
  billing: { path: "/billing/health" },
  "ai-notes": { path: "/ai/notes/health" },
  marketplace: { path: "/marketplace/health" },
  "file-storage": { path: "/files/health" },
  audit: { path: "/audit-logs/health" },
};

async function fetchWithTimeout(url: string, init?: RequestInit, timeoutMs = 5_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function waitForGateway(timeoutMs = WORKFLOW_CONFIG.stackTimeoutMs): Promise<void> {
  const started = Date.now();
  const url = `${WORKFLOW_CONFIG.gatewayUrl}/health`;

  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetchWithTimeout(url);
      if (response.ok) {
        return;
      }
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 1_000));
  }

  throw new Error(
    `API gateway not reachable at ${url}. Start the dev stack: docker compose -f docker-compose.dev.yml up -d`,
  );
}

export async function detectStack(authHeaders?: Record<string, string>): Promise<StackSnapshot> {
  const snapshot: StackSnapshot = {
    gateway: false,
    redis: false,
    postgres: false,
    nats: false,
    services: {},
  };

  try {
    const health = await fetchWithTimeout(`${WORKFLOW_CONFIG.gatewayUrl}/health`);
    snapshot.gateway = health.ok;
  } catch {
    snapshot.gateway = false;
  }

  const serviceChecks = await Promise.all(
    Object.entries(SERVICE_PATHS).map(async ([name, config]) => {
      const headers: Record<string, string> = {};
      if (!config.public && authHeaders) {
        Object.assign(headers, authHeaders);
      }

      try {
        const response = await fetchWithTimeout(`${WORKFLOW_CONFIG.gatewayUrl}${config.path}`, {
          headers,
        });
        const status: StackServiceStatus =
          response.status >= 200 && response.status < 300
            ? "up"
            : response.status === 401 || response.status === 403
              ? "up"
              : response.status >= 500
                ? "down"
                : "degraded";
        return [name, status] as const;
      } catch {
        return [name, "down"] as const;
      }
    }),
  );

  for (const [name, status] of serviceChecks) {
    snapshot.services[name] = status;
  }

  return snapshot;
}

export function isServiceUp(snapshot: StackSnapshot, service: string): boolean {
  return snapshot.services[service] === "up" || snapshot.services[service] === "degraded";
}

export const describeIf = (condition: boolean) => (condition ? describe : describe.skip);

export function requireServices(snapshot: StackSnapshot, services: string[]): string | null {
  const missing = services.filter((service) => !isServiceUp(snapshot, service));
  if (missing.length === 0) {
    return null;
  }
  return `Requires running services: ${missing.join(", ")}. Uncomment them in docker-compose.dev.yml or start the full stack.`;
}
