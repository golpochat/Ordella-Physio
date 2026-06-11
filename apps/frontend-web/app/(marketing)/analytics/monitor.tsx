"use client";

import { trackEvent } from "@/lib/analytics";
import { useEffect } from "react";

const SLOW_LOAD_THRESHOLD_MS = 3000;

function reportLoadPerformance() {
  const navigation = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;

  if (!navigation) {
    return;
  }

  const loadTime = navigation.loadEventEnd - navigation.startTime;

  if (loadTime > SLOW_LOAD_THRESHOLD_MS) {
    trackEvent("slow_load", {
      load_time_ms: Math.round(loadTime),
    });
  }

  const lcpEntries = performance.getEntriesByType("largest-contentful-paint");
  const lcp = lcpEntries[lcpEntries.length - 1] as PerformanceEntry | undefined;

  if (lcp && lcp.startTime > SLOW_LOAD_THRESHOLD_MS) {
    trackEvent("slow_lcp", {
      lcp_ms: Math.round(lcp.startTime),
    });
  }
}

export default function Monitor() {
  useEffect(() => {
    const handleLoad = () => {
      reportLoadPerformance();
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    const handleError = (event: ErrorEvent) => {
      trackEvent("global_js_error", {
        message: event.message,
        source: event.filename ?? "unknown",
        line: event.lineno ?? 0,
      });
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message = reason instanceof Error ? reason.message : String(reason);

      trackEvent("global_js_error", {
        message,
        source: "unhandledrejection",
        line: 0,
      });
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return null;
}
