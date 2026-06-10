import { nextSequence, randomFrom } from "./random";

export type MockAppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export type MockAppointment = {
  id: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  locationId: string;
  startTime: Date;
  endTime: Date;
  type: string;
  status: MockAppointmentStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const STATUSES: MockAppointmentStatus[] = [
  "SCHEDULED",
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
];

export function mockAppointment(overrides: Partial<MockAppointment> = {}): MockAppointment {
  const index = nextSequence();
  const now = new Date("2024-01-01T00:00:00.000Z");
  const startTime = overrides.startTime ?? new Date("2024-06-01T09:00:00.000Z");
  const endTime = overrides.endTime ?? new Date("2024-06-01T10:00:00.000Z");

  return {
    id: overrides.id ?? `appointment-${index}`,
    tenantId: overrides.tenantId ?? `tenant-${index}`,
    patientId: overrides.patientId ?? `patient-${index}`,
    therapistId: overrides.therapistId ?? `user-${index}`,
    locationId: overrides.locationId ?? `location-${index}`,
    startTime,
    endTime,
    type: overrides.type ?? randomFrom(["Initial", "Follow-up", "Assessment"]),
    status: overrides.status ?? randomFrom(STATUSES),
    notes: overrides.notes ?? null,
    createdAt: overrides.createdAt ?? now,
    updatedAt: overrides.updatedAt ?? now,
    ...overrides,
  };
}
