import { Injectable, Logger } from "@nestjs/common";
import { EVENT_TYPES } from "@ordella/shared";
import { INGESTION_SOURCES } from "@/constants";
import type { IngestEventDto } from "@/ingestion/dto/ingest-event.dto";

@Injectable()
export class PatientEventsHandler {
  private readonly logger = new Logger(PatientEventsHandler.name);

  supports(eventType: string): boolean {
    return [EVENT_TYPES.PATIENT_CREATED, EVENT_TYPES.PATIENT_UPDATED].includes(eventType as never);
  }

  normalize(tenantId: string, eventType: string, payload: Record<string, unknown>): IngestEventDto {
    this.logger.debug(`Normalizing patient event ${eventType} for tenant ${tenantId}`);
    return {
      sourceService: INGESTION_SOURCES.PATIENT,
      eventType,
      entityType: "patient",
      entityId: String(payload.patientId ?? payload.id ?? ""),
      payload,
    };
  }
}
