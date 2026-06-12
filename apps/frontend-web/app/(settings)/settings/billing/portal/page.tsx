"use client";

import Link from "next/link";
import { toast } from "sonner";
import { PageLoading } from "@/components/patient-portal/page-state";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBillingPortal } from "@/hooks/useSubscriptionBilling";
import { WithAllPermissions } from "@/lib/auth/withPermission";

export default function BillingPortalPage() {
  const billingPortal = useBillingPortal();

  async function openPortal(path: string) {
    try {
      const returnUrl =
        typeof window !== "undefined" ? `${window.location.origin}${path}` : undefined;
      const result = await billingPortal.mutateAsync(returnUrl);
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to open billing portal.");
    }
  }

  return (
    <WithAllPermissions permissions={["subscription.manage"]}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Self-service billing</h1>
            <p className="text-muted-foreground">
              Manage payment methods and billing history in the Stripe customer portal.
            </p>
          </div>
          <Button type="button" variant="outline" asChild>
            <Link href="/settings/billing">Back to billing</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Stripe billing portal</CardTitle>
            <CardDescription>
              Securely update cards, view receipts, and manage subscription billing details.
            </CardDescription>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="primary"
              disabled={billingPortal.isPending}
              onClick={() => void openPortal("/settings/billing/portal")}
            >
              Manage payment method
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={billingPortal.isPending}
              onClick={() => void openPortal("/settings/billing/invoices")}
            >
              View billing history
            </Button>
          </CardBody>
        </Card>

        {billingPortal.isPending ? <PageLoading rows={1} /> : null}
      </div>
    </WithAllPermissions>
  );
}
