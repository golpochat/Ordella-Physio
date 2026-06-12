"use client";

import Link from "next/link";
import { toast } from "sonner";
import { InvoiceTable } from "@/components/billing/InvoiceTable";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useSubscriptionInvoices,
  useSyncSubscriptionInvoices,
} from "@/hooks/useSubscriptionBilling";
import { WithAllPermissions } from "@/lib/auth/withPermission";

export default function BillingInvoicesPage() {
  const invoicesQuery = useSubscriptionInvoices();
  const syncInvoices = useSyncSubscriptionInvoices();

  if (invoicesQuery.isLoading) {
    return <PageLoading rows={4} />;
  }

  if (invoicesQuery.isError) {
    return <PageError onRetry={() => void invoicesQuery.refetch()} />;
  }

  async function handleSync() {
    try {
      await syncInvoices.mutateAsync();
      toast.success("Invoices synced from Stripe.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sync invoices.");
    }
  }

  return (
    <WithAllPermissions permissions={["subscription.read"]}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Billing invoices</h1>
            <p className="text-muted-foreground">
              Stripe invoices synced for your tenant subscription.
            </p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" asChild>
              <Link href="/settings/billing">Back to billing</Link>
            </Button>
            <Button
              type="button"
              variant="primary"
              disabled={syncInvoices.isPending}
              onClick={() => void handleSync()}
            >
              Sync from Stripe
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Invoice history</CardTitle>
            <CardDescription>Paid, open, and failed subscription invoices.</CardDescription>
          </CardHeader>
          <CardBody>
            <InvoiceTable invoices={invoicesQuery.data ?? []} />
          </CardBody>
        </Card>
      </div>
    </WithAllPermissions>
  );
}
