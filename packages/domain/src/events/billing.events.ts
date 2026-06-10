import { DomainEvent } from "../core/domain-event";

export type InvoiceCreatedPayload = {
  invoiceId: string;
  tenantId: string;
  patientId: string;
  totalAmount: number;
  currency: string;
};

export class InvoiceCreated extends DomainEvent<InvoiceCreatedPayload> {
  constructor(payload: InvoiceCreatedPayload, correlationId?: string) {
    super({
      eventName: "billing.invoice.created",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type InvoiceUpdatedPayload = {
  invoiceId: string;
  tenantId: string;
  changes: Record<string, unknown>;
};

export class InvoiceUpdated extends DomainEvent<InvoiceUpdatedPayload> {
  constructor(payload: InvoiceUpdatedPayload, correlationId?: string) {
    super({
      eventName: "billing.invoice.updated",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type InvoiceItemAddedPayload = {
  invoiceId: string;
  tenantId: string;
  itemId: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

export class InvoiceItemAdded extends DomainEvent<InvoiceItemAddedPayload> {
  constructor(payload: InvoiceItemAddedPayload, correlationId?: string) {
    super({
      eventName: "billing.invoice_item.added",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type InvoiceItemUpdatedPayload = {
  invoiceId: string;
  tenantId: string;
  itemId: string;
  changes: Record<string, unknown>;
};

export class InvoiceItemUpdated extends DomainEvent<InvoiceItemUpdatedPayload> {
  constructor(payload: InvoiceItemUpdatedPayload, correlationId?: string) {
    super({
      eventName: "billing.invoice_item.updated",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type TaxRateCreatedPayload = {
  taxRateId: string;
  tenantId: string;
  name: string;
  percentage: number;
};

export class TaxRateCreated extends DomainEvent<TaxRateCreatedPayload> {
  constructor(payload: TaxRateCreatedPayload, correlationId?: string) {
    super({
      eventName: "billing.tax_rate.created",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type TaxRateUpdatedPayload = {
  taxRateId: string;
  tenantId: string;
  changes: Record<string, unknown>;
};

export class TaxRateUpdated extends DomainEvent<TaxRateUpdatedPayload> {
  constructor(payload: TaxRateUpdatedPayload, correlationId?: string) {
    super({
      eventName: "billing.tax_rate.updated",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type InvoicePaidPayload = {
  invoiceId: string;
  tenantId: string;
  paidAmount: number;
  currency: string;
};

export class InvoicePaid extends DomainEvent<InvoicePaidPayload> {
  constructor(payload: InvoicePaidPayload, correlationId?: string) {
    super({
      eventName: "billing.invoice.paid",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}

export type InvoiceRefundedPayload = {
  invoiceId: string;
  tenantId: string;
  refundedAmount: number;
  currency: string;
  reason?: string;
};

export class InvoiceRefunded extends DomainEvent<InvoiceRefundedPayload> {
  constructor(payload: InvoiceRefundedPayload, correlationId?: string) {
    super({
      eventName: "billing.invoice.refunded",
      payload,
      tenantId: payload.tenantId,
      correlationId,
    });
  }
}
