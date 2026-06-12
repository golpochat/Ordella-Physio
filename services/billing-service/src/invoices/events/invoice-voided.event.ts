export type InvoiceVoidedEvent = {
  tenantId: string;
  invoiceId: string;
  patientId: string;
  invoiceNumber: string;
  status: string;
  total: number;
  currency: string;
  voidedAt: string;
};
