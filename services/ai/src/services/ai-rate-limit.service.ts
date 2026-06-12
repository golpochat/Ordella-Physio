import { Injectable } from "@nestjs/common";
import { HttpError, ERROR_CODES } from "@ordella/errors";
import { AIRequestLogRepository } from "@/repositories/ai-request-log.repository";

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 120;

@Injectable()
export class AiRateLimitService {
  private readonly counters = new Map<string, { count: number; windowStart: number }>();

  constructor(private readonly requestLogRepository: AIRequestLogRepository) {}

  async assertWithinLimit(tenantId: string) {
    const now = Date.now();
    const entry = this.counters.get(tenantId);

    if (!entry || now - entry.windowStart > WINDOW_MS) {
      this.counters.set(tenantId, { count: 1, windowStart: now });
      return;
    }

    if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
      const recentLogs = await this.requestLogRepository.listByTenant(tenantId, 5);
      throw new HttpError({
        statusCode: 429,
        code: ERROR_CODES.AI.VALIDATION_FAILED,
        message: "AI rate limit exceeded. Please try again shortly.",
        metadata: {
          error: "AI_RATE_LIMIT",
          retryAfterMs: WINDOW_MS - (now - entry.windowStart),
          recentRequestCount: recentLogs.length,
        },
      });
    }

    entry.count += 1;
  }
}
