import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { LogLevel, LogService } from "@/models/AILogEvent";
import { ObservabilityRepository } from "@/repositories/observability.repository";

@Injectable()
export class LoggingService {
  constructor(private readonly repository: ObservabilityRepository) {}

  logInfo(tenantId: string, service: LogService, message: string, metadata?: Record<string, unknown>) {
    return this.write(tenantId, service, "INFO", message, metadata);
  }

  logWarn(tenantId: string, service: LogService, message: string, metadata?: Record<string, unknown>) {
    return this.write(tenantId, service, "WARN", message, metadata);
  }

  logError(tenantId: string, service: LogService, message: string, metadata?: Record<string, unknown>) {
    return this.write(tenantId, service, "ERROR", message, metadata);
  }

  private async write(
    tenantId: string,
    service: LogService,
    level: LogLevel,
    message: string,
    metadata?: Record<string, unknown>,
  ) {
    const row = await this.repository.createLogEvent({
      tenantId,
      service,
      level,
      message,
      metadata: (metadata ?? {}) as Prisma.InputJsonValue,
    });
    return this.repository.mapLogEvent(row);
  }

  async getLogs(tenantId: string, filters: {
    service?: LogService;
    level?: LogLevel;
    since?: Date;
    limit?: number;
  }) {
    const rows = await this.repository.searchLogs(tenantId, filters);
    return rows.map((r) => this.repository.mapLogEvent(r));
  }

  async exportLogs(tenantId: string) {
    const logs = await this.getLogs(tenantId, { limit: 5000 });
    return {
      exportedAt: new Date().toISOString(),
      count: logs.length,
      logs,
    };
  }
}
