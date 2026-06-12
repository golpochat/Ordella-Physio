import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AnalyticsController } from "@/controllers/analytics.controller";
import { DeliveryController } from "@/controllers/delivery.controller";
import { DeliveryLogController } from "@/controllers/delivery-log.controller";
import { HealthController } from "@/controllers/health.controller";
import { InternalDeliveryController } from "@/controllers/internal-delivery.controller";
import { ProviderController } from "@/controllers/provider.controller";
import { DeliveryLogRepository } from "@/repositories/delivery-log.repository";
import { ProviderConfigRepository } from "@/repositories/provider-config.repository";
import { AnalyticsService } from "@/services/analytics.service";
import { BatchDeliveryService } from "@/services/batch-delivery.service";
import { DeliveryLogService } from "@/services/delivery-log.service";
import { DeliveryQueueService } from "@/services/delivery-queue.service";
import { DeliveryService } from "@/services/delivery.service";
import { FailoverService } from "@/services/failover.service";
import { ProviderConfigService } from "@/services/provider-config.service";
import { ProviderHealthService } from "@/services/provider-health.service";
import { ProviderRegistryService } from "@/services/provider-registry.service";
import { RateLimitService } from "@/services/rate-limit.service";
import { RetryService } from "@/services/retry.service";
import { EmailSendgridProvider } from "@/services/providers/email-sendgrid.provider";
import { PushFirebaseProvider } from "@/services/providers/push-firebase.provider";
import { SmsTwilioProvider } from "@/services/providers/sms-twilio.provider";
import { ViberProvider } from "@/services/providers/viber.provider";
import { WhatsappTwilioProvider } from "@/services/providers/whatsapp-twilio.provider";
import { SubscriptionBillingClient } from "@/integrations/subscription-billing.client";
import { JwtStrategy } from "@/strategies/jwt.strategy";
import { JwtGuard } from "@/guards/jwt.guard";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [
    HealthController,
    ProviderController,
    DeliveryController,
    DeliveryLogController,
    AnalyticsController,
    InternalDeliveryController,
  ],
  providers: [
    ProviderConfigService,
    DeliveryLogService,
    DeliveryService,
    DeliveryQueueService,
    FailoverService,
    BatchDeliveryService,
    AnalyticsService,
    RetryService,
    ProviderHealthService,
    RateLimitService,
    ProviderRegistryService,
    EmailSendgridProvider,
    SmsTwilioProvider,
    PushFirebaseProvider,
    WhatsappTwilioProvider,
    ViberProvider,
    ProviderConfigRepository,
    DeliveryLogRepository,
    SubscriptionBillingClient,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [DeliveryService, ProviderConfigService, DeliveryLogService],
})
export class NotificationProviderModule {}
