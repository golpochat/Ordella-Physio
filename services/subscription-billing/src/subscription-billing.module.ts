import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AnalyticsController } from "@/controllers/analytics.controller";
import { BillingPortalController } from "@/controllers/billing-portal.controller";
import { FeatureController } from "@/controllers/feature.controller";
import { HealthController } from "@/controllers/health.controller";
import { InternalEnforcementController } from "@/controllers/internal-enforcement.controller";
import { InvoiceController } from "@/controllers/invoice.controller";
import { PlanController } from "@/controllers/plan.controller";
import { StripeWebhookController } from "@/controllers/stripe-webhook.controller";
import { SubscriptionController } from "@/controllers/subscription.controller";
import { UsageController } from "@/controllers/usage.controller";
import { BillingNotificationClient } from "@/integrations/billing-notification.client";
import { UsageMetricsClient } from "@/integrations/usage-metrics.client";
import { DunningRecordRepository } from "@/repositories/dunning-record.repository";
import { FeatureFlagRepository } from "@/repositories/feature-flag.repository";
import { PlanRepository } from "@/repositories/plan.repository";
import { SubscriptionInvoiceRepository } from "@/repositories/subscription-invoice.repository";
import { UsageRecordRepository } from "@/repositories/usage-record.repository";
import { TenantSubscriptionRepository } from "@/repositories/tenant-subscription.repository";
import { DunningService } from "@/services/dunning.service";
import { EnforcementService } from "@/services/enforcement.service";
import { FeatureGateService } from "@/services/feature-gate.service";
import { InvoiceSyncService } from "@/services/invoice-sync.service";
import { OverageService } from "@/services/overage.service";
import { PlanService } from "@/services/plan.service";
import { ProrationService } from "@/services/proration.service";
import { RevenueAnalyticsService } from "@/services/revenue-analytics.service";
import { SeatService } from "@/services/seat.service";
import { StripeService } from "@/services/stripe.service";
import { StripeWebhookService } from "@/services/stripe-webhook.service";
import { SubscriptionService } from "@/services/subscription.service";
import { UsageService } from "@/services/usage.service";
import { JwtStrategy } from "@/strategies/jwt.strategy";
import { JwtGuard } from "@/guards/jwt.guard";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [
    HealthController,
    PlanController,
    SubscriptionController,
    StripeWebhookController,
    UsageController,
    FeatureController,
    InternalEnforcementController,
    AnalyticsController,
    BillingPortalController,
    InvoiceController,
  ],
  providers: [
    PlanService,
    SubscriptionService,
    UsageService,
    SeatService,
    FeatureGateService,
    OverageService,
    EnforcementService,
    InvoiceSyncService,
    ProrationService,
    DunningService,
    RevenueAnalyticsService,
    StripeService,
    StripeWebhookService,
    BillingNotificationClient,
    UsageMetricsClient,
    PlanRepository,
    TenantSubscriptionRepository,
    UsageRecordRepository,
    FeatureFlagRepository,
    SubscriptionInvoiceRepository,
    DunningRecordRepository,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [PlanService, SubscriptionService],
})
export class SubscriptionBillingModule {}
