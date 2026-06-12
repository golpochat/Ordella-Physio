import type { createApiClient } from "@/lib/api-client";

import type {

  DeliverNotificationInput,

  DeliverNotificationResponse,

  DeliveryLogDetailResponse,

  DeliveryLogListFilters,

  DeliveryLogListResponse,
  NotificationAnalyticsFilters,
  NotificationAnalyticsResponse,
  ProviderConfigListResponse,
  ProviderConfigMutationResponse,

  ProviderConfigRecord,

} from "@/lib/notification-provider-types";



function toDeliveryLogParams(

  filters: DeliveryLogListFilters,

): Record<string, string | number | undefined> {

  return {

    page: filters.page,

    limit: filters.limit,

    channel: filters.channel,

    provider: filters.provider,

    status: filters.status,

    keyword: filters.keyword,

    dateStart: filters.dateStart,

    dateEnd: filters.dateEnd,

  };

}



export function createNotificationProviderApi(api: ReturnType<typeof createApiClient>) {

  return {

    listProviders() {

      return api.get<ProviderConfigListResponse>("notificationProviders", "/providers");

    },

    createProvider(
      input: Omit<
        ProviderConfigRecord,
        "id" | "tenantId" | "createdAt" | "updatedAt" | "isHealthy" | "lastHealthCheckAt"
      >,
    ) {

      return api.post<ProviderConfigMutationResponse>("notificationProviders", "/providers", input);

    },

    updateProvider(id: string, input: Partial<ProviderConfigRecord>) {

      return api.patch<ProviderConfigMutationResponse>(

        "notificationProviders",

        `/providers/${id}`,

        input,

      );

    },

    deliver(input: DeliverNotificationInput) {

      return api.post<DeliverNotificationResponse>("notificationProviders", "/deliver", input);

    },

    listDeliveryLogs(filters: DeliveryLogListFilters = {}) {

      return api.get<DeliveryLogListResponse>("notificationProviders", "/delivery-logs", {

        params: toDeliveryLogParams(filters),

      });

    },

    getDeliveryLog(id: string) {
      return api.get<DeliveryLogDetailResponse>("notificationProviders", `/delivery-logs/${id}`);
    },

    getAnalytics(filters: NotificationAnalyticsFilters = {}) {
      return api.get<NotificationAnalyticsResponse>("notificationProviders", "/analytics", {
        params: {
          dateStart: filters.dateStart,
          dateEnd: filters.dateEnd,
        },
      });
    },
  };
}

