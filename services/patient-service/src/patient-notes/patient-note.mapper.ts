import type { PatientNote } from "@/generated/prisma";
import type { PatientNoteAttachment, PatientNoteRecord } from "@/models/PatientNote";

function parseAttachments(value: unknown): PatientNoteAttachment[] | null {
  if (!value || !Array.isArray(value)) {
    return null;
  }

  return value
    .filter((entry): entry is Record<string, unknown> => typeof entry === "object" && entry !== null)
    .map((entry) => ({
      name: String(entry.name ?? ""),
      url: typeof entry.url === "string" ? entry.url : undefined,
      mimeType: typeof entry.mimeType === "string" ? entry.mimeType : undefined,
    }))
    .filter((entry) => entry.name.length > 0);
}

export function toPatientNoteResponse(note: PatientNote): PatientNoteRecord {
  return {
    id: note.id,
    tenantId: note.tenantId,
    patientId: note.patientId,
    staffId: note.staffId,
    noteType: note.noteType,
    title: note.title,
    content: note.content,
    attachments: parseAttachments(note.attachments),
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  };
}

export function toPatientNoteListResponse(notes: PatientNote[]): PatientNoteRecord[] {
  return notes.map(toPatientNoteResponse);
}
