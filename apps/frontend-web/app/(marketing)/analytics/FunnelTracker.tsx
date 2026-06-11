"use client";

import { trackFunnelStep } from "@/lib/analytics";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function normalizePath(pathname: string): string {
  return pathname === "" ? "/" : pathname;
}

export function FunnelTracker() {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const current = normalizePath(pathname);
    const previous = previousPath.current;

    if (previous !== null) {
      if (previous === "/" && current === "/pricing") {
        trackFunnelStep("homepage_to_pricing");
      }

      if (previous === "/pricing" && current === "/contact") {
        trackFunnelStep("pricing_to_contact");
      }
    }

    previousPath.current = current;
  }, [pathname]);

  return null;
}
