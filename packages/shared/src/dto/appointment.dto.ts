import type { AppointmentStatus } from "../enums";

export interface CreateAppointmentDto {
  patientId: string;
  therapistId: string;
  locationId: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

export interface UpdateAppointmentDto {
  patientId?: string;
  therapistId?: string;
  locationId?: string;
  startTime?: string;
  endTime?: string;
  status?: AppointmentStatus;
  notes?: string;
}

export interface CreateAvailabilityDto {
  therapistId: string;
  locationId?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface UpdateAvailabilityDto extends Partial<CreateAvailabilityDto> {
  isActive?: boolean;
}

export interface CreateBlockedSlotDto {
  therapistId: string;
  locationId?: string;
  startTime: string;
  endTime: string;
  reason?: string;
}

export interface AppointmentResponseDto {
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

/** @deprecated Use therapistId in CreateAppointmentDto */
export interface LegacyCreateAppointmentDto {
  patientId: string;
  providerId: string;
  locationId: string;
  startTime: string;
  endTime: string;
  notes?: string;
}
