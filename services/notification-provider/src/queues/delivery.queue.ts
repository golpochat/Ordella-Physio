import { randomUUID } from "crypto";

export type DeliveryQueuePayload = {
  tenantId: string;
  channel: string;
  to: string;
  templateId?: string;
  variables?: Record<string, string>;
  metadata?: Record<string, unknown>;
  message?: string;
  subject?: string;
  title?: string;
  html?: string;
};

export type DeliveryQueueJob = DeliveryQueuePayload & {
  id: string;
  enqueuedAt: Date;
};

export type DeliveryQueueHandler = (job: DeliveryQueueJob) => Promise<void>;

export class DeliveryQueue {
  private readonly jobs: DeliveryQueueJob[] = [];
  private processing = false;
  private handler: DeliveryQueueHandler | null = null;
  private lastProcessedAt: Date | null = null;

  setHandler(handler: DeliveryQueueHandler) {
    this.handler = handler;
  }

  enqueue(payload: DeliveryQueuePayload): DeliveryQueueJob {
    const job: DeliveryQueueJob = {
      ...payload,
      id: randomUUID(),
      enqueuedAt: new Date(),
    };
    this.jobs.push(job);
    void this.drain();
    return job;
  }

  getStats() {
    return {
      pending: this.jobs.length,
      processing: this.processing,
      lastProcessedAt: this.lastProcessedAt?.toISOString() ?? null,
    };
  }

  private async drain() {
    if (this.processing || !this.handler) {
      return;
    }

    this.processing = true;

    try {
      while (this.jobs.length > 0) {
        const job = this.jobs.shift();
        if (!job) {
          break;
        }

        await this.handler(job);
        this.lastProcessedAt = new Date();
      }
    } finally {
      this.processing = false;

      if (this.jobs.length > 0) {
        void this.drain();
      }
    }
  }
}
