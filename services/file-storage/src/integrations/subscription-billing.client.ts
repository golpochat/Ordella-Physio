import { Injectable, Logger } from "@nestjs/common";
import { SubscriptionBillingHttpClient } from "@ordella/shared";

@Injectable()
export class SubscriptionBillingClient {
  private readonly client = new SubscriptionBillingHttpClient({
    logger: new Logger(SubscriptionBillingClient.name),
    failOpen: process.env.NODE_ENV !== "production",
  });

  enforceFileUpload(tenantId: string, sizeBytes: number) {
    return this.client.enforce({ tenantId, action: "FILE_UPLOAD", quantity: sizeBytes });
  }

  recordStorageUsage(tenantId: string, sizeBytes: number) {
    const mb = Math.max(1, Math.ceil(sizeBytes / (1024 * 1024)));
    return this.client.recordUsage(tenantId, "STORAGE_MB", mb);
  }
}
