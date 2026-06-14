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
  createSubscriptionBillingTestApp,
  mockSubscriptionService,
  resetSubscriptionBillingMocks,
  TEST_TENANT_ID,
} from "./helpers/create-subscription-billing-test-app";

describe("Subscription Billing Service", () => {
  describe("in-process API", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createSubscriptionBillingTestApp());
    });

    afterAll(async () => {
      await app.close();
    });

    beforeEach(() => {
      resetSubscriptionBillingMocks();
    });

    describe("GET /health", () => {
      it("returns service health", async () => {
        const response = await publicRequest(app, TEST_TENANT_ID).get("/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ok", service: "subscription-billing-service" });
      });
    });

    describe("GET /subscription", () => {
      it("returns current subscription for tenant", async () => {
        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID }).get(
          "/subscription",
        );

        expect(response.status).toBe(200);
        expect(response.body.plan).toBe("PRO");
        expect(mockSubscriptionService.getSubscriptionStatus).toHaveBeenCalledWith(TEST_TENANT_ID);
      });
    });
  });

  describe("auth enforcement", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createSubscriptionBillingTestApp({ auth: "deny" }));
    });

    afterAll(async () => {
      await app.close();
    });

    it("rejects subscription lookup without authorization", async () => {
      const response = await publicRequest(app, TEST_TENANT_ID).get("/subscription");
      expect(response.status).toBe(401);
    });
  });

  describe("gateway integration", () => {
    let gatewayUp = false;
    let serviceStatus: Awaited<ReturnType<typeof probeServicePath>> = "down";

    beforeAll(async () => {
      const ctx = await bootstrapGatewayServiceE2e();
      gatewayUp = ctx.gatewayUp;
      serviceStatus = await probeServicePath("/subscription-billing/health", ctx.tenantA);
    });

    it("proxies health when subscription-billing is available", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) {
        console.warn(`Skipping subscription-billing gateway health test: ${skip}`);
        return;
      }

      const { status, body } = await gatewayJson("/subscription-billing/health");
      expect(status).toBe(200);
      expect(body).toMatchObject({ status: "ok", service: "subscription-billing-service" });
    });

    it("rejects subscription routes without authorization", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) return;

      const { status } = await gatewayJson("/subscription-billing/subscription");
      expect(status).toBe(401);
    });
  });
});
