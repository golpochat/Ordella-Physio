export type PlanId = "starter" | "pro" | "enterprise";
export type BillingCycle = "monthly" | "yearly";

export type PlanDefinition = {
  id: PlanId;
  name: string;
  description: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  features: string[];
  highlighted?: boolean;
};

export const PRICING_PLANS: Record<PlanId, PlanDefinition> = {
  starter: {
    id: "starter",
    name: "Starter",
    description: "For small clinics getting started with digital practice management.",
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      "Up to 2 therapists",
      "Appointment scheduling",
      "Patient records & intake",
      "Clinical notes (basic)",
      "Basic billing & invoicing",
      "Email support",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    description: "For growing clinics that need advanced workflows and reporting.",
    monthlyPrice: 99,
    yearlyPrice: 79,
    highlighted: true,
    features: [
      "Up to 10 therapists",
      "Advanced appointment workflows",
      "Clinical notes & templates",
      "Invoicing & payment tracking",
      "Multi-location support",
      "Analytics dashboard",
      "Priority support",
    ],
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom pricing for large organizations with advanced compliance needs.",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      "Unlimited therapists",
      "Unlimited locations",
      "Custom integrations & API access",
      "Advanced permissions & audit logs",
      "Dedicated account manager",
      "SLA & uptime guarantees",
      "Priority phone support",
    ],
  },
};

export function getYearlySavingsPercent(planId: PlanId): number | null {
  const plan = PRICING_PLANS[planId];
  if (plan.monthlyPrice === null || plan.yearlyPrice === null || plan.monthlyPrice === 0) {
    return null;
  }

  return Math.round(((plan.monthlyPrice - plan.yearlyPrice) / plan.monthlyPrice) * 100);
}

export function getMaxYearlySavingsPercent(): number {
  const starter = getYearlySavingsPercent("starter") ?? 0;
  const pro = getYearlySavingsPercent("pro") ?? 0;
  return Math.max(starter, pro);
}

export function getPlanBasePrice(planId: PlanId, billingCycle: BillingCycle): number {
  const plan = PRICING_PLANS[planId];
  if (plan.monthlyPrice === null) {
    throw new Error("Enterprise plan requires custom pricing");
  }

  return billingCycle === "yearly" ? plan.yearlyPrice ?? plan.monthlyPrice : plan.monthlyPrice;
}

export function getBillingPeriodAmount(planId: PlanId, billingCycle: BillingCycle): number {
  const monthlyEquivalent = getPlanBasePrice(planId, billingCycle);
  return billingCycle === "yearly" ? monthlyEquivalent * 12 : monthlyEquivalent;
}

export function isPaidPlan(planId: PlanId): boolean {
  return PRICING_PLANS[planId].monthlyPrice !== null;
}
