import { Injectable, Logger } from "@nestjs/common";
import { SubscriptionBillingHttpClient } from "@ordella/shared";

@Injectable()
export class SubscriptionBillingClient {
  private readonly client = new SubscriptionBillingHttpClient({
    logger: new Logger(SubscriptionBillingClient.name),
    failOpen: process.env.NODE_ENV !== "production",
  });

  enforcePatientCreate(tenantId: string) {
    return this.client.enforce({ tenantId, action: "PATIENT_CREATE" });
  }

  recordPatientCreated(tenantId: string) {
    return this.client.recordUsage(tenantId, "PATIENT_COUNT", 1);
  }
}
