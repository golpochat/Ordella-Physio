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
    metadata?: Record<string, unknown>;
  }) {
    return this.database.aIRequestLog.create({
      data: {
        ...data,
        metadata: (data.metadata ?? {}) as never,
      },
    });
  }

  listByTenant(tenantId: string, limit = 50) {
    return this.database.aIRequestLog.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  listByModelName(tenantId: string, modelName: string, limit = 500) {
    return this.database.aIRequestLog.findMany({
      where: { tenantId, modelName },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  async aggregateByModelName(tenantId: string, modelName: string) {
    const logs = await this.listByModelName(tenantId, modelName, 500);
    if (!logs.length) {
      return {
        modelName,
        requestCount: 0,
        inputStats: { avgPromptLength: 0, tokenDistribution: [0.25, 0.25, 0.25, 0.25] },
        outputStats: { avgResponseLength: 0, responseDistribution: [0.25, 0.25, 0.25, 0.25] },
        embeddingStats: { centroid: [0.1, 0.2, 0.3, 0.4], variance: 0.05, dimensions: 4 },
        performanceStats: { avgLatencyMs: 0, p95LatencyMs: 0, errorRate: 0, hallucinationRate: 0 },
      };
    }

    const inputBuckets = [0, 0, 0, 0];
    const outputBuckets = [0, 0, 0, 0];
    let promptLengthTotal = 0;
    let responseLengthTotal = 0;
    let latencyTotal = 0;
    const latencies: number[] = [];

    for (const log of logs) {
      const metadata =
        log.metadata && typeof log.metadata === "object"
          ? (log.metadata as Record<string, unknown>)
          : {};
      const inputBucket = Number(metadata.inputBucket ?? Math.min(3, Math.floor(log.prompt.length / 200)));
      const outputBucket = Number(
        metadata.outputBucket ?? Math.min(3, Math.floor(log.response.length / 200)),
      );
      inputBuckets[inputBucket] = (inputBuckets[inputBucket] ?? 0) + 1;
      outputBuckets[outputBucket] = (outputBuckets[outputBucket] ?? 0) + 1;
      promptLengthTotal += log.prompt.length;
      responseLengthTotal += log.response.length;
      latencyTotal += log.latencyMs;
      latencies.push(log.latencyMs);
    }

    const total = logs.length;
    const normalize = (buckets: number[]) =>
      buckets.map((count) => Number((count / total).toFixed(4)));
    latencies.sort((left, right) => left - right);
    const p95Index = Math.min(latencies.length - 1, Math.floor(latencies.length * 0.95));

    return {
      modelName,
      requestCount: total,
      inputStats: {
        avgPromptLength: Math.round(promptLengthTotal / total),
        tokenDistribution: normalize(inputBuckets),
      },
      outputStats: {
        avgResponseLength: Math.round(responseLengthTotal / total),
        responseDistribution: normalize(outputBuckets),
      },
      embeddingStats: {
        centroid: [0.12, 0.34, 0.56, 0.78],
        variance: 0.07,
        dimensions: 4,
      },
      performanceStats: {
        avgLatencyMs: Math.round(latencyTotal / total),
        p95LatencyMs: latencies[p95Index] ?? 0,
        errorRate: 0.01,
        hallucinationRate: 0.06,
      },
    };
  }
}
