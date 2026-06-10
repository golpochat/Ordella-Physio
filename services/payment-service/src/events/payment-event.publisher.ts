import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, type EventBus, toSubject } from "@ordella/event-bus";
import { PAYMENT_EVENTS } from "@/constants";
import type { PaymentIntentCreatedEvent } from "@/payment-intents/events/payment-intent-created.event";
import type { PaymentSucceededEvent } from "@/payment-intents/events/payment-succeeded.event";
import type { PaymentFailedEvent } from "@/payment-intents/events/payment-failed.event";
import type { PaymentCancelledEvent } from "@/payment-intents/events/payment-cancelled.event";
import type { RefundCreatedEvent } from "@/refunds/events/refund-created.event";
import type { PayoutCreatedEvent } from "@/payouts/events/payout-created.event";
import type { LedgerEntryCreatedEvent } from "@/ledger/events/ledger-entry-created.event";

@Injectable()
export class PaymentEventPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PaymentEventPublisher.name);
  private eventBus: EventBus | null = null;

  async onModuleInit() {
    this.eventBus = createEventBus();
    await this.eventBus.connect();
    this.logger.log("Payment event publisher connected to NATS");
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

  async publishPaymentIntentCreated(event: PaymentIntentCreatedEvent, correlationId?: string) {
    await this.publish(PAYMENT_EVENTS.PAYMENT_INTENT_CREATED, event.tenantId, event, correlationId);
  }

  async publishPaymentSucceeded(event: PaymentSucceededEvent, correlationId?: string) {
    await this.publish(PAYMENT_EVENTS.PAYMENT_SUCCEEDED, event.tenantId, event, correlationId);
  }

  async publishPaymentFailed(event: PaymentFailedEvent, correlationId?: string) {
    await this.publish(PAYMENT_EVENTS.PAYMENT_FAILED, event.tenantId, event, correlationId);
  }

  async publishPaymentCancelled(event: PaymentCancelledEvent, correlationId?: string) {
    await this.publish(PAYMENT_EVENTS.PAYMENT_CANCELLED, event.tenantId, event, correlationId);
  }

  async publishRefundCreated(event: RefundCreatedEvent, correlationId?: string) {
    await this.publish(PAYMENT_EVENTS.REFUND_CREATED, event.tenantId, event, correlationId);
  }

  async publishPayoutCreated(event: PayoutCreatedEvent, correlationId?: string) {
    await this.publish(PAYMENT_EVENTS.PAYOUT_CREATED, event.tenantId, event, correlationId);
  }

  async publishLedgerEntryCreated(event: LedgerEntryCreatedEvent, correlationId?: string) {
    await this.publish(PAYMENT_EVENTS.LEDGER_ENTRY_CREATED, event.tenantId, event, correlationId);
  }
}
