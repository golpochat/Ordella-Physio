import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import {
  fulfillmentActionSchema,
  listPrescriptionsSchema,
  UseZodValidation,
  type FulfillmentActionInput,
  type ListPrescriptionsInput,
} from "@ordella/validation";
import type { FulfillmentStatus } from "@/generated/prisma";
import { CurrentUser, TenantId } from "@/guards/current-user.decorator";
import { JwtGuard } from "@/guards/jwt.guard";
import { FulfillmentService } from "@/services/fulfillment.service";
import type { AuthenticatedPharmacyUser } from "@/utils/pharmacy-helpers";

@Controller("pharmacy/fulfillment")
export class FulfillmentController {
  constructor(private readonly fulfillmentService: FulfillmentService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("prescriptions.read")
  list(
    @TenantId() tenantId: string,
    @Query() query: ListPrescriptionsInput,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.fulfillmentService.list(tenantId, user, {
      fulfillmentStatus: query.fulfillmentStatus as FulfillmentStatus | undefined,
      patientId: query.patientId,
    });
  }

  @Post(":prescriptionId/start")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("fulfillment.start")
  @UseZodValidation(fulfillmentActionSchema)
  start(
    @TenantId() tenantId: string,
    @Param("prescriptionId") prescriptionId: string,
    @Body() body: FulfillmentActionInput,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.fulfillmentService.start(tenantId, prescriptionId, user, body);
  }

  @Post(":prescriptionId/complete")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("fulfillment.complete")
  @UseZodValidation(fulfillmentActionSchema)
  complete(
    @TenantId() tenantId: string,
    @Param("prescriptionId") prescriptionId: string,
    @Body() body: FulfillmentActionInput,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.fulfillmentService.complete(tenantId, prescriptionId, user, body);
  }

  @Post(":prescriptionId/fail")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("fulfillment.fail")
  @UseZodValidation(fulfillmentActionSchema)
  fail(
    @TenantId() tenantId: string,
    @Param("prescriptionId") prescriptionId: string,
    @Body() body: FulfillmentActionInput,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.fulfillmentService.fail(tenantId, prescriptionId, user, body);
  }

  @Post(":prescriptionId/retry")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("fulfillment.start")
  retry(
    @TenantId() tenantId: string,
    @Param("prescriptionId") prescriptionId: string,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.fulfillmentService.retry(tenantId, prescriptionId, user);
  }
}
