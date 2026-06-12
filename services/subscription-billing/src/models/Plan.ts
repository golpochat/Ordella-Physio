import type { Plan as PlanRecord } from "@/generated/prisma";

export type { PlanRecord };

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

export type PlanResponse = {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  currency: string;
  limits: PlanLimits;
  trialDays: number;
  isActive: boolean;
  stripeProductId: string | null;
  stripePriceMonthlyId: string | null;
  stripePriceYearlyId: string | null;
  createdAt: string;
  updatedAt: string;
};

export function toPlanResponse(record: PlanRecord): PlanResponse {
  return {
    id: record.id,
    name: record.name,
    description: record.description,
    priceMonthly: record.priceMonthly,
    priceYearly: record.priceYearly,
    currency: record.currency,
    limits: (record.limits ?? {}) as PlanLimits,
    trialDays: record.trialDays,
    isActive: record.isActive,
    stripeProductId: record.stripeProductId,
    stripePriceMonthlyId: record.stripePriceMonthlyId,
    stripePriceYearlyId: record.stripePriceYearlyId,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
