export type InvoiceCreatedEvent = {
  tenantId: string;
  invoiceId: string;
  patientId: string;
  invoiceNumber: string;
  status: string;
  total: number;
  currency: string;
  createdAt: string;
};
