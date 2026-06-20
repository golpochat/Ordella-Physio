import { z } from "zod";
import { idSchema } from "../zod/base-schemas";
import { nonEmptyString } from "../zod/string-schemas";

export const prescriptionStatusSchema = z.enum(["DRAFT", "ISSUED", "DISPENSED", "CANCELLED"]);
export const fulfillmentStatusSchema = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "FAILED"]);

export const createPrescriptionSchema = z.object({
  patientId: idSchema,
  therapistId: idSchema,
  medicationName: nonEmptyString.max(200),
  dosage: nonEmptyString.max(100),
  frequency: nonEmptyString.max(100),
  duration: nonEmptyString.max(100),
  notes: z.string().max(2000).optional(),
});

export const updatePrescriptionSchema = createPrescriptionSchema
  .omit({ patientId: true, therapistId: true })
  .partial();

export const listPrescriptionsSchema = z.object({
  patientId: idSchema.optional(),
  status: prescriptionStatusSchema.optional(),
  fulfillmentStatus: fulfillmentStatusSchema.optional(),
});

export const fulfillmentActionSchema = z.object({
  filledBy: idSchema.optional(),
  notes: z.string().max(2000).optional(),
});

export type CreatePrescriptionInput = z.infer<typeof createPrescriptionSchema>;
export type UpdatePrescriptionInput = z.infer<typeof updatePrescriptionSchema>;
export type ListPrescriptionsInput = z.infer<typeof listPrescriptionsSchema>;
export type FulfillmentActionInput = z.infer<typeof fulfillmentActionSchema>;
