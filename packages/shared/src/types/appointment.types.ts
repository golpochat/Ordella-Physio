import type { AppointmentStatus } from "../enums";

export interface Appointment {
  id: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  locationId: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Availability {
  id: string;
  tenantId: string;
  therapistId: string;
  locationId?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export interface BlockedSlot {
  id: string;
  tenantId: string;
  therapistId: string;
  locationId?: string;
  startTime: string;
  endTime: string;
  reason?: string;
  createdAt: string;
}
