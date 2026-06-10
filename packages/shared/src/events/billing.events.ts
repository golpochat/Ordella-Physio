import type { InvoiceStatus } from "../enums";
import type { DomainEvent } from "./base.event";

export interface InvoiceCreatedPayload {
  invoiceId: string;
  tenantId: string;
  patientId: string;
  total: number;
  currency: string;
  status: InvoiceStatus;
}

export interface InvoiceUpdatedPayload {
  invoiceId: string;
  tenantId: string;
  status: InvoiceStatus;
}

export interface InvoiceIssuedPayload {
  invoiceId: string;
  tenantId: string;
  patientId: string;
  issuedAt: string;
}

export interface InvoicePaidPayload {
  invoiceId: string;
  tenantId: string;
  patientId: string;
  amount: number;
  currency: string;
  paidAt: string;
}

export interface InvoiceVoidedPayload {
  invoiceId: string;
  tenantId: string;
  reason?: string;
}

export interface InvoiceRefundedPayload {
  invoiceId: string;
  tenantId: string;
  amount: number;
  currency: string;
}

export type InvoiceCreatedEvent = DomainEvent<InvoiceCreatedPayload>;
export type InvoiceUpdatedEvent = DomainEvent<InvoiceUpdatedPayload>;
export type InvoiceIssuedEvent = DomainEvent<InvoiceIssuedPayload>;
export type InvoicePaidEvent = DomainEvent<InvoicePaidPayload>;
export type InvoiceVoidedEvent = DomainEvent<InvoiceVoidedPayload>;
export type InvoiceRefundedEvent = DomainEvent<InvoiceRefundedPayload>;
