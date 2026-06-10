import type { Note, SoapNote } from "@/generated/prisma";

export type NoteResponse = {
  id: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  appointmentId: string | null;
  type: string;
  content: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
};

export type NoteDetailResponse = NoteResponse & {
  soapNote?: ReturnType<typeof toSoapNoteResponse>;
};

export function toNoteResponse(note: Note): NoteResponse {
  return {
    id: note.id,
    tenantId: note.tenantId,
    patientId: note.patientId,
    therapistId: note.therapistId,
    appointmentId: note.appointmentId,
    type: note.type,
    content: note.content,
    attachments: note.attachments,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  };
}

export function toSoapNoteResponse(soapNote: SoapNote) {
  return {
    id: soapNote.id,
    noteId: soapNote.noteId,
    tenantId: soapNote.tenantId,
    subjective: soapNote.subjective,
    objective: soapNote.objective,
    assessment: soapNote.assessment,
    plan: soapNote.plan,
    createdAt: soapNote.createdAt.toISOString(),
    updatedAt: soapNote.updatedAt.toISOString(),
  };
}

export function toNoteListResponse(notes: Note[]) {
  return notes.map(toNoteResponse);
}
