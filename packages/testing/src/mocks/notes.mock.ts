import { nextSequence, randomFrom } from "./random";

export type MockNoteType = "GENERAL" | "SOAP" | "PROGRESS" | "DISCHARGE";

export type MockNote = {
  id: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  appointmentId: string | null;
  type: MockNoteType;
  content: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
};

const NOTE_TYPES: MockNoteType[] = ["GENERAL", "SOAP", "PROGRESS", "DISCHARGE"];

export function mockNote(overrides: Partial<MockNote> = {}): MockNote {
  const index = nextSequence();
  const now = new Date("2024-01-01T00:00:00.000Z");

  return {
    id: overrides.id ?? `note-${index}`,
    tenantId: overrides.tenantId ?? `tenant-${index}`,
    patientId: overrides.patientId ?? `patient-${index}`,
    therapistId: overrides.therapistId ?? `user-${index}`,
    appointmentId: overrides.appointmentId ?? `appointment-${index}`,
    type: overrides.type ?? randomFrom(NOTE_TYPES),
    content: overrides.content ?? `Clinical note content ${index}`,
    attachments: overrides.attachments ?? [],
    createdAt: overrides.createdAt ?? now,
    updatedAt: overrides.updatedAt ?? now,
    ...overrides,
  };
}
