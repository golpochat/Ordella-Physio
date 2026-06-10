export type PatientUpdatedEvent = {
  tenantId: string;
  patientId: string;
  changes: Record<string, unknown>;
  updatedAt: string;
};
