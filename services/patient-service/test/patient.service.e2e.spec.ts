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
  createPatientTestApp,
  mockPatientsService,
  resetPatientMocks,
  TEST_PATIENT_ID,
  TEST_TENANT_ID,
} from "./helpers/create-patient-test-app";

describe("Patient Service", () => {
  describe("in-process API", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createPatientTestApp());
    });

    afterAll(async () => {
      await app.close();
    });

    beforeEach(() => {
      resetPatientMocks();
    });

    describe("GET /patients/health", () => {
      it("returns service health", async () => {
        const response = await publicRequest(app, TEST_TENANT_ID).get("/patients/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ok", service: "patient-service" });
      });
    });

    describe("GET /patients", () => {
      it("lists patients for the tenant", async () => {
        mockPatientsService.listPatients.mockResolvedValue({
          items: [{ id: TEST_PATIENT_ID }],
          total: 1,
        });

        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID }).get(
          "/patients?limit=10",
        );

        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(1);
        expect(mockPatientsService.listPatients).toHaveBeenCalledWith(
          TEST_TENANT_ID,
          expect.objectContaining({ limit: "10" }),
        );
      });
    });

    describe("GET /patients/:id", () => {
      it("returns a patient by id", async () => {
        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID }).get(
          `/patients/${TEST_PATIENT_ID}`,
        );

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(TEST_PATIENT_ID);
      });
    });

    describe("POST /patients", () => {
      it("creates a patient", async () => {
        mockPatientsService.create.mockResolvedValue({ id: TEST_PATIENT_ID });

        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID })
          .post("/patients")
          .send({ firstName: "Jane", lastName: "Doe", email: "jane@example.com" });

        expect(response.status).toBe(201);
        expect(mockPatientsService.create).toHaveBeenCalled();
      });
    });
  });

  describe("auth enforcement", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createPatientTestApp({ auth: "deny" }));
    });

    afterAll(async () => {
      await app.close();
    });

    it("rejects patient list without authorization", async () => {
      const response = await publicRequest(app, TEST_TENANT_ID).get("/patients");
      expect(response.status).toBe(401);
    });
  });

  describe("gateway integration", () => {
    let gatewayUp = false;
    let serviceStatus: Awaited<ReturnType<typeof probeServicePath>> = "down";

    beforeAll(async () => {
      const ctx = await bootstrapGatewayServiceE2e();
      gatewayUp = ctx.gatewayUp;
      serviceStatus = await probeServicePath("/patients/health", ctx.tenantA);
    });

    it("proxies health when patient-service is available", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) {
        console.warn(`Skipping patient gateway health test: ${skip}`);
        return;
      }

      const { status, body } = await gatewayJson("/patients/health");
      expect(status).toBe(200);
      expect(body).toMatchObject({ status: "ok", service: "patient-service" });
    });

    it("rejects patient access without token", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) return;

      const { status } = await gatewayJson("/patients");
      expect(status).toBe(401);
    });

    it("rejects patient access with invalid token", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) return;

      const badToken = jwtFactory({ tenantId: TEST_TENANT_ID, secret: "invalid-secret-key" });
      const { status } = await gatewayJson("/patients", {
        auth: {
          accessToken: badToken,
          tenantId: TEST_TENANT_ID,
          userId: "user-bad",
          email: "bad@test",
          role: "OWNER",
        },
      });
      expect(status).toBe(401);
    });
  });
});
