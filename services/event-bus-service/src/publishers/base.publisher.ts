import type { EventBus } from "@ordella/event-bus";
import type { PublishMetadataInput } from "@/utils/metadata-helpers";
import { buildEventMetadata, metadataToHeaders } from "@/utils/metadata-helpers";
import { resolveCausationId, resolveCorrelationId } from "@/utils/correlation-helpers";

export type BasePublisherOptions = {
  eventBus: EventBus;
  subject: string;
};

export abstract class BasePublisher<TPayload extends Record<string, unknown>> {
  protected readonly eventBus: EventBus;
  protected readonly subject: string;

  constructor(options: BasePublisherOptions) {
    this.eventBus = options.eventBus;
    this.subject = options.subject;
  }

  protected async publishEvent(
    payload: TPayload,
    metadataInput: PublishMetadataInput,
  ): Promise<void> {
    const correlationId = resolveCorrelationId(metadataInput.correlationId);
    const causationId = resolveCausationId(metadataInput.causationId, correlationId);
    const metadata = buildEventMetadata({
      ...metadataInput,
      correlationId,
      causationId,
    });

    await this.eventBus.publish(this.subject, payload, {
      tenantId: metadata.tenantId,
      correlationId: metadata.correlationId,
      headers: metadataToHeaders(metadata),
    });
  }
}
