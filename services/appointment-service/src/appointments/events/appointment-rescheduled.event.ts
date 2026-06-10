export type AppointmentRescheduledEvent = {
  tenantId: string;
  appointmentId: string;
  previousStartTime: string;
  previousEndTime: string;
  startTime: string;
  endTime: string;
  rescheduledAt: string;
};
