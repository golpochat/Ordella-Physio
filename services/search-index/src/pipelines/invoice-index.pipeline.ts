export type InvoiceSourceRecord = {
  id: string;
  tenantId: string;
  invoiceNumber: string;
  patientId: string;
  patientName?: string;
  staffId?: string | null;
  status?: string;
  total?: string | number;
  dueDate?: string | null;
};

export function transformInvoiceForIndex(invoice: InvoiceSourceRecord) {
  const patientName = invoice.patientName ?? "Patient";
  const label = `${invoice.invoiceNumber} — ${patientName}`;

  return {
    id: invoice.id,
    tenantId: invoice.tenantId,
    invoiceNumber: invoice.invoiceNumber,
    patientId: invoice.patientId,
    patientName,
    staffId: invoice.staffId ?? "",
    status: invoice.status ?? "",
    total: invoice.total ?? "",
    dueDate: invoice.dueDate ?? "",
    label,
    searchableText: [invoice.invoiceNumber, patientName, invoice.status].filter(Boolean).join(" "),
  };
}
