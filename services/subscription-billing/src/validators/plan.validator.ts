import type { PlanLimits } from "@/models/Plan";
import { subscriptionValidationError } from "@/utils/subscription-errors";

export type CreatePlanInput = {
  name: string;
  description?: string;
  priceMonthly: number;
  priceYearly: number;
  currency?: string;
  limits: PlanLimits;
  trialDays?: number;
  isActive?: boolean;
};

export type UpdatePlanInput = Partial<CreatePlanInput>;

export function validateCreatePlan(body: Record<string, unknown>): CreatePlanInput {
  const fields: Array<{ field: string; message: string }> = [];
  const name = String(body.name ?? "").trim();
  if (!name) {
    fields.push({ field: "name", message: "Plan name is required." });
  }

  const priceMonthly = Number(body.priceMonthly);
  const priceYearly = Number(body.priceYearly);
  if (!Number.isFinite(priceMonthly) || priceMonthly < 0) {
    fields.push({ field: "priceMonthly", message: "Monthly price must be a non-negative number." });
  }
  if (!Number.isFinite(priceYearly) || priceYearly < 0) {
    fields.push({ field: "priceYearly", message: "Yearly price must be a non-negative number." });
  }

  const limits = parseLimits(body.limits, fields);

  if (fields.length) {
    throw subscriptionValidationError(fields);
  }

  return {
    name,
    description: String(body.description ?? "").trim(),
    priceMonthly: Math.round(priceMonthly),
    priceYearly: Math.round(priceYearly),
    currency: String(body.currency ?? "EUR").trim().toUpperCase(),
    limits,
    trialDays: body.trialDays !== undefined ? Number(body.trialDays) : 0,
    isActive: body.isActive !== false,
  };
}

export function validateUpdatePlan(body: Record<string, unknown>): UpdatePlanInput {
  const fields: Array<{ field: string; message: string }> = [];
  const patch: UpdatePlanInput = {};

  if (body.name !== undefined) {
    const name = String(body.name).trim();
    if (!name) {
      fields.push({ field: "name", message: "Plan name cannot be empty." });
    } else {
      patch.name = name;
    }
  }

  if (body.description !== undefined) {
    patch.description = String(body.description).trim();
  }

  if (body.priceMonthly !== undefined) {
    const priceMonthly = Number(body.priceMonthly);
    if (!Number.isFinite(priceMonthly) || priceMonthly < 0) {
      fields.push({ field: "priceMonthly", message: "Monthly price must be a non-negative number." });
    } else {
      patch.priceMonthly = Math.round(priceMonthly);
    }
  }

  if (body.priceYearly !== undefined) {
    const priceYearly = Number(body.priceYearly);
    if (!Number.isFinite(priceYearly) || priceYearly < 0) {
      fields.push({ field: "priceYearly", message: "Yearly price must be a non-negative number." });
    } else {
      patch.priceYearly = Math.round(priceYearly);
    }
  }

  if (body.currency !== undefined) {
    patch.currency = String(body.currency).trim().toUpperCase();
  }

  if (body.limits !== undefined) {
    patch.limits = parseLimits(body.limits, fields);
  }

  if (body.trialDays !== undefined) {
    patch.trialDays = Number(body.trialDays);
  }

  if (body.isActive !== undefined) {
    patch.isActive = Boolean(body.isActive);
  }

  if (fields.length) {
    throw subscriptionValidationError(fields);
  }

  return patch;
}

function parseLimits(value: unknown, fields: Array<{ field: string; message: string }>): PlanLimits {
  if (!value || typeof value !== "object") {
    fields.push({ field: "limits", message: "Limits object is required." });
    return {
      maxStaff: 0,
      maxPatients: 0,
      maxStorageMB: 0,
      features: { billing: false, reporting: false, ai: false },
    };
  }

  const limits = value as Record<string, unknown>;
  const features =
    limits.features && typeof limits.features === "object"
      ? (limits.features as Record<string, unknown>)
      : {};

  return {
    maxStaff: Number(limits.maxStaff ?? 0),
    maxPatients: Number(limits.maxPatients ?? 0),
    maxStorageMB: Number(limits.maxStorageMB ?? 0),
    features: {
      billing: Boolean(features.billing),
      reporting: Boolean(features.reporting),
      ai: Boolean(features.ai),
    },
  };
}
