import { Injectable, Logger } from "@nestjs/common";
import { isValidWebhookUrl } from "@/utils/communication-helpers";
import type { ChannelDeliveryPayload, ChannelDriver } from "@/utils/channel-router";

@Injectable()
export class WebhookChannel implements ChannelDriver {
  private readonly logger = new Logger(WebhookChannel.name);

  async send(message: ChannelDeliveryPayload) {
    if (!isValidWebhookUrl(message.to)) {
      return { success: false, providerResponse: "Invalid webhook URL" };
    }

    this.logger.log(`[placeholder] POST webhook to ${message.to}`, {
      tenantId: message.tenantId,
      payload: message.payload,
    });
    return { success: true, providerResponse: "webhook-queued" };
  }
}
