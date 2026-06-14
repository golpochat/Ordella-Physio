import type { INestApplication } from "@nestjs/common";
import {
  authenticatedRequest,
  bootstrapGatewayServiceE2e,
  DEFAULT_TEST_USER,
  gatewayJson,
  probeServicePath,
  publicRequest,
  skipUnlessGateway,
} from "@ordella/testing";
import {
  createAiTestApp,
  mockInferenceService,
  resetAiMocks,
  TEST_TENANT_ID,
} from "./helpers/create-ai-test-app";

describe("AI Core Service", () => {
  describe("in-process API", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createAiTestApp());
    });

    afterAll(async () => {
      await app.close();
    });

    beforeEach(() => {
      resetAiMocks();
    });

    describe("GET /platform/health", () => {
      it("returns service health", async () => {
        const response = await publicRequest(app, TEST_TENANT_ID).get("/platform/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ok", service: "ai-service" });
      });
    });

    describe("POST /text", () => {
      it("runs text inference for authorized tenant", async () => {
        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID })
          .post("/text")
          .send({ prompt: "Summarize patient notes", model: "test-model" });

        expect(response.status).toBe(201);
        expect(response.body.output).toBe("Generated note summary");
        expect(mockInferenceService.runTextCompletion).toHaveBeenCalledWith(
          expect.objectContaining({ prompt: "Summarize patient notes" }),
          TEST_TENANT_ID,
          DEFAULT_TEST_USER.userId,
        );
      });
    });
  });

  describe("auth enforcement", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createAiTestApp({ auth: "deny" }));
    });

    afterAll(async () => {
      await app.close();
    });

    it("rejects inference without authorization", async () => {
      const response = await publicRequest(app, TEST_TENANT_ID)
        .post("/text")
        .send({ prompt: "test" });

      expect(response.status).toBe(401);
    });
  });

  describe("gateway integration", () => {
    let gatewayUp = false;
    let serviceStatus: Awaited<ReturnType<typeof probeServicePath>> = "down";

    beforeAll(async () => {
      const ctx = await bootstrapGatewayServiceE2e();
      gatewayUp = ctx.gatewayUp;
      serviceStatus = await probeServicePath("/ai/platform/health", ctx.tenantA);
    });

    it("proxies health when ai-service is available", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) {
        console.warn(`Skipping ai core gateway health test: ${skip}`);
        return;
      }

      const { status, body } = await gatewayJson("/ai/platform/health");
      expect(status).toBe(200);
      expect(body).toMatchObject({ status: "ok", service: "ai-service" });
    });

    it("rejects inference without authorization", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) return;

      const { status } = await gatewayJson("/ai/platform/text", {
        method: "POST",
        body: JSON.stringify({ prompt: "test" }),
      });
      expect(status).toBe(401);
    });
  });
});
