import type { Appointment } from "@/generated/prisma";

export type AppointmentResponse = {
  id: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  locationId: string;
  startTime: string;
  endTime: string;
  status: string;
  type: string;
  notes: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
};

export function toAppointmentResponse(appointment: Appointment): AppointmentResponse {
  return {
    id: appointment.id,
    tenantId: appointment.tenantId,
    patientId: appointment.patientId,
    therapistId: appointment.therapistId,
    locationId: appointment.locationId,
    startTime: appointment.startTime.toISOString(),
    endTime: appointment.endTime.toISOString(),
    status: appointment.status,
    type: appointment.type,
    notes: appointment.notes,
    cancellationReason: appointment.cancellationReason,
    createdAt: appointment.createdAt.toISOString(),
    updatedAt: appointment.updatedAt.toISOString(),
  };
}

export function toAppointmentListResponse(appointments: Appointment[]) {
  return appointments.map(toAppointmentResponse);
}
