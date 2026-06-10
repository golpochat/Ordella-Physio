import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  createPatientSchema,
  searchPatientSchema,
  updateMedicalRecordSchema,
  updatePatientSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { PatientsService } from "@/patients/patients.service";
import { JwtGuard } from "@/patients/guards/jwt.guard";
import { TenantId } from "@/patients/guards/tenant-id.decorator";
import type { CreatePatientDto } from "@/patients/dto/create-patient.dto";
import type { UpdatePatientDto } from "@/patients/dto/update-patient.dto";
import type { SearchPatientDto } from "@/patients/dto/search-patient.dto";
import type { UpdateMedicalRecordDto } from "@/medical-records/dto/update-medical-record.dto";

@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "patient-service" };
  }

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("patient.write")
  @UseZodValidation(createPatientSchema)
  create(
    @TenantId() tenantId: string,
    @Body() dto: CreatePatientDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.patientsService.create(tenantId, dto, request.correlationId);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("patient.read")
  @UseZodValidation(searchPatientSchema, "query")
  search(@TenantId() tenantId: string, @Query() query: SearchPatientDto) {
    return this.patientsService.search(tenantId, query);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("patient.read")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.patientsService.findById(tenantId, id);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("patient.write")
  @UseZodValidation(updatePatientSchema)
  update(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: UpdatePatientDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.patientsService.update(tenantId, id, dto, request.correlationId);
  }

  @Delete(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("patient.write")
  remove(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Req() request: OrdellaRequest,
  ) {
    return this.patientsService.delete(tenantId, id, request.correlationId);
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
