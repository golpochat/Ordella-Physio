"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function TherapistPortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Therapist portal error</h2>
      <p className="text-muted-foreground">Something went wrong. Please try again.</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
