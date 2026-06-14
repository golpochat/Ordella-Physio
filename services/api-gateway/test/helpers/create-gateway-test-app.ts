import { HttpModule } from "@nestjs/axios";
import {
  type INestApplication,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { Reflector } from "@nestjs/core";
import { Test, type TestingModule } from "@nestjs/testing";
import { GlobalExceptionFilter } from "@ordella/errors";
import { createRateLimitMiddleware, InMemoryRateLimitStore } from "@ordella/middleware";
import { createProxyController } from "@/gateway/proxy/http-proxy.factory";
import { ProxyService } from "@/gateway/proxy/proxy.service";
import { GatewayController } from "@/gateway/gateway.controller";
import { GatewayService } from "@/gateway/gateway.service";
import { JwtAuthGuard } from "@/gateway/guards/jwt-auth.guard";
import { TenantContextMiddleware } from "@/gateway/middleware/tenant-context.middleware";
import { AUTH_ROUTES } from "@/routes/auth.routes";
import { TENANT_ROUTES } from "@/routes/tenant.routes";

export const mockProxyService = {
  forward: jest.fn(),
  request: jest.fn(),
};

const AuthProxyController = createProxyController(AUTH_ROUTES.base, "AUTH_SERVICE_URL", {
  public: true,
  skipTenant: true,
});

const TenantProxyController = createProxyController(TENANT_ROUTES.base, "TENANT_SERVICE_URL");

export const rateLimitStore = new InMemoryRateLimitStore();

const TestRateLimitMiddleware = createRateLimitMiddleware({
  windowMs: 60_000,
  maxRequestsPerIp: 100,
  maxRequestsPerTenant: 100,
  skipPaths: ["/health"],
  store: rateLimitStore,
});

@Module({
  imports: [HttpModule],
  controllers: [GatewayController, AuthProxyController, TenantProxyController],
  providers: [
    GatewayService,
    Reflector,
    JwtAuthGuard,
    { provide: ProxyService, useValue: mockProxyService },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
class GatewayApiTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TestRateLimitMiddleware, TenantContextMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}

export async function createGatewayTestApp(): Promise<{
  app: INestApplication;
  moduleRef: TestingModule;
}> {
  const moduleRef = await Test.createTestingModule({
    imports: [GatewayApiTestModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "api-gateway-test" }));
  await app.init();

  return { app, moduleRef };
}

export function resetRateLimitStore() {
  const internal = rateLimitStore as unknown as {
    buckets: Map<string, { count: number; resetAt: number }>;
  };
  internal.buckets.clear();
}

export function resetGatewayMocks() {
  resetRateLimitStore();
  jest.clearAllMocks();
  mockProxyService.forward.mockImplementation(
    async (_request, response, _serviceKey, user) => {
      response.status(200).json({
        proxied: true,
        userId: user?.userId,
        tenantId: user?.tenantId,
      });
    },
  );
}
