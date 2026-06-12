export type PatientInsuranceRecord = {
  id: string;
  patientId: string;
  providerName: string;
  policyNumber: string;
  expiryDate: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};
