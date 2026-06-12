export type InvoicePaidEvent = {
  tenantId: string;
  invoiceId: string;
  patientId: string;
  invoiceNumber: string;
  status: string;
  total: number;
  currency: string;
  paymentReference: string | null;
  paidAt: string;
};
