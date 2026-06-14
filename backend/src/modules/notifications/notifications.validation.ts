import { z } from "zod";
import { paginationSchema } from "../../utils/pagination";
import { NOTIFICATION_TEMPLATES } from "./notifications.types";

export const listNotificationsQuerySchema = paginationSchema;

export const createNotificationSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
});

export const notificationIdParamSchema = z.object({ id: z.string().min(1) });

const templateEnum = z.enum([
  NOTIFICATION_TEMPLATES.APPOINTMENT_CONFIRMATION,
  NOTIFICATION_TEMPLATES.APPOINTMENT_CANCELLATION,
  NOTIFICATION_TEMPLATES.INVOICE_ISSUED,
  NOTIFICATION_TEMPLATES.PATIENT_STATEMENT,
]);

export const sendNotificationSchema = z
  .object({
    template: templateEnum,
    appointmentId: z.string().min(1).optional(),
    invoiceId: z.string().min(1).optional(),
    patientId: z.string().min(1).optional(),
    message: z.string().trim().max(2000).optional(),
    includeClinicalSummary: z.boolean().optional(),
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
  })
  .superRefine((value, ctx) => {
    if (
      value.template === NOTIFICATION_TEMPLATES.APPOINTMENT_CONFIRMATION ||
      value.template === NOTIFICATION_TEMPLATES.APPOINTMENT_CANCELLATION
    ) {
      if (!value.appointmentId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "appointmentId is required for this template",
          path: ["appointmentId"],
        });
      }
    }

    if (value.template === NOTIFICATION_TEMPLATES.INVOICE_ISSUED && !value.invoiceId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "invoiceId is required for this template",
        path: ["invoiceId"],
      });
    }

    if (value.template === NOTIFICATION_TEMPLATES.PATIENT_STATEMENT && !value.patientId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "patientId is required for this template",
        path: ["patientId"],
      });
    }
  });

export type CreateNotificationBody = z.infer<typeof createNotificationSchema>;
export type ListNotificationsQuery = z.infer<typeof listNotificationsQuerySchema>;
export type SendNotificationBody = z.infer<typeof sendNotificationSchema>;
