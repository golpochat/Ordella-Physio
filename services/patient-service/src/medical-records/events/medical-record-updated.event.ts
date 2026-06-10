export type MedicalRecordUpdatedEvent = {
  tenantId: string;
  patientId: string;
  medicalRecordId: string;
  changes: Record<string, unknown>;
  updatedAt: string;
};
