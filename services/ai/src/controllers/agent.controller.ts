import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { Response } from "express";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { AgentService } from "@/services/agent.service";
import { AiRateLimitService } from "@/services/ai-rate-limit.service";
import { StreamingAgentService } from "@/services/streaming-agent.service";
import type { AuthenticatedAiUser } from "@/utils/ai-user";

@Controller("agent")
export class AgentController {
  constructor(
    private readonly agentService: AgentService,
    private readonly streamingAgentService: StreamingAgentService,
    private readonly rateLimitService: AiRateLimitService,
  ) {}

  @Post("run")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  async runAgent(@CurrentUser() user: AuthenticatedAiUser, @Body() body: Record<string, unknown>) {
    await this.rateLimitService.assertWithinLimit(user.tenantId);

    const steps = Array.isArray(body.steps)
      ? body.steps.map((step) => String(step))
      : undefined;

    if (steps?.length || body.multiStep === true) {
      return this.agentService.runMultiStep(user.tenantId, {
        request: String(body.request ?? ""),
        patientId: body.patientId ? String(body.patientId) : undefined,
        invoiceId: body.invoiceId ? String(body.invoiceId) : undefined,
        steps,
      });
    }

    return this.agentService.run(user.tenantId, {
      request: String(body.request ?? ""),
      patientId: body.patientId ? String(body.patientId) : undefined,
      invoiceId: body.invoiceId ? String(body.invoiceId) : undefined,
    });
  }

  @Post("stream")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  async streamAgent(
    @CurrentUser() user: AuthenticatedAiUser,
    @Body() body: Record<string, unknown>,
    @Res() response: Response,
  ) {
    await this.rateLimitService.assertWithinLimit(user.tenantId);

    const task = String(body.task ?? body.request ?? "");
    const context = (body.context as Record<string, unknown>) ?? {};
    const resumeSessionId = body.sessionId ? String(body.sessionId) : undefined;

    let sessionId = resumeSessionId;
    if (resumeSessionId) {
      await this.streamingAgentService.resumeStream(resumeSessionId, user.tenantId);
    } else {
      const started = await this.streamingAgentService.startStreamingAgent({
        tenantId: user.tenantId,
        task,
        context,
      });
      sessionId = started.sessionId;
    }

    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Connection", "keep-alive");
    response.flushHeaders?.();

    response.write(`event: session\ndata: ${JSON.stringify({ sessionId })}\n\n`);

    try {
      for await (const chunk of this.streamingAgentService.streamChunks(sessionId!, user.tenantId)) {
        if (body.stop === true) {
          await this.streamingAgentService.stopStream(sessionId!, user.tenantId);
          response.write(`event: stopped\ndata: ${JSON.stringify({ sessionId })}\n\n`);
          break;
        }

        response.write(`event: ${chunk.type}\ndata: ${JSON.stringify(chunk)}\n\n`);
        if (chunk.done) {
          break;
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Stream failed.";
      response.write(`event: error\ndata: ${JSON.stringify({ message })}\n\n`);
    }

    response.write(`event: end\ndata: {}\n\n`);
    response.end();
  }

  @Post("stream/stop")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.AI_USE)
  stopStream(@CurrentUser() user: AuthenticatedAiUser, @Body() body: Record<string, unknown>) {
    return this.streamingAgentService.stopStream(String(body.sessionId ?? ""), user.tenantId);
  }
}
