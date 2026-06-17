import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { PrescriptionStatus } from "@/generated/prisma";
import { CurrentUser, TenantId } from "@/guards/current-user.decorator";
import { JwtGuard } from "@/guards/jwt.guard";
import { PrescriptionsService } from "@/services/prescriptions.service";
import type { AuthenticatedPharmacyUser } from "@/utils/pharmacy-helpers";

type CreatePrescriptionBody = {
  patientId: string;
  therapistId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
};

type UpdatePrescriptionBody = Partial<
  Omit<CreatePrescriptionBody, "patientId" | "therapistId">
>;

@Controller("pharmacy/prescriptions")
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("prescriptions.create")
  create(
    @TenantId() tenantId: string,
    @Body() body: CreatePrescriptionBody,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.prescriptionsService.create(tenantId, { ...body, tenantId }, user);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("prescriptions.read")
  list(
    @TenantId() tenantId: string,
    @Query("patientId") patientId: string | undefined,
    @Query("status") status: PrescriptionStatus | undefined,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.prescriptionsService.list(tenantId, user, { patientId, status });
  }

  @Get(":id/audit-logs")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("prescriptions.read")
  auditLogs(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.prescriptionsService.getAuditLogs(tenantId, id, user);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("prescriptions.read")
  getById(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.prescriptionsService.getById(tenantId, id, user);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("prescriptions.create")
  update(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() body: UpdatePrescriptionBody,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.prescriptionsService.update(tenantId, id, body, user);
  }

  @Post(":id/issue")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("prescriptions.issue")
  issue(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.prescriptionsService.issue(tenantId, id, user);
  }

  @Post(":id/cancel")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("prescriptions.issue")
  cancel(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.prescriptionsService.cancel(tenantId, id, user);
  }
}
