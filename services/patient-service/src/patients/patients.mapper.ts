import type { MedicalRecord, Patient, PatientInsurance } from "@/generated/prisma";
import type { PatientInsuranceRecord } from "@/models/PatientInsurance";
import type { PatientRecord } from "@/models/Patient";

export type PatientResponse = PatientRecord & {
  address: string | null;
};

export type PatientDetailResponse = PatientResponse & {
  medicalRecord?: ReturnType<typeof toMedicalRecordResponse>;
  insurance?: PatientInsuranceRecord | null;
};

export function toPatientInsuranceResponse(insurance: PatientInsurance): PatientInsuranceRecord {
  return {
    id: insurance.id,
    patientId: insurance.patientId,
    providerName: insurance.providerName,
    policyNumber: insurance.policyNumber,
    expiryDate: insurance.expiryDate.toISOString().slice(0, 10),
    notes: insurance.notes,
    createdAt: insurance.createdAt.toISOString(),
    updatedAt: insurance.updatedAt.toISOString(),
  };
}

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
    bloodGroup: patient.bloodGroup,
    addressLine1: patient.addressLine1,
    addressLine2: patient.addressLine2,
    city: patient.city,
    state: patient.state,
    postalCode: patient.postalCode,
    country: patient.country,
    emergencyContactName: patient.emergencyContactName,
    emergencyContactPhone: patient.emergencyContactPhone,
    status: patient.status,
    notes: patient.notes,
    address: patient.address,
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
