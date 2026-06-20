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
import { PrescriptionsController } from "@/controllers/prescriptions.controller";
import { FulfillmentController } from "@/controllers/fulfillment.controller";
import { PharmacyHealthController } from "@/controllers/pharmacy-health.controller";
import { PrescriptionsService } from "@/services/prescriptions.service";
import { FulfillmentService } from "@/services/fulfillment.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { DatabaseService } from "@/database/database.module";

const tenantMiddleware = createTenantMiddleware({ required: true });

export const TEST_TENANT_ID = DEFAULT_TEST_USER.tenantId;
export const TEST_PRESCRIPTION_ID = "rx-test-1";

export const mockPrescriptionsService = {
  create: jest.fn(),
  list: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  issue: jest.fn(),
  cancel: jest.fn(),
  getAuditLogs: jest.fn(),
};

export const mockFulfillmentService = {
  list: jest.fn(),
  start: jest.fn(),
  complete: jest.fn(),
  fail: jest.fn(),
  retry: jest.fn(),
};

export const mockDatabaseService = {
  $queryRaw: jest.fn().mockResolvedValue([{ "?column?": 1 }]),
};

@Module({
  controllers: [PharmacyHealthController, PrescriptionsController, FulfillmentController],
  providers: [
    { provide: PrescriptionsService, useValue: mockPrescriptionsService },
    { provide: FulfillmentService, useValue: mockFulfillmentService },
    { provide: DatabaseService, useValue: mockDatabaseService },
  ],
})
class PharmacyApiTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tenantMiddleware).forRoutes("*");
  }
}

export type CreatePharmacyTestAppOptions = {
  auth?: "allow" | "deny";
  user?: MockTestUser;
};

export async function createPharmacyTestApp(
  options: CreatePharmacyTestAppOptions = {},
): Promise<{ app: INestApplication; moduleRef: TestingModule }> {
  const authMode = options.auth ?? "allow";

  let builder = Test.createTestingModule({ imports: [PharmacyApiTestModule] });

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
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "pharmacy-service-test" }));

  if (authMode === "allow") {
    attachMockUser(app, options.user ?? DEFAULT_TEST_USER);
  }

  await app.init();
  return { app, moduleRef };
}

export function resetPharmacyMocks() {
  Object.values(mockPrescriptionsService).forEach((fn) => fn.mockReset());
  Object.values(mockFulfillmentService).forEach((fn) => fn.mockReset());
  mockDatabaseService.$queryRaw.mockResolvedValue([{ "?column?": 1 }]);
}
