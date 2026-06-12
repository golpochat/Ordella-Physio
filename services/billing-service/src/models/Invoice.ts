export type InvoiceStatus = "DRAFT" | "ISSUED" | "PAID" | "VOIDED";

export type Invoice = {
  id: string;
  tenantId: string;
  patientId: string;
  staffId: string | null;
  appointmentId: string | null;
  invoiceNumber: string;
  status: InvoiceStatus;
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  total: number;
  notes: string | null;
  issuedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
