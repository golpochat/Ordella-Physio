import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { createEventBus, type EventBus, toSubject } from "@ordella/event-bus";
import { AUTH_EVENTS } from "@/constants";
import type { UserLoggedInEvent } from "@/auth/events/user-logged-in.event";
import type { UserPasswordResetEvent } from "@/auth/events/user-password-reset.event";
import type { UserPasswordResetRequestedEvent } from "@/auth/events/user-password-reset-requested.event";
import type { UserRegisteredEvent } from "@/auth/events/user-registered.event";

@Injectable()
export class AuthEventPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AuthEventPublisher.name);
  private eventBus: EventBus | null = null;

  async onModuleInit() {
    try {
      this.eventBus = createEventBus();
      await this.eventBus.connect();
      this.logger.log("Auth event publisher connected to NATS");
    } catch (error) {
      this.eventBus = null;
      this.logger.warn(
        `NATS unavailable; auth events will not be published (${error instanceof Error ? error.message : String(error)})`,
      );
    }
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

  async publishUserRegistered(event: UserRegisteredEvent, correlationId?: string) {
    await this.publish(AUTH_EVENTS.USER_REGISTERED, event.tenantId, event, correlationId);
  }

  async publishUserLoggedIn(event: UserLoggedInEvent, correlationId?: string) {
    await this.publish(AUTH_EVENTS.USER_LOGGED_IN, event.tenantId, event, correlationId);
  }

  async publishUserPasswordReset(event: UserPasswordResetEvent, correlationId?: string) {
    await this.publish(AUTH_EVENTS.USER_PASSWORD_RESET, event.tenantId, event, correlationId);
  }

  async publishUserPasswordResetRequested(event: UserPasswordResetRequestedEvent, correlationId?: string) {
    await this.publish(AUTH_EVENTS.USER_PASSWORD_RESET_REQUESTED, event.tenantId, event, correlationId);
  }
}
