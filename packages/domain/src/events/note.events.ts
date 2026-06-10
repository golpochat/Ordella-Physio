import { DomainEvent } from "../core/domain-event";

export type NoteCreatedPayload = {
  noteId: string;
  tenantId: string;
  patientId: string;
  therapistId: string;
  type: string;
};

export class NoteCreated extends DomainEvent<NoteCreatedPayload> {
  constructor(payload: NoteCreatedPayload, correlationId?: string) {
    super({
      eventName: "note.created",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type NoteUpdatedPayload = {
  noteId: string;
  tenantId: string;
  changes: Record<string, unknown>;
};

export class NoteUpdated extends DomainEvent<NoteUpdatedPayload> {
  constructor(payload: NoteUpdatedPayload, correlationId?: string) {
    super({
      eventName: "note.updated",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type NoteDeletedPayload = {
  noteId: string;
  tenantId: string;
};

export class NoteDeleted extends DomainEvent<NoteDeletedPayload> {
  constructor(payload: NoteDeletedPayload, correlationId?: string) {
    super({
      eventName: "note.deleted",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type SoapNoteCreatedPayload = {
  soapNoteId: string;
  noteId: string;
  tenantId: string;
};

export class SoapNoteCreated extends DomainEvent<SoapNoteCreatedPayload> {
  constructor(payload: SoapNoteCreatedPayload, correlationId?: string) {
    super({
      eventName: "soapnote.created",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type SoapNoteUpdatedPayload = {
  soapNoteId: string;
  noteId: string;
  tenantId: string;
  changes: Record<string, unknown>;
};

export class SoapNoteUpdated extends DomainEvent<SoapNoteUpdatedPayload> {
  constructor(payload: SoapNoteUpdatedPayload, correlationId?: string) {
    super({
      eventName: "soapnote.updated",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}
