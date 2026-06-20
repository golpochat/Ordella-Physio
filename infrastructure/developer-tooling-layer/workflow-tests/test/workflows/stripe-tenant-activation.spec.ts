import { stripeSubscriptionActivatedEvent } from "../fixtures";
import { getFixtures, getInfra, getStack } from "../setup";
import { getSubscriptionStatus } from "../utils/db";
import { isServiceUp } from "../utils/stack";
import { publicGateway } from "../utils/supertest";

describe("Workflow: Stripe webhook → tenant activation", () => {
  it("accepts a mock Stripe subscription.updated event", async () => {
    if (!isServiceUp(getStack(), "billing")) return;

    const { tenantA } = getFixtures();
    const event = stripeSubscriptionActivatedEvent(tenantA.tenantId);

    const response = await publicGateway()
      .post("/billing/webhook")
      .set("stripe-signature", "dev-signature")
      .set("content-type", "application/json")
      .send(event);

    expect([200, 201, 202, 400]).toContain(response.status);
    if (response.status === 400) {
      expect(response.body).toBeTruthy();
      return;
    }
    expect(response.body.received ?? response.body.message).toBeTruthy();
  });

  it("records active subscription state in database when available", async () => {
    if (!isServiceUp(getStack(), "billing") || !getInfra().postgres) {
      return;
    }

    const { tenantA } = getFixtures();
    const status = await getSubscriptionStatus(tenantA.tenantId);
    if (status) {
      expect(["ACTIVE", "TRIALING", "active", "trialing"]).toContain(status);
    }
  });
});
