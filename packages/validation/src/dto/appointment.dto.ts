import { z } from "zod";
import { idSchema } from "../zod/base-schemas";
import { isoDateTimeString } from "../zod/date-schemas";
import { limit, page } from "../zod/pagination-schemas";
import { locationIdSchema } from "../zod/tenant-schemas";
import { nonEmptyString } from "../zod/string-schemas";

export const appointmentStatusSchema = z.enum([
  "SCHEDULED",
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
]);

export const dayOfWeekSchema = z.enum([
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]);

export const createAppointmentSchema = z.object({
  patientId: idSchema,
  therapistId: idSchema,
  locationId: locationIdSchema,
  startTime: isoDateTimeString,
  endTime: isoDateTimeString,
  type: nonEmptyString,
  notes: z.string().optional(),
});

export const updateAppointmentSchema = z.object({
  patientId: idSchema.optional(),
  therapistId: idSchema.optional(),
  locationId: locationIdSchema.optional(),
  startTime: isoDateTimeString.optional(),
  endTime: isoDateTimeString.optional(),
  status: appointmentStatusSchema.optional(),
  type: z.string().optional(),
  notes: z.string().optional(),
});

export const createAvailabilitySchema = z.object({
  therapistId: idSchema,
  dayOfWeek: dayOfWeekSchema,
  startTime: nonEmptyString,
  endTime: nonEmptyString,
});

export const updateAvailabilitySchema = z.object({
  dayOfWeek: dayOfWeekSchema.optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

export const rescheduleAppointmentSchema = z.object({
  startTime: isoDateTimeString,
  endTime: isoDateTimeString,
});

export const cancelAppointmentSchema = z.object({
  reason: z.string().optional(),
});

export const listAppointmentsSchema = z.object({
  patientId: idSchema.optional(),
  therapistId: idSchema.optional(),
  locationId: locationIdSchema.optional(),
  status: appointmentStatusSchema.optional(),
  from: isoDateTimeString.optional(),
  to: isoDateTimeString.optional(),
  page,
  limit,
});

export const createBlockedSlotSchema = z.object({
  therapistId: idSchema,
  startTime: isoDateTimeString,
  endTime: isoDateTimeString,
  reason: z.string().optional(),
});

export const updateBlockedSlotSchema = z.object({
  startTime: isoDateTimeString.optional(),
  endTime: isoDateTimeString.optional(),
  reason: z.string().optional(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
export type RescheduleAppointmentInput = z.infer<typeof rescheduleAppointmentSchema>;
export type CancelAppointmentInput = z.infer<typeof cancelAppointmentSchema>;
export type ListAppointmentsInput = z.infer<typeof listAppointmentsSchema>;
export type CreateAvailabilityInput = z.infer<typeof createAvailabilitySchema>;
export type UpdateAvailabilityInput = z.infer<typeof updateAvailabilitySchema>;
export type CreateBlockedSlotInput = z.infer<typeof createBlockedSlotSchema>;
export type UpdateBlockedSlotInput = z.infer<typeof updateBlockedSlotSchema>;
