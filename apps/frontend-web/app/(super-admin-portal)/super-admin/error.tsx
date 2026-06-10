"use client";

import { PageError } from "@/components/patient-portal/page-state";

export default function SuperAdminPortalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <PageError onRetry={reset} />;
}
