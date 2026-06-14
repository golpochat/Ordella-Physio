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
import {
  BillingHealthController,
  InvoicesController,
} from "@/invoices/invoices.controller";
import { InvoicesService } from "@/invoices/invoices.service";
import { JwtGuard } from "@/invoices/guards/jwt.guard";

const tenantMiddleware = createTenantMiddleware({ required: true });

export const TEST_TENANT_ID = DEFAULT_TEST_USER.tenantId;
export const TEST_INVOICE_ID = "invoice-test-1";

export const mockInvoicesService = {
  create: jest.fn(),
  list: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  markPaid: jest.fn(),
  voidInvoice: jest.fn(),
  addItem: jest.fn(),
  updateItem: jest.fn(),
  removeItem: jest.fn(),
};

@Module({
  controllers: [BillingHealthController, InvoicesController],
  providers: [{ provide: InvoicesService, useValue: mockInvoicesService }],
})
class BillingApiTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tenantMiddleware).forRoutes("*");
  }
}

export async function createBillingTestApp(
  options: { auth?: "allow" | "deny"; user?: MockTestUser } = {},
): Promise<{ app: INestApplication; moduleRef: TestingModule }> {
  const authMode = options.auth ?? "allow";
  let builder = Test.createTestingModule({ imports: [BillingApiTestModule] });

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
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "billing-service-test" }));

  if (authMode === "allow") {
    attachMockUser(app, options.user ?? DEFAULT_TEST_USER);
  }

  await app.init();
  return { app, moduleRef };
}

export function resetBillingMocks() {
  jest.clearAllMocks();
  mockInvoicesService.list.mockResolvedValue({ items: [], total: 0 });
  mockInvoicesService.findById.mockResolvedValue({
    id: TEST_INVOICE_ID,
    tenantId: TEST_TENANT_ID,
    status: "DRAFT",
    totalCents: 10000,
  });
}
