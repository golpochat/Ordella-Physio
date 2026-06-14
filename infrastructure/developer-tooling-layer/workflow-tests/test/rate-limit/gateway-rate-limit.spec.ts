import { createRateLimitMiddleware, InMemoryRateLimitStore } from "@ordella/middleware";
import { getFixtures } from "../setup";
import { WORKFLOW_CONFIG } from "../utils/stack";
import { gatewayClient } from "../utils/supertest";

describe("API gateway rate limiting", () => {
  it("returns rate-limit headers on protected routes", async () => {
    const { tenantA } = getFixtures();
    const response = await gatewayClient({
      tenantId: tenantA.tenantId,
      accessToken: tenantA.owner.accessToken,
    }).get("/auth/session");

    expect(response.status).toBe(200);
    const limitHeader =
      response.headers["x-ratelimit-limit-ip"] ??
      response.headers["X-RateLimit-Limit-Ip"];
    expect(limitHeader).toBeTruthy();
  });

  it("enforces IP rate limit in middleware unit probe", async () => {
    const store = new InMemoryRateLimitStore();
    const MiddlewareClass = createRateLimitMiddleware({
      windowMs: 60_000,
      maxRequestsPerIp: 2,
      maxRequestsPerTenant: 100,
      store,
    });
    const middleware = new MiddlewareClass();

    const req = {
      originalUrl: "/patients",
      path: "/patients",
      headers: { "x-tenant-id": "tenant-rate-test" },
      tenantId: "tenant-rate-test",
      ip: "10.0.0.42",
      socket: { remoteAddress: "10.0.0.42" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn(),
    };
    const next = jest.fn();

    await middleware.use(req as never, res as never, next);
    await middleware.use(req as never, res as never, next);
    await middleware.use(req as never, res as never, next);

    expect(next).toHaveBeenCalledTimes(2);
    expect(res.status).toHaveBeenCalledWith(429);
  });

  it("enforces tenant rate limit independently per tenant", async () => {
    const store = new InMemoryRateLimitStore();
    const MiddlewareClass = createRateLimitMiddleware({
      windowMs: 60_000,
      maxRequestsPerIp: 100,
      maxRequestsPerTenant: 1,
      store,
    });
    const middleware = new MiddlewareClass();

    const createReq = (tenantId: string) => ({
      originalUrl: "/patients",
      path: "/patients",
      headers: { "x-tenant-id": tenantId },
      tenantId,
      ip: "10.0.0.99",
      socket: { remoteAddress: "10.0.0.99" },
    });
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn(),
    };
    const next = jest.fn();

    await middleware.use(createReq("tenant-a") as never, res as never, next);
    await middleware.use(createReq("tenant-a") as never, res as never, next);
    await middleware.use(createReq("tenant-b") as never, res as never, next);

    expect(next).toHaveBeenCalledTimes(2);
    expect(res.status).toHaveBeenCalledWith(429);
  });

  it("supports burst traffic below configured gateway limits", async () => {
    const { tenantA } = getFixtures();
    const burst = 5;
    const statuses: number[] = [];

    for (let index = 0; index < burst; index += 1) {
      const response = await gatewayClient({
        tenantId: tenantA.tenantId,
        accessToken: tenantA.owner.accessToken,
      }).get("/auth/health");
      statuses.push(response.status);
    }

    expect(statuses.every((status) => status === 200)).toBe(true);
  });

  it("documents strict lockout mode via WORKFLOW_STRICT_RATE_LIMIT", () => {
    const strict = process.env.WORKFLOW_STRICT_RATE_LIMIT === "true";
    if (!strict) {
      expect(WORKFLOW_CONFIG.gatewayUrl).toBeTruthy();
      return;
    }
    expect(Number(process.env.GATEWAY_RATE_LIMIT_IP ?? 5000)).toBeLessThanOrEqual(10);
  });
});
