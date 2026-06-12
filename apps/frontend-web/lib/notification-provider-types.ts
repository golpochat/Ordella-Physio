export type NotificationChannel = "EMAIL" | "SMS" | "PUSH" | "WHATSAPP" | "VIBER";

export type NotificationProviderName = "SENDGRID" | "TWILIO" | "FIREBASE" | "VIBER" | "NONE";

export type DeliveryStatus = "SUCCESS" | "FAILED";



export type ProviderConfigRecord = {

  id: string;

  tenantId: string;

  channel: NotificationChannel;

  provider: NotificationProviderName;

  credentials: Record<string, unknown>;

  isActive: boolean;

  priority: number;

  isHealthy: boolean;

  lastHealthCheckAt: string | null;

  createdAt: string;

  updatedAt: string;

};



export type ProviderConfigListResponse = {

  data: ProviderConfigRecord[];

};



export type ProviderConfigMutationResponse = {

  message: string;

  config: ProviderConfigRecord;

};



export type DeliverNotificationInput = {

  channel: NotificationChannel;

  to: string;

  message?: string;

  subject?: string;

  title?: string;

  templateId?: string;

  variables?: Record<string, string>;

};



export type DeliverNotificationResponse = {
  queued: boolean;
  message: string;
};

export type ChannelDeliveryStats = {
  sent: number;
  failed: number;
};

export type NotificationAnalyticsResponse = {
  totals: { sent: number; failed: number };
  successRate: number;
  byChannel: Record<NotificationChannel, ChannelDeliveryStats>;
  byProvider: Record<NotificationProviderName, ChannelDeliveryStats>;
  queue: {
    pending: number;
    lastProcessedAt: string | null;
  };
};

export type NotificationAnalyticsFilters = {
  dateStart?: string;
  dateEnd?: string;
};


export type DeliveryLogRecord = {

  id: string;

  tenantId: string;

  channel: NotificationChannel;

  provider: NotificationProviderName;

  status: DeliveryStatus;

  errorMessage: string | null;

  requestPayload: Record<string, unknown>;

  responsePayload: Record<string, unknown> | null;

  retryCount: number;

  nextAttemptAt: string | null;

  createdAt: string;

  updatedAt: string;

};



export type DeliveryLogListFilters = {

  page?: number;

  limit?: number;

  channel?: NotificationChannel;

  provider?: NotificationProviderName;

  status?: DeliveryStatus;

  keyword?: string;

  dateStart?: string;

  dateEnd?: string;

};



export type DeliveryLogListResponse = {

  data: DeliveryLogRecord[];

  pagination: {

    page: number;

    limit: number;

    total: number;

    totalPages: number;

  };

};



export type DeliveryLogDetailResponse = {

  log: DeliveryLogRecord;

};


