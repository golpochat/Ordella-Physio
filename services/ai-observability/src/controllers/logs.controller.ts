import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { LogLevel, LogService } from "@/models/AILogEvent";
import { LoggingService } from "@/services/logging.service";
import type { AuthenticatedObservabilityUser } from "@/utils/observability-user";

@Controller("observability")
export class LogsController {
  constructor(private readonly loggingService: LoggingService) {}

  @Get("logs")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getLogs(
    @CurrentUser() user: AuthenticatedObservabilityUser,
    @Query("service") service?: LogService,
    @Query("level") level?: LogLevel,
    @Query("since") since?: string,
  ) {
    return this.loggingService.getLogs(user.tenantId, {
      service,
      level,
      since: since ? new Date(since) : undefined,
    });
  }

  @Get("logs/export")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  exportLogs(@CurrentUser() user: AuthenticatedObservabilityUser) {
    return this.loggingService.exportLogs(user.tenantId);
  }
}
