import {
  classifyBillingEntity,
  classifyStripeCustomer,
  computeChurnRatePercent,
  monthlyAmountCents,
} from "@/stripe/stripe-platform-metrics.utils";

describe("stripe-platform-metrics.utils", () => {
  describe("classifyStripeCustomer", () => {
    it("classifies tenant-level customers when tenantId metadata is present", () => {
      const result = classifyStripeCustomer({
        id: "cus_tenant",
        metadata: { tenantId: "tenant-1", organizationId: "org-1" },
      } as never);

      expect(result).toEqual({
        customerId: "cus_tenant",
        entity: "tenant",
        tenantId: "tenant-1",
        organizationId: "org-1",
      });
    });

    it("classifies organization-level customers when only organizationId metadata is present", () => {
      const result = classifyStripeCustomer({
        id: "cus_org",
        metadata: { organizationId: "org-1" },
      } as never);

      expect(result).toEqual({
        customerId: "cus_org",
        entity: "organization",
        organizationId: "org-1",
      });
    });

    it("ignores customers without platform metadata", () => {
      expect(
        classifyStripeCustomer({
          id: "cus_other",
          metadata: {},
        } as never),
      ).toBeNull();
    });
  });

  describe("classifyBillingEntity", () => {
    it("prefers subscription metadata over customer metadata", () => {
      const result = classifyBillingEntity(
        {
          metadata: { tenantId: "tenant-from-sub" },
        } as never,
        {
          customerId: "cus_tenant",
          entity: "tenant",
          tenantId: "tenant-customer",
        },
      );

      expect(result).toEqual({
        entity: "tenant",
        tenantId: "tenant-from-sub",
      });
    });

    it("falls back to customer metadata when subscription metadata is absent", () => {
      const result = classifyBillingEntity(
        {
          metadata: {},
        } as never,
        {
          customerId: "cus_tenant",
          entity: "tenant",
          tenantId: "tenant-1",
          organizationId: "org-1",
        },
      );

      expect(result).toEqual({
        entity: "tenant",
        tenantId: "tenant-1",
        organizationId: "org-1",
      });
    });
  });

  describe("monthlyAmountCents", () => {
    it("normalizes annual prices to monthly amounts", () => {
      expect(
        monthlyAmountCents(12_000, { interval: "year", interval_count: 1 } as never, 1),
      ).toBe(1_000);
    });

    it("keeps monthly prices as-is", () => {
      expect(
        monthlyAmountCents(4_900, { interval: "month", interval_count: 1 } as never, 1),
      ).toBe(4_900);
    });
  });

  describe("computeChurnRatePercent", () => {
    it("computes churn as canceled over total tracked subscriptions", () => {
      expect(
        computeChurnRatePercent({
          activeSubscriptions: 8,
          trialingSubscriptions: 1,
          pastDueSubscriptions: 1,
          canceledSubscriptions: 2,
        }),
      ).toBe(16.67);
    });
  });
});
