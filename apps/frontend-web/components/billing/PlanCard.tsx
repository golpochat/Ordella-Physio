"use client";

import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SubscriptionPlan } from "@/lib/subscription-billing-types";

type PlanCardProps = {
  plan: SubscriptionPlan;
  isCurrent?: boolean;
  onChoose: (plan: SubscriptionPlan) => void;
};

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export function PlanCard({ plan, isCurrent = false, onChoose }: PlanCardProps) {
  return (
    <Card className={isCurrent ? "border-primary" : undefined}>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardBody className="space-y-4">
        <div>
          <p className="text-2xl font-semibold">{formatPrice(plan.priceMonthly, plan.currency)}</p>
          <p className="text-sm text-muted-foreground">per month</p>
          {plan.priceYearly > 0 ? (
            <p className="text-xs text-muted-foreground">
              or {formatPrice(plan.priceYearly, plan.currency)} / year
            </p>
          ) : null}
        </div>

        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>Staff: {plan.limits.maxStaff < 0 ? "Unlimited" : plan.limits.maxStaff}</li>
          <li>Patients: {plan.limits.maxPatients < 0 ? "Unlimited" : plan.limits.maxPatients}</li>
          <li>Storage: {plan.limits.maxStorageMB} MB</li>
          <li>Billing: {plan.limits.features.billing ? "Yes" : "No"}</li>
          <li>Reporting: {plan.limits.features.reporting ? "Yes" : "No"}</li>
          <li>AI: {plan.limits.features.ai ? "Yes" : "No"}</li>
        </ul>

        <Button type="button" variant={isCurrent ? "outline" : "primary"} disabled={isCurrent} onClick={() => onChoose(plan)}>
          {isCurrent ? "Current plan" : "Choose plan"}
        </Button>
      </CardBody>
    </Card>
  );
}
