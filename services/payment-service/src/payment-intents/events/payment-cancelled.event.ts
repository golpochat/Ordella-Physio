export type PaymentCancelledEvent = {
  tenantId: string;
  paymentIntentId: string;
  invoiceId: string;
  reason?: string;
  cancelledAt: string;
};
