export type PatientSourceRecord = {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  status?: string | null;
  tags?: string[] | null;
};

export function transformPatientForIndex(patient: PatientSourceRecord) {
  const fullName = `${patient.firstName} ${patient.lastName}`.trim();
  const tags = patient.tags ?? [];

  return {
    id: patient.id,
    tenantId: patient.tenantId,
    firstName: patient.firstName,
    lastName: patient.lastName,
    name: fullName,
    label: fullName,
    email: patient.email ?? "",
    phone: patient.phone ?? "",
    dob: patient.dateOfBirth ?? "",
    gender: patient.gender ?? "",
    status: patient.status ?? "",
    tags,
    searchableText: [fullName, patient.phone, patient.email, ...tags].filter(Boolean).join(" "),
  };
}
