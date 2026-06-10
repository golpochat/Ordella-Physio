import type { NotificationType, ReminderChannel } from "../enums";

export interface CreateNotificationDto {
  recipientId: string;
  type: NotificationType;
  subject?: string;
  body: string;
}

export interface CreateReminderDto {
  patientId: string;
  appointmentId?: string;
  channel: ReminderChannel;
  scheduledAt: string;
  message?: string;
}

export interface CancelReminderDto {
  reminderId: string;
  reason?: string;
}
