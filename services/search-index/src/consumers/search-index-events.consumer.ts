import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, toSubject, type EventBus } from "@ordella/event-bus";
import { EVENT_TYPES } from "@ordella/shared";
import type { SupportedIndexName } from "@/config/search.config";
import { IndexSyncService } from "@/services/index-sync.service";

@Injectable()
export class SearchIndexEventsConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(SearchIndexEventsConsumer.name);
  private eventBus: EventBus | null = null;

  constructor(private readonly indexSyncService: IndexSyncService) {}

  async onModuleInit() {
    this.eventBus = createEventBus();
    await this.eventBus.connect();

    const subscriptions: Array<{
      subject: string;
      durableName: string;
      indexName: SupportedIndexName;
      idField: string;
    }> = [
      { subject: EVENT_TYPES.PATIENT_CREATED, durableName: "search-patient-created", indexName: "patients", idField: "patientId" },
      { subject: EVENT_TYPES.PATIENT_UPDATED, durableName: "search-patient-updated", indexName: "patients", idField: "patientId" },
      { subject: EVENT_TYPES.PATIENT_DELETED, durableName: "search-patient-deleted", indexName: "patients", idField: "patientId" },
      { subject: EVENT_TYPES.APPOINTMENT_CREATED, durableName: "search-appointment-created", indexName: "appointments", idField: "appointmentId" },
      { subject: EVENT_TYPES.APPOINTMENT_UPDATED, durableName: "search-appointment-updated", indexName: "appointments", idField: "appointmentId" },
      { subject: EVENT_TYPES.APPOINTMENT_CANCELLED, durableName: "search-appointment-cancelled", indexName: "appointments", idField: "appointmentId" },
      { subject: EVENT_TYPES.INVOICE_CREATED, durableName: "search-invoice-created", indexName: "invoices", idField: "invoiceId" },
      { subject: EVENT_TYPES.INVOICE_UPDATED, durableName: "search-invoice-updated", indexName: "invoices", idField: "invoiceId" },
      { subject: EVENT_TYPES.STAFF_ADDED, durableName: "search-staff-added", indexName: "staff", idField: "staffId" },
      { subject: EVENT_TYPES.STAFF_ROLE_CHANGED, durableName: "search-staff-updated", indexName: "staff", idField: "staffId" },
    ];

    for (const subscription of subscriptions) {
      await this.eventBus.subscribe(
        toSubject(subscription.subject),
        async (event) => {
          const tenantId = event.tenantId;
          const payload = event.payload as Record<string, unknown>;
          const entityId = String(payload[subscription.idField] ?? payload.id ?? "");

          if (!tenantId || !entityId) {
            return;
          }

          if (subscription.subject === EVENT_TYPES.PATIENT_DELETED) {
            await this.indexSyncService.deleteIndexedEntity(tenantId, subscription.indexName, entityId);
            return;
          }

          await this.indexSyncService.syncIncremental(tenantId, subscription.indexName, entityId);
        },
        {
          durableName: subscription.durableName,
          queueGroup: "search-index-events",
        },
      );
    }

    this.logger.log("Search index event consumers registered");
  }

  async onModuleDestroy() {
    this.eventBus = null;
  }
}
