"use client";

import { PageError } from "@/components/patient-portal/page-state";

export default function ClinicPortalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <PageError onRetry={reset} />;
}
