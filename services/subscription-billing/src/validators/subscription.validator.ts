import { subscriptionValidationError } from "@/utils/subscription-errors";

export type SubscribeInput = {
  planId: string;
  billingCycle: "monthly" | "yearly";
};

export function validateSubscribeBody(body: Record<string, unknown>): SubscribeInput {
  const planId = String(body.planId ?? "").trim();
  const billingCycle = String(body.billingCycle ?? "monthly").toLowerCase();

  const fields: Array<{ field: string; message: string }> = [];
  if (!planId) {
    fields.push({ field: "planId", message: "planId is required." });
  }
  if (billingCycle !== "monthly" && billingCycle !== "yearly") {
    fields.push({ field: "billingCycle", message: "billingCycle must be monthly or yearly." });
  }

  if (fields.length) {
    throw subscriptionValidationError(fields);
  }

  return { planId, billingCycle: billingCycle as "monthly" | "yearly" };
}

export function validateCancelBody(body: Record<string, unknown>) {
  return {
    immediately: body.immediately === true,
  };
}

export function validatePlanChangeBody(body: Record<string, unknown>) {
  const planId = String(body.planId ?? "").trim();
  const billingCycle = String(body.billingCycle ?? "monthly").toLowerCase();
  const fields: Array<{ field: string; message: string }> = [];

  if (!planId) {
    fields.push({ field: "planId", message: "planId is required." });
  }
  if (billingCycle !== "monthly" && billingCycle !== "yearly") {
    fields.push({ field: "billingCycle", message: "billingCycle must be monthly or yearly." });
  }

  if (fields.length) {
    throw subscriptionValidationError(fields);
  }

  return { planId, billingCycle: billingCycle as "monthly" | "yearly" };
}
