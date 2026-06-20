"use client";



import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useMemo } from "react";

import { useApi, useQueryAuthReady } from "@/hooks/useApi";

import { createNotificationProviderApi } from "@/lib/notification-provider-api";

import type {

  DeliverNotificationInput,

  DeliveryLogListFilters,
  NotificationAnalyticsFilters,
  ProviderConfigRecord,
} from "@/lib/notification-provider-types";



export function useNotificationProviderApi() {

  const api = useApi();

  return useMemo(() => createNotificationProviderApi(api), [api]);

}



export function useProviderConfigs() {
  const providerApi = useNotificationProviderApi();
  const authReady = useQueryAuthReady();

  return useQuery({
    queryKey: ["notification-provider-configs"],
    queryFn: () => providerApi.listProviders(),
    enabled: authReady,
  });
}



export function useDeliveryLogs(filters: DeliveryLogListFilters = {}) {
  const providerApi = useNotificationProviderApi();
  const authReady = useQueryAuthReady();

  return useQuery({
    queryKey: ["notification-delivery-logs", filters],
    queryFn: () => providerApi.listDeliveryLogs(filters),
    enabled: authReady,
  });
}

export function useCreateProviderConfig() {

  const providerApi = useNotificationProviderApi();

  const queryClient = useQueryClient();



  return useMutation({

    mutationFn: (

      input: Omit<
        ProviderConfigRecord,
        "id" | "tenantId" | "createdAt" | "updatedAt" | "isHealthy" | "lastHealthCheckAt"
      >,

    ) => providerApi.createProvider(input),

    onSuccess: async () => {

      await queryClient.invalidateQueries({ queryKey: ["notification-provider-configs"] });

    },

  });

}



export function useUpdateProviderConfig() {

  const providerApi = useNotificationProviderApi();

  const queryClient = useQueryClient();



  return useMutation({

    mutationFn: ({ id, input }: { id: string; input: Partial<ProviderConfigRecord> }) =>

      providerApi.updateProvider(id, input),

    onSuccess: async () => {

      await queryClient.invalidateQueries({ queryKey: ["notification-provider-configs"] });

    },

  });

}



export function useDeliverNotification() {
  const providerApi = useNotificationProviderApi();

  return useMutation({
    mutationFn: (input: DeliverNotificationInput) => providerApi.deliver(input),
  });
}

export function useNotificationAnalytics(filters: NotificationAnalyticsFilters = {}) {
  const providerApi = useNotificationProviderApi();
  const authReady = useQueryAuthReady();

  return useQuery({
    queryKey: ["notification-analytics", filters],
    queryFn: () => providerApi.getAnalytics(filters),
    enabled: authReady,
  });
}
