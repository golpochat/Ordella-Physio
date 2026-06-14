import { z } from "zod";
import { paginationSchema } from "../../utils/pagination";

const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{6,14}$/, "Phone must be in international format, e.g. +353899848844")
  .optional();

const demographicsSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().optional(),
  phone: phoneSchema,
  dateOfBirth: z.coerce.date().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "UNKNOWN"]).optional(),
  addressLine1: z.string().trim().max(200).optional(),
  addressLine2: z.string().trim().max(200).optional(),
  city: z.string().trim().max(100).optional(),
  state: z.string().trim().max(100).optional(),
  postalCode: z.string().trim().max(20).optional(),
  country: z.string().trim().max(100).optional(),
  emergencyContactName: z.string().trim().max(100).optional(),
  emergencyContactPhone: phoneSchema,
});

export const listPatientsQuerySchema = paginationSchema.extend({
  search: z.string().trim().optional(),
  email: z.string().trim().email().optional(),
  phone: z.string().trim().optional(),
  isActive: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => (value === undefined ? undefined : value === "true")),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "UNKNOWN"]).optional(),
  createdFrom: z.coerce.date().optional(),
  createdTo: z.coerce.date().optional(),
  sortBy: z.enum(["createdAt", "lastName", "firstName"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const createPatientSchema = demographicsSchema;

export const updatePatientSchema = demographicsSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export const patientIdParamSchema = z.object({
  id: z.string().min(1),
});

export const patientProfileQuerySchema = z.object({
  appointmentLimit: z.coerce.number().int().min(1).max(100).optional(),
  invoiceLimit: z.coerce.number().int().min(1).max(100).optional(),
  noteLimit: z.coerce.number().int().min(1).max(100).optional(),
  paymentLimit: z.coerce.number().int().min(1).max(100).optional(),
});

export type CreatePatientBody = z.infer<typeof createPatientSchema>;
export type UpdatePatientBody = z.infer<typeof updatePatientSchema>;
export type ListPatientsQuery = z.infer<typeof listPatientsQuerySchema>;
export type PatientProfileQuery = z.infer<typeof patientProfileQuerySchema>;
