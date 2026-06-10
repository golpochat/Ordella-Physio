import type { AppointmentStatus } from "../enums";
import type { DomainEvent } from "./base.event";

export type { AppointmentStatus };

export interface AppointmentCreatedPayload {
  appointmentId: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  locationId: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
}

export interface AppointmentUpdatedPayload {
  appointmentId: string;
  tenantId: string;
  status: AppointmentStatus;
}

export interface AppointmentCancelledPayload {
  appointmentId: string;
  tenantId: string;
  reason?: string;
}

export interface AppointmentCompletedPayload {
  appointmentId: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  locationId: string;
  completedAt: string;
}

export interface AppointmentNoShowPayload {
  appointmentId: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  locationId: string;
  scheduledAt: string;
}

export interface AppointmentRescheduledPayload {
  appointmentId: string;
  tenantId: string;
  previousStartTime: string;
  previousEndTime: string;
  startTime: string;
  endTime: string;
}

export type AppointmentCreatedEvent = DomainEvent<AppointmentCreatedPayload>;
export type AppointmentUpdatedEvent = DomainEvent<AppointmentUpdatedPayload>;
export type AppointmentCancelledEvent = DomainEvent<AppointmentCancelledPayload>;
export type AppointmentCompletedEvent = DomainEvent<AppointmentCompletedPayload>;
export type AppointmentNoShowEvent = DomainEvent<AppointmentNoShowPayload>;
export type AppointmentRescheduledEvent = DomainEvent<AppointmentRescheduledPayload>;
