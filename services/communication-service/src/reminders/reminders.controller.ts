import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { cancelReminderSchema, createReminderSchema, UseZodValidation } from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { RemindersService } from "@/reminders/reminders.service";
import { JwtGuard } from "@/notifications/guards/jwt.guard";
import { TenantId } from "@/notifications/guards/tenant-id.decorator";
import type { CreateReminderDto } from "@/reminders/dto/create-reminder.dto";
import type { CancelReminderDto } from "@/reminders/dto/cancel-reminder.dto";

@Controller("communication/reminders")
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("communication.send")
  @UseZodValidation(createReminderSchema)
  create(
    @TenantId() tenantId: string,
    @Body() dto: CreateReminderDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.remindersService.create(tenantId, dto, request.correlationId);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("communication.send")
  list(@TenantId() tenantId: string, @Query("type") type?: string) {
    return this.remindersService.list(tenantId, type);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("communication.send")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.remindersService.findById(tenantId, id);
  }

  @Post(":id/cancel")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("communication.send")
  @UseZodValidation(cancelReminderSchema)
  cancel(
    @TenantId() tenantId: string,
    @Param("id") reminderId: string,
    @Body() dto: CancelReminderDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.remindersService.cancel(tenantId, reminderId, dto, request.correlationId);
  }
}
