import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { BatchDeliveryService } from "@/services/batch-delivery.service";
import { DeliveryService } from "@/services/delivery.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedProviderUser } from "@/utils/provider-user";
import { providerValidationError } from "@/utils/provider-errors";

@Controller("deliver")
export class DeliveryController {
  constructor(
    private readonly deliveryService: DeliveryService,
    private readonly batchDeliveryService: BatchDeliveryService,
  ) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.NOTIFICATION_SEND)
  deliver(@Body() body: Record<string, unknown>, @CurrentUser() user: AuthenticatedProviderUser) {
    return this.deliveryService.sendNotification(body, user.tenantId);
  }

  @Post("batch")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.NOTIFICATION_SEND)
  deliverBatch(
    @Body() body: Record<string, unknown>,
    @CurrentUser() user: AuthenticatedProviderUser,
  ) {
    const notifications = body.notifications;

    if (!Array.isArray(notifications) || notifications.length === 0) {
      throw providerValidationError([
        { field: "notifications", message: "notifications must be a non-empty array." },
      ]);
    }

    return this.batchDeliveryService.sendBatch(
      notifications as Record<string, unknown>[],
      user.tenantId,
    );
  }
}

