export type AppointmentSourceRecord = {
  id: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  patientName?: string;
  providerName?: string;
  startTime: string;
  endTime?: string;
  status?: string;
  type?: string;
  locationName?: string;
};

export function transformAppointmentForIndex(appointment: AppointmentSourceRecord) {
  const patientName = appointment.patientName ?? "Patient";
  const providerName = appointment.providerName ?? "Staff";
  const when = new Date(appointment.startTime);
  const date = Number.isNaN(when.getTime()) ? appointment.startTime : when.toLocaleDateString();
  const time = Number.isNaN(when.getTime()) ? "" : when.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const label = `${patientName} — ${date} ${time}`.trim();

  return {
    id: appointment.id,
    tenantId: appointment.tenantId,
    patientId: appointment.patientId,
    therapistId: appointment.therapistId,
    patientName,
    providerName,
    staffName: providerName,
    date,
    time,
    status: appointment.status ?? "",
    type: appointment.type ?? "",
    location: appointment.locationName ?? "",
    label,
    searchableText: [patientName, providerName, date, time, appointment.locationName, appointment.status]
      .filter(Boolean)
      .join(" "),
  };
}
