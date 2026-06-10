import { z } from "zod";
import { idSchema, urlSchema } from "../zod/base-schemas";
import { isoDateTimeString } from "../zod/date-schemas";
import { limit, order, page, sort } from "../zod/pagination-schemas";
import { nonEmptyString } from "../zod/string-schemas";

export const noteTypeSchema = z.enum(["GENERAL", "SOAP", "EXERCISE_PLAN", "PROGRESS"]);

export const createNoteSchema = z.object({
  patientId: idSchema,
  therapistId: idSchema,
  appointmentId: idSchema.optional(),
  type: noteTypeSchema,
  content: nonEmptyString,
  attachments: z.array(urlSchema).optional(),
});

export const updateNoteSchema = z.object({
  patientId: idSchema.optional(),
  therapistId: idSchema.optional(),
  appointmentId: idSchema.optional(),
  type: noteTypeSchema.optional(),
  content: nonEmptyString.optional(),
  attachments: z.array(urlSchema).optional(),
});

export const createSoapNoteSchema = z.object({
  subjective: nonEmptyString,
  objective: nonEmptyString,
  assessment: nonEmptyString,
  plan: nonEmptyString,
});

export const updateSoapNoteSchema = z.object({
  subjective: nonEmptyString.optional(),
  objective: nonEmptyString.optional(),
  assessment: nonEmptyString.optional(),
  plan: nonEmptyString.optional(),
});

export const listNotesSchema = z.object({
  patientId: idSchema.optional(),
  therapistId: idSchema.optional(),
  appointmentId: idSchema.optional(),
  type: noteTypeSchema.optional(),
  from: isoDateTimeString.optional(),
  to: isoDateTimeString.optional(),
  page,
  limit,
  sort,
  order,
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
export type ListNotesInput = z.infer<typeof listNotesSchema>;
export type CreateSoapNoteInput = z.infer<typeof createSoapNoteSchema>;
export type UpdateSoapNoteInput = z.infer<typeof updateSoapNoteSchema>;
