import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, type EventBus, toSubject } from "@ordella/event-bus";
import { TENANT_EVENTS } from "@/constants";
import type { TenantCreatedEvent } from "@/tenants/events/tenant-created.event";
import type { TenantUpdatedEvent } from "@/tenants/events/tenant-updated.event";
import type { LocationAddedEvent } from "@/tenants/events/location-added.event";
import type { StaffAddedEvent } from "@/tenants/events/staff-added.event";

export type SubscriptionUpdatedEvent = {
  tenantId: string;
  plan: string;
  usageLimit?: number | null;
  updatedAt: string;
};

@Injectable()
export class TenantEventPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TenantEventPublisher.name);
  private eventBus: EventBus | null = null;

  async onModuleInit() {
    this.eventBus = createEventBus();
    await this.eventBus.connect();
    this.logger.log("Tenant event publisher connected to NATS");
  }

  async onModuleDestroy() {
    this.eventBus = null;
  }

  private async publish<T>(subject: string, tenantId: string, payload: T, correlationId?: string) {
    if (!this.eventBus) {
      this.logger.warn(`Event bus unavailable, skipped publish: ${subject}`);
      return;
    }

    await this.eventBus.publish(toSubject(subject), payload, { tenantId, correlationId });
    this.logger.log(`Published ${subject} for tenant ${tenantId}`);
  }

  async publishTenantCreated(event: TenantCreatedEvent, correlationId?: string) {
    await this.publish(TENANT_EVENTS.TENANT_CREATED, event.tenantId, event, correlationId);
  }

  async publishTenantUpdated(event: TenantUpdatedEvent, correlationId?: string) {
    await this.publish(TENANT_EVENTS.TENANT_UPDATED, event.tenantId, event, correlationId);
  }

  async publishLocationAdded(event: LocationAddedEvent, correlationId?: string) {
    await this.publish(TENANT_EVENTS.LOCATION_ADDED, event.tenantId, event, correlationId);
  }

  async publishStaffAdded(event: StaffAddedEvent, correlationId?: string) {
    await this.publish(TENANT_EVENTS.STAFF_ADDED, event.tenantId, event, correlationId);
  }

  async publishSubscriptionUpdated(event: SubscriptionUpdatedEvent, correlationId?: string) {
    await this.publish(TENANT_EVENTS.SUBSCRIPTION_UPDATED, event.tenantId, event, correlationId);
  }
}
