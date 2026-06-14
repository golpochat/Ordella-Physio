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
import { FileController } from "@/controllers/file.controller";
import { FileStorageService } from "@/services/file-storage.service";
import { JwtGuard } from "@/guards/jwt.guard";

const tenantMiddleware = createTenantMiddleware({ required: true });

export const TEST_TENANT_ID = DEFAULT_TEST_USER.tenantId;
export const TEST_FILE_ID = "file-test-1";

export const mockFileStorageService = {
  streamFileBySignedToken: jest.fn(),
  uploadFile: jest.fn(),
  getFileMetadata: jest.fn(),
  deleteFile: jest.fn(),
  listFiles: jest.fn(),
};

@Module({
  controllers: [FileController],
  providers: [{ provide: FileStorageService, useValue: mockFileStorageService }],
})
class FileStorageApiTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tenantMiddleware).forRoutes("*");
  }
}

export async function createFileStorageTestApp(
  options: { auth?: "allow" | "deny"; user?: MockTestUser } = {},
): Promise<{ app: INestApplication; moduleRef: TestingModule }> {
  const authMode = options.auth ?? "allow";
  let builder = Test.createTestingModule({ imports: [FileStorageApiTestModule] });

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
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "file-storage-service-test" }));

  if (authMode === "allow") {
    attachMockUser(app, options.user ?? DEFAULT_TEST_USER);
  }

  await app.init();
  return { app, moduleRef };
}

export function resetFileStorageMocks() {
  jest.clearAllMocks();
  mockFileStorageService.listFiles.mockResolvedValue({ items: [], total: 0 });
  mockFileStorageService.getFileMetadata.mockResolvedValue({
    id: TEST_FILE_ID,
    tenantId: TEST_TENANT_ID,
    filename: "report.pdf",
  });
}
