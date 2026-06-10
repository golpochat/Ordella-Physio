import type { DomainEvent, EventType } from "../events/base.event";

let eventCounter = 0;

function generateEventId(): string {
  eventCounter += 1;
  return `evt_${Date.now()}_${eventCounter}`;
}

export function createEvent<TPayload>(
  eventName: EventType,
  tenantId: string,
  payload: TPayload,
  timestamp: string = new Date().toISOString(),
  id: string = generateEventId(),
): DomainEvent<TPayload> {
  return {
    id,
    eventName,
    type: eventName,
    tenantId,
    timestamp,
    occurredAt: timestamp,
    payload,
  };
}

export function validatePayload<TPayload>(
  payload: unknown,
  requiredKeys: Array<keyof TPayload & string>,
): payload is TPayload {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const record = payload as Record<string, unknown>;
  return requiredKeys.every((key) => key in record);
}

export function isValidEnumValue<T extends Record<string, string>>(
  enumObject: T,
  value: unknown,
): value is T[keyof T] {
  return typeof value === "string" && Object.values(enumObject).includes(value);
}
