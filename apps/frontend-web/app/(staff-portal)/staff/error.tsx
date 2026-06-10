"use client";

import { PageError } from "@/components/patient-portal/page-state";

export default function StaffPortalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <PageError onRetry={reset} />;
}
