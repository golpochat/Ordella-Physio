import { nextSequence, randomFrom } from "./random";

export type MockGender = "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";

export type MockPatient = {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  dateOfBirth: Date | null;
  gender: MockGender | null;
  address: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const GENDERS: MockGender[] = ["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"];

export function mockPatient(overrides: Partial<MockPatient> = {}): MockPatient {
  const index = nextSequence();
  const now = new Date("2024-01-01T00:00:00.000Z");

  return {
    id: overrides.id ?? `patient-${index}`,
    tenantId: overrides.tenantId ?? `tenant-${index}`,
    firstName: overrides.firstName ?? `Patient${index}`,
    lastName: overrides.lastName ?? `Test${index}`,
    email: overrides.email ?? `patient${index}@example.com`,
    phone: overrides.phone ?? `+447700900${String(index).padStart(3, "0").slice(-3)}`,
    dateOfBirth: overrides.dateOfBirth ?? new Date("1990-01-01T00:00:00.000Z"),
    gender: overrides.gender ?? randomFrom(GENDERS),
    address: overrides.address ?? `${index} Patient Lane`,
    emergencyContactName: overrides.emergencyContactName ?? `Contact ${index}`,
    emergencyContactPhone: overrides.emergencyContactPhone ?? `+447700901${String(index).padStart(3, "0").slice(-3)}`,
    notes: overrides.notes ?? null,
    createdAt: overrides.createdAt ?? now,
    updatedAt: overrides.updatedAt ?? now,
    ...overrides,
  };
}
