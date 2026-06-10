import { DomainEvent } from "../core/domain-event";

export type PaymentIntentCreatedPayload = {
  paymentIntentId: string;
  tenantId: string;
  invoiceId: string;
  patientId: string;
  amount: number;
  currency: string;
  provider: string;
};

export class PaymentIntentCreated extends DomainEvent<PaymentIntentCreatedPayload> {
  constructor(payload: PaymentIntentCreatedPayload, correlationId?: string) {
    super({
      eventName: "payment.intent.created",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type PaymentSucceededPayload = {
  paymentId: string;
  tenantId: string;
  invoiceId: string;
  amount: number;
  currency: string;
  provider: string;
};

export class PaymentSucceeded extends DomainEvent<PaymentSucceededPayload> {
  constructor(payload: PaymentSucceededPayload, correlationId?: string) {
    super({
      eventName: "payment.succeeded",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type PaymentFailedPayload = {
  paymentId: string;
  tenantId: string;
  invoiceId: string;
  amount: number;
  currency: string;
  provider: string;
  reason?: string;
};

export class PaymentFailed extends DomainEvent<PaymentFailedPayload> {
  constructor(payload: PaymentFailedPayload, correlationId?: string) {
    super({
      eventName: "payment.failed",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type PaymentCancelledPayload = {
  paymentIntentId: string;
  tenantId: string;
  invoiceId: string;
  reason?: string;
};

export class PaymentCancelled extends DomainEvent<PaymentCancelledPayload> {
  constructor(payload: PaymentCancelledPayload, correlationId?: string) {
    super({
      eventName: "payment.cancelled",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type RefundCreatedPayload = {
  refundId: string;
  tenantId: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
};

export class RefundCreated extends DomainEvent<RefundCreatedPayload> {
  constructor(payload: RefundCreatedPayload, correlationId?: string) {
    super({
      eventName: "payment.refund.created",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type PayoutCreatedPayload = {
  payoutId: string;
  tenantId: string;
  providerId: string;
  amount: number;
  currency: string;
};

export class PayoutCreated extends DomainEvent<PayoutCreatedPayload> {
  constructor(payload: PayoutCreatedPayload, correlationId?: string) {
    super({
      eventName: "payment.payout.created",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type LedgerEntryCreatedPayload = {
  ledgerEntryId: string;
  tenantId: string;
  type: string;
  referenceId: string;
  amount: number;
  currency: string;
};

export class LedgerEntryCreated extends DomainEvent<LedgerEntryCreatedPayload> {
  constructor(payload: LedgerEntryCreatedPayload, correlationId?: string) {
    super({
      eventName: "payment.ledger_entry.created",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}
