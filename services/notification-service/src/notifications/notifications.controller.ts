import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import {
  listNotificationsSchema,
  markNotificationsReadSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { JwtGuard } from "@/notifications/guards/jwt.guard";
import { NotificationTenantGuard } from "@/notifications/guards/notification-tenant.guard";
import { TenantId } from "@/notifications/guards/tenant-id.decorator";
import { NotificationsService } from "@/notifications/notifications.service";
import type { AuthenticatedNotificationUser } from "@/utils/notification-helpers";
import type { ListNotificationsInput, MarkNotificationsReadInput } from "@ordella/validation";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "notification-service" };
  }

  @Get()
  @UseGuards(JwtGuard, NotificationTenantGuard, PermissionGuard)
  @RequirePermissions("notifications.read")
  @UseZodValidation(listNotificationsSchema, "query")
  list(
    @TenantId() tenantId: string,
    @Query() query: ListNotificationsInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedNotificationUser;
    return this.notificationsService.listNotifications(tenantId, user, query);
  }

  @Get("unread-count")
  @UseGuards(JwtGuard, NotificationTenantGuard, PermissionGuard)
  @RequirePermissions("notifications.read")
  unreadCount(@TenantId() tenantId: string, @Req() request: OrdellaRequest) {
    const user = request.user as AuthenticatedNotificationUser;
    return this.notificationsService.getUnreadCount(tenantId, user);
  }

  @Post("mark-read")
  @UseGuards(JwtGuard, NotificationTenantGuard, PermissionGuard)
  @RequirePermissions("notifications.write")
  @UseZodValidation(markNotificationsReadSchema)
  markRead(
    @TenantId() tenantId: string,
    @Body() dto: MarkNotificationsReadInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedNotificationUser;
    return this.notificationsService.markRead(tenantId, user, dto, request.correlationId);
  }

  @Post("mark-all-read")
  @UseGuards(JwtGuard, NotificationTenantGuard, PermissionGuard)
  @RequirePermissions("notifications.write")
  markAllRead(@TenantId() tenantId: string, @Req() request: OrdellaRequest) {
    const user = request.user as AuthenticatedNotificationUser;
    return this.notificationsService.markAllRead(tenantId, user, request.correlationId);
  }
}
