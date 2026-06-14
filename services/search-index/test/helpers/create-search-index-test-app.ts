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
import { SearchController } from "@/controllers/search.controller";
import { FederatedSearchService } from "@/services/federated-search.service";
import { SearchIndexService } from "@/services/search-index.service";
import { JwtGuard } from "@/guards/jwt.guard";

const tenantMiddleware = createTenantMiddleware({ required: true });

export const TEST_TENANT_ID = DEFAULT_TEST_USER.tenantId;

export const mockSearchIndexService = {
  search: jest.fn(),
  suggest: jest.fn(),
};

export const mockFederatedSearchService = {
  searchAll: jest.fn(),
  searchTopHits: jest.fn(),
};

@Module({
  controllers: [HealthController, SearchController],
  providers: [
    { provide: SearchIndexService, useValue: mockSearchIndexService },
    { provide: FederatedSearchService, useValue: mockFederatedSearchService },
  ],
})
class SearchIndexApiTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tenantMiddleware).forRoutes("*");
  }
}

export async function createSearchIndexTestApp(
  options: { auth?: "allow" | "deny"; user?: MockTestUser } = {},
): Promise<{ app: INestApplication; moduleRef: TestingModule }> {
  const authMode = options.auth ?? "allow";
  let builder = Test.createTestingModule({ imports: [SearchIndexApiTestModule] });

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
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "search-index-service-test" }));

  if (authMode === "allow") {
    attachMockUser(app, options.user ?? DEFAULT_TEST_USER);
  }

  await app.init();
  return { app, moduleRef };
}

export function resetSearchIndexMocks() {
  jest.clearAllMocks();
  mockFederatedSearchService.searchAll.mockResolvedValue({ hits: [], total: 0 });
  mockFederatedSearchService.searchTopHits.mockResolvedValue({ hits: [], total: 0 });
}
