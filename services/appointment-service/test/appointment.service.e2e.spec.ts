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
  createAppointmentTestApp,
  mockAppointmentsService,
  resetAppointmentMocks,
  TEST_APPOINTMENT_ID,
  TEST_TENANT_ID,
} from "./helpers/create-appointment-test-app";

describe("Appointment Service", () => {
  describe("in-process API", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createAppointmentTestApp());
    });

    afterAll(async () => {
      await app.close();
    });

    beforeEach(() => {
      resetAppointmentMocks();
    });

    describe("GET /appointments/health", () => {
      it("returns service health", async () => {
        const response = await publicRequest(app, TEST_TENANT_ID).get("/appointments/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ok", service: "appointment-service" });
      });
    });

    describe("GET /appointments", () => {
      it("lists appointments for tenant", async () => {
        mockAppointmentsService.listAppointments.mockResolvedValue({
          items: [{ id: TEST_APPOINTMENT_ID }],
          total: 1,
        });

        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID }).get(
          "/appointments",
        );

        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(1);
      });
    });

    describe("GET /appointments/:id", () => {
      it("returns appointment by id", async () => {
        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID }).get(
          `/appointments/${TEST_APPOINTMENT_ID}`,
        );

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(TEST_APPOINTMENT_ID);
      });
    });

    describe("PATCH /appointments/:id", () => {
      it("rejects invalid update payload", async () => {
        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID })
          .patch(`/appointments/${TEST_APPOINTMENT_ID}`)
          .send({ status: "NOT_A_REAL_STATUS" });

        expect(response.status).toBe(400);
        expect(mockAppointmentsService.patch).not.toHaveBeenCalled();
      });
    });
  });

  describe("auth enforcement", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createAppointmentTestApp({ auth: "deny" }));
    });

    afterAll(async () => {
      await app.close();
    });

    it("rejects appointment list without authorization", async () => {
      const response = await publicRequest(app, TEST_TENANT_ID).get("/appointments");
      expect(response.status).toBe(401);
    });
  });

  describe("gateway integration", () => {
    let gatewayUp = false;
    let serviceStatus: Awaited<ReturnType<typeof probeServicePath>> = "down";

    beforeAll(async () => {
      const ctx = await bootstrapGatewayServiceE2e();
      gatewayUp = ctx.gatewayUp;
      serviceStatus = await probeServicePath("/appointments/health", ctx.tenantA);
    });

    it("proxies health when appointment-service is available", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) {
        console.warn(`Skipping appointment gateway health test: ${skip}`);
        return;
      }

      const { status, body } = await gatewayJson("/appointments/health");
      expect(status).toBe(200);
      expect(body).toMatchObject({ status: "ok", service: "appointment-service" });
    });

    it("rejects appointments without authorization", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) return;

      const { status } = await gatewayJson("/appointments");
      expect(status).toBe(401);
    });
  });
});
