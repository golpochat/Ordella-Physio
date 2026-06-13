import { Injectable } from "@nestjs/common";
import type { Response } from "express";
import type { TrainingLogEntry } from "@/models/AITrainingJob";

type StreamSubscription = {
  jobId: string;
  response: Response;
  lastIndex: number;
};

@Injectable()
export class TrainingLogStreamService {
  private readonly subscriptions = new Set<StreamSubscription>();

  subscribe(jobId: string, response: Response) {
    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Connection", "keep-alive");
    response.flushHeaders?.();

    const subscription: StreamSubscription = { jobId, response, lastIndex: 0 };
    this.subscriptions.add(subscription);

    response.on("close", () => {
      this.subscriptions.delete(subscription);
    });

    this.writeEvent(response, "connected", { jobId });
  }

  publishLogs(jobId: string, logs: TrainingLogEntry[]) {
    for (const subscription of this.subscriptions) {
      if (subscription.jobId !== jobId) {
        continue;
      }
      const newEntries = logs.slice(subscription.lastIndex);
      subscription.lastIndex = logs.length;
      for (const entry of newEntries) {
        this.writeEvent(subscription.response, "log", entry);
      }
    }
  }

  private writeEvent(response: Response, event: string, data: unknown) {
    response.write(`event: ${event}\n`);
    response.write(`data: ${JSON.stringify(data)}\n\n`);
  }
}
