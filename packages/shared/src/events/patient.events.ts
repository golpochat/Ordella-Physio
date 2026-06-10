import type { DomainEvent } from "./base.event";

export interface PatientCreatedPayload {
  patientId: string;
  tenantId: string;
  firstName: string;
  lastName: string;
}

export interface PatientUpdatedPayload {
  patientId: string;
  tenantId: string;
}

export interface PatientDeletedPayload {
  patientId: string;
  tenantId: string;
}

export interface MedicalRecordUpdatedPayload {
  patientId: string;
  tenantId: string;
  medicalRecordId: string;
}

export type PatientCreatedEvent = DomainEvent<PatientCreatedPayload>;
export type PatientUpdatedEvent = DomainEvent<PatientUpdatedPayload>;
export type PatientDeletedEvent = DomainEvent<PatientDeletedPayload>;
export type MedicalRecordUpdatedEvent = DomainEvent<MedicalRecordUpdatedPayload>;
