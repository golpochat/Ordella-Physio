import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { GatewayController } from "@/controllers/gateway.controller";
import { HealthController } from "@/controllers/health.controller";
import { UsageController } from "@/controllers/usage.controller";
import { JwtGuard } from "@/guards/jwt.guard";
import { AiCostSyncClient } from "@/integrations/ai-cost-sync.client";
import { AiInferenceClient } from "@/integrations/ai-inference.client";
import { AiObservabilityClient } from "@/integrations/ai-observability.client";
import { AiSecurityClient } from "@/integrations/ai-security.client";
import { BudgetCheckMiddleware } from "@/middleware/budget-check.middleware";
import { GatewayAuthMiddleware } from "@/middleware/gateway-auth.middleware";
import { ObservabilityTracingMiddleware } from "@/middleware/observability.middleware";
import { RateLimitMiddleware } from "@/middleware/rate-limit.middleware";
import { SecurityAccessMiddleware, SecurityPiiMiddleware } from "@/middleware/security.middleware";
import { GatewayRepository } from "@/repositories/gateway.repository";
import { AbuseDetectionService } from "@/services/abuse-detection.service";
import { BudgetService } from "@/services/budget.service";
import { GatewayKeyService } from "@/services/gateway-key.service";
import { RateLimitService } from "@/services/rate-limit.service";
import { UsageTrackingService } from "@/services/usage-tracking.service";
import { JwtStrategy } from "@/strategies/jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [HealthController, GatewayController, UsageController],
  providers: [
    GatewayRepository,
    GatewayKeyService,
    RateLimitService,
    BudgetService,
    UsageTrackingService,
    AbuseDetectionService,
    AiInferenceClient,
    AiCostSyncClient,
    AiSecurityClient,
    AiObservabilityClient,
    JwtStrategy,
    JwtGuard,
    GatewayAuthMiddleware,
    RateLimitMiddleware,
    BudgetCheckMiddleware,
    SecurityAccessMiddleware,
    SecurityPiiMiddleware,
    ObservabilityTracingMiddleware,
  ],
})
export class AiGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        GatewayAuthMiddleware,
        SecurityAccessMiddleware,
        SecurityPiiMiddleware,
        ObservabilityTracingMiddleware,
        RateLimitMiddleware,
        BudgetCheckMiddleware,
      )
      .forRoutes(
        { path: "gateway/inference", method: RequestMethod.POST },
        { path: "gateway/embeddings", method: RequestMethod.POST },
      );
  }
}
