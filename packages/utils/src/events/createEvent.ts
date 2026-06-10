export interface BaseEvent<TPayload = unknown> {
  id: string;
  eventName: string;
  tenantId: string;
  timestamp: string;
  payload: TPayload;
}

let eventCounter = 0;

function generateEventId(): string {
  eventCounter += 1;
  return `evt_${Date.now()}_${eventCounter}`;
}

export function createEvent<TPayload>(
  eventName: string,
  payload: TPayload,
  tenantId: string,
  timestamp: string = new Date().toISOString(),
  id: string = generateEventId(),
): BaseEvent<TPayload> {
  return {
    id,
    eventName,
    tenantId,
    timestamp,
    payload,
  };
}
