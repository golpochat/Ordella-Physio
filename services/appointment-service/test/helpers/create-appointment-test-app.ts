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
import { AppointmentsController } from "@/appointments/appointments.controller";
import { AppointmentsService } from "@/appointments/appointments.service";
import { JwtGuard } from "@/appointments/guards/jwt.guard";
import { AppointmentManageGuard } from "@/guards/appointment-manage.guard";

const tenantMiddleware = createTenantMiddleware({ required: true });

export const TEST_TENANT_ID = DEFAULT_TEST_USER.tenantId;
export const TEST_APPOINTMENT_ID = "appointment-test-1";

export const mockAppointmentsService = {
  create: jest.fn(),
  listAppointments: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  patch: jest.fn(),
  reschedule: jest.fn(),
  cancelAppointment: jest.fn(),
  completeAppointment: jest.fn(),
  markNoShow: jest.fn(),
};

@Module({
  controllers: [AppointmentsController],
  providers: [{ provide: AppointmentsService, useValue: mockAppointmentsService }],
})
class AppointmentApiTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tenantMiddleware).forRoutes("*");
  }
}

export async function createAppointmentTestApp(
  options: { auth?: "allow" | "deny"; user?: MockTestUser } = {},
): Promise<{ app: INestApplication; moduleRef: TestingModule }> {
  const authMode = options.auth ?? "allow";
  let builder = Test.createTestingModule({ imports: [AppointmentApiTestModule] });

  if (authMode === "allow") {
    builder = overrideGuards(builder, [JwtGuard, TenantGuard, PermissionGuard, AppointmentManageGuard]);
  } else {
    builder = builder.overrideGuard(JwtGuard).useValue({
      canActivate: () => {
        throw new UnauthorizedException();
      },
    });
  }

  const moduleRef = await builder.compile();
  const app = moduleRef.createNestApplication();
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "appointment-service-test" }));

  if (authMode === "allow") {
    attachMockUser(app, options.user ?? DEFAULT_TEST_USER);
  }

  await app.init();
  return { app, moduleRef };
}

export function resetAppointmentMocks() {
  jest.clearAllMocks();
  mockAppointmentsService.listAppointments.mockResolvedValue({ items: [], total: 0 });
  mockAppointmentsService.findById.mockResolvedValue({
    id: TEST_APPOINTMENT_ID,
    tenantId: TEST_TENANT_ID,
    status: "SCHEDULED",
  });
}
