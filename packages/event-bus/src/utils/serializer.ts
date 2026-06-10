import { createEvent, type DomainEvent, type EventType } from "@ordella/shared";
import type { Event, PublishMetadata } from "../types/event";
import type { SerializedEventEnvelope } from "../types/event-metadata";
import { toSubject } from "../constants/subjects";

export function serializeEvent<TPayload>(
  subject: string,
  payload: TPayload,
  metadata: PublishMetadata = {},
): SerializedEventEnvelope<TPayload> {
  const tenantId = metadata.tenantId ?? extractTenantId(payload) ?? "system";
  const domainEvent = createEvent(
    stripSubjectPrefix(subject) as EventType,
    tenantId,
    payload,
  );

  return {
    id: domainEvent.id,
    subject,
    tenantId: domainEvent.tenantId,
    timestamp: domainEvent.timestamp,
    correlationId: metadata.correlationId,
    payload,
  };
}

export function parseEvent<TPayload = unknown>(input: string | Uint8Array): Event<TPayload> {
  const raw = typeof input === "string" ? input : new TextDecoder().decode(input);
  const envelope = JSON.parse(raw) as SerializedEventEnvelope<TPayload>;

  return {
    id: envelope.id,
    subject: envelope.subject,
    payload: envelope.payload,
    tenantId: envelope.tenantId,
    timestamp: envelope.timestamp,
    correlationId: envelope.correlationId,
  };
}

export function toDomainEvent<TPayload>(
  event: Event<TPayload>,
): DomainEvent<TPayload> {
  return createEvent(
    stripSubjectPrefix(event.subject) as EventType,
    event.tenantId,
    event.payload,
    event.timestamp,
    event.id,
  );
}

function extractTenantId(payload: unknown): string | undefined {
  if (payload && typeof payload === "object" && "tenantId" in payload) {
    const tenantId = (payload as { tenantId?: unknown }).tenantId;
    return typeof tenantId === "string" ? tenantId : undefined;
  }

  return undefined;
}

function stripSubjectPrefix(subject: string): string {
  return subject.replace(/^ordella\.events\./, "");
}

export function encodeEvent<TPayload>(
  subject: string,
  payload: TPayload,
  metadata: PublishMetadata = {},
): Uint8Array {
  const envelope = serializeEvent(subject, payload, metadata);
  return new TextEncoder().encode(JSON.stringify(envelope));
}

export { toSubject };
