export interface EventMetadata {
  stream?: string;
  sequence?: number;
  redeliveryCount?: number;
  correlationId?: string;
  ack: () => void;
  nak: (delayMs?: number) => void;
  term: () => void;
}

export type SerializedEventEnvelope<TPayload = unknown> = {
  id: string;
  subject: string;
  tenantId: string;
  timestamp: string;
  correlationId?: string;
  payload: TPayload;
};
