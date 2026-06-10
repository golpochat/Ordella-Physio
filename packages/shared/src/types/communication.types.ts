import type { NotificationType, ReminderChannel } from "../enums";

export interface Notification {
  id: string;
  tenantId: string;
  recipientId: string;
  type: NotificationType;
  subject?: string;
  body: string;
  sentAt?: string;
  failedAt?: string;
  errorMessage?: string;
  createdAt: string;
}

export interface Reminder {
  id: string;
  tenantId: string;
  patientId: string;
  appointmentId?: string;
  channel: ReminderChannel;
  scheduledAt: string;
  sentAt?: string;
  cancelledAt?: string;
  status: "PENDING" | "SENT" | "FAILED" | "CANCELLED";
  createdAt: string;
}
