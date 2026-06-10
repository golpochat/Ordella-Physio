export type AppointmentCreatedEvent = {
  tenantId: string;
  appointmentId: string;
  patientId: string;
  therapistId: string;
  locationId: string;
  startTime: string;
  endTime: string;
  createdAt: string;
};
