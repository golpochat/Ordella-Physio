export const REMINDER_CHANNELS = ["EMAIL", "SMS", "PUSH"] as const;
export type ReminderChannel = (typeof REMINDER_CHANNELS)[number];

export const REMINDER_STATUSES = ["SCHEDULED", "SENT", "CANCELLED", "FAILED"] as const;
export type ReminderStatus = (typeof REMINDER_STATUSES)[number];

export const MAX_REMINDER_OFFSET_MINUTES = 10080;

export type AppointmentReminderRecord = {
  id: string;
  tenantId: string;
  appointmentId: string;
  patientId: string;
  staffId: string | null;
  channel: ReminderChannel;
  offsetMinutes: number;
  status: ReminderStatus;
  lastError: string | null;
  scheduledFor: string;
  sentAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateAppointmentReminderPayload = {
  channel?: ReminderChannel;
  offsetMinutes?: number;
  staffId?: string;
};

export type UpdateAppointmentReminderPayload = {
  channel?: ReminderChannel;
  offsetMinutes?: number;
  status?: ReminderStatus;
};

export type AppointmentReminderValidationFieldError = {
  field: string;
  message: string;
};
