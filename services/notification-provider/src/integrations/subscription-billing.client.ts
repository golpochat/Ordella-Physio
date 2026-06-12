import { Injectable, Logger } from "@nestjs/common";
import { SubscriptionBillingHttpClient } from "@ordella/shared";

@Injectable()
export class SubscriptionBillingClient {
  private readonly client = new SubscriptionBillingHttpClient({
    logger: new Logger(SubscriptionBillingClient.name),
    failOpen: process.env.NODE_ENV !== "production",
  });

  enforceSmsSend(tenantId: string) {
    return this.client.enforce({ tenantId, action: "SMS_SEND" });
  }

  recordSmsSent(tenantId: string) {
    return this.client.recordUsage(tenantId, "SMS_SENT", 1);
  }
}
