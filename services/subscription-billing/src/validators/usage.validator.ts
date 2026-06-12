import type { UsageMetric } from "@/generated/prisma";
import { subscriptionValidationError } from "@/utils/subscription-errors";

const USAGE_METRICS: UsageMetric[] = [
  "PATIENT_COUNT",
  "APPOINTMENT_COUNT",
  "STORAGE_MB",
  "SMS_SENT",
];

const ENFORCEMENT_ACTIONS = [
  "PATIENT_CREATE",
  "APPOINTMENT_CREATE",
  "FILE_UPLOAD",
  "SMS_SEND",
  "STAFF_SEAT",
  "FEATURE",
] as const;

export type EnforcementAction = (typeof ENFORCEMENT_ACTIONS)[number];

export function validateUsageMetric(value: string): UsageMetric {
  const metric = value.trim().toUpperCase() as UsageMetric;
  if (!USAGE_METRICS.includes(metric)) {
    throw subscriptionValidationError([{ field: "metric", message: "Invalid usage metric." }]);
  }
  return metric;
}

export function validateRecordUsage(body: Record<string, unknown>) {
  const quantity = Number(body.quantity ?? 1);
  if (!Number.isFinite(quantity) || quantity < 1) {
    throw subscriptionValidationError([{ field: "quantity", message: "Quantity must be positive." }]);
  }
  return { quantity: Math.floor(quantity) };
}

export function validateEnforcementAction(value: string): EnforcementAction {
  const action = value.trim().toUpperCase() as EnforcementAction;
  if (!ENFORCEMENT_ACTIONS.includes(action)) {
    throw subscriptionValidationError([{ field: "action", message: "Invalid enforcement action." }]);
  }
  return action;
}
