import { TENANT_HEADER, CORRELATION_ID_HEADER } from "@ordella/middleware";
import { EVENT_TYPES } from "@ordella/shared";

export { TENANT_HEADER, CORRELATION_ID_HEADER };

export const NOTES_SERVICE_NAME = "notes-service";

export const DEFAULT_NOTES_PAGE_SIZE = 20;

export const ALLOWED_ATTACHMENT_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const MAX_ATTACHMENT_SIZE_BYTES = 10 * 1024 * 1024;

export const NOTES_EVENTS = {
  NOTE_CREATED: EVENT_TYPES.NOTE_CREATED,
  NOTE_UPDATED: EVENT_TYPES.NOTE_UPDATED,
  NOTE_DELETED: EVENT_TYPES.NOTE_DELETED,
  SOAP_NOTE_CREATED: EVENT_TYPES.SOAPNOTE_CREATED,
  SOAP_NOTE_UPDATED: EVENT_TYPES.SOAPNOTE_UPDATED,
} as const;
