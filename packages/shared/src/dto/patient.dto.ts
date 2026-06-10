import type { Gender } from "../enums";

export interface CreatePatientDto {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: Gender;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface UpdatePatientDto extends Partial<CreatePatientDto> {
  isActive?: boolean;
}

export interface UpdateMedicalRecordDto {
  allergies?: string[];
  medications?: string[];
  conditions?: string[];
  notes?: string;
}

export interface PatientResponseDto {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: Gender;
  createdAt: string;
  updatedAt: string;
}
