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
import { InferenceController } from "@/controllers/inference.controller";
import { InferenceService } from "@/services/inference.service";
import { JwtGuard } from "@/guards/jwt.guard";

const tenantMiddleware = createTenantMiddleware({ required: true });

export const TEST_TENANT_ID = DEFAULT_TEST_USER.tenantId;

export const mockInferenceService = {
  runTextCompletion: jest.fn(),
  runStructuredOutput: jest.fn(),
  runEmbedding: jest.fn(),
};

@Module({
  controllers: [HealthController, InferenceController],
  providers: [{ provide: InferenceService, useValue: mockInferenceService }],
})
class AiApiTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tenantMiddleware).forRoutes("*");
  }
}

export async function createAiTestApp(
  options: { auth?: "allow" | "deny"; user?: MockTestUser } = {},
): Promise<{ app: INestApplication; moduleRef: TestingModule }> {
  const authMode = options.auth ?? "allow";
  let builder = Test.createTestingModule({ imports: [AiApiTestModule] });

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
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "ai-service-test" }));

  if (authMode === "allow") {
    attachMockUser(app, options.user ?? DEFAULT_TEST_USER);
  }

  await app.init();
  return { app, moduleRef };
}

export function resetAiMocks() {
  jest.clearAllMocks();
  mockInferenceService.runTextCompletion.mockResolvedValue({
    output: "Generated note summary",
    model: "test-model",
  });
}
