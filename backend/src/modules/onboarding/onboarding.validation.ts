import { z } from "zod";

import { strongPasswordSchema } from "../../utils/password-policy";

export const registerWorkspaceSchema = z.object({
  clinicName: z.string().trim().min(2).max(120),
  email: z.string().email().transform((value) => value.toLowerCase()),
  password: strongPasswordSchema,
  plan: z.enum(["starter", "pro", "enterprise"]).default("starter"),
  billingCycle: z.enum(["monthly", "yearly"]).default("yearly"),
  intent: z.enum(["trial", "checkout"]),
});

export const startTrialSchema = z.object({
  clinicName: z.string().trim().min(2).max(120),
  email: z.string().email().transform((value) => value.toLowerCase()),
  password: strongPasswordSchema,
  plan: z.enum(["starter", "pro", "enterprise"]).default("starter"),
  billingCycle: z.enum(["monthly", "yearly"]).default("yearly").optional(),
  firstName: z.string().trim().min(1).max(100).optional(),
  lastName: z.string().trim().min(1).max(100).optional(),
  country: z.string().trim().min(2).max(100).optional(),
  timezone: z.string().trim().min(1).max(100).optional(),
});

export const checkoutPreviewSchema = z.object({
  plan: z.enum(["starter", "pro"]),
  billingCycle: z.enum(["monthly", "yearly"]),
  billingCountry: z.string().trim().min(2).max(10),
});

export const completeCheckoutSchema = z.object({
  plan: z.enum(["starter", "pro"]),
  billingCycle: z.enum(["monthly", "yearly"]),
  billingCountry: z.string().trim().min(2).max(10),
  billingStreet: z.string().trim().min(2).max(200),
  billingCity: z.string().trim().min(2).max(100),
  billingPostal: z.string().trim().min(2).max(20),
  companyName: z.string().trim().max(200).optional(),
  cardholderName: z.string().trim().min(2).max(120),
  cardNumber: z.string().trim().min(12).max(24),
  cardExpiry: z.string().trim().min(4).max(7),
  cardCvc: z.string().trim().min(3).max(4),
});

export const updateTenantProfileSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  address: z.string().trim().max(300).optional(),
  city: z.string().trim().max(100).optional(),
  postalCode: z.string().trim().max(20).optional(),
  country: z.string().trim().max(100).optional(),
  timezone: z.string().trim().max(100).optional(),
  logoUrl: z.string().url().optional().or(z.literal("")),
  vatNumber: z.string().trim().max(50).optional(),
  profileCompletion: z.record(z.boolean()).optional(),
});

export type RegisterWorkspaceInput = z.infer<typeof registerWorkspaceSchema>;
export type StartTrialInput = z.infer<typeof startTrialSchema>;
export type CompleteCheckoutInput = z.infer<typeof completeCheckoutSchema>;
export type UpdateTenantProfileInput = z.infer<typeof updateTenantProfileSchema>;
