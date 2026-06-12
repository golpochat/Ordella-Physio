export type InvoiceIssuedEvent = {
  tenantId: string;
  invoiceId: string;
  patientId: string;
  invoiceNumber: string;
  status: string;
  total: number;
  currency: string;
  issuedAt: string;
};
