import type { EventType } from "@ordella/shared";
import type { ZodType } from "zod";

export type EventContract<TPayload = unknown> = {
  eventName: EventType | string;
  domain: string;
  version: number;
  schemaId: string;
  payloadSchema: ZodType<TPayload>;
};

export type EventContractRegistry = Record<string, EventContract>;
