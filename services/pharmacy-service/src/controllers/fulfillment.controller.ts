import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { CurrentUser, TenantId } from "@/guards/current-user.decorator";
import { JwtGuard } from "@/guards/jwt.guard";
import { FulfillmentService } from "@/services/fulfillment.service";
import type { AuthenticatedPharmacyUser } from "@/utils/pharmacy-helpers";

type FulfillmentBody = {
  filledBy?: string;
  notes?: string;
};

@Controller("pharmacy/fulfillment")
export class FulfillmentController {
  constructor(private readonly fulfillmentService: FulfillmentService) {}

  @Post(":prescriptionId/start")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("fulfillment.start")
  start(
    @TenantId() tenantId: string,
    @Param("prescriptionId") prescriptionId: string,
    @Body() body: FulfillmentBody,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.fulfillmentService.start(tenantId, prescriptionId, user, body);
  }

  @Post(":prescriptionId/complete")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("fulfillment.complete")
  complete(
    @TenantId() tenantId: string,
    @Param("prescriptionId") prescriptionId: string,
    @Body() body: FulfillmentBody,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.fulfillmentService.complete(tenantId, prescriptionId, user, body);
  }

  @Post(":prescriptionId/fail")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("fulfillment.fail")
  fail(
    @TenantId() tenantId: string,
    @Param("prescriptionId") prescriptionId: string,
    @Body() body: FulfillmentBody,
    @CurrentUser() user: AuthenticatedPharmacyUser,
  ) {
    return this.fulfillmentService.fail(tenantId, prescriptionId, user, body);
  }
}
