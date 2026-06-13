import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AgentController } from "@/controllers/agent.controller";
import { HealthController } from "@/controllers/health.controller";
import { ToolController } from "@/controllers/tool.controller";
import { JwtGuard } from "@/guards/jwt.guard";
import { AgentsRepository } from "@/repositories/agents.repository";
import { AgentOrchestratorService } from "@/services/agent-orchestrator.service";
import { AgentRunLoggerService } from "@/services/agent-run-logger.service";
import { AgentsService } from "@/services/agents.service";
import { ToolRegistryService } from "@/services/tool-registry.service";
import { JwtStrategy } from "@/strategies/jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [HealthController, AgentController, ToolController],
  providers: [
    AgentsRepository,
    AgentsService,
    ToolRegistryService,
    AgentOrchestratorService,
    AgentRunLoggerService,
    JwtStrategy,
    JwtGuard,
  ],
})
export class AiAgentsModule {}
