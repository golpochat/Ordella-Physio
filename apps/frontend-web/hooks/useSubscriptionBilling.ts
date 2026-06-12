"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { createSubscriptionBillingApi } from "@/lib/subscription-billing-api";

export function useSubscriptionBillingApi() {
  const api = useApi();
  return useMemo(() => createSubscriptionBillingApi(api), [api]);
}

export function useSubscriptionPlans() {
  const billingApi = useSubscriptionBillingApi();

  return useQuery({
    queryKey: ["subscription-plans"],
    queryFn: () => billingApi.listPlans(),
  });
}

export function useTenantSubscription() {
  const billingApi = useSubscriptionBillingApi();

  return useQuery({
    queryKey: ["tenant-subscription"],
    queryFn: () => billingApi.getSubscription(),
  });
}

export function useSubscribeToPlan() {
  const billingApi = useSubscriptionBillingApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { planId: string; billingCycle?: "monthly" | "yearly" }) =>
      billingApi.subscribe(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tenant-subscription"] });
    },
  });
}

export function useCancelTenantSubscription() {
  const billingApi = useSubscriptionBillingApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { immediately?: boolean } = {}) => billingApi.cancel(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tenant-subscription"] });
    },
  });
}

export function useBillingPortal() {
  const billingApi = useSubscriptionBillingApi();

  return useMutation({
    mutationFn: (returnUrl?: string) => billingApi.getBillingPortal(returnUrl),
  });
}

export function useUsageSummary() {
  const billingApi = useSubscriptionBillingApi();

  return useQuery({
    queryKey: ["usage-summary"],
    queryFn: () => billingApi.getUsageSummary(),
  });
}

export function useUsageHistory() {
  const billingApi = useSubscriptionBillingApi();

  return useQuery({
    queryKey: ["usage-history"],
    queryFn: () => billingApi.getUsageHistory(),
  });
}

export function usePlanFeatures() {
  const billingApi = useSubscriptionBillingApi();

  return useQuery({
    queryKey: ["plan-features"],
    queryFn: () => billingApi.listFeatures(),
  });
}

export function useSubscriptionInvoices() {
  const billingApi = useSubscriptionBillingApi();

  return useQuery({
    queryKey: ["subscription-invoices"],
    queryFn: () => billingApi.listInvoices(),
  });
}

export function useSyncSubscriptionInvoices() {
  const billingApi = useSubscriptionBillingApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => billingApi.syncInvoices(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["subscription-invoices"] });
    },
  });
}

export function useRevenueMetrics(tenantId?: string) {
  const billingApi = useSubscriptionBillingApi();

  return useQuery({
    queryKey: ["revenue-metrics", tenantId ?? "all"],
    queryFn: () => billingApi.getRevenueMetrics(tenantId),
  });
}

export function useRevenueTrend(months = 6) {
  const billingApi = useSubscriptionBillingApi();

  return useQuery({
    queryKey: ["revenue-trend", months],
    queryFn: () => billingApi.getRevenueTrend(months),
  });
}
