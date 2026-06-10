export type AuthenticatedPatientUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
};

export function mapGenderToPrisma(gender?: string): "MALE" | "FEMALE" | "OTHER" | "UNKNOWN" {
  if (gender === "MALE" || gender === "FEMALE" || gender === "OTHER") {
    return gender;
  }

  if (gender === "PREFER_NOT_TO_SAY") {
    return "OTHER";
  }

  return "UNKNOWN";
}

export function buildNotesServiceLookupUrl(patientId: string): string {
  const baseUrl = process.env.NOTES_SERVICE_URL ?? "http://localhost:3055";
  return `${baseUrl.replace(/\/$/, "")}/notes?patientId=${encodeURIComponent(patientId)}`;
}

export async function fetchPatientNotesPlaceholder(patientId: string): Promise<{ patientId: string; notesUrl: string }> {
  return {
    patientId,
    notesUrl: buildNotesServiceLookupUrl(patientId),
  };
}
