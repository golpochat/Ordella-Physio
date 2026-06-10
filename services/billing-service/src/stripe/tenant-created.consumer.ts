import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, toSubject, type EventBus } from "@ordella/event-bus";
import { EVENT_TYPES } from "@ordella/shared";
import { StripeBillingService } from "@/stripe/stripe-billing.service";

@Injectable()
export class TenantCreatedConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TenantCreatedConsumer.name);
  private eventBus: EventBus | null = null;

  constructor(private readonly stripeBillingService: StripeBillingService) {}

  async onModuleInit() {
    this.eventBus = createEventBus();
    await this.eventBus.connect();

    await this.eventBus.subscribe(
      toSubject(EVENT_TYPES.TENANT_CREATED),
      async (event) => {
        const payload = event.payload as {
          tenantId: string;
          name: string;
          slug: string;
        };
        try {
          await this.stripeBillingService.handleTenantCreated(payload);
          this.logger.log(`Stripe customer provisioned for tenant ${payload.tenantId}`);
        } catch (error) {
          this.logger.error(
            `Failed to provision Stripe customer for tenant ${payload.tenantId}: ${
              error instanceof Error ? error.message : "unknown"
            }`,
          );
        }
      },
      {
        durableName: "billing-tenant-created",
        queueGroup: "billing-stripe-provisioning",
      },
    );

    this.logger.log("Tenant created consumer registered");
  }

  async onModuleDestroy() {
    this.eventBus = null;
  }
}
