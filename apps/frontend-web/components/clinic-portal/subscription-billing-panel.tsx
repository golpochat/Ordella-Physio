"use client";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  useCancelClinicSubscription,
  useClinicCustomerPortal,
  useClinicStripeInvoices,
  useClinicSubscription,
  useCreateClinicSubscription,
} from "@/hooks/useClinicPortal";
import type { ClinicSubscriptionPlan } from "@/lib/clinic-portal-types";
import { formatCurrency, formatPortalDate } from "@/lib/clinic-portal-utils";

const PLANS: { id: ClinicSubscriptionPlan; label: string; description: string }[] = [
  { id: "STARTER", label: "Starter", description: "Single location, core scheduling" },
  { id: "PROFESSIONAL", label: "Professional", description: "Multi-staff clinics, reporting" },
  { id: "ENTERPRISE", label: "Enterprise", description: "Advanced controls and support" },
];

export function ClinicSubscriptionBillingPanel() {
  const subscriptionQuery = useClinicSubscription();
  const invoicesQuery = useClinicStripeInvoices();
  const createSubscription = useCreateClinicSubscription();
  const cancelSubscription = useCancelClinicSubscription();
  const customerPortal = useClinicCustomerPortal();

  if (subscriptionQuery.isLoading) return <PageLoading />;
  if (subscriptionQuery.isError) {
    return <PageError onRetry={() => void subscriptionQuery.refetch()} />;
  }

  const subscription = subscriptionQuery.data;
  const currentPlan = subscription?.plan ?? subscription?.subscription?.plan ?? null;
  const status = subscription?.status ?? "none";

  const handleChangePlan = async (plan: ClinicSubscriptionPlan) => {
    try {
      await createSubscription.mutateAsync({ plan });
      toast.success(`Subscription updated to ${plan}.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update subscription.");
    }
  };

  const handleCancel = async (immediately: boolean) => {
    try {
      await cancelSubscription.mutateAsync({ immediately });
      toast.success(
        immediately ? "Subscription canceled." : "Subscription will cancel at period end.",
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to cancel subscription.");
    }
  };

  const handleOpenPortal = async () => {
    try {
      const result = await customerPortal.mutateAsync(
        typeof window !== "undefined" ? `${window.location.origin}/clinic/billing` : undefined,
      );
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to open billing portal.");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Platform Subscription</CardTitle>
          <CardDescription>Manage your clinic&apos;s Ordella Physio plan via Stripe.</CardDescription>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge>{status}</Badge>
            {currentPlan ? <Badge variant="outline">{currentPlan}</Badge> : null}
          </div>

          {subscription?.subscription?.currentPeriodEnd ? (
            <p className="text-sm text-muted-foreground">
              Current period ends {formatPortalDate(subscription.subscription.currentPeriodEnd)}
              {subscription.subscription.cancelAtPeriodEnd ? " (canceling at period end)" : ""}
            </p>
          ) : null}

          <div className="grid gap-3 md:grid-cols-3">
            {PLANS.map((plan) => (
              <Card key={plan.id} className={currentPlan === plan.id ? "border-primary" : ""}>
                <CardBody className="space-y-3">
                  <div>
                    <p className="font-medium">{plan.label}</p>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <Button
                    variant={currentPlan === plan.id ? "secondary" : "default"}
                    disabled={createSubscription.isPending || currentPlan === plan.id}
                    onClick={() => void handleChangePlan(plan.id)}
                  >
                    {currentPlan === plan.id ? "Current plan" : currentPlan ? "Switch plan" : "Subscribe"}
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              disabled={customerPortal.isPending || !subscription?.stripeCustomerId}
              onClick={() => void handleOpenPortal()}
            >
              Manage payment method (Stripe Portal)
            </Button>
            {subscription?.subscription ? (
              <>
                <Button
                  variant="outline"
                  disabled={cancelSubscription.isPending}
                  onClick={() => void handleCancel(false)}
                >
                  Cancel at period end
                </Button>
                <Button
                  variant="destructive"
                  disabled={cancelSubscription.isPending}
                  onClick={() => void handleCancel(true)}
                >
                  Cancel immediately
                </Button>
              </>
            ) : (
              <Button
                disabled={createSubscription.isPending}
                onClick={() => void handleChangePlan("STARTER")}
              >
                Start Starter plan
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Invoices</CardTitle>
          <CardDescription>Stripe invoices for your platform subscription.</CardDescription>
        </CardHeader>
        <CardBody>
          {invoicesQuery.isLoading ? <PageLoading /> : null}
          {invoicesQuery.isError ? (
            <PageError onRetry={() => void invoicesQuery.refetch()} />
          ) : null}
          {!invoicesQuery.isLoading && !invoicesQuery.isError ? (
            <div className="space-y-3">
              {(invoicesQuery.data ?? []).length === 0 ? (
                <p className="text-sm text-muted-foreground">No subscription invoices yet.</p>
              ) : (
                (invoicesQuery.data ?? []).map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium">{invoice.number ?? invoice.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatPortalDate(invoice.createdAt)} · {invoice.status}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold">
                        {formatCurrency(invoice.amountPaid / 100, invoice.currency.toUpperCase())}
                      </p>
                      {invoice.hostedInvoiceUrl ? (
                        <a
                          href={invoice.hostedInvoiceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          View
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
}
