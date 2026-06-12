import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { AiMemoryService } from "@/services/ai-memory.service";
import { AiRateLimitService } from "@/services/ai-rate-limit.service";
import { CopilotService, type CopilotEntityType } from "@/services/copilot.service";
import { PredictiveAnalyticsService } from "@/services/predictive-analytics.service";
import { WorkflowOrchestratorService, type WorkflowTrigger } from "@/services/workflow-orchestrator.service";
import type { AuthenticatedAiUser } from "@/utils/ai-user";

@Controller("copilot")
export class CopilotController {
  constructor(
    private readonly copilotService: CopilotService,
    private readonly memoryService: AiMemoryService,
    private readonly predictiveAnalyticsService: PredictiveAnalyticsService,
    private readonly workflowOrchestrator: WorkflowOrchestratorService,
    private readonly rateLimitService: AiRateLimitService,
  ) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  async runCopilot(@CurrentUser() user: AuthenticatedAiUser, @Body() body: Record<string, unknown>) {
    await this.rateLimitService.assertWithinLimit(user.tenantId);

    return this.copilotService.runCopilot({
      tenantId: user.tenantId,
      entityType: body.entityType ? (String(body.entityType) as CopilotEntityType) : undefined,
      entityId: body.entityId ? String(body.entityId) : undefined,
      query: String(body.query ?? ""),
    });
  }

  @Post("workflow")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  async runWorkflow(@CurrentUser() user: AuthenticatedAiUser, @Body() body: Record<string, unknown>) {
    await this.rateLimitService.assertWithinLimit(user.tenantId);

    return this.copilotService.executeWorkflow(
      user.tenantId,
      String(body.trigger ?? "") as WorkflowTrigger,
      {
        patientId: body.patientId ? String(body.patientId) : undefined,
        invoiceId: body.invoiceId ? String(body.invoiceId) : undefined,
        appointmentId: body.appointmentId ? String(body.appointmentId) : undefined,
      },
    );
  }

  @Get("workflows")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  listWorkflows() {
    return this.workflowOrchestrator.listWorkflows();
  }

  @Get("memory")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  getMemory(@CurrentUser() user: AuthenticatedAiUser) {
    return this.memoryService.getRecentInteractions(user.tenantId, 20);
  }

  @Post("memory/clear")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MANAGE)
  clearMemory(@CurrentUser() user: AuthenticatedAiUser) {
    return this.memoryService.clearMemory(user.tenantId);
  }

  @Post("predict")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  async predict(@CurrentUser() user: AuthenticatedAiUser, @Body() body: Record<string, unknown>) {
    await this.rateLimitService.assertWithinLimit(user.tenantId);

    const type = String(body.type ?? "");
    const entityId = String(body.entityId ?? "");

    if (type === "no_show") {
      return this.predictiveAnalyticsService.predictNoShow(user.tenantId, entityId);
    }
    if (type === "late_payment") {
      return this.predictiveAnalyticsService.predictLatePayment(user.tenantId, entityId);
    }
    if (type === "engagement") {
      return this.predictiveAnalyticsService.predictEngagement(user.tenantId, entityId);
    }
    if (type === "operational_risk") {
      return this.predictiveAnalyticsService.predictOperationalRisk(user.tenantId, entityId);
    }

    return { score: 0, factors: [], recommendedActions: [], predictionType: "UNKNOWN" };
  }
}
