"use client";

import { PageError } from "@/components/patient-portal/page-state";

export default function PharmacyPortalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <PageError onRetry={reset} />;
}
