import { z } from "zod";
import { idSchema } from "../zod/base-schemas";
import { isoDateString } from "../zod/date-schemas";
import { nonNegativeNumber } from "../zod/number-schemas";
import { nonEmptyString } from "../zod/string-schemas";

export const paymentIntentStatusSchema = z.enum([
  "REQUIRES_PAYMENT_METHOD",
  "REQUIRES_CONFIRMATION",
  "PROCESSING",
  "SUCCEEDED",
  "FAILED",
  "CANCELLED",
]);

export const createPaymentIntentSchema = z.object({
  invoiceId: idSchema,
  patientId: idSchema,
  amount: nonNegativeNumber.optional(),
  currency: z.string().optional(),
});

export const confirmPaymentSchema = z.object({
  paymentIntentId: idSchema,
  paymentMethodId: z.string().optional(),
});

export const cancelPaymentIntentSchema = z.object({
  reason: z.string().optional(),
});

export const createRefundSchema = z.object({
  paymentIntentId: idSchema,
  amount: nonNegativeNumber.optional(),
  reason: z.string().optional(),
});

export const createPayoutSchema = z.object({
  providerId: idSchema,
  amount: nonNegativeNumber,
  currency: z.string().optional(),
  scheduledFor: isoDateString.optional(),
});

export const ledgerEntryTypeSchema = z.enum(["PAYMENT", "REFUND", "PAYOUT"]);

export const createLedgerEntrySchema = z.object({
  type: ledgerEntryTypeSchema,
  referenceId: idSchema,
  amount: nonNegativeNumber,
  currency: z.string().optional(),
  description: z.string().optional(),
});

export type CreatePaymentIntentInput = z.infer<typeof createPaymentIntentSchema>;
export type ConfirmPaymentInput = z.infer<typeof confirmPaymentSchema>;
export type CancelPaymentIntentInput = z.infer<typeof cancelPaymentIntentSchema>;
export type CreateRefundInput = z.infer<typeof createRefundSchema>;
export type CreatePayoutInput = z.infer<typeof createPayoutSchema>;
export type CreateLedgerEntryInput = z.infer<typeof createLedgerEntrySchema>;
