import { Injectable, Logger, type OnModuleDestroy } from "@nestjs/common";
import type { Response } from "express";
import {
  toWorkflowLiveEventRecord,
  type WorkflowLiveEventFilters,
  type WorkflowLiveEventInput,
  type WorkflowLiveEventRecord,
} from "@/models/WorkflowLiveEvent";
import { AiWorkflowLiveEventRepository } from "@/repositories/ai-workflow-live-event.repository";
import { aiValidationError } from "@/utils/ai-errors";

type StreamSubscriber = {
  tenantScope: string | null;
  allTenants: boolean;
  send: (event: WorkflowLiveEventRecord) => void;
};

@Injectable()
export class WorkflowMonitorService implements OnModuleDestroy {
  private readonly logger = new Logger(WorkflowMonitorService.name);
  private readonly subscribers = new Set<StreamSubscriber>();
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;

  constructor(private readonly liveEventRepository: AiWorkflowLiveEventRepository) {
    this.heartbeatTimer = setInterval(() => {
      for (const subscriber of this.subscribers) {
        subscriber.send({
          id: "heartbeat",
          tenantId: "",
          workflowId: null,
          workflowName: null,
          runId: null,
          eventType: "TRIGGERED",
          timestamp: new Date().toISOString(),
          payload: { heartbeat: true },
          durationMs: null,
          status: null,
        });
      }
    }, 25_000);
  }

  onModuleDestroy() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
    }
    this.subscribers.clear();
  }

  async emitLiveEvent(input: WorkflowLiveEventInput) {
    const saved = await this.liveEventRepository.create({
      tenantId: input.tenantId,
      workflowId: input.workflowId ?? null,
      workflowName: input.workflowName ?? null,
      runId: input.runId ?? null,
      eventType: input.eventType,
      payload: (input.payload ?? {}) as never,
      durationMs: input.durationMs ?? null,
      status: input.status ?? null,
    });

    void this.liveEventRepository.pruneTenantEvents(input.tenantId).catch((error) => {
      const message = error instanceof Error ? error.message : "Failed to prune live events.";
      this.logger.warn(message);
    });

    const record = toWorkflowLiveEventRecord(saved);
    this.broadcast(record);
    return record;
  }

  getRecentEvents(
    scopeTenantId: string,
    filters: Record<string, unknown>,
    options: { allTenants: boolean },
  ) {
    const parsed = this.parseFilters(filters);
    return this.liveEventRepository
      .listRecent({
        ...parsed,
        scopeTenantId,
        allTenants: options.allTenants,
        tenantId: parsed.tenantId,
        limit: parsed.limit ?? 200,
      })
      .then((events) => events.map((event) => toWorkflowLiveEventRecord(event)));
  }

  subscribeToLiveEvents(
    response: Response,
    scope: { tenantId: string; allTenants: boolean },
  ) {
    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Connection", "keep-alive");
    response.flushHeaders?.();

    const subscriber: StreamSubscriber = {
      tenantScope: scope.allTenants ? null : scope.tenantId,
      allTenants: scope.allTenants,
      send: (event) => {
        if (event.id === "heartbeat") {
          response.write(`: heartbeat ${Date.now()}\n\n`);
          return;
        }

        if (!this.matchesSubscriberScope(subscriber, event)) {
          return;
        }

        response.write(`event: workflow-event\ndata: ${JSON.stringify(event)}\n\n`);
      },
    };

    this.subscribers.add(subscriber);
    response.write(`event: connected\ndata: ${JSON.stringify({ ok: true })}\n\n`);

    const cleanup = () => {
      this.subscribers.delete(subscriber);
    };

    response.on("close", cleanup);
    response.on("finish", cleanup);
  }

  private broadcast(event: WorkflowLiveEventRecord) {
    for (const subscriber of this.subscribers) {
      if (!this.matchesSubscriberScope(subscriber, event)) {
        continue;
      }
      subscriber.send(event);
    }
  }

  private matchesSubscriberScope(subscriber: StreamSubscriber, event: WorkflowLiveEventRecord) {
    if (subscriber.allTenants) {
      return true;
    }
    return subscriber.tenantScope === event.tenantId;
  }

  private parseFilters(filters: Record<string, unknown>): WorkflowLiveEventFilters {
    const limit = Number(filters.limit ?? 200);
    const fields: Array<{ field: string; message: string }> = [];

    if (!Number.isInteger(limit) || limit < 1 || limit > 200) {
      fields.push({ field: "limit", message: "limit must be between 1 and 200." });
    }

    if (fields.length) {
      throw aiValidationError(fields);
    }

    return {
      workflowId: filters.workflowId ? String(filters.workflowId) : undefined,
      eventType: filters.eventType ? (String(filters.eventType).toUpperCase() as WorkflowLiveEventFilters["eventType"]) : undefined,
      status: filters.status ? (String(filters.status).toUpperCase() as WorkflowLiveEventFilters["status"]) : undefined,
      from: filters.from ? String(filters.from) : undefined,
      to: filters.to ? String(filters.to) : undefined,
      search: filters.search ? String(filters.search).trim() : undefined,
      tenantId: filters.tenantId ? String(filters.tenantId) : undefined,
      limit,
    };
  }
}
