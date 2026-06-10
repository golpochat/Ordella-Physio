import { Injectable, Logger } from "@nestjs/common";
import { Phone } from "@ordella/domain";
import type { ChannelDeliveryPayload, ChannelDriver } from "@/utils/channel-router";

@Injectable()
export class SmsChannel implements ChannelDriver {
  private readonly logger = new Logger(SmsChannel.name);

  async send(message: ChannelDeliveryPayload) {
    const phoneResult = Phone.create(message.to);
    if (phoneResult.isFailure) {
      return { success: false, providerResponse: String(phoneResult.error) };
    }

    this.logger.log(`[placeholder] Sending SMS to ${message.to}`, { tenantId: message.tenantId });
    return { success: true, providerResponse: "sms-queued" };
  }
}
