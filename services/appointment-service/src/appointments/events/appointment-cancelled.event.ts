export type AppointmentCancelledEvent = {
  tenantId: string;
  appointmentId: string;
  patientId: string;
  therapistId: string;
  reason?: string;
  cancelledAt: string;
};
