import { z } from "zod";
import { paginationSchema } from "../../utils/pagination";

export const listInvoicesQuerySchema = paginationSchema.extend({
  patientId: z.string().min(1).optional(),
  status: z.enum(["DRAFT", "ISSUED", "PAID", "VOIDED", "OVERDUE"]).optional(),
  source: z.enum(["MANUAL", "APPOINTMENT_AUTO"]).optional(),
  outstandingOnly: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => value === "true"),
});

export const outstandingQuerySchema = z.object({
  patientId: z.string().min(1).optional(),
});

export const patientIdParamSchema = z.object({
  patientId: z.string().min(1),
});

export const createInvoiceSchema = z.object({
  patientId: z.string().min(1),
  appointmentId: z.string().optional(),
  description: z.string().trim().max(500).optional(),
  subtotal: z.coerce.number().positive(),
  tax: z.coerce.number().nonnegative().optional(),
  currency: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  issueImmediately: z.boolean().optional(),
});

export const updateInvoiceSchema = z.object({
  description: z.string().trim().max(500).nullable().optional(),
  subtotal: z.coerce.number().positive().optional(),
  tax: z.coerce.number().nonnegative().optional(),
  dueDate: z.coerce.date().nullable().optional(),
});

export const recordPaymentSchema = z.object({
  amount: z.coerce.number().positive(),
  method: z.enum(["CASH", "CARD", "BANK_TRANSFER", "STRIPE", "OTHER"]).optional(),
  reference: z.string().trim().max(200).optional(),
});

export const invoiceIdParamSchema = z.object({ id: z.string().min(1) });

export type ListInvoicesQuery = z.infer<typeof listInvoicesQuerySchema>;
export type CreateInvoiceBody = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceBody = z.infer<typeof updateInvoiceSchema>;
export type RecordPaymentBody = z.infer<typeof recordPaymentSchema>;
