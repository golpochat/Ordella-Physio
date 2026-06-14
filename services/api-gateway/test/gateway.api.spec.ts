import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { createRateLimitMiddleware, InMemoryRateLimitStore } from "@ordella/middleware";
import { jwtFactory, publicRequest } from "@ordella/testing";
import {
  createGatewayTestApp,
  mockProxyService,
  resetGatewayMocks,
} from "./helpers/create-gateway-test-app";

const TEST_TENANT_ID = "tenant-test-1";
const TEST_USER_ID = "user-test-1";

describe("API Gateway", () => {
  let app: INestApplication;

  beforeAll(async () => {
    ({ app } = await createGatewayTestApp());
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  beforeEach(() => {
    resetGatewayMocks();
  });

  describe("GET /health", () => {
    it("returns gateway health without authentication", async () => {
      const response = await request(app.getHttpServer()).get("/health");

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("ok");
      expect(response.body.service).toBe("api-gateway");
    });
  });

  describe("proxy routing", () => {
    it("forwards /auth requests to auth-service (core-service)", async () => {
      mockProxyService.forward.mockImplementation(async (req, res) => {
        res.status(200).json({ service: "auth-service", path: req.path });
      });

      const response = await publicRequest(app).get("/auth/health");

      expect(response.status).toBe(200);
      expect(response.body.service).toBe("auth-service");
      expect(mockProxyService.forward).toHaveBeenCalledWith(
        expect.objectContaining({ path: "/auth/health" }),
        expect.anything(),
        "AUTH_SERVICE_URL",
        undefined,
      );
    });

    it("forwards /tenants requests to tenant-service when authenticated", async () => {
      const token = jwtFactory({
        tenantId: TEST_TENANT_ID,
        userId: TEST_USER_ID,
        secret: process.env.JWT_SECRET,
      });

      mockProxyService.forward.mockImplementation(async (req, res, _key, user) => {
        res.status(200).json({
          proxied: true,
          path: req.path,
          userId: user?.userId,
        });
      });

      const response = await request(app.getHttpServer())
        .get("/tenants/health")
        .set("authorization", `Bearer ${token}`)
        .set("x-tenant-id", TEST_TENANT_ID);

      expect(response.status).toBe(200);
      expect(response.body.proxied).toBe(true);
      expect(mockProxyService.forward).toHaveBeenCalledWith(
        expect.objectContaining({ path: "/tenants/health" }),
        expect.anything(),
        "TENANT_SERVICE_URL",
        expect.objectContaining({ userId: TEST_USER_ID, tenantId: TEST_TENANT_ID }),
      );
    });
  });

  describe("tenant isolation", () => {
    it("forwards tenant header to upstream services", async () => {
      const token = jwtFactory({
        tenantId: TEST_TENANT_ID,
        userId: TEST_USER_ID,
        secret: process.env.JWT_SECRET,
      });

      mockProxyService.forward.mockImplementation(async (req, res) => {
        res.status(200).json({ tenantId: req.headers["x-tenant-id"] });
      });

      const response = await request(app.getHttpServer())
        .get("/tenants/health")
        .set("authorization", `Bearer ${token}`)
        .set("x-tenant-id", TEST_TENANT_ID);

      expect(response.status).toBe(200);
      expect(response.body.tenantId).toBe(TEST_TENANT_ID);
    });

    it("requires authentication for tenant routes", async () => {
      const response = await publicRequest(app, TEST_TENANT_ID).get("/tenants/health");

      expect(response.status).toBe(401);
      expect(mockProxyService.forward).not.toHaveBeenCalled();
    });
  });

  describe("auth forwarding", () => {
    it("attaches user context from JWT to proxied requests", async () => {
      const token = jwtFactory({
        tenantId: TEST_TENANT_ID,
        userId: TEST_USER_ID,
        role: "OWNER",
        secret: process.env.JWT_SECRET,
      });

      let capturedUser: { userId?: string; tenantId?: string } | undefined;
      mockProxyService.forward.mockImplementation(async (_req, res, _key, user) => {
        capturedUser = user;
        res.status(200).json({ ok: true });
      });

      await request(app.getHttpServer())
        .get("/tenants/me")
        .set("authorization", `Bearer ${token}`)
        .set("x-tenant-id", TEST_TENANT_ID);

      expect(capturedUser?.userId).toBe(TEST_USER_ID);
      expect(capturedUser?.tenantId).toBe(TEST_TENANT_ID);
    });

    it("rejects malformed JWT on protected routes", async () => {
      const response = await request(app.getHttpServer())
        .get("/tenants/me")
        .set("authorization", "Bearer not.a.valid.jwt")
        .set("x-tenant-id", TEST_TENANT_ID);

      expect(response.status).toBe(401);
    });
  });

  describe("rate limiting", () => {
    it("returns 429 when IP rate limit is exceeded", async () => {
      const store = new InMemoryRateLimitStore();
      const MiddlewareClass = createRateLimitMiddleware({
        windowMs: 60_000,
        maxRequestsPerIp: 1,
        maxRequestsPerTenant: 100,
        store,
      });
      const middleware = new MiddlewareClass();

      const req = {
        originalUrl: "/tenants/list",
        path: "/tenants/list",
        headers: { "x-tenant-id": TEST_TENANT_ID },
        tenantId: TEST_TENANT_ID,
        ip: "127.0.0.1",
        socket: { remoteAddress: "127.0.0.1" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
      };
      const next = jest.fn();

      await middleware.use(req as never, res as never, next);
      await middleware.use(req as never, res as never, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(429);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ code: "RATE_LIMIT_EXCEEDED" }),
      );
    });

    it("returns 429 when tenant rate limit is exceeded", async () => {
      const store = new InMemoryRateLimitStore();
      const MiddlewareClass = createRateLimitMiddleware({
        windowMs: 60_000,
        maxRequestsPerIp: 100,
        maxRequestsPerTenant: 1,
        store,
      });
      const middleware = new MiddlewareClass();

      const tenantA = "tenant-rate-a";
      const tenantB = "tenant-rate-b";
      const createReq = (tenantId: string) => ({
        originalUrl: "/tenants/list",
        path: "/tenants/list",
        headers: { "x-tenant-id": tenantId },
        tenantId,
        ip: "127.0.0.1",
        socket: { remoteAddress: "127.0.0.1" },
      });
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        setHeader: jest.fn(),
      };
      const next = jest.fn();

      await middleware.use(createReq(tenantA) as never, res as never, next);
      await middleware.use(createReq(tenantA) as never, res as never, next);
      await middleware.use(createReq(tenantB) as never, res as never, next);

      expect(next).toHaveBeenCalledTimes(2);
      expect(res.status).toHaveBeenCalledWith(429);
    });
  });

  describe("error handling", () => {
    it("returns 404 for unknown routes", async () => {
      const token = jwtFactory({
        tenantId: TEST_TENANT_ID,
        userId: TEST_USER_ID,
        secret: process.env.JWT_SECRET,
      });

      const response = await request(app.getHttpServer())
        .get("/does-not-exist")
        .set("authorization", `Bearer ${token}`)
        .set("x-tenant-id", TEST_TENANT_ID);

      expect(response.status).toBe(404);
    });

    it("propagates upstream 500 responses", async () => {
      mockProxyService.forward.mockImplementation(async (_req, res) => {
        res.status(500).json({ code: "INTERNAL_SERVER_ERROR", message: "Upstream failed" });
      });

      const response = await publicRequest(app).get("/auth/health");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Upstream failed");
    });

    it("returns 502 when proxy forward throws", async () => {
      mockProxyService.forward.mockImplementation(async (_req, res) => {
        res.status(502).json({
          code: "SERVICE_UNAVAILABLE",
          message: "Upstream service unavailable",
        });
      });

      const response = await publicRequest(app).get("/auth/health");

      expect(response.status).toBe(502);
      expect(response.body.error?.code ?? response.body.code).toBe("SERVICE_UNAVAILABLE");
    });
  });
});
