"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PlanCard } from "@/components/billing/PlanCard";
import { SubscriptionStatus } from "@/components/billing/SubscriptionStatus";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import {
  useBillingPortal,
  useCancelTenantSubscription,
  useSubscribeToPlan,
  useSubscriptionPlans,
  useTenantSubscription,
} from "@/hooks/useSubscriptionBilling";
import type { SubscriptionPlan } from "@/lib/subscription-billing-types";
import { WithAllPermissions } from "@/lib/auth/withPermission";

export default function BillingSettingsPage() {
  const plansQuery = useSubscriptionPlans();
  const subscriptionQuery = useTenantSubscription();
  const subscribe = useSubscribeToPlan();
  const cancelSubscription = useCancelTenantSubscription();
  const billingPortal = useBillingPortal();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  if (plansQuery.isLoading || subscriptionQuery.isLoading) {
    return <PageLoading rows={4} />;
  }

  if (plansQuery.isError || subscriptionQuery.isError) {
    return (
      <PageError
        onRetry={() => {
          void plansQuery.refetch();
          void subscriptionQuery.refetch();
        }}
      />
    );
  }

  const subscription = subscriptionQuery.data;
  const currentPlanId = subscription?.subscription?.planId ?? subscription?.plan?.id ?? "plan_free";

  async function handleConfirmUpgrade(input: { planId: string; billingCycle: "monthly" | "yearly" }) {
    try {
      const result = await subscribe.mutateAsync(input);
      toast.success(result.message);
      setSelectedPlan(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update subscription.");
    }
  }

  async function handleCancelAtPeriodEnd() {
    try {
      const result = await cancelSubscription.mutateAsync({ immediately: false });
      toast.success(result.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to cancel subscription.");
    }
  }

  async function handleOpenPortal() {
    try {
      const returnUrl =
        typeof window !== "undefined" ? `${window.location.origin}/settings/billing` : undefined;
      const result = await billingPortal.mutateAsync(returnUrl);
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to open billing portal.");
    }
  }

  return (
    <WithAllPermissions permissions={["subscription.read", "subscription.manage"]}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Billing & subscription</h1>
            <p className="text-muted-foreground">
              Manage your SaaS plan, billing cycle, and Stripe customer portal.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" asChild>
              <Link href="/settings/billing/usage">View usage</Link>
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/settings/billing/invoices">Invoices</Link>
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/settings/billing/portal">Billing portal</Link>
            </Button>
          </div>
        </div>

        {subscription ? (
          <SubscriptionStatus
            data={subscription}
            onCancelAtPeriodEnd={() => void handleCancelAtPeriodEnd()}
            onOpenPortal={() => void handleOpenPortal()}
            isCanceling={cancelSubscription.isPending}
            isOpeningPortal={billingPortal.isPending}
          />
        ) : null}

        <div>
          <h2 className="mb-4 text-lg font-semibold">Available plans</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {(plansQuery.data ?? []).map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isCurrent={plan.id === currentPlanId}
                onChoose={setSelectedPlan}
              />
            ))}
          </div>
        </div>

        <UpgradeModal
          plan={selectedPlan}
          open={Boolean(selectedPlan)}
          isSubmitting={subscribe.isPending}
          onClose={() => setSelectedPlan(null)}
          onConfirm={(input) => void handleConfirmUpgrade(input)}
        />
      </div>
    </WithAllPermissions>
  );
}
