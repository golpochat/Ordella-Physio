import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { EnterpriseRepository } from "@/enterprise/enterprise.repository";
import { signWebhookPayload } from "@/utils/enterprise-helpers";

@Injectable()
export class WebhookDispatcherService {
  constructor(
    private readonly repository: EnterpriseRepository,
    private readonly httpService: HttpService,
  ) {}

  async dispatchEvent(tenantId: string, eventType: string, payload: Record<string, unknown>) {
    const webhooks = await this.repository.listWebhooksForEvent(tenantId, eventType);
    const deliveries = [];

    for (const webhook of webhooks) {
      const delivery = await this.repository.createWebhookDelivery({
        tenantId,
        eventType,
        payload: payload as Prisma.InputJsonValue,
        webhook: { connect: { id: webhook.id } },
        status: "pending",
      });
      deliveries.push(delivery);
      await this.attemptDelivery(delivery.id);
    }

    return { dispatched: deliveries.length, eventType };
  }

  async attemptDelivery(deliveryId: string) {
    const pending = await this.repository.listPendingDeliveries();
    const delivery = pending.find((entry) => entry.id === deliveryId);
    if (!delivery) return null;

    const timestamp = Math.floor(Date.now() / 1000);
    const body = JSON.stringify({
      eventType: delivery.eventType,
      tenantId: delivery.tenantId,
      payload: delivery.payload,
      timestamp,
    });
    const signature = signWebhookPayload(delivery.webhook.secret, body, timestamp);

    try {
      const response = await firstValueFrom(
        this.httpService.post(delivery.webhook.url, body, {
          headers: {
            "Content-Type": "application/json",
            "X-Ordella-Signature": signature,
            "X-Ordella-Timestamp": String(timestamp),
            "X-Ordella-Event": delivery.eventType,
          },
          validateStatus: () => true,
          timeout: 10000,
        }),
      );

      const success = response.status >= 200 && response.status < 300;
      const attemptCount = delivery.attemptCount + 1;

      if (success) {
        return this.repository.updateWebhookDelivery(delivery.id, {
          status: "delivered",
          attemptCount,
          deliveredAt: new Date(),
          lastResponse: String(response.status),
          signature,
        });
      }

      return this.scheduleRetry(delivery, attemptCount, String(response.status));
    } catch (error) {
      return this.scheduleRetry(
        delivery,
        delivery.attemptCount + 1,
        error instanceof Error ? error.message : "Delivery failed",
      );
    }
  }

  async processRetries() {
    const pending = await this.repository.listPendingDeliveries();
    await Promise.all(pending.map((delivery) => this.attemptDelivery(delivery.id)));
    return { processed: pending.length };
  }

  private scheduleRetry(
    delivery: { id: string; attemptCount: number; webhook: { maxRetries: number } },
    attemptCount: number,
    lastResponse: string,
  ) {
    if (attemptCount >= delivery.webhook.maxRetries) {
      return this.repository.updateWebhookDelivery(delivery.id, {
        status: "failed",
        attemptCount,
        lastResponse,
      });
    }

    const delayMs = Math.min(60_000, 1000 * 2 ** attemptCount);
    return this.repository.updateWebhookDelivery(delivery.id, {
      status: "retrying",
      attemptCount,
      lastResponse,
      nextRetryAt: new Date(Date.now() + delayMs),
    });
  }

  verifySignature(secret: string, body: string, timestamp: number, signature: string): boolean {
    return signWebhookPayload(secret, body, timestamp) === signature;
  }
}
