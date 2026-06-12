import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import type { NotificationChannel, NotificationProviderName, Prisma } from "@/generated/prisma";
import type { DeliveryLogRecord } from "@/models/DeliveryLog";
import { DeliveryLogRepository } from "@/repositories/delivery-log.repository";
import { DeliveryQueueService } from "@/services/delivery-queue.service";
import { FailoverService } from "@/services/failover.service";
import { ProviderRegistryService, type ProviderSendPayload } from "@/services/provider-registry.service";
import { RateLimitService } from "@/services/rate-limit.service";
import { SubscriptionBillingClient } from "@/integrations/subscription-billing.client";
import { providerDeliveryFailedError } from "@/utils/provider-errors";
import { resolveTemplateContent } from "@/utils/template-resolver";
import { validateDeliveryPayload, type DeliveryPayload } from "@/validators/delivery.validator";

const MAX_RETRIES = Number(process.env.NOTIFICATION_MAX_RETRIES ?? "3");
const RETRY_BASE_SECONDS = Number(process.env.NOTIFICATION_RETRY_BASE_SECONDS ?? "30");

@Injectable()
export class DeliveryService implements OnModuleInit {
  private readonly logger = new Logger(DeliveryService.name);

  constructor(
    private readonly deliveryLogRepository: DeliveryLogRepository,
    private readonly deliveryQueueService: DeliveryQueueService,
    private readonly failoverService: FailoverService,
    private readonly providerRegistry: ProviderRegistryService,
    private readonly rateLimitService: RateLimitService,
    private readonly subscriptionBillingClient: SubscriptionBillingClient,
  ) {}

  onModuleInit() {
    this.deliveryQueueService.registerHandler(async (job) => {
      try {
        await this.internalSendNotification(job.tenantId, {
          channel: job.channel as NotificationChannel,
          to: job.to,
          templateId: job.templateId,
          variables: job.variables,
          metadata: job.metadata,
          message: job.message,
          subject: job.subject,
          title: job.title,
          html: job.html,
        });
      } catch (error) {
        this.logger.warn(
          `Queue delivery failed for job ${job.id}`,
          error instanceof Error ? error.message : error,
        );
      }
    });
  }

  async sendNotification(payloadInput: Record<string, unknown>, tenantId: string) {
    const payload = validateDeliveryPayload(payloadInput);
    if (payload.channel === "SMS") {
      await this.subscriptionBillingClient.enforceSmsSend(tenantId);
    }
    this.rateLimitService.checkRateLimit(tenantId, payload.channel);

    this.deliveryQueueService.enqueue({
      tenantId,
      channel: payload.channel,
      to: payload.to,
      templateId: payload.templateId,
      variables: payload.variables,
      metadata: payload.metadata,
      message: payload.message,
      subject: payload.subject,
      title: payload.title,
      html: payload.html,
    });

    return {
      queued: true,
      message: "Notification queued for delivery.",
    };
  }

  async internalSendNotification(
    tenantId: string,
    payloadInput: Record<string, unknown>,
    options: { existingLogId?: string; skipRateLimit?: boolean } = {},
  ) {
    const payload = validateDeliveryPayload(payloadInput);

    if (payload.channel === "SMS") {
      await this.subscriptionBillingClient.enforceSmsSend(tenantId);
    }

    if (!options.skipRateLimit) {
      this.rateLimitService.checkRateLimit(tenantId, payload.channel);
    }

    return this.executeDelivery(tenantId, payload, payloadInput, options);
  }

  async resendFromLog(log: DeliveryLogRecord) {
    const payloadInput = log.requestPayload as Record<string, unknown>;

    await this.deliveryLogRepository.update(log.id, {
      retryCount: { increment: 1 },
      nextAttemptAt: null,
      errorMessage: null,
    });

    try {
      const result = await this.internalSendNotification(log.tenantId, payloadInput, {
        existingLogId: log.id,
        skipRateLimit: true,
      });

      await this.deliveryLogRepository.update(log.id, {
        status: "SUCCESS",
        provider: result.provider,
        responsePayload: {
          providerMessageId: result.providerMessageId,
        } as Prisma.InputJsonValue,
        errorMessage: null,
        nextAttemptAt: null,
      });

      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Retry delivery failed.";
      const updated = await this.deliveryLogRepository.update(log.id, {
        status: "FAILED",
        errorMessage: message,
        responsePayload: { error: message },
      });

      await this.scheduleRetry(updated);
      throw error;
    }
  }

  private async executeDelivery(
    tenantId: string,
    payload: DeliveryPayload,
    payloadInput: Record<string, unknown>,
    options: { existingLogId?: string; skipRateLimit?: boolean } = {},
  ) {
    const configs = await this.failoverService.selectProvidersForChannel(tenantId, payload.channel);
    const rendered = resolveTemplateContent(
      payload.templateId,
      payload.variables,
      payload.message,
    );

    const requestBase = {
      ...payloadInput,
      channel: payload.channel,
      to: payload.to,
      templateId: payload.templateId,
      variables: payload.variables,
      metadata: payload.metadata,
      message: payload.message,
      subject: payload.subject,
      title: payload.title,
      html: payload.html,
    };

    let lastProvider: NotificationProviderName = configs[0]!.provider;
    let lastError = "All providers failed to deliver the message.";

    for (const config of configs) {
      lastProvider = config.provider;
      const adapter = this.providerRegistry.getProviderForChannel(config.channel, config.provider);

      if (!adapter) {
        lastError = "Provider adapter not registered.";
        await this.logAttemptFailure(tenantId, payload.channel, config.provider, requestBase, lastError);
        continue;
      }

      const providerPayload = this.buildProviderPayload(
        payload.channel,
        payload,
        rendered,
        config.credentials,
      );

      try {
        const result = await adapter.send(providerPayload);

        if (result.success) {
          if (payload.channel === "SMS") {
            void this.subscriptionBillingClient.recordSmsSent(tenantId);
          }

          if (options.existingLogId) {
            return {
              message: "Notification sent.",
              provider: config.provider,
              providerMessageId: result.providerMessageId,
            };
          }

          await this.deliveryLogRepository.create({
            tenantId,
            channel: payload.channel,
            provider: config.provider,
            status: "SUCCESS",
            requestPayload: requestBase,
            responsePayload: {
              providerMessageId: result.providerMessageId,
            },
          });

          return {
            message: "Notification sent.",
            provider: config.provider,
            providerMessageId: result.providerMessageId,
          };
        }

        lastError = result.errorMessage ?? "Provider returned failure.";
        await this.logAttemptFailure(
          tenantId,
          payload.channel,
          config.provider,
          requestBase,
          lastError,
        );
      } catch (error) {
        lastError = error instanceof Error ? error.message : "Provider send failed.";
        this.logger.warn(`Provider ${config.provider} failed: ${lastError}`);
        await this.logAttemptFailure(
          tenantId,
          payload.channel,
          config.provider,
          requestBase,
          lastError,
        );
      }
    }

    if (options.existingLogId) {
      throw providerDeliveryFailedError(lastError);
    }

    const failureLog = await this.deliveryLogRepository.create({
      tenantId,
      channel: payload.channel,
      provider: lastProvider,
      status: "FAILED",
      errorMessage: lastError,
      requestPayload: requestBase,
      responsePayload: { error: lastError },
    });

    await this.scheduleRetry(failureLog);
    throw providerDeliveryFailedError();
  }

  private async scheduleRetry(deliveryLog: DeliveryLogRecord) {
    if (deliveryLog.status !== "FAILED" || deliveryLog.retryCount >= MAX_RETRIES) {
      return;
    }

    const nextAttemptAt = new Date(
      Date.now() + 2 ** deliveryLog.retryCount * RETRY_BASE_SECONDS * 1000,
    );

    await this.deliveryLogRepository.update(deliveryLog.id, { nextAttemptAt });
  }

  private buildProviderPayload(
    channel: NotificationChannel,
    payload: DeliveryPayload,
    rendered: ReturnType<typeof resolveTemplateContent>,
    credentials: Record<string, unknown>,
  ): ProviderSendPayload {
    switch (channel) {
      case "EMAIL":
        return {
          to: payload.to,
          subject: payload.subject ?? rendered.subject ?? "Notification",
          html: payload.html ?? rendered.body,
          text: rendered.text,
          credentials,
        };
      case "SMS":
      case "WHATSAPP":
      case "VIBER":
        return {
          to: payload.to,
          message: rendered.body,
          credentials,
        };
      case "PUSH":
        return {
          token: payload.to,
          title: payload.title ?? rendered.subject ?? "Notification",
          body: rendered.body,
          credentials,
        };
      default:
        return {
          to: payload.to,
          message: rendered.body,
          credentials,
        };
    }
  }

  private async logAttemptFailure(
    tenantId: string,
    channel: NotificationChannel,
    provider: NotificationProviderName,
    requestPayload: Record<string, unknown>,
    errorMessage: string,
  ) {
    await this.deliveryLogRepository.create({
      tenantId,
      channel,
      provider,
      status: "FAILED",
      errorMessage,
      requestPayload,
      responsePayload: { error: errorMessage },
    });
  }
}
