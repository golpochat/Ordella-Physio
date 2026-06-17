"use client";

import { Badge } from "@/components/ui/badge";
import type { FulfillmentStatus, PrescriptionStatus } from "@/lib/clinic-pharmacy-types";

const PRESCRIPTION_STATUS_VARIANT: Record<PrescriptionStatus, "default" | "secondary" | "destructive" | "outline"> = {
  DRAFT: "secondary",
  ISSUED: "default",
  DISPENSED: "outline",
  CANCELLED: "destructive",
};

const FULFILLMENT_STATUS_VARIANT: Record<FulfillmentStatus, "default" | "secondary" | "destructive" | "outline"> = {
  PENDING: "secondary",
  IN_PROGRESS: "default",
  COMPLETED: "outline",
  FAILED: "destructive",
};

export function PrescriptionStatusBadge({ status }: { status: PrescriptionStatus }) {
  return <Badge variant={PRESCRIPTION_STATUS_VARIANT[status]}>{status}</Badge>;
}

export function FulfillmentStatusBadge({ status }: { status: FulfillmentStatus }) {
  return <Badge variant={FULFILLMENT_STATUS_VARIANT[status]}>{status.replace("_", " ")}</Badge>;
}
