"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
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
    <div className="flex flex-col items-start gap-4">
      <h2 className="text-xl font-semibold">Dashboard error</h2>
      <p className="text-muted-foreground">
        Something went wrong while loading this dashboard. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
