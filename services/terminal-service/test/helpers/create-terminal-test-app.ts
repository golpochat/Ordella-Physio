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
import { TerminalController } from "@/controllers/terminal.controller";
import { PairingController } from "@/controllers/pairing.controller";
import { PosSessionController } from "@/controllers/pos-session.controller";
import { TerminalService } from "@/services/terminal.service";
import { PairingService } from "@/services/pairing.service";
import { PosSessionService } from "@/services/pos-session.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { TerminalManageGuard } from "@/guards/terminal-manage.guard";
import { DatabaseService } from "@/database/database.module";

const tenantMiddleware = createTenantMiddleware({ required: true });

export const TEST_TENANT_ID = DEFAULT_TEST_USER.tenantId;
export const TEST_TERMINAL_ID = "term-test-1";
export const TEST_SESSION_ID = "pos-session-test-1";

export const mockTerminalService = {
  listTerminals: jest.fn(),
  createTerminal: jest.fn(),
  getTerminal: jest.fn(),
  updateTerminal: jest.fn(),
  deactivateTerminal: jest.fn(),
  activateTerminal: jest.fn(),
};

export const mockPairingService = {
  generatePairingCode: jest.fn(),
  claimPairingCode: jest.fn(),
  heartbeat: jest.fn(),
};

export const mockPosSessionService = {
  openSession: jest.fn(),
  listSessions: jest.fn(),
  getSession: jest.fn(),
  addItem: jest.fn(),
  createPaymentIntent: jest.fn(),
  closeSession: jest.fn(),
  reconcileSession: jest.fn(),
};

export const mockDatabaseService = {
  $queryRaw: jest.fn().mockResolvedValue([{ "?column?": 1 }]),
};

@Module({
  controllers: [TerminalController, PairingController, PosSessionController],
  providers: [
    { provide: TerminalService, useValue: mockTerminalService },
    { provide: PairingService, useValue: mockPairingService },
    { provide: PosSessionService, useValue: mockPosSessionService },
    { provide: DatabaseService, useValue: mockDatabaseService },
  ],
})
class TerminalApiTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tenantMiddleware).forRoutes("*");
  }
}

export type CreateTerminalTestAppOptions = {
  auth?: "allow" | "deny";
  user?: MockTestUser;
};

export async function createTerminalTestApp(
  options: CreateTerminalTestAppOptions = {},
): Promise<{ app: INestApplication; moduleRef: TestingModule }> {
  const authMode = options.auth ?? "allow";

  let builder = Test.createTestingModule({ imports: [TerminalApiTestModule] });

  if (authMode === "allow") {
    builder = overrideGuards(builder, [JwtGuard, TenantGuard, PermissionGuard, TerminalManageGuard]);
  } else {
    builder = builder.overrideGuard(JwtGuard).useValue({
      canActivate: () => {
        throw new UnauthorizedException();
      },
    });
  }

  const moduleRef = await builder.compile();
  const app = moduleRef.createNestApplication();
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "terminal-service-test" }));

  if (authMode === "allow") {
    attachMockUser(app, options.user ?? DEFAULT_TEST_USER);
  }

  await app.init();
  return { app, moduleRef };
}

export function resetTerminalMocks(): void {
  jest.clearAllMocks();
  mockDatabaseService.$queryRaw.mockResolvedValue([{ "?column?": 1 }]);
}
