import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { PatientInvoice } from "@/lib/patient-portal-types";
import { formatCurrency, formatPatientDate } from "@/lib/patient-portal-utils";

export function InvoiceDetail({ invoice }: { invoice: PatientInvoice }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{invoice.invoiceNumber}</CardTitle>
            <Badge>{invoice.status}</Badge>
          </div>
        </CardHeader>
        <CardBody className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="font-medium">Total</p>
            <p className="text-lg font-semibold">
              {formatCurrency(invoice.total, invoice.currency)}
            </p>
          </div>
          <div>
            <p className="font-medium">Due date</p>
            <p className="text-muted-foreground">
              {invoice.dueDate ? formatPatientDate(invoice.dueDate) : "Not set"}
            </p>
          </div>
          <div>
            <p className="font-medium">Subtotal</p>
            <p className="text-muted-foreground">
              {formatCurrency(invoice.subtotal, invoice.currency)}
            </p>
          </div>
          <div>
            <p className="font-medium">Tax</p>
            <p className="text-muted-foreground">{formatCurrency(invoice.tax, invoice.currency)}</p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Line items</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3">
          {invoice.items?.length ? (
            invoice.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-1 border-b pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{item.description}</p>
                  <p className="text-sm text-muted-foreground">Qty {item.quantity}</p>
                </div>
                <p className="font-medium">{formatCurrency(item.total, invoice.currency)}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Invoice line items placeholder.</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
