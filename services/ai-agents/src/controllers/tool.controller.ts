import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AgentToolRecord } from "@/models/AIAgentTool";
import { ToolRegistryService } from "@/services/tool-registry.service";
import type { AuthenticatedAgentsUser } from "@/utils/agents-user";

@Controller("agents/tools")
export class ToolController {
  constructor(private readonly toolRegistry: ToolRegistryService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_VIEW)
  listTools(@CurrentUser() user: AuthenticatedAgentsUser) {
    return this.toolRegistry.listTools(user.tenantId);
  }

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  registerTool(
    @CurrentUser() user: AuthenticatedAgentsUser,
    @Body()
    body: {
      name: string;
      type: AgentToolRecord["type"];
      config?: Record<string, unknown>;
      inputSchema?: Record<string, unknown>;
      outputSchema?: Record<string, unknown>;
      isActive?: boolean;
    },
  ) {
    return this.toolRegistry.registerTool(user.tenantId, body);
  }

  @Put(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  updateTool(
    @CurrentUser() user: AuthenticatedAgentsUser,
    @Param("id") id: string,
    @Body()
    body: {
      name?: string;
      type?: AgentToolRecord["type"];
      config?: Record<string, unknown>;
      inputSchema?: Record<string, unknown>;
      outputSchema?: Record<string, unknown>;
      isActive?: boolean;
    },
  ) {
    return this.toolRegistry.updateTool(user.tenantId, id, body);
  }

  @Delete(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_MODEL_MANAGE)
  async deleteTool(@CurrentUser() user: AuthenticatedAgentsUser, @Param("id") id: string) {
    await this.toolRegistry.updateTool(user.tenantId, id, { isActive: false });
    return { deleted: true, id };
  }
}
