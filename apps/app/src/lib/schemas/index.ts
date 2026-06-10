import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.string(),
  tenantId: z.string(),
});

export const authResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
});

export const paginatedMetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export const patientSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  status: z.string().optional(),
});

export const appointmentSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  patientId: z.string(),
  therapistId: z.string(),
  locationId: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.string(),
});

export const invoiceSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  patientId: z.string(),
  invoiceNumber: z.string(),
  status: z.string(),
  total: z.string(),
  currency: z.string(),
});

export const notificationSchema = z.object({
  id: z.string(),
  type: z.string(),
  to: z.string(),
  status: z.string(),
  message: z.string(),
});

export const metricsSchema = z.object({
  totalAppointments: z.number(),
  completedAppointments: z.number(),
  newPatients: z.number(),
  revenue: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type Patient = z.infer<typeof patientSchema>;
export type Appointment = z.infer<typeof appointmentSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
export type Notification = z.infer<typeof notificationSchema>;
export type MetricsSummary = z.infer<typeof metricsSchema>;
