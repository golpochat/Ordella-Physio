import type { InvoiceStatus } from "../enums";

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRateId?: string;
  total: number;
}

export interface TaxRate {
  id: string;
  tenantId: string;
  name: string;
  rate: number;
  isActive: boolean;
}

export interface Invoice {
  id: string;
  tenantId: string;
  patientId: string;
  appointmentId?: string;
  status: InvoiceStatus;
  currency: string;
  subtotal: number;
  taxTotal: number;
  total: number;
  issuedAt?: string;
  dueAt?: string;
  paidAt?: string;
  items: InvoiceItem[];
  createdAt: string;
  updatedAt: string;
}
