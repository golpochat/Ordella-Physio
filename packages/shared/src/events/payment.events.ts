import type { PaymentProvider, PaymentStatus } from "../enums";
import type { DomainEvent } from "./base.event";

export interface PaymentCreatedPayload {
  paymentId: string;
  tenantId: string;
  invoiceId: string;
  amount: number;
  currency: string;
  provider: PaymentProvider;
}

export interface PaymentSucceededPayload {
  paymentId: string;
  tenantId: string;
  invoiceId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
}

export interface PaymentFailedPayload {
  paymentId: string;
  tenantId: string;
  invoiceId: string;
  errorMessage?: string;
}

export interface PaymentRefundedPayload {
  paymentId: string;
  tenantId: string;
  refundId: string;
  amount: number;
  currency: string;
}

export type PaymentCreatedEvent = DomainEvent<PaymentCreatedPayload>;
export type PaymentSucceededEvent = DomainEvent<PaymentSucceededPayload>;
export type PaymentFailedEvent = DomainEvent<PaymentFailedPayload>;
export type PaymentRefundedEvent = DomainEvent<PaymentRefundedPayload>;
