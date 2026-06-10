import { z } from "zod";
import { emailSchema, idSchema, phoneSchema } from "../zod/base-schemas";
import { isoDateString } from "../zod/date-schemas";
import { limit, page } from "../zod/pagination-schemas";
import { nonEmptyString } from "../zod/string-schemas";

export const genderSchema = z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"]);

export const createPatientSchema = z.object({
  firstName: nonEmptyString,
  lastName: nonEmptyString,
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  dateOfBirth: isoDateString.optional(),
  gender: genderSchema.optional(),
  address: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: phoneSchema.optional(),
  notes: z.string().optional(),
});

export const updatePatientSchema = createPatientSchema.partial();

export const updateMedicalRecordSchema = z.object({
  allergies: z.string().optional(),
  medications: z.string().optional(),
  conditions: z.string().optional(),
  notes: z.string().optional(),
});

export const searchPatientSchema = z.object({
  name: z.string().optional(),
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  dateOfBirth: isoDateString.optional(),
  tenantId: idSchema.optional(),
  page,
  limit,
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;
export type UpdateMedicalRecordInput = z.infer<typeof updateMedicalRecordSchema>;
export type SearchPatientInput = z.infer<typeof searchPatientSchema>;
