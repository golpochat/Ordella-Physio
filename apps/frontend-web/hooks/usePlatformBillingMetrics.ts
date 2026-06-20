"use client";

import { useQuery } from "@tanstack/react-query";
import { useApi, useQueryAuthReady } from "@/hooks/useApi";
import type { PlatformBillingMetrics } from "@/lib/super-admin-portal-types";

export function usePlatformBillingMetrics() {
  const api = useApi();
  const authReady = useQueryAuthReady();

  return useQuery({
    queryKey: ["platform-billing-metrics"],
    queryFn: () => api.get<PlatformBillingMetrics>("billing", "/platform-metrics"),
    enabled: authReady,
  });
}
