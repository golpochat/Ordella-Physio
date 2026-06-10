import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, type EventBus, toSubject } from "@ordella/event-bus";
import { BILLING_EVENTS } from "@/constants";
import type { InvoiceCreatedEvent } from "@/invoices/events/invoice-created.event";
import type { InvoiceUpdatedEvent } from "@/invoices/events/invoice-updated.event";
import type { InvoiceItemAddedEvent } from "@/invoices/events/invoice-item-added.event";
import type { InvoiceItemUpdatedEvent } from "@/invoices/events/invoice-item-updated.event";
import type { TaxRateCreatedEvent } from "@/tax-rates/events/tax-rate-created.event";
import type { TaxRateUpdatedEvent } from "@/tax-rates/events/tax-rate-updated.event";

@Injectable()
export class BillingEventPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BillingEventPublisher.name);
  private eventBus: EventBus | null = null;

  async onModuleInit() {
    this.eventBus = createEventBus();
    await this.eventBus.connect();
    this.logger.log("Billing event publisher connected to NATS");
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

  async publishInvoiceCreated(event: InvoiceCreatedEvent, correlationId?: string) {
    await this.publish(BILLING_EVENTS.INVOICE_CREATED, event.tenantId, event, correlationId);
  }

  async publishInvoiceUpdated(event: InvoiceUpdatedEvent, correlationId?: string) {
    await this.publish(BILLING_EVENTS.INVOICE_UPDATED, event.tenantId, event, correlationId);
  }

  async publishInvoiceItemAdded(event: InvoiceItemAddedEvent, correlationId?: string) {
    await this.publish(BILLING_EVENTS.INVOICE_ITEM_ADDED, event.tenantId, event, correlationId);
  }

  async publishInvoiceItemUpdated(event: InvoiceItemUpdatedEvent, correlationId?: string) {
    await this.publish(BILLING_EVENTS.INVOICE_ITEM_UPDATED, event.tenantId, event, correlationId);
  }

  async publishTaxRateCreated(event: TaxRateCreatedEvent, correlationId?: string) {
    await this.publish(BILLING_EVENTS.TAX_RATE_CREATED, event.tenantId, event, correlationId);
  }

  async publishTaxRateUpdated(event: TaxRateUpdatedEvent, correlationId?: string) {
    await this.publish(BILLING_EVENTS.TAX_RATE_UPDATED, event.tenantId, event, correlationId);
  }
}
