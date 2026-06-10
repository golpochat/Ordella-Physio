export type NoteUpdatedEvent = {
  tenantId: string;
  noteId: string;
  changes: Record<string, unknown>;
  updatedAt: string;
};
