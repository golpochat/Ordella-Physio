import type { NotificationChannel } from "@ordella/domain";

export type ChannelDeliveryPayload = {
  tenantId: string;
  to: string;
  subject?: string;
  body: string;
  payload?: Record<string, unknown>;
};

export type ChannelDriver = {
  send(message: ChannelDeliveryPayload): Promise<{ success: boolean; providerResponse?: string }>;
};

export class ChannelRouter {
  constructor(private readonly drivers: Record<NotificationChannel, ChannelDriver>) {}

  resolve(channel: NotificationChannel): ChannelDriver {
    const driver = this.drivers[channel];
    if (!driver) {
      throw new Error(`No driver registered for channel: ${channel}`);
    }
    return driver;
  }
}
