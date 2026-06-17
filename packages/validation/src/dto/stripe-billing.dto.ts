import { z } from "zod";
import { idSchema } from "../zod/base-schemas";
import { nonEmptyString } from "../zod/string-schemas";

export const subscriptionPlanSchema = z.enum(["STARTER", "PROFESSIONAL", "ENTERPRISE"]);

export const createStripeCustomerSchema = z.object({
  tenantId: idSchema,
  email: z.string().email().optional(),
  name: nonEmptyString.optional(),
});

export const createStripeSubscriptionSchema = z.object({
  plan: subscriptionPlanSchema,
  paymentMethodId: z.string().optional(),
});

export const updateStripePaymentMethodSchema = z.object({
  paymentMethodId: nonEmptyString,
});

export const cancelStripeSubscriptionSchema = z.object({
  immediately: z.boolean().optional().default(false),
});

export const createCustomerPortalSchema = z.object({
  returnUrl: z.string().url().optional(),
});

export const createPlatformCheckoutSessionSchema = z.object({
  plan: z.enum(["starter", "pro", "STARTER", "PROFESSIONAL", "ENTERPRISE"]),
  billingCycle: z.enum(["monthly", "yearly"]).optional().default("monthly"),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
  email: z.string().email().optional(),
  name: nonEmptyString.optional(),
});

export const tenantLifecycleSyncSchema = z.object({
  tenantId: idSchema,
  status: z.enum(["ACTIVE", "SUSPENDED"]),
});

export const tenantAiNotesUsageSchema = z.object({
  tenantId: idSchema,
  amount: z.number().int().positive().optional().default(1),
});

export type CreateStripeCustomerInput = z.infer<typeof createStripeCustomerSchema>;
export type CreateStripeSubscriptionInput = z.infer<typeof createStripeSubscriptionSchema>;
export type UpdateStripePaymentMethodInput = z.infer<typeof updateStripePaymentMethodSchema>;
export type CancelStripeSubscriptionInput = z.infer<typeof cancelStripeSubscriptionSchema>;
export type CreateCustomerPortalInput = z.infer<typeof createCustomerPortalSchema>;
export type CreatePlatformCheckoutSessionInput = z.infer<typeof createPlatformCheckoutSessionSchema>;
export type TenantLifecycleSyncInput = z.infer<typeof tenantLifecycleSyncSchema>;
export type TenantAiNotesUsageInput = z.infer<typeof tenantAiNotesUsageSchema>;
