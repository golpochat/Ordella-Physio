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
  createSearchIndexTestApp,
  mockFederatedSearchService,
  resetSearchIndexMocks,
  TEST_TENANT_ID,
} from "./helpers/create-search-index-test-app";

describe("Search Index Service", () => {
  describe("in-process API", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createSearchIndexTestApp());
    });

    afterAll(async () => {
      await app.close();
    });

    beforeEach(() => {
      resetSearchIndexMocks();
    });

    describe("GET /health", () => {
      it("returns service health", async () => {
        const response = await publicRequest(app, TEST_TENANT_ID).get("/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ok", service: "search-index-service" });
      });
    });

    describe("GET /search/federated", () => {
      it("runs federated search for tenant", async () => {
        mockFederatedSearchService.searchAll.mockResolvedValue({
          hits: [{ id: "patient-1", type: "patient" }],
          total: 1,
        });

        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID }).get(
          "/search/federated?q=jane",
        );

        expect(response.status).toBe(200);
        expect(response.body.hits).toHaveLength(1);
        expect(mockFederatedSearchService.searchAll).toHaveBeenCalledWith({
          tenantId: TEST_TENANT_ID,
          query: "jane",
          limit: undefined,
        });
      });

      it("supports top-hits mode", async () => {
        mockFederatedSearchService.searchTopHits.mockResolvedValue({ hits: [], total: 0 });

        const response = await authenticatedRequest(app, { tenantId: TEST_TENANT_ID }).get(
          "/search/federated?q=test&mode=top",
        );

        expect(response.status).toBe(200);
        expect(mockFederatedSearchService.searchTopHits).toHaveBeenCalled();
      });
    });
  });

  describe("auth enforcement", () => {
    let app: INestApplication;

    beforeAll(async () => {
      ({ app } = await createSearchIndexTestApp({ auth: "deny" }));
    });

    afterAll(async () => {
      await app.close();
    });

    it("rejects search without authorization", async () => {
      const response = await publicRequest(app, TEST_TENANT_ID).get("/search/federated?q=test");
      expect(response.status).toBe(401);
    });
  });

  describe("gateway integration", () => {
    let gatewayUp = false;
    let serviceStatus: Awaited<ReturnType<typeof probeServicePath>> = "down";

    beforeAll(async () => {
      const ctx = await bootstrapGatewayServiceE2e();
      gatewayUp = ctx.gatewayUp;
      serviceStatus = await probeServicePath("/search-index/health", ctx.tenantA);
    });

    it("proxies health when search-index is available", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) {
        console.warn(`Skipping search-index gateway health test: ${skip}`);
        return;
      }

      const { status, body } = await gatewayJson("/search-index/health");
      expect(status).toBe(200);
      expect(body).toMatchObject({ status: "ok", service: "search-index-service" });
    });

    it("rejects search without authorization", async () => {
      const skip = skipUnlessGateway(gatewayUp, serviceStatus);
      if (skip) return;

      const { status } = await gatewayJson("/search-index/search/federated?q=test");
      expect(status).toBe(401);
    });
  });
});
