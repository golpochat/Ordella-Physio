import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { TraceService } from "@/models/AITraceSpan";
import { TraceSpanService } from "@/services/trace.service";
import type { AuthenticatedObservabilityUser } from "@/utils/observability-user";

@Controller("observability")
export class TraceController {
  constructor(private readonly traceService: TraceSpanService) {}

  @Get("traces")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  searchTraces(
    @CurrentUser() user: AuthenticatedObservabilityUser,
    @Query("service") service?: TraceService,
    @Query("status") status?: "OK" | "ERROR",
    @Query("since") since?: string,
  ) {
    return this.traceService.searchTraces(user.tenantId, {
      service,
      status,
      since: since ? new Date(since) : undefined,
    });
  }

  @Get("traces/:id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getTrace(@CurrentUser() user: AuthenticatedObservabilityUser, @Param("id") traceId: string) {
    return this.traceService.getTrace(traceId, user.tenantId);
  }
}
