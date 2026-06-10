import type { NoteType } from "../enums";

export interface Note {
  id: string;
  tenantId: string;
  patientId: string;
  authorId: string;
  appointmentId?: string;
  type: NoteType;
  title?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface SoapNote {
  id: string;
  tenantId: string;
  patientId: string;
  authorId: string;
  appointmentId?: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  createdAt: string;
  updatedAt: string;
}
