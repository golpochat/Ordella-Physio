import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { PortalUserInvoice } from "@/lib/user-portal-types";
import { formatCurrency, formatPortalDate } from "@/lib/user-portal-utils";

export function UserInvoiceDetail({ invoice }: { invoice: PortalUserInvoice }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{invoice.invoiceNumber}</CardTitle>
            <Badge>{invoice.status}</Badge>
          </div>
        </CardHeader>
        <CardBody className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="font-medium">Due date</p>
            <p className="text-muted-foreground">
              {invoice.dueDate ? formatPortalDate(invoice.dueDate) : "Not set"}
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
          <div>
            <p className="font-medium">Total</p>
            <p className="font-semibold">{formatCurrency(invoice.total, invoice.currency)}</p>
          </div>
          <p className="text-xs text-muted-foreground sm:col-span-2">Read-only</p>
        </CardBody>
      </Card>
      <Button asChild variant="outline">
        <Link href="/user/billing">Back to billing</Link>
      </Button>
    </div>
  );
}
