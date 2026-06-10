import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, type EventBus, toSubject } from "@ordella/event-bus";
import { REPORTING_EVENTS } from "@/constants";
import type { MetricsGeneratedEvent } from "@/metrics/events/metrics-generated.event";
import type { DataIngestedEvent } from "@/ingestion/events/data-ingested.event";

@Injectable()
export class ReportingEventPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ReportingEventPublisher.name);
  private eventBus: EventBus | null = null;

  async onModuleInit() {
    this.eventBus = createEventBus();
    await this.eventBus.connect();
    this.logger.log("Reporting event publisher connected to NATS");
  }

  async onModuleDestroy() {
    this.eventBus = null;
  }

  private async publish<T>(subject: string, tenantId: string, payload: T, correlationId?: string) {
    if (!this.eventBus) {
      this.logger.warn(`Event bus unavailable, skipped publish: ${subject}`);
      return;
    }

    await this.eventBus.publish(toSubject(subject), payload, { tenantId, correlationId });
    this.logger.log(`Published ${subject} for tenant ${tenantId}`);
  }

  async publishMetricsGenerated(event: MetricsGeneratedEvent, correlationId?: string) {
    await this.publish(REPORTING_EVENTS.METRICS_GENERATED, event.tenantId, event, correlationId);
  }

  async publishDataIngested(event: DataIngestedEvent, correlationId?: string) {
    await this.publish(REPORTING_EVENTS.DATA_INGESTED, event.tenantId, event, correlationId);
  }

  async publishReportRequestCreated(payload: Record<string, unknown>, correlationId?: string) {
    const tenantId = String(payload.tenantId ?? "");
    await this.publish(REPORTING_EVENTS.REQUEST_CREATED, tenantId, payload, correlationId);
  }

  async publishReportRequestCompleted(payload: Record<string, unknown>, correlationId?: string) {
    const tenantId = String(payload.tenantId ?? "");
    await this.publish(REPORTING_EVENTS.REQUEST_COMPLETED, tenantId, payload, correlationId);
  }

  async publishReportRequestFailed(payload: Record<string, unknown>, correlationId?: string) {
    const tenantId = String(payload.tenantId ?? "");
    await this.publish(REPORTING_EVENTS.REQUEST_FAILED, tenantId, payload, correlationId);
  }
}
