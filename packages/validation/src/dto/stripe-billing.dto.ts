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

export type CreateStripeCustomerInput = z.infer<typeof createStripeCustomerSchema>;
export type CreateStripeSubscriptionInput = z.infer<typeof createStripeSubscriptionSchema>;
export type UpdateStripePaymentMethodInput = z.infer<typeof updateStripePaymentMethodSchema>;
export type CancelStripeSubscriptionInput = z.infer<typeof cancelStripeSubscriptionSchema>;
export type CreateCustomerPortalInput = z.infer<typeof createCustomerPortalSchema>;
