"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/hooks/useAuth";
import { useBillingContext } from "@/hooks/useClinicPortal";
import { getUserPortalRoles } from "@/lib/nav-roles";
import { can, Permission } from "@/lib/permissions";

function canLoadBillingContext(
  user: ReturnType<typeof useAuth>["user"],
): boolean {
  if (!user) {
    return false;
  }

  const roles = getUserPortalRoles(user);
  const isClinicBillingManager =
    roles.some((role) =>
      ["ADMIN", "CLINIC_ADMIN", "OWNER", "TENANT_OWNER", "BILLING_ADMIN"].includes(role),
    ) || can(user, Permission.BILLING_MANAGE);

  return isClinicBillingManager;
}

export function TrialBanner() {
  const { accessToken, user } = useAuth();
  const billingContextQuery = useBillingContext({
    enabled: canLoadBillingContext(user),
  });

  const trialQuery = useQuery({
    queryKey: ["tenant-trial"],
    enabled: Boolean(accessToken),
    queryFn: () => authClient.getTenantTrial(accessToken!),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const trial = trialQuery.data;
  const upgradePath =
    billingContextQuery.data?.upgradePath ??
    (billingContextQuery.data?.billingModel === "organization-level"
      ? "/organization/billing/upgrade"
      : "/clinic/billing/upgrade");

  if (!trial || trial.status !== "TRIALING" || trial.trialExpired) {
    if (trial?.trialExpired || trial?.status === "TRIAL_EXPIRED") {
      return (
        <div className="tenant-trial-banner tenant-trial-banner-expired" role="alert">
          <p>Your free trial has ended. Upgrade to restore full access to your clinic portal.</p>
          <Button asChild size="sm" variant="secondary">
            <Link href={upgradePath}>Upgrade now</Link>
          </Button>
        </div>
      );
    }

    return null;
  }

  const days = trial.trialDaysRemaining ?? 0;
  const dayLabel = days === 1 ? "day" : "days";

  return (
    <div className="tenant-trial-banner" role="status">
      <p>
        Your trial ends in <strong>{days}</strong> {dayLabel}. Upgrade to keep your clinic running
        without interruption.
      </p>
      <Button asChild size="sm">
        <Link href={upgradePath}>Upgrade now</Link>
      </Button>
    </div>
  );
}
