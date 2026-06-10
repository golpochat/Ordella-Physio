export type AppointmentUpdatedEvent = {
  tenantId: string;
  appointmentId: string;
  changes: Record<string, unknown>;
  updatedAt: string;
};
