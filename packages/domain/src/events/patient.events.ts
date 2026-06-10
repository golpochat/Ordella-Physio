import { DomainEvent } from "../core/domain-event";

export type PatientCreatedPayload = {
  patientId: string;
  tenantId: string;
  firstName: string;
  lastName: string;
};

export class PatientCreated extends DomainEvent<PatientCreatedPayload> {
  constructor(payload: PatientCreatedPayload, correlationId?: string) {
    super({
      eventName: "patient.created",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type PatientUpdatedPayload = {
  patientId: string;
  tenantId: string;
  changes: Record<string, unknown>;
};

export class PatientUpdated extends DomainEvent<PatientUpdatedPayload> {
  constructor(payload: PatientUpdatedPayload, correlationId?: string) {
    super({
      eventName: "patient.updated",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}
