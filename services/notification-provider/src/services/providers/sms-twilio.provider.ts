import { Injectable, Logger } from "@nestjs/common";

import type { ProviderSendResult } from "@/services/providers/email-sendgrid.provider";



export type SmsSendInput = {

  to: string;

  message: string;

  credentials?: Record<string, unknown>;

};



@Injectable()

export class SmsTwilioProvider {

  private readonly logger = new Logger(SmsTwilioProvider.name);



  async ping(): Promise<{ healthy: boolean }> {
    // TODO: Integrate Twilio API health check
    return { healthy: true };
  }

  async send(input: SmsSendInput): Promise<ProviderSendResult> {

    // TODO: Integrate Twilio SDK using input.credentials.accountSid and authToken

    this.logger.debug(`Twilio stub send to ${input.to}`);



    return {

      success: true,

      providerMessageId: `twilio-mock-${Date.now()}`,

    };

  }

}


