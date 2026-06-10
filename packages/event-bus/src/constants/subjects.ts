export { EVENT_TYPES, type EventType, type DomainEvent } from "@ordella/shared";

import { EVENT_TYPES } from "@ordella/shared";

export const EVENT_SUBJECTS = EVENT_TYPES;

export const SUBJECT_PREFIX = "ordella.events";

export function toSubject(eventName: string): string {
  return `${SUBJECT_PREFIX}.${eventName}`;
}

export function toDeadLetterSubject(subject: string): string {
  return `${subject}.dlq`;
}

export const STREAM_NAME = "ORDELLA_EVENTS";

export const DEFAULT_QUEUE_GROUP = "ordella-workers";
