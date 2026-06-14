import {
  type INestApplication,
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { GlobalExceptionFilter } from "@ordella/errors";
import { createTenantMiddleware } from "@ordella/middleware";
import { AuthController } from "@/auth/auth.controller";
import { TokenController } from "@/controllers/token.controller";
import { MfaController } from "@/controllers/mfa.controller";
import { AuthService } from "@/auth/auth.service";
import { RefreshTokenCommand } from "@/auth/commands/refresh-token.command";
import { TokenService } from "@/services/token.service";
import { MfaService } from "@/services/mfa.service";
import { JwtStrategy } from "@/auth/strategies/jwt.strategy";
import { UsersService } from "@/users/users.service";
import { invalidCredentialsError } from "@/utils/auth-errors";

const tenantMiddleware = createTenantMiddleware({ required: false });

export const TEST_TENANT_ID = "tenant-test-1";
export const TEST_USER_ID = "user-test-1";

export const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
  refresh: jest.fn(),
  logout: jest.fn(),
  getMe: jest.fn(),
  getSession: jest.fn(),
};

export const mockRefreshTokenCommand = {
  execute: jest.fn(),
};

export const mockTokenService = {
  revokeToken: jest.fn(),
};

export const mockMfaService = {
  setupMfa: jest.fn(),
  verifyMfa: jest.fn(),
  disableMfa: jest.fn(),
  completeLoginChallenge: jest.fn(),
};

export const mockUsersService = {
  findById: jest.fn().mockResolvedValue({
    id: TEST_USER_ID,
    tenantId: TEST_TENANT_ID,
    email: "owner@test.example",
    role: "OWNER",
    isActive: true,
    tokenVersion: 0,
    emailVerified: true,
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-01T00:00:00.000Z"),
  }),
  getById: jest.fn(),
};

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController, TokenController, MfaController],
  providers: [
    JwtStrategy,
    { provide: AuthService, useValue: mockAuthService },
    { provide: RefreshTokenCommand, useValue: mockRefreshTokenCommand },
    { provide: TokenService, useValue: mockTokenService },
    { provide: MfaService, useValue: mockMfaService },
    { provide: UsersService, useValue: mockUsersService },
  ],
})
class AuthApiTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tenantMiddleware).forRoutes("*");
  }
}

export async function createAuthTestApp(): Promise<{
  app: INestApplication;
  moduleRef: TestingModule;
}> {
  const moduleRef = await Test.createTestingModule({
    imports: [AuthApiTestModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "auth-service-test" }));
  await app.init();

  return { app, moduleRef };
}

export function resetAuthMocks() {
  jest.clearAllMocks();
  mockUsersService.findById.mockResolvedValue({
    id: TEST_USER_ID,
    tenantId: TEST_TENANT_ID,
    email: "owner@test.example",
    role: "OWNER",
    isActive: true,
    tokenVersion: 0,
    emailVerified: true,
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-01T00:00:00.000Z"),
  });
  mockAuthService.login.mockImplementation(() => {
    throw invalidCredentialsError();
  });
}
