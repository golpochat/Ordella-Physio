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
  createFileStorageTestApp,
  mockFileStorageService,
  resetFileStorageMocks,
  TEST_FILE_ID,
  TEST_TENANT_ID,
} from "./helpers/create-file-storage-test-app";

describe("File Storage Service", () => {
  describe("in-process API", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createFileStorageTestApp());
    });

    afterAll(async () => {
      await app.close();
    });

    beforeEach(() => {
      resetFileStorageMocks();
    });

    describe("GET /files/health", () => {
      it("returns service health", async () => {
        const response = await publicRequest(app, TEST_TENANT_ID).get("/files/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ok", service: "file-storage-service" });
      });
    });

    describe("GET /files/access", () => {
      it("rejects access without token", async () => {
        const response = await publicRequest(app, TEST_TENANT_ID).get("/files/access");
        expect(response.status).toBe(400);
        expect(response.body.error?.message).toContain("token");
        expect(mockFileStorageService.streamFileBySignedToken).not.toHaveBeenCalled();
      });
    });

    describe("GET /files/:id", () => {
      it("returns file metadata", async () => {
        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID }).get(
          `/files/${TEST_FILE_ID}`,
        );

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(TEST_FILE_ID);
      });
    });
  });

  describe("auth enforcement", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createFileStorageTestApp({ auth: "deny" }));
    });

    afterAll(async () => {
      await app.close();
    });

    it("rejects file metadata without authorization", async () => {
      const response = await publicRequest(app, TEST_TENANT_ID).get(`/files/${TEST_FILE_ID}`);
      expect(response.status).toBe(401);
    });
  });

  describe("gateway integration", () => {
    let gatewayUp = false;
    let serviceStatus: Awaited<ReturnType<typeof probeServicePath>> = "down";

    beforeAll(async () => {
      const ctx = await bootstrapGatewayServiceE2e();
      gatewayUp = ctx.gatewayUp;
      serviceStatus = await probeServicePath("/files/health", ctx.tenantA);
    });

    it("proxies health when file-storage is available", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) {
        console.warn(`Skipping file-storage gateway health test: ${skip}`);
        return;
      }

      const { status, body } = await gatewayJson("/files/health");
      expect(status).toBe(200);
      expect(body).toMatchObject({ status: "ok", service: "file-storage-service" });
    });

    it("rejects file routes without authorization", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) return;

      const { status } = await gatewayJson("/files");
      expect(status).toBe(401);
    });
  });
});
