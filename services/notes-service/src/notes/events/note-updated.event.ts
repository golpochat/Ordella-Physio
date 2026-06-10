export type NoteUpdatedEvent = {
  tenantId: string;
  noteId: string;
  patientId: string;
  therapistId: string;
  changes: Record<string, unknown>;
  updatedAt: string;
};
