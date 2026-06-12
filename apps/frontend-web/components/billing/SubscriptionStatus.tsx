"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { SubscriptionStatusResponse } from "@/lib/subscription-billing-types";

type SubscriptionStatusProps = {
  data: SubscriptionStatusResponse;
  onCancelAtPeriodEnd: () => void;
  onOpenPortal: () => void;
  isCanceling?: boolean;
  isOpeningPortal?: boolean;
};

function formatDate(value: string | null | undefined) {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString();
}

function statusVariant(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "default" as const;
    case "trialing":
      return "secondary" as const;
    case "past_due":
      return "destructive" as const;
    case "canceled":
      return "outline" as const;
    default:
      return "outline" as const;
  }
}

export function SubscriptionStatus({
  data,
  onCancelAtPeriodEnd,
  onOpenPortal,
  isCanceling = false,
  isOpeningPortal = false,
}: SubscriptionStatusProps) {
  const subscription = data.subscription;
  const statusLabel = data.status === "none" ? "No subscription" : data.status;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle>Current subscription</CardTitle>
        <Badge variant={statusVariant(data.status)}>{statusLabel}</Badge>
      </CardHeader>
      <CardBody className="space-y-3 text-sm">
        <p>
          Plan: <span className="font-medium">{data.plan?.name ?? "Free"}</span>
        </p>
        {subscription ? (
          <>
            <p>Next billing date: {formatDate(subscription.currentPeriodEnd)}</p>
            {subscription.trialEndsAt ? <p>Trial ends: {formatDate(subscription.trialEndsAt)}</p> : null}
            {subscription.cancelAtPeriodEnd ? (
              <p className="text-muted-foreground">Cancellation scheduled at period end.</p>
            ) : null}
          </>
        ) : (
          <p className="text-muted-foreground">Subscribe to unlock more features and higher limits.</p>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="button" variant="outline" disabled={isOpeningPortal} onClick={onOpenPortal}>
            {isOpeningPortal ? "Opening…" : "Billing portal"}
          </Button>
          {subscription && !subscription.cancelAtPeriodEnd && subscription.status !== "CANCELED" ? (
            <Button type="button" variant="outline" disabled={isCanceling} onClick={onCancelAtPeriodEnd}>
              {isCanceling ? "Scheduling…" : "Cancel at period end"}
            </Button>
          ) : null}
        </div>
      </CardBody>
    </Card>
  );
}
