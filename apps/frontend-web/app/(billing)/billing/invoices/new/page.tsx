"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { InvoiceCreateForm } from "@/components/billing/invoices/InvoiceCreateForm";
import { WithPermission } from "@/lib/auth/withPermission";

export default function InvoiceCreatePage() {
  return (
    <WithPermission permission="billing.manage">
      <PageHeader
        title="Create invoice"
        subtitle="Build a new patient invoice with line items, taxes, and discounts."
        action={
          <Button asChild variant="ghost">
            <Link href="/billing/invoices">&larr; Back to invoices</Link>
          </Button>
        }
      />
      <InvoiceCreateForm />
    </WithPermission>
  );
}
