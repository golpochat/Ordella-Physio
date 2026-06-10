export type AuthenticatedNotesUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
};

export function buildPatientLookupUrl(patientId: string): string {
  const baseUrl = process.env.PATIENT_SERVICE_URL ?? "http://localhost:3053";
  return `${baseUrl.replace(/\/$/, "")}/patients/${encodeURIComponent(patientId)}`;
}

export function buildAppointmentLookupUrl(appointmentId: string): string {
  const baseUrl = process.env.APPOINTMENT_SERVICE_URL ?? "http://localhost:3054";
  return `${baseUrl.replace(/\/$/, "")}/appointments/${encodeURIComponent(appointmentId)}`;
}

export async function validatePatientReferencePlaceholder(patientId: string): Promise<{ patientId: string; url: string }> {
  return { patientId, url: buildPatientLookupUrl(patientId) };
}

export async function validateAppointmentReferencePlaceholder(
  appointmentId: string,
): Promise<{ appointmentId: string; url: string }> {
  return { appointmentId, url: buildAppointmentLookupUrl(appointmentId) };
}

export function isSoapNoteType(type: string): boolean {
  return type === "SOAP";
}
