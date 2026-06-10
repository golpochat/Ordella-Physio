import { Injectable, Logger } from "@nestjs/common";
import { EVENT_TYPES } from "@ordella/shared";
import { INGESTION_SOURCES } from "@/constants";
import type { IngestEventDto } from "@/ingestion/dto/ingest-event.dto";

@Injectable()
export class NotesEventsHandler {
  private readonly logger = new Logger(NotesEventsHandler.name);

  supports(eventType: string): boolean {
    return [EVENT_TYPES.NOTE_CREATED, EVENT_TYPES.SOAPNOTE_CREATED].includes(eventType as never);
  }

  normalize(tenantId: string, eventType: string, payload: Record<string, unknown>): IngestEventDto {
    this.logger.debug(`Normalizing notes event ${eventType} for tenant ${tenantId}`);
    return {
      sourceService: INGESTION_SOURCES.NOTES,
      eventType,
      entityType: "note",
      entityId: String(payload.noteId ?? payload.soapNoteId ?? payload.id ?? ""),
      payload,
    };
  }
}
