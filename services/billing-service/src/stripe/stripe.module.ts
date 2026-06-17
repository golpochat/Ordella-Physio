import { Module } from "@nestjs/common";
import { InvoicesModule } from "@/invoices/invoices.module";
import { AiNotesMeteringRepository } from "@/stripe/ai-notes-metering.repository";
import { AiNotesMeteringService } from "@/stripe/ai-notes-metering.service";
import { InternalProvisioningController } from "@/stripe/internal-provisioning.controller";
import { StripeBillingController } from "@/stripe/stripe-billing.controller";
import { StripeWebhookController } from "@/stripe/stripe-webhook.controller";
import { StripeBillingService } from "@/stripe/stripe-billing.service";
import { StripeBillingRepository } from "@/stripe/stripe-billing.repository";
import { PlatformMetricsCacheService } from "@/stripe/platform-metrics-cache.service";
import { StripePlatformMetricsService } from "@/stripe/stripe-platform-metrics.service";
import { StripeClient } from "@/stripe/stripe.client";
import { TenantSyncClient } from "@/stripe/tenant-sync.client";
import { OrganizationSyncClient } from "@/stripe/organization-sync.client";
import { BillingTruthClient } from "@/stripe/billing-truth.client";
import { TenantCreatedConsumer } from "@/stripe/tenant-created.consumer";

@Module({
  imports: [InvoicesModule],
  controllers: [StripeBillingController, StripeWebhookController, InternalProvisioningController],
  providers: [
    StripeBillingService,
    StripeBillingRepository,
    PlatformMetricsCacheService,
    StripePlatformMetricsService,
    AiNotesMeteringService,
    AiNotesMeteringRepository,
    StripeClient,
    TenantSyncClient,
    OrganizationSyncClient,
    BillingTruthClient,
    TenantCreatedConsumer,
  ],
  exports: [StripeBillingService],
})
export class StripeModule {}
