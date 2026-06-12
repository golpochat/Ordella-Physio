export const PATIENT_GENDERS = ["MALE", "FEMALE", "OTHER"] as const;
export type PatientGender = (typeof PATIENT_GENDERS)[number];

export const PATIENT_STATUSES = ["ACTIVE", "INACTIVE"] as const;
export type PatientStatus = (typeof PATIENT_STATUSES)[number];

export type CreatePatientInsurancePayload = {
  providerName: string;
  policyNumber: string;
  expiryDate: string;
  notes?: string;
};

export type UpdatePatientPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: PatientGender;
  bloodGroup?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  insurance?: CreatePatientInsurancePayload;
};

export type CreatePatientPayload = {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  dateOfBirth: string;
  gender: PatientGender;
  bloodGroup?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  insurance?: CreatePatientInsurancePayload;
};

export type PatientValidationFieldError = {
  field: string;
  message: string;
};

export const LIST_PATIENT_SORT_FIELDS = [
  "createdAt",
  "firstName",
  "lastName",
  "email",
  "phone",
  "gender",
  "status",
  "dateOfBirth",
  "updatedAt",
] as const;

export type ListPatientSortField = (typeof LIST_PATIENT_SORT_FIELDS)[number];

export type PatientListItem = PatientRecord;

export type PatientRecord = {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  gender: string;
  bloodGroup: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  status: PatientStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};
