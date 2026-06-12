import { Injectable, Logger } from "@nestjs/common";



export type EmailSendInput = {

  to: string;

  subject: string;

  html?: string;

  text?: string;

  credentials?: Record<string, unknown>;

};



export type ProviderSendResult = {

  success: boolean;

  providerMessageId?: string;

  errorMessage?: string;

};



@Injectable()

export class EmailSendgridProvider {

  private readonly logger = new Logger(EmailSendgridProvider.name);



  async ping(): Promise<{ healthy: boolean }> {
    // TODO: Integrate SendGrid API health check
    return { healthy: true };
  }

  async send(input: EmailSendInput): Promise<ProviderSendResult> {

    // TODO: Integrate SendGrid SDK using input.credentials.apiKey

    this.logger.debug(`SendGrid stub send to ${input.to} subject="${input.subject}"`);



    return {

      success: true,

      providerMessageId: `sendgrid-mock-${Date.now()}`,

    };

  }

}


