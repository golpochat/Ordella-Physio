import { classifyStripeCustomer } from "@/stripe/stripe-platform-metrics.utils";

describe("ai-notes metering classification", () => {
  it("maps tenant customers by tenantId metadata", () => {
    expect(
      classifyStripeCustomer({
        id: "cus_1",
        metadata: { tenantId: "tenant-a", organizationId: "org-a" },
      } as never),
    ).toMatchObject({ entity: "tenant", tenantId: "tenant-a" });
  });

  it("maps organization customers by organizationId metadata only", () => {
    expect(
      classifyStripeCustomer({
        id: "cus_2",
        metadata: { organizationId: "org-b" },
      } as never),
    ).toMatchObject({ entity: "organization", organizationId: "org-b" });
  });
});
