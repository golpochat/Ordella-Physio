import { Injectable, Logger } from "@nestjs/common";
import { SubscriptionBillingHttpClient } from "@ordella/shared";

@Injectable()
export class SubscriptionBillingClient {
  private readonly client = new SubscriptionBillingHttpClient({
    logger: new Logger(SubscriptionBillingClient.name),
    failOpen: process.env.NODE_ENV !== "production",
  });

  enforceStaffSeat(tenantId: string) {
    return this.client.enforce({ tenantId, action: "STAFF_SEAT" });
  }
}
