import { countAuthUsers, findAuthUserByEmail } from "../utils/db";
import { getFixtures, getInfra, getStack } from "../setup";
import { requireServices } from "../utils/stack";
import {
  authenticatedGateway,
  loginOrRegister,
  publicGateway,
} from "../utils/supertest";

describe("Workflow: tenant → user → login → dashboard", () => {

  it("registers a workflow owner via api-gateway", async () => {
    const { tenantA } = getFixtures();
    const response = await publicGateway(tenantA.tenantId)
      .post("/auth/register")
      .send({
        email: `register-${Date.now()}@workflow.test`,
        password: "WorkflowTest123!",
        role: "STAFF",
      });

    expect([200, 201, 409]).toContain(response.status);
  });

  it("logs in and receives JWT tokens", async () => {
    const { tenantA } = getFixtures();
    const auth = await loginOrRegister({
      tenantId: tenantA.tenantId,
      email: tenantA.owner.email!,
      password: "WorkflowTest123!",
      role: "OWNER",
    });

    expect(auth.accessToken).toBeTruthy();
    expect(auth.tenantId).toBe(tenantA.tenantId);
  });

  it("accesses session profile through api-gateway (dashboard auth)", async () => {
    const { tenantA } = getFixtures();
    const me = await authenticatedGateway(tenantA.owner).get("/auth/me");
    expect(me.status).toBe(200);
    expect(me.body.id ?? me.body.user?.id).toBeTruthy();
    expect(me.body.tenantId ?? me.body.user?.tenantId).toBe(tenantA.tenantId);
  });

  it("persists user in auth database", async () => {
    const infra = getInfra();
    if (!infra.postgres) {
      return;
    }

    const { tenantA } = getFixtures();
    const user = await findAuthUserByEmail(tenantA.tenantId, tenantA.owner.email!);
    expect(user).not.toBeNull();
    expect(user?.isActive).toBe(true);

    const count = await countAuthUsers(tenantA.tenantId);
    expect(count).toBeGreaterThan(0);
  });

  describe("with tenant-service", () => {
    it("creates tenant record when tenant-service is available", async () => {
      const reason = requireServices(getStack(), ["tenant"]);
      if (reason) {
        return;
      }

      const { tenantA } = getFixtures();
      const response = await authenticatedGateway(tenantA.owner)
        .post("/tenants")
        .send({
          name: `Workflow Clinic ${tenantA.tenantId}`,
          code: tenantA.tenantId.replace(/[^a-z0-9-]/gi, "").slice(0, 24),
          ownerUserId: tenantA.owner.userId,
          timezone: "Europe/London",
          currency: "GBP",
        });

      expect([200, 201, 403, 409]).toContain(response.status);
    });
  });
});
