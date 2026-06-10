export type NoteCreatedEvent = {
  tenantId: string;
  noteId: string;
  patientId: string;
  therapistId: string;
  type: string;
  createdAt: string;
};
