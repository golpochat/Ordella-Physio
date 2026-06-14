import Link from "next/link";
import { InvoiceViewer } from "@/components/clinic-ui";
import { Button } from "@/components/ui/button";
import type { StaffInvoice } from "@/lib/staff-portal-types";

export function StaffInvoiceDetail({ invoice }: { invoice: StaffInvoice }) {
  return (
    <div className="space-y-4">
      <InvoiceViewer
        invoice={{
          ...invoice,
          outstanding: Math.max(0, invoice.total),
        }}
        pdfPath={`/invoices/${invoice.id}/pdf`}
        showTenantBanner
      />
      <Button asChild variant="outline">
        <Link href="/staff/billing">Back to billing</Link>
      </Button>
    </div>
  );
}
