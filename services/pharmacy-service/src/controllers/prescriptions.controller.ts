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
import {
  createPrescriptionSchema,
  listPrescriptionsSchema,
  updatePrescriptionSchema,
  UseZodValidation,
  type CreatePrescriptionInput,
  type ListPrescriptionsInput,
  type UpdatePrescriptionInput,
} from "@ordella/validation";
import type { PrescriptionStatus } from "@/generated/prisma";
import { CurrentUser, TenantId } from "@/guards/current-user.decorator";
import { JwtGuard } from "@/guards/jwt.guard";
import { PrescriptionsService } from "@/services/prescriptions.service";
import type { AuthenticatedPharmacyUser } from "@/utils/pharmacy-helpers";

@Controller("pharmacy/prescriptions")
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("prescriptions.create")
  @UseZodValidation(createPrescriptionSchema)
  create(
    @TenantId() tenantId: string,
    @Body() body: CreatePrescriptionInput,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.prescriptionsService.create(tenantId, { ...body, tenantId }, user);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("prescriptions.read")
  list(
    @TenantId() tenantId: string,
    @Query() query: ListPrescriptionsInput,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.prescriptionsService.list(tenantId, user, {
      patientId: query.patientId,
      status: query.status as PrescriptionStatus | undefined,
      fulfillmentStatus: query.fulfillmentStatus,
    });
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
  @RequirePermissions("prescriptions.update")
  @UseZodValidation(updatePrescriptionSchema)
  update(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() body: UpdatePrescriptionInput,
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
