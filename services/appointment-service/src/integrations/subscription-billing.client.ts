import { Injectable, Logger } from "@nestjs/common";
import { SubscriptionBillingHttpClient } from "@ordella/shared";

@Injectable()
export class SubscriptionBillingClient {
  private readonly client = new SubscriptionBillingHttpClient({
    logger: new Logger(SubscriptionBillingClient.name),
    failOpen: process.env.NODE_ENV !== "production",
  });

  enforceAppointmentCreate(tenantId: string) {
    return this.client.enforce({ tenantId, action: "APPOINTMENT_CREATE" });
  }

  recordAppointmentCreated(tenantId: string) {
    return this.client.recordUsage(tenantId, "APPOINTMENT_COUNT", 1);
  }
}
