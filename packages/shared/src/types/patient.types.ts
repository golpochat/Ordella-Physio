import type { Gender } from "../enums";

export interface Patient {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: Gender;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  tenantId: string;
  allergies?: string[];
  medications?: string[];
  conditions?: string[];
  notes?: string;
  updatedAt: string;
}
