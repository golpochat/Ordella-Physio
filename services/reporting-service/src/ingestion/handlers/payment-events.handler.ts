import { Injectable, Logger } from "@nestjs/common";
import { EVENT_TYPES } from "@ordella/shared";
import { INGESTION_SOURCES } from "@/constants";
import type { IngestEventDto } from "@/ingestion/dto/ingest-event.dto";

@Injectable()
export class PaymentEventsHandler {
  private readonly logger = new Logger(PaymentEventsHandler.name);

  supports(eventType: string): boolean {
    return [EVENT_TYPES.PAYMENT_SUCCEEDED, EVENT_TYPES.PAYMENT_FAILED, EVENT_TYPES.PAYMENT_REFUNDED].includes(
      eventType as never,
    );
  }

  normalize(tenantId: string, eventType: string, payload: Record<string, unknown>): IngestEventDto {
    this.logger.debug(`Normalizing payment event ${eventType} for tenant ${tenantId}`);
    return {
      sourceService: INGESTION_SOURCES.PAYMENT,
      eventType,
      entityType: "payment",
      entityId: String(payload.paymentId ?? payload.id ?? ""),
      payload,
    };
  }
}
