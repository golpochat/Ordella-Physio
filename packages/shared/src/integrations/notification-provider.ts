export type OutboundNotificationPayload = {
  channel: "EMAIL" | "SMS" | "PUSH" | "WHATSAPP" | "VIBER";
  to: string;
  templateId?: string;
  variables?: Record<string, string>;
  metadata?: Record<string, unknown>;
  message?: string;
  subject?: string;
  title?: string;
  html?: string;
};

export type QueueDeliveryResponse = {
  queued: boolean;
  message: string;
};

export type NotificationProviderClientOptions = {
  baseUrl?: string;
  logger?: Pick<Console, "warn">;
};

export class NotificationProviderHttpClient {
  private readonly baseUrl: string;
  private readonly logger: Pick<Console, "warn">;

  constructor(options: NotificationProviderClientOptions = {}) {
    this.baseUrl = (
      options.baseUrl ??
      process.env.NOTIFICATION_PROVIDER_SERVICE_URL ??
      "http://notification-provider-service:3072"
    ).replace(/\/$/, "");
    this.logger = options.logger ?? console;
  }

  async queueDelivery(
    tenantId: string,
    payload: OutboundNotificationPayload,
  ): Promise<QueueDeliveryResponse> {
    const response = await fetch(`${this.baseUrl}/notification-providers/internal/deliver`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ tenantId, ...payload }),
    });

    if (!response.ok) {
      this.logger.warn(`Notification provider queue failed: HTTP ${response.status}`);
      throw new Error(`Notification provider queue failed with status ${response.status}`);
    }

    return (await response.json()) as QueueDeliveryResponse;
  }
}
