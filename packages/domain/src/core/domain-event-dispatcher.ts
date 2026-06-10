import type { DomainEvent } from "./domain-event";
import type { DomainEventHandler } from "./domain-event-handler";

export class DomainEventDispatcher {
  private readonly handlers = new Map<string, DomainEventHandler[]>();

  register(handler: DomainEventHandler): void {
    const existing = this.handlers.get(handler.eventName) ?? [];
    existing.push(handler);
    this.handlers.set(handler.eventName, existing);
  }

  async dispatch(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.eventName) ?? [];

    await Promise.all(handlers.map((handler) => handler.handle(event)));
  }

  async dispatchAll(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.dispatch(event);
    }
  }

  clearHandlers(eventName?: string): void {
    if (eventName) {
      this.handlers.delete(eventName);
      return;
    }

    this.handlers.clear();
  }

  getHandlers(eventName: string): readonly DomainEventHandler[] {
    return [...(this.handlers.get(eventName) ?? [])];
  }
}

export const domainEventDispatcher = new DomainEventDispatcher();
