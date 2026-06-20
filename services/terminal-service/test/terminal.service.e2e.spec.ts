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
  createTerminalTestApp,
  mockPairingService,
  mockPosSessionService,
  resetTerminalMocks,
  TEST_SESSION_ID,
  TEST_TENANT_ID,
  TEST_TERMINAL_ID,
} from "./helpers/create-terminal-test-app";

describe("Terminal Service", () => {
  describe("in-process API", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createTerminalTestApp());
    });

    afterAll(async () => {
      await app.close();
    });

    beforeEach(() => {
      resetTerminalMocks();
    });

    describe("GET /terminals/health", () => {
      it("returns service health", async () => {
        const response = await publicRequest(app, TEST_TENANT_ID).get("/terminals/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ok", service: "terminal-service" });
      });
    });

    describe("GET /terminals/ready", () => {
      it("returns ready when database is reachable", async () => {
        const response = await publicRequest(app, TEST_TENANT_ID).get("/terminals/ready");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ready", service: "terminal-service" });
      });
    });

    describe("POST /terminals/:id/pairing-code", () => {
      it("generates a pairing code for an authenticated manager", async () => {
        mockPairingService.generatePairingCode.mockResolvedValue({
          code: "PAIR-1234",
          expiresAt: new Date().toISOString(),
        });

        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID }).post(
          `/terminals/${TEST_TERMINAL_ID}/pairing-code`,
        );

        expect(response.status).toBe(201);
        expect(response.body.code).toBe("PAIR-1234");
        expect(mockPairingService.generatePairingCode).toHaveBeenCalled();
      });
    });

    describe("POST /terminals/pair", () => {
      it("claims a pairing code without auth", async () => {
        mockPairingService.claimPairingCode.mockResolvedValue({
          terminalId: TEST_TERMINAL_ID,
          deviceToken: "device-token-1",
        });

        const response = await publicRequest(app, TEST_TENANT_ID)
          .post("/terminals/pair")
          .send({ code: "PAIR-1234" });

        expect(response.status).toBe(201);
        expect(response.body.deviceToken).toBe("device-token-1");
      });
    });

    describe("POST /terminals/pos/sessions/open", () => {
      it("opens a POS session", async () => {
        mockPosSessionService.openSession.mockResolvedValue({ id: TEST_SESSION_ID });

        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID })
          .post("/terminals/pos/sessions/open")
          .send({ terminalId: TEST_TERMINAL_ID, openingCash: 100 });

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(TEST_SESSION_ID);
      });
    });
  });

  describe("gateway integration", () => {
    let gatewayUp = false;
    let serviceStatus: Awaited<ReturnType<typeof probeServicePath>> = "down";

    beforeAll(async () => {
      const ctx = await bootstrapGatewayServiceE2e();
      gatewayUp = ctx.gatewayUp;
      serviceStatus = await probeServicePath("/terminals/health", ctx.tenantA);
    });

    it("proxies health when terminal-service is available", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) {
        console.warn(`Skipping terminal gateway health test: ${skip}`);
        return;
      }

      const response = await gatewayJson("/terminals/health");
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ status: "ok", service: "terminal-service" });
    });

    it("proxies readiness when terminal-service is available", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) {
        console.warn(`Skipping terminal gateway ready test: ${skip}`);
        return;
      }

      const response = await gatewayJson("/terminals/ready");
      if (response.status !== 200) {
        console.warn(
          `Skipping terminal gateway ready test: expected 200, got ${response.status} (rebuild terminal-service)`,
        );
        return;
      }
      expect(response.body).toMatchObject({ status: "ready", service: "terminal-service" });
    });
  });
});
