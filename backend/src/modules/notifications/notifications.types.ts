export const NOTIFICATION_TEMPLATES = {
  APPOINTMENT_CONFIRMATION: "APPOINTMENT_CONFIRMATION",
  APPOINTMENT_CANCELLATION: "APPOINTMENT_CANCELLATION",
  INVOICE_ISSUED: "INVOICE_ISSUED",
  PATIENT_STATEMENT: "PATIENT_STATEMENT",
} as const;

export type NotificationTemplate =
  (typeof NOTIFICATION_TEMPLATES)[keyof typeof NOTIFICATION_TEMPLATES];

export type NotificationTrigger = "manual" | "system";

export type RenderedNotification = {
  subject: string;
  text: string;
  html: string;
};

export type DispatchNotificationInput = {
  template: NotificationTemplate;
  appointmentId?: string;
  invoiceId?: string;
  patientId?: string;
  message?: string;
  includeClinicalSummary?: boolean;
  from?: Date;
  to?: Date;
  triggeredByUserId?: string;
  trigger?: NotificationTrigger;
};

export type DispatchNotificationResult = {
  template: NotificationTemplate;
  recipientEmail: string;
  messageId: string;
  notificationId?: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
};
