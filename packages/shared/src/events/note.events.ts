import type { NoteType } from "../enums";
import type { DomainEvent } from "./base.event";

export interface NoteCreatedPayload {
  noteId: string;
  tenantId: string;
  patientId: string;
  authorId: string;
  type: NoteType;
}

export interface NoteUpdatedPayload {
  noteId: string;
  tenantId: string;
  patientId: string;
}

export interface NoteDeletedPayload {
  noteId: string;
  tenantId: string;
  patientId: string;
}

export interface SoapNoteCreatedPayload {
  soapNoteId: string;
  tenantId: string;
  patientId: string;
  authorId: string;
  appointmentId?: string;
}

export interface SoapNoteUpdatedPayload {
  soapNoteId: string;
  tenantId: string;
  patientId: string;
}

export type NoteCreatedEvent = DomainEvent<NoteCreatedPayload>;
export type NoteUpdatedEvent = DomainEvent<NoteUpdatedPayload>;
export type NoteDeletedEvent = DomainEvent<NoteDeletedPayload>;
export type SoapNoteCreatedEvent = DomainEvent<SoapNoteCreatedPayload>;
export type SoapNoteUpdatedEvent = DomainEvent<SoapNoteUpdatedPayload>;
