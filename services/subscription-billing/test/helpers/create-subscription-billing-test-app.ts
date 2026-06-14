import {
  type INestApplication,
  MiddlewareConsumer,
  Module,
  NestModule,
  UnauthorizedException,
} from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { GlobalExceptionFilter } from "@ordella/errors";
import { createTenantMiddleware } from "@ordella/middleware";
import { PermissionGuard, TenantGuard } from "@ordella/security";
import {
  attachMockUser,
  DEFAULT_TEST_USER,
  overrideGuards,
  type MockTestUser,
} from "@ordella/testing";
import { HealthController } from "@/controllers/health.controller";
import { SubscriptionController } from "@/controllers/subscription.controller";
import { SubscriptionService } from "@/services/subscription.service";
import { JwtGuard } from "@/guards/jwt.guard";

const tenantMiddleware = createTenantMiddleware({ required: true });

export const TEST_TENANT_ID = DEFAULT_TEST_USER.tenantId;

export const mockSubscriptionService = {
  getSubscriptionStatus: jest.fn(),
  subscribeTenant: jest.fn(),
  cancelSubscription: jest.fn(),
  resumeSubscription: jest.fn(),
};

@Module({
  controllers: [HealthController, SubscriptionController],
  providers: [{ provide: SubscriptionService, useValue: mockSubscriptionService }],
})
class SubscriptionBillingApiTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tenantMiddleware).forRoutes("*");
  }
}

export async function createSubscriptionBillingTestApp(
  options: { auth?: "allow" | "deny"; user?: MockTestUser } = {},
): Promise<{ app: INestApplication; moduleRef: TestingModule }> {
  const authMode = options.auth ?? "allow";
  let builder = Test.createTestingModule({ imports: [SubscriptionBillingApiTestModule] });

  if (authMode === "allow") {
    builder = overrideGuards(builder, [JwtGuard, TenantGuard, PermissionGuard]);
  } else {
    builder = builder.overrideGuard(JwtGuard).useValue({
      canActivate: () => {
        throw new UnauthorizedException();
      },
    });
  }

  const moduleRef = await builder.compile();
  const app = moduleRef.createNestApplication();
  app.useGlobalFilters(
    new GlobalExceptionFilter({ loggerContext: "subscription-billing-service-test" }),
  );

  if (authMode === "allow") {
    attachMockUser(app, options.user ?? DEFAULT_TEST_USER);
  }

  await app.init();
  return { app, moduleRef };
}

export function resetSubscriptionBillingMocks() {
  jest.clearAllMocks();
  mockSubscriptionService.getSubscriptionStatus.mockResolvedValue({
    tenantId: TEST_TENANT_ID,
    plan: "PRO",
    status: "ACTIVE",
  });
}
