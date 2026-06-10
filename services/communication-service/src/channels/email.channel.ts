import { Injectable, Logger } from "@nestjs/common";
import type { ChannelDeliveryPayload, ChannelDriver } from "@/utils/channel-router";

@Injectable()
export class EmailChannel implements ChannelDriver {
  private readonly logger = new Logger(EmailChannel.name);

  async send(message: ChannelDeliveryPayload) {
    this.logger.log(`[placeholder] Sending email to ${message.to}`, {
      subject: message.subject,
      tenantId: message.tenantId,
    });
    return { success: true, providerResponse: "email-queued" };
  }
}
