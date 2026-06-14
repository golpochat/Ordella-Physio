import {
  type INestApplication,
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { GlobalExceptionFilter } from "@ordella/errors";
import { createTenantMiddleware } from "@ordella/middleware";
import { GatewayController } from "@/controllers/gateway.controller";
import { HealthController } from "@/controllers/health.controller";
import { AiInferenceClient } from "@/integrations/ai-inference.client";
import { AiObservabilityClient } from "@/integrations/ai-observability.client";
import { AiSecurityClient } from "@/integrations/ai-security.client";
import { AbuseDetectionService } from "@/services/abuse-detection.service";
import { GatewayKeyService } from "@/services/gateway-key.service";
import { RateLimitService } from "@/services/rate-limit.service";
import { UsageTrackingService } from "@/services/usage-tracking.service";

const tenantMiddleware = createTenantMiddleware({ required: false });

export const mockInferenceClient = { runInference: jest.fn() };
export const mockSecurityClient = { validateRequest: jest.fn() };
export const mockObservabilityClient = { recordTrace: jest.fn() };
export const mockGatewayKeyService = { validateKey: jest.fn() };
export const mockRateLimitService = { checkLimit: jest.fn() };
export const mockUsageTrackingService = { trackUsage: jest.fn() };
export const mockAbuseDetectionService = { evaluate: jest.fn() };

@Module({
  controllers: [HealthController, GatewayController],
  providers: [
    { provide: AiInferenceClient, useValue: mockInferenceClient },
    { provide: AiSecurityClient, useValue: mockSecurityClient },
    { provide: AiObservabilityClient, useValue: mockObservabilityClient },
    { provide: GatewayKeyService, useValue: mockGatewayKeyService },
    { provide: RateLimitService, useValue: mockRateLimitService },
    { provide: UsageTrackingService, useValue: mockUsageTrackingService },
    { provide: AbuseDetectionService, useValue: mockAbuseDetectionService },
  ],
})
class AiGatewayApiTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tenantMiddleware).forRoutes("*");
  }
}

export async function createAiGatewayTestApp(): Promise<{
  app: INestApplication;
  moduleRef: TestingModule;
}> {
  const moduleRef = await Test.createTestingModule({
    imports: [AiGatewayApiTestModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "ai-gateway-service-test" }));
  await app.init();
  return { app, moduleRef };
}

export function resetAiGatewayMocks() {
  jest.clearAllMocks();
  mockGatewayKeyService.validateKey.mockResolvedValue({ valid: false });
  mockRateLimitService.checkLimit.mockResolvedValue({ allowed: true });
}
