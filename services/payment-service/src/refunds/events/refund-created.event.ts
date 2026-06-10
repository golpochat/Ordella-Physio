export type RefundCreatedEvent = {
  tenantId: string;
  refundId: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  reason?: string;
  createdAt: string;
};
