import { Module } from "@nestjs/common";
import { UsageMetricsClient } from "@/integrations/usage-metrics.client";
import { BillingEnforcementService } from "@/enforcement/billing-enforcement.service";
import { BillingInternalEnforcementController } from "@/enforcement/billing-internal-enforcement.controller";
import { TenantSubscriptionClient } from "@/enforcement/tenant-subscription.client";

@Module({
  controllers: [BillingInternalEnforcementController],
  providers: [BillingEnforcementService, UsageMetricsClient, TenantSubscriptionClient],
  exports: [BillingEnforcementService],
})
export class EnforcementModule {}
