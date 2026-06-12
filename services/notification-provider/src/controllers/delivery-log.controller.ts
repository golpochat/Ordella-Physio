import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { DeliveryLogService } from "@/services/delivery-log.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedProviderUser } from "@/utils/provider-user";

@Controller("delivery-logs")
export class DeliveryLogController {
  constructor(private readonly deliveryLogService: DeliveryLogService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.NOTIFICATION_LOGS_VIEW)
  list(
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedProviderUser,
  ) {
    return this.deliveryLogService.listDeliveryLogs(query, user);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.NOTIFICATION_LOGS_VIEW)
  getById(@Param("id") id: string, @CurrentUser() user: AuthenticatedProviderUser) {
    return this.deliveryLogService.getDeliveryLog(id, user);
  }
}
