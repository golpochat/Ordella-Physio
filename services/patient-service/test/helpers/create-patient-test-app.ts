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
import { PatientsController } from "@/patients/patients.controller";
import { PatientsService } from "@/patients/patients.service";
import { JwtGuard } from "@/patients/guards/jwt.guard";
import { PatientListGuard } from "@/patients/guards/patient-list.guard";
import { PatientManageGuard } from "@/patients/guards/patient-manage.guard";
import { PatientUpdateManageGuard } from "@/patients/guards/patient-update-manage.guard";

const tenantMiddleware = createTenantMiddleware({ required: true });

export const TEST_TENANT_ID = DEFAULT_TEST_USER.tenantId;
export const TEST_PATIENT_ID = "patient-test-1";

export const mockPatientsService = {
  create: jest.fn(),
  listPatients: jest.fn(),
  findById: jest.fn(),
  deactivatePatient: jest.fn(),
  activatePatient: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getMedicalRecord: jest.fn(),
  updateMedicalRecord: jest.fn(),
  getNotesLookup: jest.fn(),
  getAiContext: jest.fn(),
};

@Module({
  controllers: [PatientsController],
  providers: [{ provide: PatientsService, useValue: mockPatientsService }],
})
class PatientApiTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tenantMiddleware).forRoutes("*");
  }
}

export type CreatePatientTestAppOptions = {
  auth?: "allow" | "deny";
  user?: MockTestUser;
};

export async function createPatientTestApp(
  options: CreatePatientTestAppOptions = {},
): Promise<{ app: INestApplication; moduleRef: TestingModule }> {
  const authMode = options.auth ?? "allow";

  let builder = Test.createTestingModule({ imports: [PatientApiTestModule] });

  if (authMode === "allow") {
    builder = overrideGuards(builder, [
      JwtGuard,
      TenantGuard,
      PermissionGuard,
      PatientListGuard,
      PatientManageGuard,
      PatientUpdateManageGuard,
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
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "patient-service-test" }));

  if (authMode === "allow") {
    attachMockUser(app, options.user ?? DEFAULT_TEST_USER);
  }

  await app.init();
  return { app, moduleRef };
}

export function resetPatientMocks() {
  jest.clearAllMocks();
  mockPatientsService.listPatients.mockResolvedValue({ items: [], total: 0 });
  mockPatientsService.findById.mockResolvedValue({
    id: TEST_PATIENT_ID,
    tenantId: TEST_TENANT_ID,
    firstName: "Jane",
    lastName: "Doe",
  });
}
