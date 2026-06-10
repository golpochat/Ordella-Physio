import type { PaymentProvider, PaymentStatus } from "../enums";

export interface Payment {
  id: string;
  tenantId: string;
  invoiceId: string;
  patientId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: PaymentProvider;
  providerPaymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Refund {
  id: string;
  tenantId: string;
  paymentId: string;
  amount: number;
  currency: string;
  reason?: string;
  status: PaymentStatus;
  providerRefundId?: string;
  createdAt: string;
}
