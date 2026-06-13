import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { AgentOrchestratorService } from "@/services/agent-orchestrator.service";
import { AgentsService } from "@/services/agents.service";
import type { AuthenticatedAgentsUser } from "@/utils/agents-user";

@Controller("agents")
export class AgentController {
  constructor(
    private readonly agentsService: AgentsService,
    private readonly orchestrator: AgentOrchestratorService,
  ) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  listAgents(@CurrentUser() user: AuthenticatedAgentsUser) {
    return this.agentsService.listAgents(user.tenantId);
  }

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  createAgent(
    @CurrentUser() user: AuthenticatedAgentsUser,
    @Body()
    body: {
      name: string;
      description?: string;
      modelId: string;
      tools?: string[];
      systemPrompt: string;
      maxSteps?: number;
    },
  ) {
    return this.agentsService.createAgent(user.tenantId, user.userId, body);
  }

  @Get(":id/runs")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  listRuns(@CurrentUser() user: AuthenticatedAgentsUser, @Param("id") id: string) {
    return this.agentsService.listRuns(id, user.tenantId);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  getAgent(@CurrentUser() user: AuthenticatedAgentsUser, @Param("id") id: string) {
    return this.agentsService.getAgent(id, user.tenantId);
  }

  @Post(":id/run")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  runAgent(
    @CurrentUser() user: AuthenticatedAgentsUser,
    @Param("id") id: string,
    @Body() body: { input: string },
  ) {
    return this.orchestrator.runAgent(id, user.tenantId, body.input);
  }
}
