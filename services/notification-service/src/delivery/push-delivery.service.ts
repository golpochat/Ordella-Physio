import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class PushDeliveryService {
  private readonly logger = new Logger(PushDeliveryService.name);

  async sendToTokens(input: {
    tokens: string[];
    title: string;
    message: string;
    metadata?: Record<string, unknown>;
  }) {
    if (!input.tokens.length) {
      return { delivered: 0 };
    }

    // FCM server key wiring is environment-specific; log for observability until configured.
    this.logger.log(
      `Push placeholder — would deliver "${input.title}" to ${input.tokens.length} device token(s)`,
    );

    return { delivered: input.tokens.length };
  }
}
