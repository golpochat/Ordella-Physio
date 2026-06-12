import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { AgentService } from "@/services/agent.service";
import { InsightsService } from "@/services/insights.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedAiUser } from "@/utils/ai-user";

@Controller("insights")
export class InsightsController {
  constructor(
    private readonly insightsService: InsightsService,
    private readonly agentService: AgentService,
  ) {}

  @Post("patient/:id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  patientInsights(@CurrentUser() user: AuthenticatedAiUser, @Param("id") id: string) {
    return this.insightsService.getPatientInsights(user.tenantId, id);
  }

  @Post("appointment/:id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  appointmentInsights(@CurrentUser() user: AuthenticatedAiUser, @Param("id") id: string) {
    return this.insightsService.getAppointmentInsights(user.tenantId, id);
  }

  @Post("invoice/:id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  invoiceInsights(@CurrentUser() user: AuthenticatedAiUser, @Param("id") id: string) {
    return this.insightsService.getInvoiceInsights(user.tenantId, id);
  }

  @Post("report")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  reportInsights(@CurrentUser() user: AuthenticatedAiUser, @Body() body: Record<string, unknown>) {
    const report = (body.report as Record<string, unknown>) ?? body;
    return this.insightsService.getReportInsights(user.tenantId, report);
  }

  @Post("agent")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  runAgent(@CurrentUser() user: AuthenticatedAiUser, @Body() body: Record<string, unknown>) {
    return this.agentService.run(user.tenantId, {
      request: String(body.request ?? ""),
      patientId: body.patientId ? String(body.patientId) : undefined,
      invoiceId: body.invoiceId ? String(body.invoiceId) : undefined,
    });
  }
}
