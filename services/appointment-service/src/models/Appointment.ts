export const APPOINTMENT_TYPES = ["IN_PERSON", "TELEMEDICINE"] as const;
export type AppointmentType = (typeof APPOINTMENT_TYPES)[number];

export const APPOINTMENT_STATUSES = [
  "SCHEDULED",
  "CANCELLED",
  "COMPLETED",
  "NO_SHOW",
] as const;
export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export type AppointmentRecord = {
  id: string;
  tenantId: string;
  patientId: string;
  staffId: string;
  locationId: string | null;
  appointmentType: AppointmentType;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateAppointmentPayload = {
  patientId?: string;
  staffId?: string;
  therapistId?: string;
  locationId?: string;
  appointmentType?: AppointmentType;
  type?: AppointmentType;
  startTime?: string;
  endTime?: string;
  notes?: string;
};

export type UpdateAppointmentPayload = {
  patientId?: string;
  staffId?: string;
  therapistId?: string;
  locationId?: string | null;
  appointmentType?: AppointmentType;
  type?: AppointmentType;
  startTime?: string;
  endTime?: string;
  notes?: string | null;
};

export type AppointmentValidationFieldError = {
  field: string;
  message: string;
};
