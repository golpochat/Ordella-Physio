import type { SubscriptionEnforceInput, SubscriptionEnforcementAction } from "@ordella/shared";
import { SubscriptionBillingHttpClient } from "@ordella/shared";

const subscriptionBillingClient = new SubscriptionBillingHttpClient({
  failOpen: process.env.NODE_ENV !== "production",
});

export async function enforceSubscriptionAction(input: SubscriptionEnforceInput): Promise<void> {
  await subscriptionBillingClient.enforce(input);
}

export async function enforceSubscriptionFeature(
  tenantId: string,
  featureKey: string,
): Promise<void> {
  await subscriptionBillingClient.enforce({
    tenantId,
    action: "FEATURE",
    featureKey,
  });
}

export type { SubscriptionEnforcementAction, SubscriptionEnforceInput };
