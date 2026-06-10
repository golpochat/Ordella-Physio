import type { MessagingParticipantOption } from "@/lib/messaging-types";

const STAFF_ROLES = new Set(["OWNER", "ADMIN", "THERAPIST", "STAFF", "SYSTEM"]);

const ROLE_FILTERS: Record<string, Set<string>> = {
  PATIENT: new Set(["ADMIN", "STAFF", "THERAPIST", "OWNER"]),
  THERAPIST: new Set(["ADMIN", "STAFF", "PATIENT", "OWNER"]),
  STAFF: new Set(["ADMIN", "THERAPIST", "PATIENT", "OWNER"]),
  ADMIN: new Set(["OWNER", "ADMIN", "THERAPIST", "STAFF", "PATIENT"]),
  OWNER: new Set(["OWNER", "ADMIN", "THERAPIST", "STAFF", "PATIENT"]),
  SYSTEM: new Set(["OWNER", "ADMIN", "THERAPIST", "STAFF", "PATIENT"]),
  USER: new Set(["ADMIN", "STAFF", "THERAPIST"]),
  PHARMACY: new Set(["ADMIN", "STAFF", "THERAPIST"]),
};

export function filterParticipantsByRole(
  currentRole: string,
  options: MessagingParticipantOption[],
): MessagingParticipantOption[] {
  const allowed = ROLE_FILTERS[currentRole] ?? ROLE_FILTERS.STAFF;
  return options.filter((option) => allowed.has(option.role));
}

export function mapStaffToParticipants(
  staff: Array<{ userId: string; role: string; id?: string }>,
): MessagingParticipantOption[] {
  return staff.map((member) => ({
    userId: member.userId,
    role: member.role,
    label: `${member.role} · ${member.userId.slice(0, 8)}`,
  }));
}

export function mapPatientsToParticipants(
  patients: Array<{ id: string; firstName?: string | null; lastName?: string | null; email?: string | null }>,
): MessagingParticipantOption[] {
  return patients.map((patient) => {
    const name = [patient.firstName, patient.lastName].filter(Boolean).join(" ");
    return {
      userId: patient.id,
      role: "PATIENT",
      label: name || patient.email || `Patient ${patient.id.slice(0, 8)}`,
    };
  });
}

export function isStaffRole(role: string) {
  return STAFF_ROLES.has(role);
}

export function searchParticipants(options: MessagingParticipantOption[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return options;
  return options.filter(
    (option) =>
      option.label.toLowerCase().includes(normalized) ||
      option.userId.toLowerCase().includes(normalized) ||
      option.role.toLowerCase().includes(normalized),
  );
}
