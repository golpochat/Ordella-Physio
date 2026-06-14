import type { INestApplication } from "@nestjs/common";
import {
  authenticatedRequest,
  bootstrapGatewayServiceE2e,
  gatewayJson,
  jwtFactory,
  probeServicePath,
  publicRequest,
  skipUnlessGateway,
} from "@ordella/testing";
import {
  createTenantTestApp,
  mockTenantsService,
  resetTenantMocks,
  TEST_TENANT_ID,
} from "./helpers/create-tenant-test-app";

describe("Tenant Service", () => {
  describe("in-process API", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createTenantTestApp());
    });

    afterAll(async () => {
      await app.close();
    });

    beforeEach(() => {
      resetTenantMocks();
    });

    describe("GET /tenants/health", () => {
      it("returns service health", async () => {
        const response = await publicRequest(app).get("/tenants/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ok", service: "tenant-service" });
      });
    });

    describe("GET /tenants/directory", () => {
      it("returns tenant directory", async () => {
        mockTenantsService.findDirectory.mockResolvedValue({
          items: [{ id: "tenant-1", name: "Clinic A" }],
          total: 1,
        });

        const response = await publicRequest(app).get("/tenants/directory?limit=10");
        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(1);
        expect(mockTenantsService.findDirectory).toHaveBeenCalledWith({ limit: 10 });
      });
    });

    describe("GET /tenants", () => {
      it("returns paginated tenants for authenticated callers", async () => {
        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID })
          .get("/tenants?page=2&limit=5");

        expect(response.status).toBe(200);
        expect(mockTenantsService.findAll).toHaveBeenCalledWith({ page: 2, limit: 5 });
      });
    });

    describe("GET /tenants/:id", () => {
      it("returns tenant by id", async () => {
        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID }).get(
          `/tenants/${TEST_TENANT_ID}`,
        );

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(TEST_TENANT_ID);
        expect(mockTenantsService.findById).toHaveBeenCalledWith(TEST_TENANT_ID);
      });
    });

    describe("PATCH /tenants/:id", () => {
      it("rejects invalid update payload", async () => {
        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID })
          .patch(`/tenants/${TEST_TENANT_ID}`)
          .send({ name: "" });

        expect(response.status).toBe(400);
        expect(mockTenantsService.update).not.toHaveBeenCalled();
      });

      it("updates tenant with valid payload", async () => {
        mockTenantsService.update.mockResolvedValue({ id: TEST_TENANT_ID, name: "Updated Clinic" });

        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID })
          .patch(`/tenants/${TEST_TENANT_ID}`)
          .send({ name: "Updated Clinic" });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Updated Clinic");
      });
    });
  });

  describe("auth enforcement", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createTenantTestApp({ auth: "deny" }));
    });

    afterAll(async () => {
      await app.close();
    });

    it("rejects protected routes without a valid token", async () => {
      const response = await publicRequest(app, TEST_TENANT_ID).get("/tenants");
      expect(response.status).toBe(401);
    });
  });

  describe("gateway integration", () => {
    jest.setTimeout(20_000);

    let gatewayUp = false;
    let serviceStatus: Awaited<ReturnType<typeof probeServicePath>> = "down";
    let tenantToken = "";

    beforeAll(async () => {
      const ctx = await bootstrapGatewayServiceE2e();
      gatewayUp = ctx.gatewayUp;
      tenantToken = ctx.tenantA.accessToken;
      serviceStatus = await probeServicePath("/tenants/health", ctx.tenantA);
    });

    it("proxies health through the API gateway when the stack is running", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) {
        console.warn(`Skipping tenant gateway health test: ${skip}`);
        return;
      }

      const { status, body } = await gatewayJson("/tenants/health");
      expect(status).toBe(200);
      expect(body).toMatchObject({ status: "ok", service: "tenant-service" });
    });

    it("rejects tenant list without authorization at the gateway", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) return;

      const { status } = await gatewayJson("/tenants");
      expect(status).toBe(401);
    });

    it("rejects tenant list with an invalid token at the gateway", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) return;

      const badToken = jwtFactory({ tenantId: "bad", secret: "wrong-secret-should-not-verify" });
      const { status } = await gatewayJson("/tenants", {
        auth: {
          accessToken: badToken,
          tenantId: "bad",
          userId: "bad",
          email: "bad@test",
          role: "OWNER",
        },
      });
      expect(status).toBe(401);
    });

    it("allows directory lookup without auth at the gateway", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) return;

      const { status, body } = await gatewayJson("/tenants/directory?limit=5");
      expect([200, 503]).toContain(status);
      if (status === 200) {
        expect(body).toHaveProperty("items");
      }
    });
  });
});
