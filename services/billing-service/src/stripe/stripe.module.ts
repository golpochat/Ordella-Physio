import { Module } from "@nestjs/common";
import { InvoicesModule } from "@/invoices/invoices.module";
import { StripeBillingController } from "@/stripe/stripe-billing.controller";
import { StripeWebhookController } from "@/stripe/stripe-webhook.controller";
import { StripeBillingService } from "@/stripe/stripe-billing.service";
import { StripeBillingRepository } from "@/stripe/stripe-billing.repository";
import { StripeClient } from "@/stripe/stripe.client";
import { TenantSyncClient } from "@/stripe/tenant-sync.client";
import { TenantCreatedConsumer } from "@/stripe/tenant-created.consumer";

@Module({
  imports: [InvoicesModule],
  controllers: [StripeBillingController, StripeWebhookController],
  providers: [
    StripeBillingService,
    StripeBillingRepository,
    StripeClient,
    TenantSyncClient,
    TenantCreatedConsumer,
  ],
  exports: [StripeBillingService],
})
export class StripeModule {}
