import { Injectable, Logger } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { AiStreamSessionRepository } from "@/repositories/ai-stream-session.repository";
import { AiMemoryService } from "@/services/ai-memory.service";
import { GuardrailService } from "@/services/guardrail.service";
import { InferenceService } from "@/services/inference.service";
import { aiValidationError } from "@/utils/ai-errors";

type ActiveStream = {
  tenantId: string;
  task: string;
  stopped: boolean;
  chunks: string[];
  fullText: string;
};

@Injectable()
export class StreamingAgentService {
  private readonly logger = new Logger(StreamingAgentService.name);
  private readonly activeStreams = new Map<string, ActiveStream>();

  constructor(
    private readonly streamSessionRepository: AiStreamSessionRepository,
    private readonly inferenceService: InferenceService,
    private readonly guardrailService: GuardrailService,
    private readonly memoryService: AiMemoryService,
  ) {}

  async startStreamingAgent(input: {
    tenantId: string;
    task: string;
    context?: Record<string, unknown>;
    sessionId?: string;
  }) {
    const task = input.task?.trim();
    if (!task) {
      throw aiValidationError([{ field: "task", message: "task is required." }]);
    }

    const sessionId = input.sessionId ?? randomUUID();
    const context = input.context ?? {};

    await this.streamSessionRepository.create({
      tenantId: input.tenantId,
      sessionId,
      task,
      context: context as never,
      status: "ACTIVE",
    });

    this.activeStreams.set(sessionId, {
      tenantId: input.tenantId,
      task,
      stopped: false,
      chunks: [],
      fullText: "",
    });

    return { sessionId, status: "ACTIVE" };
  }

  async *streamChunks(sessionId: string, tenantId: string) {
    const active = this.activeStreams.get(sessionId);
    const session = await this.streamSessionRepository.findBySessionId(sessionId);

    if (!session || session.tenantId !== tenantId) {
      throw aiValidationError([{ field: "sessionId", message: "Stream session not found." }]);
    }

    if (active?.chunks.length) {
      for (const chunk of active.chunks) {
        yield { type: "chunk" as const, content: chunk, done: false };
      }
      yield { type: "done" as const, content: active.fullText, done: true };
      return;
    }

    const memories = await this.memoryService.getRecentInteractions(tenantId, 5);
    const memoryContext = this.memoryService.buildContextWindow(memories);

    const completion = await this.inferenceService.runTextCompletion(
      {
        task: "STREAM_AGENT",
        prompt: `Task: ${session.task}\nContext: ${JSON.stringify(session.context)}\nMemory: ${memoryContext}\nRespond concisely for clinic staff. No medical diagnosis.`,
        maxTokens: 600,
      },
      tenantId,
    );

    const sanitized = this.guardrailService.sanitizeOutput(completion.text);
    const tokens = sanitized.split(/(\s+)/).filter(Boolean);

    const streamState = active ?? {
      tenantId,
      task: session.task,
      stopped: false,
      chunks: [] as string[],
      fullText: "",
    };

    for (const token of tokens) {
      if (streamState.stopped) {
        await this.streamSessionRepository.updateStatus(sessionId, "STOPPED", streamState.chunks as never);
        yield { type: "stopped" as const, content: streamState.fullText, done: false };
        return;
      }

      streamState.chunks.push(token);
      streamState.fullText += token;
      this.activeStreams.set(sessionId, streamState);

      yield { type: "chunk" as const, content: token, done: false };
      await delay(25);
    }

    await this.streamSessionRepository.updateStatus(sessionId, "COMPLETED", streamState.chunks as never);
    await this.memoryService.saveInteraction(tenantId, {
      query: session.task,
      response: streamState.fullText,
    });

    this.activeStreams.delete(sessionId);
    yield { type: "done" as const, content: streamState.fullText, done: true };
  }

  async stopStream(sessionId: string, tenantId: string) {
    const session = await this.streamSessionRepository.findBySessionId(sessionId);
    if (!session || session.tenantId !== tenantId) {
      throw aiValidationError([{ field: "sessionId", message: "Stream session not found." }]);
    }

    const active = this.activeStreams.get(sessionId);
    if (active) {
      active.stopped = true;
    }

    await this.streamSessionRepository.updateStatus(sessionId, "STOPPED");
    return { sessionId, status: "STOPPED" };
  }

  async resumeStream(sessionId: string, tenantId: string) {
    const session = await this.streamSessionRepository.findBySessionId(sessionId);
    if (!session || session.tenantId !== tenantId) {
      throw aiValidationError([{ field: "sessionId", message: "Stream session not found." }]);
    }

    const chunks = Array.isArray(session.chunks) ? (session.chunks as string[]) : [];
    const fullText = chunks.join("");

    this.activeStreams.set(sessionId, {
      tenantId,
      task: session.task,
      stopped: false,
      chunks,
      fullText,
    });

    await this.streamSessionRepository.updateStatus(sessionId, "ACTIVE");
    return { sessionId, status: "ACTIVE", resumedFrom: chunks.length };
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
