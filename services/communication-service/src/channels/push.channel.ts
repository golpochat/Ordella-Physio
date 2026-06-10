import { Injectable, Logger } from "@nestjs/common";
import type { ChannelDeliveryPayload, ChannelDriver } from "@/utils/channel-router";

@Injectable()
export class PushChannel implements ChannelDriver {
  private readonly logger = new Logger(PushChannel.name);

  async send(message: ChannelDeliveryPayload) {
    this.logger.log(`[placeholder] Sending push to device ${message.to}`, {
      tenantId: message.tenantId,
    });
    return { success: true, providerResponse: "push-queued" };
  }
}
