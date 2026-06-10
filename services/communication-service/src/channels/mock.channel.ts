import { Injectable, Logger } from "@nestjs/common";
import type { ChannelDeliveryPayload, ChannelDriver } from "@/utils/channel-router";

@Injectable()
export class MockChannel implements ChannelDriver {
  private readonly logger = new Logger(MockChannel.name);

  async send(message: ChannelDeliveryPayload) {
    this.logger.log(`[mock] Delivered message to ${message.to}`, message);
    return { success: true, providerResponse: "mock-delivered" };
  }
}
