export type TaxRateCreatedEvent = {
  tenantId: string;
  taxRateId: string;
  name: string;
  percentage: number;
  taxType: string | null;
  createdAt: string;
};
