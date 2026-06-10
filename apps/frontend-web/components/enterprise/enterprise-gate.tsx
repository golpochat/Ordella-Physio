"use client";

import { useClinicSubscription } from "@/hooks/useClinicPortal";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";

type EnterpriseGateProps = {
  children: React.ReactNode;
};

export function EnterpriseGate({ children }: EnterpriseGateProps) {
  const subscriptionQuery = useClinicSubscription();

  if (subscriptionQuery.isLoading) {
    return <PageLoading rows={4} />;
  }

  if (subscriptionQuery.isError) {
    return <PageError onRetry={() => void subscriptionQuery.refetch()} />;
  }

  const plan =
    subscriptionQuery.data?.plan ?? subscriptionQuery.data?.subscription?.plan ?? "STARTER";

  if (plan !== "ENTERPRISE") {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="font-medium">Enterprise plan required</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Upgrade to the Enterprise plan to access SSO, custom roles, audit logs, API keys, and
          webhooks.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
