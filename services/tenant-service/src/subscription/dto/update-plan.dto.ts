import type { SubscriptionPlan } from "@/generated/prisma";

export type UpdatePlanDto = {
  plan: SubscriptionPlan;
  usageLimit?: number | null;
  renewsAt?: string | null;
};
