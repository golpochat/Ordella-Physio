import type { INestApplication } from "@nestjs/common";
import {
  bootstrapGatewayServiceE2e,
  gatewayJson,
  probeServicePath,
  publicRequest,
  skipUnlessGateway,
} from "@ordella/testing";
import {
  createAiGatewayTestApp,
  mockGatewayKeyService,
  resetAiGatewayMocks,
} from "./helpers/create-ai-gateway-test-app";

describe("AI Gateway Service", () => {
  describe("in-process API", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createAiGatewayTestApp());
    });

    afterAll(async () => {
      await app.close();
    });

    beforeEach(() => {
      resetAiGatewayMocks();
    });

    describe("GET /gateway/health", () => {
      it("returns service health", async () => {
        const response = await publicRequest(app).get("/gateway/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ok", service: "ai-gateway-service" });
      });
    });

    describe("POST /gateway/inference", () => {
      it("rejects requests without gateway context", async () => {
        const response = await publicRequest(app)
          .post("/gateway/inference")
          .send({ model: "gpt-test", input: "hello" });

        expect(response.status).toBe(403);
      });
    });
  });

  describe("gateway integration", () => {
    let gatewayUp = false;
    let serviceStatus: Awaited<ReturnType<typeof probeServicePath>> = "down";

    beforeAll(async () => {
      const ctx = await bootstrapGatewayServiceE2e();
      gatewayUp = ctx.gatewayUp;
      serviceStatus = await probeServicePath("/ai/gateway/health", ctx.tenantA);
    });

    it("proxies health when ai-gateway is available", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) {
        console.warn(`Skipping ai-gateway gateway health test: ${skip}`);
        return;
      }

      const { status, body } = await gatewayJson("/ai/gateway/health");
      expect(status).toBe(200);
      expect(body).toMatchObject({ status: "ok", service: "ai-gateway-service" });
    });

    it("rejects inference without API key", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) return;

      const { status } = await gatewayJson("/ai/gateway/inference", {
        method: "POST",
        body: JSON.stringify({ model: "test", input: "hello" }),
      });
      expect([401, 403, 503]).toContain(status);
    });
  });
});
