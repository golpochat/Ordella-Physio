import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, toSubject, type EventBus } from "@ordella/event-bus";
import { EVENT_TYPES } from "@ordella/shared";
import { ReportingCacheService } from "@/caching/cache.service";
import { ReportingEventPublisher } from "@/events/reporting-event.publisher";
import { IngestionRepository } from "@/ingestion/ingestion.repository";
import { AppointmentEventsHandler } from "@/ingestion/handlers/appointment-events.handler";
import { BillingEventsHandler } from "@/ingestion/handlers/billing-events.handler";
import { PaymentEventsHandler } from "@/ingestion/handlers/payment-events.handler";
import { NotesEventsHandler } from "@/ingestion/handlers/notes-events.handler";
import { PatientEventsHandler } from "@/ingestion/handlers/patient-events.handler";
import type { IngestEventDto } from "@/ingestion/dto/ingest-event.dto";

const INGESTION_SUBJECTS = [
  EVENT_TYPES.APPOINTMENT_CREATED,
  EVENT_TYPES.APPOINTMENT_CANCELLED,
  EVENT_TYPES.INVOICE_CREATED,
  EVENT_TYPES.PAYMENT_SUCCEEDED,
  EVENT_TYPES.PATIENT_CREATED,
  EVENT_TYPES.NOTE_CREATED,
] as const;

@Injectable()
export class IngestionService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(IngestionService.name);
  private eventBus: EventBus | null = null;

  constructor(
    private readonly ingestionRepository: IngestionRepository,
    private readonly cacheService: ReportingCacheService,
    private readonly eventPublisher: ReportingEventPublisher,
    private readonly appointmentEventsHandler: AppointmentEventsHandler,
    private readonly billingEventsHandler: BillingEventsHandler,
    private readonly paymentEventsHandler: PaymentEventsHandler,
    private readonly notesEventsHandler: NotesEventsHandler,
    private readonly patientEventsHandler: PatientEventsHandler,
  ) {}

  async onModuleInit() {
    this.eventBus = createEventBus();
    await this.eventBus.connect();

    for (const eventType of INGESTION_SUBJECTS) {
      const subject = toSubject(eventType);
      await this.eventBus.subscribe(
        subject,
        async (event) => {
          const normalizedEventType = event.subject.replace(/^ordella\.events\./, "");
          await this.ingest(
            event.tenantId,
            normalizedEventType,
            event.payload as Record<string, unknown>,
            event.correlationId,
          );
        },
        { durableName: `reporting-${eventType.replace(/\./g, "_")}`, queueGroup: "reporting-ingestion" },
      );
    }

    this.logger.log("Reporting ingestion subscribers registered");
  }

  async onModuleDestroy() {
    this.eventBus = null;
  }

  async ingest(tenantId: string, eventType: string, payload: Record<string, unknown>, correlationId?: string) {
    const normalized = this.normalizeEvent(tenantId, eventType, payload);
    if (!normalized) {
      this.logger.warn(`Unsupported ingestion event: ${eventType}`);
      return null;
    }

    await this.ingestionRepository.create(tenantId, {
      sourceService: normalized.sourceService,
      eventType: normalized.eventType,
      entityType: normalized.entityType,
      entityId: normalized.entityId,
      payload: normalized.payload as never,
    });

    const ingestedEvent = {
      tenantId,
      sourceService: normalized.sourceService,
      eventType: normalized.eventType,
      entityType: normalized.entityType,
      entityId: normalized.entityId,
      ingestedAt: new Date().toISOString(),
    };

    await this.eventPublisher.publishDataIngested(ingestedEvent, correlationId);
    await this.cacheService.invalidateTenant(tenantId);

    return ingestedEvent;
  }

  private normalizeEvent(
    tenantId: string,
    eventType: string,
    payload: Record<string, unknown>,
  ): IngestEventDto | null {
    const handlers = [
      this.appointmentEventsHandler,
      this.billingEventsHandler,
      this.paymentEventsHandler,
      this.notesEventsHandler,
      this.patientEventsHandler,
    ];

    const handler = handlers.find((item) => item.supports(eventType));
    return handler ? handler.normalize(tenantId, eventType, payload) : null;
  }
}
