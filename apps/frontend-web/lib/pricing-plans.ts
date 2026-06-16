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

export const PRICING_COMPARISON_ROWS = [
  { feature: "Therapists", starter: "Up to 2", pro: "Up to 10", enterprise: "Unlimited" },
  { feature: "Locations", starter: "1", pro: "Up to 3", enterprise: "Unlimited" },
  { feature: "Appointments", starter: true, pro: true, enterprise: true },
  { feature: "Notes", starter: "Basic", pro: "Advanced", enterprise: "Advanced" },
  { feature: "Billing", starter: "Basic", pro: true, enterprise: true },
  { feature: "Analytics", starter: false, pro: true, enterprise: true },
  { feature: "Permissions", starter: "Standard", pro: "Advanced", enterprise: "Custom" },
  { feature: "Support", starter: "Email", pro: "Priority", enterprise: "Dedicated" },
] as const;

export function getYearlySavingsPercent(planId: PlanId): number | null {
  const plan = PRICING_PLANS[planId];
  if (plan.monthlyPrice === null || plan.yearlyPrice === null || plan.monthlyPrice === 0) {
    return null;
  }

  return Math.round(((plan.monthlyPrice - plan.yearlyPrice) / plan.monthlyPrice) * 100);
}

export function getMaxYearlySavingsPercent(): number {
  return Math.max(getYearlySavingsPercent("starter") ?? 0, getYearlySavingsPercent("pro") ?? 0);
}

export function getPlanDisplayPrice(planId: PlanId, billingCycle: BillingCycle): number | null {
  const plan = PRICING_PLANS[planId];
  if (plan.monthlyPrice === null) {
    return null;
  }

  return billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
}

export function getBillingPeriodAmount(planId: PlanId, billingCycle: BillingCycle): number {
  const monthlyEquivalent = getPlanDisplayPrice(planId, billingCycle);
  if (monthlyEquivalent === null) {
    throw new Error("Custom pricing plan");
  }

  return billingCycle === "yearly" ? monthlyEquivalent * 12 : monthlyEquivalent;
}

export const VAT_COUNTRIES: Array<{ code: string; label: string; rate: number }> = [
  { code: "IE", label: "Ireland", rate: 23 },
  { code: "GB", label: "United Kingdom", rate: 20 },
  { code: "DE", label: "Germany", rate: 19 },
  { code: "FR", label: "France", rate: 20 },
  { code: "ES", label: "Spain", rate: 21 },
  { code: "IT", label: "Italy", rate: 22 },
  { code: "NL", label: "Netherlands", rate: 21 },
  { code: "BE", label: "Belgium", rate: 21 },
  { code: "AT", label: "Austria", rate: 20 },
  { code: "PT", label: "Portugal", rate: 23 },
  { code: "PL", label: "Poland", rate: 23 },
  { code: "SE", label: "Sweden", rate: 25 },
  { code: "DK", label: "Denmark", rate: 25 },
  { code: "FI", label: "Finland", rate: 24 },
  { code: "CZ", label: "Czech Republic", rate: 21 },
  { code: "RO", label: "Romania", rate: 19 },
  { code: "HU", label: "Hungary", rate: 27 },
  { code: "GR", label: "Greece", rate: 24 },
  { code: "OTHER_EU", label: "Other EU country", rate: 21 },
];

export function getVatRateForCountry(countryCode: string): number {
  const normalized = countryCode.toUpperCase();
  return VAT_COUNTRIES.find((entry) => entry.code === normalized)?.rate ?? 21;
}

export type CheckoutSummary = {
  monthlyEquivalent: number;
  baseAmount: number;
  basePriceLabel: string;
  vatRate: number;
  vatAmount: number;
  totalAmount: number;
  renewalLabel: string;
};

export function computeCheckoutSummary(
  planId: "starter" | "pro",
  billingCycle: BillingCycle,
  billingCountry: string,
): CheckoutSummary {
  const monthlyEquivalent = getPlanDisplayPrice(planId, billingCycle);
  if (monthlyEquivalent === null) {
    throw new Error("Custom pricing plan");
  }

  const baseAmount = getBillingPeriodAmount(planId, billingCycle);
  const vatRate = getVatRateForCountry(billingCountry);
  const vatAmount = Math.round(baseAmount * (vatRate / 100) * 100) / 100;
  const totalAmount = Math.round((baseAmount + vatAmount) * 100) / 100;

  const basePriceLabel =
    billingCycle === "yearly"
      ? `${formatEuro(monthlyEquivalent)} / month (billed yearly)`
      : `${formatEuro(monthlyEquivalent)} / month`;

  return {
    monthlyEquivalent,
    baseAmount,
    basePriceLabel,
    vatRate,
    vatAmount,
    totalAmount,
    renewalLabel: billingCycle === "yearly" ? "Renews yearly" : "Renews monthly",
  };
}

export function formatBillingCycleLabel(cycle: BillingCycle): string {
  return cycle === "yearly" ? "Yearly" : "Monthly";
}

export type OnboardingIntent = "trial" | "checkout";

export function buildCheckoutHref(
  plan: PlanId,
  billingCycle: BillingCycle,
  intent: OnboardingIntent = "checkout",
): string {
  const params = new URLSearchParams({
    plan,
    cycle: billingCycle,
    intent,
  });
  return `/checkout?${params.toString()}`;
}

export function buildRegisterHref(
  plan: PlanId,
  billingCycle: BillingCycle,
  intent: OnboardingIntent,
): string {
  const params = new URLSearchParams({
    plan,
    cycle: billingCycle,
    intent,
  });
  return `/register?${params.toString()}`;
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatCheckoutBasePrice(monthlyEquivalent: number, periodAmount: number): string {
  return `${formatEuro(monthlyEquivalent)}/month — ${formatEuro(periodAmount)}`;
}
