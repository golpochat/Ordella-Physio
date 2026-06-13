import { Injectable, Logger } from "@nestjs/common";
import { GatewayRepository } from "@/repositories/gateway.repository";

type FailureTracker = { failures: number; lastFailureAt: number; requests: number };

@Injectable()
export class AbuseDetectionService {
  private readonly logger = new Logger(AbuseDetectionService.name);
  private readonly trackers = new Map<string, FailureTracker>();

  constructor(private readonly repository: GatewayRepository) {}

  private trackerKey(tenantId: string, keyId: string) {
    return `${tenantId}:${keyId}`;
  }

  recordRequest(tenantId: string, keyId: string, success: boolean, tokens: number) {
    const key = this.trackerKey(tenantId, keyId);
    const tracker = this.trackers.get(key) ?? { failures: 0, lastFailureAt: 0, requests: 0 };
    tracker.requests += 1;
    if (!success) {
      tracker.failures += 1;
      tracker.lastFailureAt = Date.now();
    }
    this.trackers.set(key, tracker);

    const failureRate = tracker.failures / Math.max(tracker.requests, 1);
    const spike = tokens > 50_000;
    const repeatedFailures = tracker.failures >= 10 && failureRate > 0.5;

    if (spike || repeatedFailures) {
      void this.flagKey(keyId, spike ? "token_spike" : "repeated_failures");
    }

    return { flagged: spike || repeatedFailures, failureRate };
  }

  async flagKey(keyId: string, reason: string) {
    this.logger.warn(`Flagging gateway key ${keyId}: ${reason}`);
    await this.repository.updateKey(keyId, { isFlagged: true, isThrottled: true });
    return { flagged: true, reason };
  }

  async throttleKey(keyId: string) {
    await this.repository.updateKey(keyId, { isThrottled: true });
    return { throttled: true };
  }
}
