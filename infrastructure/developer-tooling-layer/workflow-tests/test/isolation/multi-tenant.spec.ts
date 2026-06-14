import { crossTenantToken, expiredToken, malformedToken } from "../fixtures";
import { getFixtures, getStack } from "../setup";
import { isServiceUp } from "../utils/stack";
import {
  authenticatedGateway,
  gatewayClient,
  publicGateway,
} from "../utils/supertest";

describe("Multi-tenant isolation", () => {
  it("prevents tenant A token from reading tenant B profile when header mismatches", async () => {
    const { tenantA, tenantB } = getFixtures();
    const crossToken = crossTenantToken(tenantB.tenantId, tenantA.owner);

    const response = await gatewayClient({
      tenantId: tenantA.tenantId,
      accessToken: crossToken,
    }).get("/auth/me");

    expect([401, 403]).toContain(response.status);
  });

  it("scopes auth profile to the JWT tenant claim", async () => {
    const { tenantA } = getFixtures();
    const response = await authenticatedGateway(tenantA.owner).get("/auth/me");

    expect(response.status).toBe(200);
    expect(response.body.tenantId ?? response.body.user?.tenantId).toBe(
      tenantA.tenantId,
    );
  });

  it("rejects protected tenant routes without bearer token", async () => {
    if (!isServiceUp(getStack(), "tenant")) return;

    const { tenantA } = getFixtures();
    const response = await publicGateway(tenantA.tenantId).get("/tenants/health");
    expect(response.status).toBe(401);
  });

  it("isolates patient list per tenant when patient-service is available", async () => {
    if (!isServiceUp(getStack(), "patient")) return;

    const { tenantA, tenantB } = getFixtures();

    const tenantAList = await authenticatedGateway(tenantA.owner)
      .get("/patients")
      .query({ limit: 5 });
    const tenantBList = await authenticatedGateway(tenantB.owner)
      .get("/patients")
      .query({ limit: 5 });

    expect([200, 403]).toContain(tenantAList.status);
    expect([200, 403]).toContain(tenantBList.status);

    if (tenantAList.status === 200 && tenantBList.status === 200) {
      const aIds = (tenantAList.body.data ?? tenantAList.body.patients ?? []).map(
        (entry: { tenantId?: string }) => entry.tenantId,
      );
      const bIds = (tenantBList.body.data ?? tenantBList.body.patients ?? []).map(
        (entry: { tenantId?: string }) => entry.tenantId,
      );

      if (aIds.length > 0) {
        expect(aIds.every((id: string | undefined) => id === tenantA.tenantId)).toBe(true);
      }
      if (bIds.length > 0) {
        expect(bIds.every((id: string | undefined) => id === tenantB.tenantId)).toBe(true);
      }
    }
  });

  it("rejects cross-tenant patient access by ID", async () => {
    if (!isServiceUp(getStack(), "patient")) return;

    const { tenantA, tenantB } = getFixtures();
    const create = await authenticatedGateway(tenantA.owner).post("/patients").send({
      firstName: "Isolation",
      lastName: "Patient",
      email: `isolation-${Date.now()}@workflow.test`,
    });

    if (![200, 201].includes(create.status)) return;

    const patientId = create.body.patient?.id ?? create.body.id;
    const crossRead = await authenticatedGateway(tenantB.owner).get(`/patients/${patientId}`);
    expect([403, 404]).toContain(crossRead.status);
  });
});
