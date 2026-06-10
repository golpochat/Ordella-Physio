import type { EventMetadata } from "./event-metadata";

export interface Event<TPayload = unknown> {
  subject: string;
  payload: TPayload;
  tenantId: string;
  timestamp: string;
  correlationId?: string;
  id?: string;
}

export type PublishMetadata = {
  correlationId?: string;
  tenantId?: string;
  headers?: Record<string, string>;
};

export type SubscribeOptions = {
  durableName?: string;
  queueGroup?: string;
  maxDeliver?: number;
  ackWaitMs?: number;
  deadLetterSubject?: string;
};

export type MessageHandler<TPayload = unknown> = (
  event: Event<TPayload>,
  metadata: EventMetadata,
) => Promise<void> | void;

export type RequestOptions = {
  timeoutMs?: number;
  headers?: Record<string, string>;
};
