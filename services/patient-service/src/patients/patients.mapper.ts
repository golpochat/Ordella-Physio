import type { MedicalRecord, Patient } from "@/generated/prisma";

export type PatientResponse = {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  gender: string;
  address: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PatientDetailResponse = PatientResponse & {
  medicalRecord?: ReturnType<typeof toMedicalRecordResponse>;
};

export function toPatientResponse(patient: Patient): PatientResponse {
  return {
    id: patient.id,
    tenantId: patient.tenantId,
    firstName: patient.firstName,
    lastName: patient.lastName,
    email: patient.email,
    phone: patient.phone,
    dateOfBirth: patient.dateOfBirth?.toISOString().slice(0, 10) ?? null,
    gender: patient.gender,
    address: patient.address,
    emergencyContactName: patient.emergencyContactName,
    emergencyContactPhone: patient.emergencyContactPhone,
    notes: patient.notes,
    createdAt: patient.createdAt.toISOString(),
    updatedAt: patient.updatedAt.toISOString(),
  };
}

export function toMedicalRecordResponse(record: MedicalRecord) {
  return {
    id: record.id,
    patientId: record.patientId,
    tenantId: record.tenantId,
    allergies: record.allergies,
    medications: record.medications,
    conditions: record.conditions,
    notes: record.notes,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}

export function toPatientListResponse(patients: Patient[]) {
  return patients.map(toPatientResponse);
}
