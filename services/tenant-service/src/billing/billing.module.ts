import { Module } from "@nestjs/common";
import { InternalBillingController } from "@/billing/internal-billing.controller";
import { InternalBillingContextController } from "@/billing/internal-billing-context.controller";
import { InternalBillingService } from "@/billing/internal-billing.service";
import { BillingContextService } from "@/billing/billing-context.service";
import { TenantBillingController } from "@/billing/tenant-billing.controller";
import { TenantBillingService } from "@/billing/tenant-billing.service";
import { TenantBillingRepository } from "@/billing/tenant-billing.repository";
import { TenantsModule } from "@/tenants/tenants.module";
import { SubscriptionModule } from "@/subscription/subscription.module";
import { OrganizationServiceClient } from "@/integrations/organization-service.client";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { TenantMatchGuard } from "@/tenants/guards/tenant-match.guard";

@Module({
  imports: [TenantsModule, SubscriptionModule],
  controllers: [InternalBillingController, InternalBillingContextController, TenantBillingController],
  providers: [
    InternalBillingService,
    BillingContextService,
    TenantBillingService,
    TenantBillingRepository,
    OrganizationServiceClient,
    JwtGuard,
    TenantMatchGuard,
  ],
})
export class BillingModule {}
