import { z } from "zod";

export const aiNoteBaseInputSchema = z.object({
  patientId: z.string().min(1),
  therapistId: z.string().min(1),
  appointmentId: z.string().min(1).optional(),
  rawText: z.string().max(10000).optional(),
});

export const aiGenerateNoteSchema = aiNoteBaseInputSchema;

export const aiSummarizeNoteSchema = aiNoteBaseInputSchema.omit({ rawText: true }).extend({
  rawText: z.string().max(10000).optional(),
});

export const aiTreatmentPlanSchema = aiNoteBaseInputSchema;

export const aiAcceptOutputSchema = z.object({
  outputId: z.string().min(1),
  accepted: z.boolean(),
});

export type AiGenerateNoteInput = z.infer<typeof aiGenerateNoteSchema>;
export type AiSummarizeNoteInput = z.infer<typeof aiSummarizeNoteSchema>;
export type AiTreatmentPlanInput = z.infer<typeof aiTreatmentPlanSchema>;
export type AiAcceptOutputInput = z.infer<typeof aiAcceptOutputSchema>;
