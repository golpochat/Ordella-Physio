import { Injectable, Logger } from "@nestjs/common";
import { EVENT_TYPES } from "@ordella/shared";
import { INGESTION_SOURCES } from "@/constants";
import type { IngestEventDto } from "@/ingestion/dto/ingest-event.dto";

@Injectable()
export class AppointmentEventsHandler {
  private readonly logger = new Logger(AppointmentEventsHandler.name);

  supports(eventType: string): boolean {
    return [
      EVENT_TYPES.APPOINTMENT_CREATED,
      EVENT_TYPES.APPOINTMENT_CANCELLED,
      EVENT_TYPES.APPOINTMENT_COMPLETED,
      EVENT_TYPES.APPOINTMENT_NO_SHOW,
    ].includes(eventType as never);
  }

  normalize(tenantId: string, eventType: string, payload: Record<string, unknown>): IngestEventDto {
    this.logger.debug(`Normalizing appointment event ${eventType} for tenant ${tenantId}`);
    return {
      sourceService: INGESTION_SOURCES.APPOINTMENT,
      eventType,
      entityType: "appointment",
      entityId: String(payload.appointmentId ?? payload.id ?? ""),
      payload,
    };
  }
}
