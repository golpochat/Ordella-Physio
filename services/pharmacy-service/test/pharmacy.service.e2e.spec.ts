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
  createPharmacyTestApp,
  mockFulfillmentService,
  mockPrescriptionsService,
  resetPharmacyMocks,
  TEST_PRESCRIPTION_ID,
  TEST_TENANT_ID,
} from "./helpers/create-pharmacy-test-app";

describe("Pharmacy Service", () => {
  describe("in-process API", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createPharmacyTestApp());
    });

    afterAll(async () => {
      await app.close();
    });

    beforeEach(() => {
      resetPharmacyMocks();
    });

    describe("GET /pharmacy/health", () => {
      it("returns service health", async () => {
        const response = await publicRequest(app, TEST_TENANT_ID).get("/pharmacy/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ok", service: "pharmacy-service" });
      });
    });

    describe("GET /pharmacy/ready", () => {
      it("returns ready when database is reachable", async () => {
        const response = await publicRequest(app, TEST_TENANT_ID).get("/pharmacy/ready");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ready", service: "pharmacy-service" });
      });
    });

    describe("GET /pharmacy/prescriptions", () => {
      it("lists prescriptions for the tenant", async () => {
        mockPrescriptionsService.list.mockResolvedValue([{ id: TEST_PRESCRIPTION_ID }]);

        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID }).get(
          "/pharmacy/prescriptions",
        );

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(mockPrescriptionsService.list).toHaveBeenCalled();
      });
    });

    describe("POST /pharmacy/prescriptions", () => {
      it("creates a prescription with valid payload", async () => {
        mockPrescriptionsService.create.mockResolvedValue({ id: TEST_PRESCRIPTION_ID });

        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID })
          .post("/pharmacy/prescriptions")
          .send({
            patientId: "550e8400-e29b-41d4-a716-446655440001",
            therapistId: "550e8400-e29b-41d4-a716-446655440002",
            medicationName: "Ibuprofen",
            dosage: "400mg",
            frequency: "Twice daily",
            duration: "7 days",
          });

        expect(response.status).toBe(201);
        expect(mockPrescriptionsService.create).toHaveBeenCalled();
      });

      it("rejects invalid prescription payload", async () => {
        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID })
          .post("/pharmacy/prescriptions")
          .send({ medicationName: "" });

        expect(response.status).toBe(400);
        expect(mockPrescriptionsService.create).not.toHaveBeenCalled();
      });
    });

    describe("POST /pharmacy/fulfillment/:id/start", () => {
      it("starts fulfillment", async () => {
        mockFulfillmentService.start.mockResolvedValue({ id: TEST_PRESCRIPTION_ID });

        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID })
          .post(`/pharmacy/fulfillment/${TEST_PRESCRIPTION_ID}/start`)
          .send({ notes: "Starting prep" });

        expect(response.status).toBe(201);
        expect(mockFulfillmentService.start).toHaveBeenCalled();
      });
    });

    describe("POST /pharmacy/fulfillment/:id/retry", () => {
      it("retries failed fulfillment", async () => {
        mockFulfillmentService.retry.mockResolvedValue({ id: TEST_PRESCRIPTION_ID });

        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID }).post(
          `/pharmacy/fulfillment/${TEST_PRESCRIPTION_ID}/retry`,
        );

        expect(response.status).toBe(201);
        expect(mockFulfillmentService.retry).toHaveBeenCalled();
      });
    });
  });

  describe("auth enforcement", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createPharmacyTestApp({ auth: "deny" }));
    });

    afterAll(async () => {
      await app.close();
    });

    it("rejects prescription list without authorization", async () => {
      const response = await publicRequest(app, TEST_TENANT_ID).get("/pharmacy/prescriptions");
      expect(response.status).toBe(401);
    });
  });

  describe("gateway integration", () => {
    let gatewayUp = false;
    let serviceStatus: Awaited<ReturnType<typeof probeServicePath>> = "down";

    beforeAll(async () => {
      const ctx = await bootstrapGatewayServiceE2e();
      gatewayUp = ctx.gatewayUp;
      serviceStatus = await probeServicePath("/pharmacy/health", ctx.tenantA);
    });

    it("proxies health when pharmacy-service is available", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) {
        console.warn(`Skipping pharmacy gateway health test: ${skip}`);
        return;
      }

      const response = await gatewayJson("/pharmacy/health");
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ status: "ok", service: "pharmacy-service" });
    });
  });
});
