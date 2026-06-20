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
    return {
      healthy: Boolean(process.env.TWILIO_ACCOUNT_SID) || process.env.NODE_ENV !== "production",
    };
  }

  async send(input: SmsSendInput): Promise<ProviderSendResult> {
    const accountSid =
      (input.credentials?.accountSid as string | undefined) ?? process.env.TWILIO_ACCOUNT_SID;
    const authToken =
      (input.credentials?.authToken as string | undefined) ?? process.env.TWILIO_AUTH_TOKEN;
    const fromNumber =
      (input.credentials?.fromNumber as string | undefined) ?? process.env.TWILIO_FROM_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      this.logger.debug(`Twilio mock send to ${input.to}`);
      return {
        success: true,
        providerMessageId: `twilio-mock-${Date.now()}`,
      };
    }

    const body = new URLSearchParams({
      To: input.to,
      From: fromNumber,
      Body: input.message,
    });

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.warn(`Twilio send failed: ${response.status} ${errorText}`);
      return { success: false, errorMessage: "Twilio delivery failed" };
    }

    const payload = (await response.json()) as { sid?: string };
    return {
      success: true,
      providerMessageId: payload.sid ?? `twilio-${Date.now()}`,
    };
  }
}
