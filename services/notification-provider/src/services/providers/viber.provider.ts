import { Injectable, Logger } from "@nestjs/common";
import type { ProviderSendResult } from "@/services/providers/email-sendgrid.provider";

export type ViberSendInput = {
  to: string;
  message: string;
  credentials?: Record<string, unknown>;
};

@Injectable()
export class ViberProvider {
  private readonly logger = new Logger(ViberProvider.name);

  async ping(): Promise<{ healthy: boolean }> {
    // TODO: Integrate Viber Bot API health check
    return { healthy: true };
  }

  async send(input: ViberSendInput): Promise<ProviderSendResult> {
    // TODO: Integrate Viber REST API using input.credentials.authToken
    this.logger.debug(`Viber stub send to ${input.to}`);

    return {
      success: true,
      providerMessageId: `viber-mock-${Date.now()}`,
    };
  }
}
