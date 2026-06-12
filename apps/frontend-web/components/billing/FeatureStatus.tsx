"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { FeatureFlag } from "@/lib/subscription-billing-types";

const FEATURE_LABELS: Record<string, string> = {
  REPORTING: "Reporting",
  AI_ASSISTANT: "AI Assistant",
  ADVANCED_ANALYTICS: "Advanced Analytics",
  BILLING: "Billing",
};

type FeatureStatusProps = {
  features: FeatureFlag[];
};

export function FeatureStatus({ features }: FeatureStatusProps) {
  const hasDisabled = features.some((feature) => !feature.enabled);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan features</CardTitle>
        <CardDescription>Features included with your current subscription plan.</CardDescription>
      </CardHeader>
      <CardBody className="space-y-3">
        <ul className="space-y-2">
          {features.map((feature) => (
            <li
              key={feature.featureKey}
              className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm ${
                feature.enabled ? "border-border" : "border-dashed border-muted-foreground/40 opacity-60"
              }`}
            >
              <span>{FEATURE_LABELS[feature.featureKey] ?? feature.featureKey}</span>
              <span className={feature.enabled ? "text-emerald-600" : "text-muted-foreground"}>
                {feature.enabled ? "Enabled" : "Unavailable"}
              </span>
            </li>
          ))}
        </ul>

        {hasDisabled ? (
          <Button type="button" variant="primary" asChild>
            <Link href="/settings/billing">Upgrade to unlock</Link>
          </Button>
        ) : null}
      </CardBody>
    </Card>
  );
}
