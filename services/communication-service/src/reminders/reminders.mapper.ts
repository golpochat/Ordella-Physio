import type { Reminder } from "@/generated/prisma";

export type ReminderResponse = {
  id: string;
  tenantId: string;
  type: string;
  channel: string;
  patientId: string | null;
  appointmentId: string | null;
  paymentId: string | null;
  to: string;
  subject: string | null;
  message: string;
  sendAt: string;
  recurring: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export function toReminderResponse(reminder: Reminder): ReminderResponse {
  return {
    id: reminder.id,
    tenantId: reminder.tenantId,
    type: reminder.type,
    channel: reminder.channel,
    patientId: reminder.patientId,
    appointmentId: reminder.appointmentId,
    paymentId: reminder.paymentId,
    to: reminder.to,
    subject: reminder.subject,
    message: reminder.message,
    sendAt: reminder.sendAt.toISOString(),
    recurring: reminder.recurring,
    status: reminder.status,
    createdAt: reminder.createdAt.toISOString(),
    updatedAt: reminder.updatedAt.toISOString(),
  };
}

export function toReminderListResponse(reminders: Reminder[]) {
  return reminders.map(toReminderResponse);
}
