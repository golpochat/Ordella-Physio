import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  cancelNotificationSchema,
  createNotificationSchema,
  sendNotificationSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { NotificationsService } from "@/notifications/notifications.service";
import { JwtGuard } from "@/notifications/guards/jwt.guard";
import { TenantId } from "@/notifications/guards/tenant-id.decorator";
import type { CreateNotificationDto } from "@/notifications/dto/create-notification.dto";
import type { SendNotificationDto } from "@/notifications/dto/send-notification.dto";
import type { CancelNotificationDto } from "@/notifications/dto/cancel-notification.dto";

@Controller("communication")
export class CommunicationHealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "communication-service" };
  }
}

@Controller("communication/notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("communication.send")
  @UseZodValidation(createNotificationSchema)
  create(
    @TenantId() tenantId: string,
    @Body() dto: CreateNotificationDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.notificationsService.create(tenantId, dto, request.correlationId);
  }

  @Post("send")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("communication.send")
  @UseZodValidation(sendNotificationSchema)
  send(
    @TenantId() tenantId: string,
    @Body() dto: SendNotificationDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.notificationsService.send(tenantId, dto, request.correlationId);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("communication.send")
  list(@TenantId() tenantId: string, @Query("status") status?: string) {
    return this.notificationsService.list(tenantId, status);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("communication.send")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.notificationsService.findById(tenantId, id);
  }

  @Post(":id/cancel")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("communication.send")
  @UseZodValidation(cancelNotificationSchema)
  cancel(
    @TenantId() tenantId: string,
    @Param("id") notificationId: string,
    @Body() dto: CancelNotificationDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.notificationsService.cancel(
      tenantId,
      notificationId,
      dto,
      request.correlationId,
    );
  }
}
