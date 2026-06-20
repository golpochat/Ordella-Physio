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
    return {
      healthy: Boolean(process.env.FIREBASE_PROJECT_ID) || process.env.NODE_ENV !== "production",
    };
  }

  async send(input: PushSendInput): Promise<ProviderSendResult> {
    const projectId =
      (input.credentials?.projectId as string | undefined) ?? process.env.FIREBASE_PROJECT_ID;
    const serverKey =
      (input.credentials?.serverKey as string | undefined) ?? process.env.FIREBASE_SERVER_KEY;

    if (!projectId || !serverKey) {
      this.logger.debug(`Firebase mock push to token ${input.token.slice(0, 8)}...`);
      return {
        success: true,
        providerMessageId: `firebase-mock-${Date.now()}`,
      };
    }

    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization: `key=${serverKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: input.token,
        notification: { title: input.title, body: input.body },
        data: input.data ?? {},
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.warn(`Firebase push failed: ${response.status} ${errorText}`);
      return { success: false, errorMessage: "Firebase delivery failed" };
    }

    const payload = (await response.json()) as { message_id?: number | string };
    return {
      success: true,
      providerMessageId: String(payload.message_id ?? `firebase-${Date.now()}`),
    };
  }
}
