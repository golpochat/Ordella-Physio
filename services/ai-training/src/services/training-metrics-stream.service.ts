import { Injectable } from "@nestjs/common";
import type { Response } from "express";

type MetricsSubscription = {
  jobId: string;
  response: Response;
  lastSignature: string | null;
};

@Injectable()
export class TrainingMetricsStreamService {
  private readonly subscriptions = new Set<MetricsSubscription>();

  subscribe(jobId: string, response: Response) {
    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Connection", "keep-alive");
    response.flushHeaders?.();

    const subscription: MetricsSubscription = { jobId, response, lastSignature: null };
    this.subscriptions.add(subscription);

    response.on("close", () => {
      this.subscriptions.delete(subscription);
    });

    this.writeEvent(response, "connected", { jobId });
  }

  publishMetrics(jobId: string, metrics: Record<string, unknown>) {
    const signature = JSON.stringify(metrics);
    for (const subscription of this.subscriptions) {
      if (subscription.jobId !== jobId || subscription.lastSignature === signature) {
        continue;
      }
      subscription.lastSignature = signature;
      this.writeEvent(subscription.response, "metrics", { jobId, metrics, timestamp: new Date().toISOString() });
    }
  }

  private writeEvent(response: Response, event: string, data: unknown) {
    response.write(`event: ${event}\n`);
    response.write(`data: ${JSON.stringify(data)}\n\n`);
  }
}
