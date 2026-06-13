"use client";

import { Badge } from "@/components/ui/badge";
import type { DriftSeverity } from "@/lib/training-types";

export type DriftSeverityBadgeProps = {
  severity: DriftSeverity | null;
};

export function DriftSeverityBadge({ severity }: DriftSeverityBadgeProps) {
  if (!severity) {
    return <Badge variant="secondary">None</Badge>;
  }
  const variant =
    severity === "CRITICAL" || severity === "HIGH"
      ? "destructive"
      : severity === "MEDIUM"
        ? "default"
        : "secondary";
  return <Badge variant={variant}>{severity}</Badge>;
}
