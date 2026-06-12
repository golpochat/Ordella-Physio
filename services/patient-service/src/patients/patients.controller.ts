import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { updateMedicalRecordSchema, UseZodValidation } from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { PatientListGuard } from "@/patients/guards/patient-list.guard";
import { PatientManageGuard } from "@/patients/guards/patient-manage.guard";
import { PatientUpdateManageGuard } from "@/patients/guards/patient-update-manage.guard";
import type { OrdellaRequest } from "@ordella/middleware";
import { PatientsService } from "@/patients/patients.service";
import { JwtGuard } from "@/patients/guards/jwt.guard";
import { TenantId } from "@/patients/guards/tenant-id.decorator";
import { CurrentUser } from "@/patients/guards/current-user.decorator";
import type { AuthenticatedPatientUser } from "@/utils/patient-helpers";
import type { UpdateMedicalRecordDto } from "@/medical-records/dto/update-medical-record.dto";

@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "patient-service" };
  }

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PatientManageGuard)
  create(
    @TenantId() tenantId: string,
    @Body() payload: unknown,
    @Req() request: OrdellaRequest,
    @CurrentUser() user: AuthenticatedPatientUser,
  ) {
    return this.patientsService.create(tenantId, payload, request.correlationId, {
      userId: user.userId,
      role: user.role,
      ipAddress: request.ip,
      userAgent: request.get("user-agent") ?? undefined,
    });
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PatientListGuard)
  listPatients(@TenantId() tenantId: string, @Query() query: Record<string, unknown>) {
    return this.patientsService.listPatients(tenantId, query);
  }

  @Get(":id/ai-context")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("ai.use")
  getAiContext(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.patientsService.getAiContext(tenantId, id);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("patient.read")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.patientsService.findById(tenantId, id);
  }

  @Post(":id/deactivate")
  @UseGuards(JwtGuard, TenantGuard, PatientManageGuard)
  deactivate(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.patientsService.deactivatePatient(tenantId, id);
  }

  @Post(":id/activate")
  @UseGuards(JwtGuard, TenantGuard, PatientManageGuard)
  activate(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.patientsService.activatePatient(tenantId, id);
  }

  @Put(":id")
  @UseGuards(JwtGuard, TenantGuard, PatientUpdateManageGuard)
  update(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() payload: unknown,
    @Req() request: OrdellaRequest,
    @CurrentUser() user: AuthenticatedPatientUser,
  ) {
    return this.patientsService.update(tenantId, id, payload, request.correlationId, {
      userId: user.userId,
      role: user.role,
      ipAddress: request.ip,
      userAgent: request.get("user-agent") ?? undefined,
    });
  }

  @Delete(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("patient.write")
  remove(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Req() request: OrdellaRequest,
    @CurrentUser() user: AuthenticatedPatientUser,
  ) {
    return this.patientsService.delete(tenantId, id, request.correlationId, {
      userId: user.userId,
      role: user.role,
      ipAddress: request.ip,
      userAgent: request.get("user-agent") ?? undefined,
    });
  }

  @Get(":id/medical-record")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("patient.read")
  getMedicalRecord(@TenantId() tenantId: string, @Param("id") patientId: string) {
    return this.patientsService.getMedicalRecord(tenantId, patientId);
  }

  @Patch(":id/medical-record")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("patient.write")
  @UseZodValidation(updateMedicalRecordSchema)
  updateMedicalRecord(
    @TenantId() tenantId: string,
    @Param("id") patientId: string,
    @Body() dto: UpdateMedicalRecordDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.patientsService.updateMedicalRecord(tenantId, patientId, dto, request.correlationId);
  }

  @Get(":id/notes-link")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("patient.read")
  getNotesLink(@Param("id") patientId: string) {
    return this.patientsService.getNotesLookup(patientId);
  }
}
