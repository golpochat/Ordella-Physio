export type AppointmentUpdatedEvent = {
  tenantId: string;
  appointmentId: string;
  patientId: string;
  therapistId: string;
  changes: Record<string, unknown>;
  updatedAt: string;
};
