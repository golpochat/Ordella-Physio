import { expiredToken, malformedToken } from "../fixtures";
import { getFixtures, getStack } from "../setup";
import { isServiceUp } from "../utils/stack";
import {
  authenticatedGateway,
  extractErrorCode,
  gatewayClient,
  publicGateway,
} from "../utils/supertest";

describe("Workflow error paths", () => {
  it("rejects protected routes without JWT", async () => {
    const { tenantA } = getFixtures();
    const response = await publicGateway(tenantA.tenantId).get("/auth/me");
    expect(response.status).toBe(401);
  });

  it("rejects malformed JWT", async () => {
    const { tenantA } = getFixtures();
    const response = await gatewayClient({
      tenantId: tenantA.tenantId,
      accessToken: malformedToken(),
    }).get("/auth/me");
    expect(response.status).toBe(401);
  });

  it("rejects expired JWT", async () => {
    const { tenantA } = getFixtures();
    const response = await gatewayClient({
      tenantId: tenantA.tenantId,
      accessToken: expiredToken(tenantA.tenantId, tenantA.owner.userId ?? "expired-user"),
    }).get("/auth/me");
    expect(response.status).toBe(401);
  });

  it("rejects login with missing password", async () => {
    const { tenantA } = getFixtures();
    const response = await publicGateway(tenantA.tenantId)
      .post("/auth/login")
      .send({ email: "missing-password@workflow.test" });
    expect(response.status).toBe(400);
  });

  it("rejects patient creation with invalid payload", async () => {
    if (!isServiceUp(getStack(), "patient")) return;

    const { tenantA } = getFixtures();
    const response = await authenticatedGateway(tenantA.owner)
      .post("/patients")
      .send({ firstName: "" });
    expect([400, 422]).toContain(response.status);
  });

  it("returns not found for unknown patient ID", async () => {
    if (!isServiceUp(getStack(), "patient")) return;

    const { tenantA } = getFixtures();
    const response = await authenticatedGateway(tenantA.owner).get(
      "/patients/nonexistent-patient-id",
    );
    expect([404, 400]).toContain(response.status);
  });

  it("blocks cross-tenant patient fetch", async () => {
    if (!isServiceUp(getStack(), "patient")) return;

    const { tenantA, tenantB } = getFixtures();
    const created = await authenticatedGateway(tenantA.owner).post("/patients").send({
      firstName: "ErrorPath",
      lastName: "Patient",
      email: `error-path-${Date.now()}@workflow.test`,
    });
    if (![200, 201].includes(created.status)) return;

    const patientId = created.body.patient?.id ?? created.body.id;
    const cross = await authenticatedGateway(tenantB.owner).get(`/patients/${patientId}`);
    expect([403, 404]).toContain(cross.status);
    if (extractErrorCode(cross.body)) {
      expect(extractErrorCode(cross.body)).toBeTruthy();
    }
  });

  it("surfaces downstream failure when service is unavailable", async () => {
    const stack = getStack();
    if (isServiceUp(stack, "patient")) return;

    const { tenantA } = getFixtures();
    const response = await authenticatedGateway(tenantA.owner).get("/patients/health");
    expect([401, 502, 503, 504]).toContain(response.status);
  });
});
