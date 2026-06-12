import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AIRequestLogRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: {
    tenantId: string;
    provider: string;
    modelName: string;
    prompt: string;
    response: string;
    tokensInput: number;
    tokensOutput: number;
    latencyMs: number;
  }) {
    return this.database.aIRequestLog.create({ data });
  }

  listByTenant(tenantId: string, limit = 50) {
    return this.database.aIRequestLog.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }
}
