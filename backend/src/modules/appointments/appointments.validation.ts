import { z } from "zod";
import { paginationSchema } from "../../utils/pagination";
import { APPOINTMENT_STATUSES } from "./appointments.status";

export const listAppointmentsQuerySchema = paginationSchema.extend({
  search: z.string().trim().optional(),
  patientId: z.string().min(1).optional(),
  therapistId: z.string().min(1).optional(),
  status: z.enum(APPOINTMENT_STATUSES).optional(),
  startFrom: z.coerce.date().optional(),
  startTo: z.coerce.date().optional(),
  sortBy: z.enum(["startTime", "createdAt", "status"]).default("startTime"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

const appointmentBodySchema = z.object({
  patientId: z.string().min(1),
  therapistId: z.string().min(1),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  type: z.string().trim().min(1).max(100),
  notes: z.string().trim().max(2000).optional(),
});

export const createAppointmentSchema = appointmentBodySchema.refine((data) => data.endTime > data.startTime, {
  message: "End time must be after start time",
  path: ["endTime"],
});

export const updateAppointmentSchema = appointmentBodySchema.partial().refine(
  (data) => {
    if (data.startTime && data.endTime) {
      return data.endTime > data.startTime;
    }
    return true;
  },
  {
    message: "End time must be after start time",
    path: ["endTime"],
  },
);

export const appointmentIdParamSchema = z.object({
  id: z.string().min(1),
});

export const transitionStatusSchema = z.object({
  status: z.enum(APPOINTMENT_STATUSES),
  cancellationReason: z.string().trim().max(500).optional(),
});

export const availabilityCheckQuerySchema = z
  .object({
    therapistId: z.string().min(1),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    patientId: z.string().min(1).optional(),
    excludeAppointmentId: z.string().min(1).optional(),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export const deleteAppointmentSchema = z.object({
  cancellationReason: z.string().trim().max(500).optional(),
});

export type ListAppointmentsQuery = z.infer<typeof listAppointmentsQuerySchema>;
export type CreateAppointmentBody = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentBody = z.infer<typeof updateAppointmentSchema>;
export type TransitionStatusBody = z.infer<typeof transitionStatusSchema>;
export type AvailabilityCheckQuery = z.infer<typeof availabilityCheckQuerySchema>;
