import { z } from "zod";
import { idSchema } from "../zod/base-schemas";
import { isoDateString } from "../zod/date-schemas";
import { nonNegativeNumber, percentageNumber } from "../zod/number-schemas";
import { nonEmptyString } from "../zod/string-schemas";

export const invoiceStatusSchema = z.enum(["DRAFT", "ISSUED", "PAID", "VOIDED"]);

export const discountTypeSchema = z.enum(["PERCENTAGE", "FIXED_AMOUNT"]);

export const createInvoiceItemSchema = z.object({
  description: nonEmptyString,
  quantity: z.number().int().min(1),
  unitPrice: nonNegativeNumber,
  taxRate: nonNegativeNumber,
  discountAmount: nonNegativeNumber.optional(),
});

export const updateInvoiceItemSchema = z.object({
  description: nonEmptyString.optional(),
  quantity: z.number().int().min(1).optional(),
  unitPrice: nonNegativeNumber.optional(),
});

export const updateInvoiceLineItemSchema = z.object({
  id: idSchema.optional(),
  description: nonEmptyString,
  quantity: z.number().int().min(1),
  unitPrice: nonNegativeNumber,
  taxRate: nonNegativeNumber,
  discountAmount: nonNegativeNumber.optional(),
});

export const updateInvoiceStatusSchema = z.enum(["DRAFT", "ISSUED"]);

export const createInvoiceSchema = z.object({
  patientId: idSchema,
  staffId: idSchema.optional(),
  appointmentId: idSchema.optional(),
  currency: z.string().optional(),
  dueDate: isoDateString.optional(),
  notes: z.string().optional(),
  taxRateId: idSchema.optional(),
  discountId: idSchema.optional(),
  items: z.array(createInvoiceItemSchema).min(1),
});

export const markInvoicePaidSchema = z.object({
  paymentReference: z.string().optional(),
});

export const updateInvoiceSchema = z.object({
  patientId: idSchema.optional(),
  staffId: idSchema.nullish(),
  appointmentId: idSchema.nullish(),
  currency: z.string().optional(),
  dueDate: isoDateString.optional(),
  notes: z.string().optional(),
  taxRateId: idSchema.optional(),
  discountId: idSchema.optional(),
  status: updateInvoiceStatusSchema.optional(),
  items: z.array(updateInvoiceLineItemSchema).min(1).optional(),
});

export const createTaxRateSchema = z.object({
  name: nonEmptyString,
  percentage: percentageNumber,
  taxType: z.string().optional(),
});

export const updateTaxRateSchema = z.object({
  name: nonEmptyString.optional(),
  percentage: percentageNumber.optional(),
  taxType: z.string().optional(),
});

export const createDiscountSchema = z.object({
  name: nonEmptyString,
  type: discountTypeSchema,
  value: nonNegativeNumber,
});

export const updateDiscountSchema = z.object({
  name: nonEmptyString.optional(),
  type: discountTypeSchema.optional(),
  value: nonNegativeNumber.optional(),
  isActive: z.boolean().optional(),
});

export type MarkInvoicePaidInput = z.infer<typeof markInvoicePaidSchema>;
export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>;
export type CreateInvoiceItemInput = z.infer<typeof createInvoiceItemSchema>;
export type UpdateInvoiceItemInput = z.infer<typeof updateInvoiceItemSchema>;
export type UpdateInvoiceLineItemInput = z.infer<typeof updateInvoiceLineItemSchema>;
export type CreateTaxRateInput = z.infer<typeof createTaxRateSchema>;
export type UpdateTaxRateInput = z.infer<typeof updateTaxRateSchema>;
export type CreateDiscountInput = z.infer<typeof createDiscountSchema>;
export type UpdateDiscountInput = z.infer<typeof updateDiscountSchema>;
