import type { PaymentProvider } from "../enums";

export interface CreatePaymentIntentDto {
  invoiceId: string;
  amount?: number;
  currency?: string;
  provider?: PaymentProvider;
}

export interface ConfirmPaymentDto {
  paymentId: string;
  providerPaymentId?: string;
}

export interface CreateRefundDto {
  paymentId: string;
  amount?: number;
  reason?: string;
}
