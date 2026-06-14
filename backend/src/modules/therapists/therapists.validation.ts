import { z } from "zod";
import { paginationSchema } from "../../utils/pagination";

const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use HH:mm 24-hour format");
const dayOfWeekSchema = z.enum(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]);

export const listTherapistsQuerySchema = paginationSchema.extend({
  search: z.string().trim().optional(),
  specialty: z.string().trim().optional(),
  isActive: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => (value === undefined ? undefined : value === "true")),
  sortBy: z.enum(["createdAt", "lastName", "specialty"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const createTherapistSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().trim().max(100).optional(),
  lastName: z.string().trim().max(100).optional(),
  phone: z.string().trim().optional(),
  specialty: z.string().trim().max(100).optional(),
  licenseNumber: z.string().trim().max(100).optional(),
  bio: z.string().trim().max(2000).optional(),
});

export const adminUpdateTherapistSchema = z.object({
  firstName: z.string().trim().max(100).optional(),
  lastName: z.string().trim().max(100).optional(),
  phone: z.string().trim().nullable().optional(),
  specialty: z.string().trim().max(100).nullable().optional(),
  licenseNumber: z.string().trim().max(100).nullable().optional(),
  bio: z.string().trim().max(2000).nullable().optional(),
  isActive: z.boolean().optional(),
});

export const selfUpdateTherapistSchema = z.object({
  firstName: z.string().trim().max(100).optional(),
  lastName: z.string().trim().max(100).optional(),
  phone: z.string().trim().nullable().optional(),
  specialty: z.string().trim().max(100).nullable().optional(),
  bio: z.string().trim().max(2000).nullable().optional(),
});

export const therapistIdParamSchema = z.object({
  id: z.string().min(1),
});

export const blockedSlotIdParamSchema = z.object({
  id: z.string().min(1),
  blockId: z.string().min(1),
});

export const workingHoursSchema = z.object({
  blocks: z
    .array(
      z.object({
        dayOfWeek: dayOfWeekSchema,
        startTime: timeSchema,
        endTime: timeSchema,
      }),
    )
    .default([]),
});

export const createBlockedSlotSchema = z
  .object({
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    reason: z.string().trim().max(500).optional(),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export const serviceTypesSchema = z.object({
  serviceTypes: z
    .array(
      z.object({
        name: z.string().trim().min(1).max(100),
        durationMinutes: z.coerce.number().int().min(5).max(480).optional(),
        description: z.string().trim().max(500).optional(),
        isActive: z.boolean().optional(),
      }),
    )
    .default([]),
});

export const listTherapistAppointmentsQuerySchema = paginationSchema.extend({
  status: z.enum(["SCHEDULED", "CHECKED_IN", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
  startFrom: z.coerce.date().optional(),
  startTo: z.coerce.date().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export type ListTherapistsQuery = z.infer<typeof listTherapistsQuerySchema>;
export type CreateTherapistBody = z.infer<typeof createTherapistSchema>;
export type AdminUpdateTherapistBody = z.infer<typeof adminUpdateTherapistSchema>;
export type SelfUpdateTherapistBody = z.infer<typeof selfUpdateTherapistSchema>;
export type ListTherapistAppointmentsQuery = z.infer<typeof listTherapistAppointmentsQuerySchema>;
