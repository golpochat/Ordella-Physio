import { Injectable, Logger } from "@nestjs/common";
import { EVENT_TYPES } from "@ordella/shared";
import { INGESTION_SOURCES } from "@/constants";
import type { IngestEventDto } from "@/ingestion/dto/ingest-event.dto";

@Injectable()
export class BillingEventsHandler {
  private readonly logger = new Logger(BillingEventsHandler.name);

  supports(eventType: string): boolean {
    return [EVENT_TYPES.INVOICE_CREATED, EVENT_TYPES.INVOICE_PAID, EVENT_TYPES.INVOICE_VOIDED].includes(
      eventType as never,
    );
  }

  normalize(tenantId: string, eventType: string, payload: Record<string, unknown>): IngestEventDto {
    this.logger.debug(`Normalizing billing event ${eventType} for tenant ${tenantId}`);
    return {
      sourceService: INGESTION_SOURCES.BILLING,
      eventType,
      entityType: "invoice",
      entityId: String(payload.invoiceId ?? payload.id ?? ""),
      payload,
    };
  }
}
