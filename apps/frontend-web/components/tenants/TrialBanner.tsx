"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/hooks/useAuth";

export function TrialBanner() {
  const { accessToken } = useAuth();

  const trialQuery = useQuery({
    queryKey: ["tenant-trial"],
    enabled: Boolean(accessToken),
    queryFn: () => authClient.getTenantTrial(accessToken!),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const trial = trialQuery.data;
  if (!trial || trial.status !== "TRIALING" || trial.trialExpired) {
    if (trial?.trialExpired || trial?.status === "TRIAL_EXPIRED") {
      return (
        <div className="tenant-trial-banner tenant-trial-banner-expired" role="alert">
          <p>Your free trial has ended. Upgrade to restore full access to your clinic portal.</p>
          <Button asChild size="sm" variant="secondary">
            <Link href="/clinic/billing">Upgrade now</Link>
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
        <Link href="/clinic/billing">Upgrade now</Link>
      </Button>
    </div>
  );
}
