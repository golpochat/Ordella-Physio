import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import {
  listNotificationsSchema,
  markNotificationsReadSchema,
  registerDeviceTokenSchema,
  unregisterDeviceTokenSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { JwtGuard } from "@/notifications/guards/jwt.guard";
import { NotificationTenantGuard } from "@/notifications/guards/notification-tenant.guard";
import { TenantId } from "@/notifications/guards/tenant-id.decorator";
import { NotificationsService } from "@/notifications/notifications.service";
import type { AuthenticatedNotificationUser } from "@/utils/notification-helpers";
import type {
  ListNotificationsInput,
  MarkNotificationsReadInput,
  RegisterDeviceTokenInput,
  UnregisterDeviceTokenInput,
} from "@ordella/validation";

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

  @Post("device-tokens")
  @UseGuards(JwtGuard, NotificationTenantGuard, PermissionGuard)
  @RequirePermissions("notifications.write")
  @UseZodValidation(registerDeviceTokenSchema)
  registerDeviceToken(
    @TenantId() tenantId: string,
    @Body() dto: RegisterDeviceTokenInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedNotificationUser;
    return this.notificationsService.registerDeviceToken(tenantId, user, dto);
  }

  @Delete("device-tokens")
  @UseGuards(JwtGuard, NotificationTenantGuard, PermissionGuard)
  @RequirePermissions("notifications.write")
  @UseZodValidation(unregisterDeviceTokenSchema, "query")
  unregisterDeviceToken(
    @Query() query: UnregisterDeviceTokenInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedNotificationUser;
    return this.notificationsService.unregisterDeviceToken(user, query);
  }

  @Post("outbound")
  @UseGuards(JwtGuard, NotificationTenantGuard, PermissionGuard)
  @RequirePermissions("notification.send")
  sendOutbound(
    @TenantId() tenantId: string,
    @Body() body: Record<string, unknown>,
  ) {
    const channel = String(body.channel ?? "").toUpperCase() as
      | "EMAIL"
      | "SMS"
      | "PUSH"
      | "WHATSAPP"
      | "VIBER";
    const to = String(body.to ?? "").trim();

    return this.notificationsService.sendOutboundNotification(tenantId, {
      channel,
      to,
      templateId: body.templateId ? String(body.templateId) : undefined,
      message: body.message ? String(body.message) : undefined,
      subject: body.subject ? String(body.subject) : undefined,
      title: body.title ? String(body.title) : undefined,
      variables: body.variables as Record<string, string> | undefined,
      metadata: body.metadata as Record<string, unknown> | undefined,
    });
  }

  @Post("outbound/appointment-reminder")
  @UseGuards(JwtGuard, NotificationTenantGuard, PermissionGuard)
  @RequirePermissions("notification.send")
  sendAppointmentReminder(
    @TenantId() tenantId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.notificationsService.sendAppointmentReminder({
      tenantId,
      channel: String(body.channel ?? "SMS").toUpperCase() as "EMAIL" | "SMS" | "PUSH",
      to: String(body.to ?? ""),
      patientName: String(body.patientName ?? ""),
      time: String(body.time ?? ""),
      location: String(body.location ?? ""),
      appointmentId: String(body.appointmentId ?? ""),
    });
  }
}
