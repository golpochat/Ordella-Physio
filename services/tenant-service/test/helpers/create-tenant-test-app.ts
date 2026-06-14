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
import { PermissionGuard, RoleGuard, TenantGuard } from "@ordella/security";
import {
  attachMockUser,
  DEFAULT_TEST_USER,
  overrideGuards,
  type MockTestUser,
} from "@ordella/testing";
import { TenantsController } from "@/tenants/tenants.controller";
import { TenantsService } from "@/tenants/tenants.service";
import { TenantService } from "@/tenants/services/tenant.service";
import { TenantOrganizationService } from "@/tenants/services/tenant-organization.service";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { TenantMatchGuard } from "@/tenants/guards/tenant-match.guard";

const tenantMiddleware = createTenantMiddleware({ required: false });

export const TEST_TENANT_ID = DEFAULT_TEST_USER.tenantId;

export const mockTenantsService = {
  findDirectory: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  activate: jest.fn(),
  deactivate: jest.fn(),
  addStaff: jest.fn(),
  listStaff: jest.fn(),
  updateStaffRole: jest.fn(),
  removeStaff: jest.fn(),
  getBranding: jest.fn(),
  updateBranding: jest.fn(),
  getSubscription: jest.fn(),
  updateSubscription: jest.fn(),
  getHomeRegion: jest.fn(),
  getTenantStatus: jest.fn(),
};

export const mockTenantService = {
  createTenant: jest.fn(),
  suspendTenant: jest.fn(),
  reactivateTenant: jest.fn(),
  updateTenant: jest.fn(),
};

export const mockTenantOrganizationService = {
  listByOrganizationId: jest.fn(),
  listUnassigned: jest.fn(),
  getTenantForOrganizationLink: jest.fn(),
  setOrganizationId: jest.fn(),
};

@Module({
  controllers: [TenantsController],
  providers: [
    { provide: TenantsService, useValue: mockTenantsService },
    { provide: TenantService, useValue: mockTenantService },
    { provide: TenantOrganizationService, useValue: mockTenantOrganizationService },
  ],
})
class TenantApiTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tenantMiddleware).forRoutes("*");
  }
}

export type CreateTenantTestAppOptions = {
  auth?: "allow" | "deny";
  user?: MockTestUser;
};

export async function createTenantTestApp(
  options: CreateTenantTestAppOptions = {},
): Promise<{ app: INestApplication; moduleRef: TestingModule }> {
  const authMode = options.auth ?? "allow";

  let builder = Test.createTestingModule({ imports: [TenantApiTestModule] });

  if (authMode === "allow") {
    builder = overrideGuards(builder, [
      JwtGuard,
      TenantMatchGuard,
      PermissionGuard,
      RoleGuard,
      TenantGuard,
    ]);
  } else {
    builder = builder.overrideGuard(JwtGuard).useValue({
      canActivate: () => {
        throw new UnauthorizedException();
      },
    });
  }

  const moduleRef = await builder.compile();
  const app = moduleRef.createNestApplication();
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "tenant-service-test" }));

  if (authMode === "allow") {
    attachMockUser(app, options.user ?? DEFAULT_TEST_USER);
  }

  await app.init();
  return { app, moduleRef };
}

export function resetTenantMocks() {
  jest.clearAllMocks();
  mockTenantsService.findDirectory.mockResolvedValue({ items: [], total: 0 });
  mockTenantsService.findAll.mockResolvedValue({ items: [], total: 0, page: 1, limit: 20 });
  mockTenantsService.findById.mockResolvedValue({
    id: TEST_TENANT_ID,
    name: "Test Clinic",
    status: "ACTIVE",
  });
}
