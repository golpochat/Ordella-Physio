import type { AppointmentReminder } from "@/generated/prisma";
import type { AppointmentReminderRecord } from "@/models/AppointmentReminder";

export function toAppointmentReminderResponse(reminder: AppointmentReminder): AppointmentReminderRecord {
  return {
    id: reminder.id,
    tenantId: reminder.tenantId,
    appointmentId: reminder.appointmentId,
    patientId: reminder.patientId,
    staffId: reminder.staffId,
    channel: reminder.channel,
    offsetMinutes: reminder.offsetMinutes,
    status: reminder.status,
    lastError: reminder.lastError,
    scheduledFor: reminder.scheduledFor.toISOString(),
    sentAt: reminder.sentAt?.toISOString() ?? null,
    createdAt: reminder.createdAt.toISOString(),
    updatedAt: reminder.updatedAt.toISOString(),
  };
}
