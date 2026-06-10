export type PayoutCreatedEvent = {
  tenantId: string;
  payoutId: string;
  providerId: string;
  amount: number;
  currency: string;
  status: string;
  scheduledFor: string | null;
  createdAt: string;
};
