import { z } from "zod";
import { idSchema } from "../zod/base-schemas";
import { isoDateTimeString } from "../zod/date-schemas";
import { nonEmptyString } from "../zod/string-schemas";

export const notificationChannelSchema = z.enum(["EMAIL", "SMS", "PUSH", "WEBHOOK"]);

export const notificationStatusSchema = z.enum([
  "PENDING",
  "SENDING",
  "SENT",
  "FAILED",
  "CANCELLED",
]);

export const reminderTypeSchema = z.enum(["APPOINTMENT", "PAYMENT", "FOLLOW_UP"]);

export const reminderChannelSchema = z.enum(["EMAIL", "SMS", "PUSH"]);

export const createNotificationSchema = z.object({
  channel: notificationChannelSchema,
  templateKey: nonEmptyString.optional(),
  to: nonEmptyString,
  subject: z.string().optional(),
  body: z.string().optional(),
  payload: z.record(z.unknown()).optional(),
  scheduledAt: isoDateTimeString.optional(),
});

export const sendNotificationSchema = z.object({
  notificationId: idSchema,
});

export const cancelNotificationSchema = z.object({
  reason: z.string().optional(),
});

export const createReminderSchema = z.object({
  type: reminderTypeSchema,
  channel: reminderChannelSchema,
  patientId: idSchema.optional(),
  appointmentId: idSchema.optional(),
  paymentId: idSchema.optional(),
  to: nonEmptyString,
  subject: z.string().optional(),
  message: nonEmptyString,
  sendAt: isoDateTimeString,
  recurring: z.boolean().optional(),
});

export const cancelReminderSchema = z.object({
  reason: z.string().optional(),
});

export const createTemplateSchema = z.object({
  key: nonEmptyString,
  channel: notificationChannelSchema,
  subject: z.string().optional(),
  body: nonEmptyString,
  variables: z.array(z.string()).optional(),
  isDefault: z.boolean().optional(),
});

export const updateTemplateSchema = z.object({
  subject: z.string().optional(),
  body: nonEmptyString.optional(),
  variables: z.array(z.string()).optional(),
  isDefault: z.boolean().optional(),
});

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type SendNotificationInput = z.infer<typeof sendNotificationSchema>;
export type CancelNotificationInput = z.infer<typeof cancelNotificationSchema>;
export type CreateReminderInput = z.infer<typeof createReminderSchema>;
export type CancelReminderInput = z.infer<typeof cancelReminderSchema>;
export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
export type UpdateTemplateInput = z.infer<typeof updateTemplateSchema>;
