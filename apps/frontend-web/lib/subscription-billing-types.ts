export type PlanLimits = {
  maxStaff: number;
  maxPatients: number;
  maxStorageMB: number;
  features: {
    billing: boolean;
    reporting: boolean;
    ai: boolean;
  };
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  currency: string;
  limits: PlanLimits;
  trialDays: number;
  isActive: boolean;
};

export type TenantSubscription = {
  id: string;
  tenantId: string;
  planId: string;
  plan?: SubscriptionPlan;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  status: "ACTIVE" | "TRIALING" | "PAST_DUE" | "CANCELED" | "INCOMPLETE";
  trialEndsAt: string | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
};

export type SubscriptionStatusResponse = {
  tenantId: string;
  status: string;
  subscription: TenantSubscription | null;
  plan: { id: string; name: string } | null;
};

export type BillingPortalResponse = {
  url: string;
};

export type UsageMetricSummary = {
  used: number;
  limit: number;
};

export type OverageItem = {
  metric: string;
  limit: number;
  used: number;
  overageUnits: number;
  unitCostCents: number;
  totalCostCents: number;
};

export type UsageOverageSummary = {
  hasOverage: boolean;
  totalOverageCents: number;
  items: OverageItem[];
  currency: string;
};

export type UsageSummary = {
  patients: UsageMetricSummary;
  appointments: UsageMetricSummary;
  storageMB: UsageMetricSummary;
  smsSent: UsageMetricSummary;
  staff: UsageMetricSummary;
  overage: UsageOverageSummary;
  periodStart: string;
  periodEnd: string;
};

export type UsageRecord = {
  id: string;
  tenantId: string;
  metric: string;
  quantity: number;
  periodStart: string;
  periodEnd: string;
  stripeUsageRecordId: string | null;
  createdAt: string;
};

export type FeatureFlag = {
  featureKey: string;
  enabled: boolean;
};

export type SubscriptionInvoice = {
  id: string;
  tenantId: string;
  stripeInvoiceId: string;
  amountDue: number;
  amountPaid: number;
  currency: string;
  status: string;
  periodStart: string | null;
  periodEnd: string | null;
  hostedInvoiceUrl: string | null;
  invoicePdf: string | null;
  paidAt: string | null;
  createdAt: string;
};

export type RevenueBreakdownPlan = {
  planId: string;
  planName: string;
  mrrCents: number;
  tenants: number;
};

export type RevenueMetrics = {
  mrr: { cents: number; currency: string; activeSubscriptions: number };
  arr: { cents: number; currency: string };
  churnRate: { rate: number; canceledLast30Days: number; activeSubscriptions: number };
  ltv: {
    cents: number;
    currency: string;
    averageRevenuePerUserCents: number;
    estimatedLifetimeMonths: number;
  };
  breakdown: {
    byPlan: RevenueBreakdownPlan[];
    byRegion: Array<{ region: string; mrrCents: number }>;
    byTenant: Array<{ tenantId: string; mrrCents: number }>;
    paidInvoiceRevenueCents: number;
  };
};

export type MrrTrendPoint = {
  label: string;
  value: number;
};
