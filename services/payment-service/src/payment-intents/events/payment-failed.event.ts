export type PaymentFailedEvent = {
  tenantId: string;
  paymentIntentId: string;
  invoiceId: string;
  amount: number;
  currency: string;
  provider: string;
  reason?: string;
  failedAt: string;
};
