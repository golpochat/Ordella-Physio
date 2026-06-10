import type { NoteType } from "../enums";

export interface CreateNoteDto {
  patientId: string;
  appointmentId?: string;
  type: NoteType;
  title?: string;
  content: string;
}

export interface UpdateNoteDto {
  title?: string;
  content?: string;
  type?: NoteType;
}

export interface CreateSoapNoteDto {
  patientId: string;
  appointmentId?: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface UpdateSoapNoteDto extends Partial<CreateSoapNoteDto> {}
