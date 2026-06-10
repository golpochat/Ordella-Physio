export type PaymentSucceededEvent = {
  tenantId: string;
  paymentIntentId: string;
  invoiceId: string;
  amount: number;
  currency: string;
  provider: string;
  succeededAt: string;
};
