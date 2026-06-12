import { Injectable, Logger } from "@nestjs/common";

import type { ProviderSendResult } from "@/services/providers/email-sendgrid.provider";



export type PushSendInput = {

  token: string;

  title: string;

  body: string;

  data?: Record<string, string>;

  credentials?: Record<string, unknown>;

};



@Injectable()

export class PushFirebaseProvider {

  private readonly logger = new Logger(PushFirebaseProvider.name);



  async ping(): Promise<{ healthy: boolean }> {
    // TODO: Integrate Firebase health check
    return { healthy: true };
  }

  async send(input: PushSendInput): Promise<ProviderSendResult> {

    // TODO: Integrate Firebase Admin SDK using input.credentials.serviceAccount

    this.logger.debug(`Firebase stub push to token ${input.token.slice(0, 8)}...`);



    return {

      success: true,

      providerMessageId: `firebase-mock-${Date.now()}`,

    };

  }

}


