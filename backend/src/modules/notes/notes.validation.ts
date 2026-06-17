import { z } from "zod";
import { paginationSchema } from "../../utils/pagination";

export const listNotesQuerySchema = paginationSchema;

export const createNoteSchema = z.object({
  patientId: z.string().min(1),
  type: z.enum(["GENERAL", "CLINICAL", "SOAP", "ADMIN"]).optional(),
  title: z.string().optional(),
  content: z.string().min(1),
});

export const patientNotesParamSchema = z.object({ patientId: z.string().min(1) });

export const noteIdParamSchema = z.object({ id: z.string().min(1) });

export const updateNoteSchema = z.object({
  type: z.enum(["GENERAL", "CLINICAL", "SOAP", "ADMIN"]).optional(),
  title: z.string().optional(),
  content: z.string().min(1).optional(),
});
