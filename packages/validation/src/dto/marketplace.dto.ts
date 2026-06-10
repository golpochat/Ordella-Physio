import { z } from "zod";

export const connectIntegrationSchema = z.object({
  providerId: z.string().min(1),
  apiKey: z.string().optional(),
  apiSecret: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const disconnectIntegrationSchema = z.object({
  integrationId: z.string().min(1),
});

export const integrationHookSchema = z.object({
  integrationId: z.string().min(1).optional(),
  providerSlug: z.string().min(1).optional(),
  payload: z.record(z.unknown()).optional(),
});

export const googleCalendarSyncSchema = z.object({
  integrationId: z.string().min(1).optional(),
  appointmentId: z.string().min(1),
});

export const uploadNoteSchema = z.object({
  integrationId: z.string().min(1).optional(),
  providerSlug: z.enum(["dropbox", "google-drive", "onedrive"]),
  noteId: z.string().min(1),
  fileName: z.string().optional(),
});

export const sendSmsSchema = z.object({
  integrationId: z.string().min(1).optional(),
  to: z.string().min(1),
  message: z.string().min(1),
});

export const sendEmailSchema = z.object({
  integrationId: z.string().min(1).optional(),
  to: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
});

export const exerciseSyncSchema = z.object({
  integrationId: z.string().min(1).optional(),
  providerSlug: z.enum(["physiotec", "medbridge"]),
  patientId: z.string().min(1),
  programId: z.string().optional(),
});

export type ConnectIntegrationInput = z.infer<typeof connectIntegrationSchema>;
export type DisconnectIntegrationInput = z.infer<typeof disconnectIntegrationSchema>;
export type GoogleCalendarSyncInput = z.infer<typeof googleCalendarSyncSchema>;
export type UploadNoteInput = z.infer<typeof uploadNoteSchema>;
export type SendSmsInput = z.infer<typeof sendSmsSchema>;
export type SendEmailInput = z.infer<typeof sendEmailSchema>;
export type ExerciseSyncInput = z.infer<typeof exerciseSyncSchema>;
