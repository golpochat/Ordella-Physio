export type PaymentIntentCreatedEvent = {
  tenantId: string;
  paymentIntentId: string;
  invoiceId: string;
  patientId: string;
  amount: number;
  currency: string;
  provider: string;
  status: string;
  createdAt: string;
};
