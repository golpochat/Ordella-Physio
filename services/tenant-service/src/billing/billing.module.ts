import { Module } from "@nestjs/common";
import { InternalBillingController } from "@/billing/internal-billing.controller";
import { InternalBillingService } from "@/billing/internal-billing.service";
import { TenantsModule } from "@/tenants/tenants.module";
import { SubscriptionModule } from "@/subscription/subscription.module";

@Module({
  imports: [TenantsModule, SubscriptionModule],
  controllers: [InternalBillingController],
  providers: [InternalBillingService],
})
export class BillingModule {}
