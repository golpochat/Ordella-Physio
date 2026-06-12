import { Injectable, Logger } from "@nestjs/common";
import type { ProviderSendResult } from "@/services/providers/email-sendgrid.provider";

export type WhatsappSendInput = {
  to: string;
  message: string;
  credentials?: Record<string, unknown>;
};

@Injectable()
export class WhatsappTwilioProvider {
  private readonly logger = new Logger(WhatsappTwilioProvider.name);

  async ping(): Promise<{ healthy: boolean }> {
    // TODO: Integrate Twilio WhatsApp health check
    return { healthy: true };
  }

  async send(input: WhatsappSendInput): Promise<ProviderSendResult> {
    // TODO: Integrate Twilio WhatsApp SDK using input.credentials
    this.logger.debug(`Twilio WhatsApp stub send to ${input.to}`);

    return {
      success: true,
      providerMessageId: `twilio-whatsapp-mock-${Date.now()}`,
    };
  }
}
