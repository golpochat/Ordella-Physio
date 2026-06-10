export type SoapNoteUpdatedEvent = {
  tenantId: string;
  soapNoteId: string;
  noteId: string;
  changes: Record<string, unknown>;
  updatedAt: string;
};
