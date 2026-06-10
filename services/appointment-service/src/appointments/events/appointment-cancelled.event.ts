export type AppointmentCancelledEvent = {
  tenantId: string;
  appointmentId: string;
  reason?: string;
  cancelledAt: string;
};
