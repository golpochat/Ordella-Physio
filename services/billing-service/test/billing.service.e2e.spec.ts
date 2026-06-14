import type { INestApplication } from "@nestjs/common";
import {
  authenticatedRequest,
  bootstrapGatewayServiceE2e,
  gatewayJson,
  probeServicePath,
  publicRequest,
  skipUnlessGateway,
} from "@ordella/testing";
import {
  createBillingTestApp,
  mockInvoicesService,
  resetBillingMocks,
  TEST_INVOICE_ID,
  TEST_TENANT_ID,
} from "./helpers/create-billing-test-app";

describe("Billing Service", () => {
  describe("in-process API", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createBillingTestApp());
    });

    afterAll(async () => {
      await app.close();
    });

    beforeEach(() => {
      resetBillingMocks();
    });

    describe("GET /billing/health", () => {
      it("returns service health", async () => {
        const response = await publicRequest(app, TEST_TENANT_ID).get("/billing/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ok", service: "billing-service" });
      });
    });

    describe("GET /billing/invoices", () => {
      it("lists invoices for tenant", async () => {
        mockInvoicesService.list.mockResolvedValue({
          items: [{ id: TEST_INVOICE_ID }],
          total: 1,
        });

        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID }).get(
          "/billing/invoices",
        );

        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(1);
      });
    });

    describe("GET /billing/invoices/:id", () => {
      it("returns invoice by id", async () => {
        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID }).get(
          `/billing/invoices/${TEST_INVOICE_ID}`,
        );

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(TEST_INVOICE_ID);
      });
    });

    describe("POST /billing/invoices", () => {
      it("rejects invalid invoice payload", async () => {
        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID })
          .post("/billing/invoices")
          .send({ patientId: TEST_INVOICE_ID });

        expect(response.status).toBe(400);
        expect(mockInvoicesService.create).not.toHaveBeenCalled();
      });
    });
  });

  describe("auth enforcement", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createBillingTestApp({ auth: "deny" }));
    });

    afterAll(async () => {
      await app.close();
    });

    it("rejects invoice list without authorization", async () => {
      const response = await publicRequest(app, TEST_TENANT_ID).get("/billing/invoices");
      expect(response.status).toBe(401);
    });
  });

  describe("gateway integration", () => {
    let gatewayUp = false;
    let serviceStatus: Awaited<ReturnType<typeof probeServicePath>> = "down";

    beforeAll(async () => {
      const ctx = await bootstrapGatewayServiceE2e();
      gatewayUp = ctx.gatewayUp;
      serviceStatus = await probeServicePath("/billing/health", ctx.tenantA);
    });

    it("proxies health when billing-service is available", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) {
        console.warn(`Skipping billing gateway health test: ${skip}`);
        return;
      }

      const { status, body } = await gatewayJson("/billing/health");
      expect(status).toBe(200);
      expect(body).toMatchObject({ status: "ok", service: "billing-service" });
    });

    it("rejects billing routes without authorization", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) return;

      const { status } = await gatewayJson("/billing/invoices");
      expect(status).toBe(401);
    });
  });
});
