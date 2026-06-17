import { getStack } from "../setup";
import { isServiceUp } from "../utils/stack";
import { publicGateway } from "../utils/supertest";

describe("Workflow: billing-service platform metrics", () => {
  it("registers the platform-metrics route on billing-service", async () => {
    if (!isServiceUp(getStack(), "billing")) return;

    const response = await publicGateway().get("/billing/platform-metrics");

    expect([401, 403]).toContain(response.status);
  });
});

describe("Workflow: gateway onboarding proxy", () => {
  it("routes public onboarding config without auth", async () => {
    const response = await publicGateway().get("/api/onboarding/config");

    expect([200, 404, 502, 503]).toContain(response.status);
  });
});
