import { Entity, type EntityProps } from "./entity";
import type { DomainEvent } from "./domain-event";

export abstract class AggregateRoot<T extends EntityProps> extends Entity<T> {
  private readonly domainEvents: DomainEvent[] = [];

  protected addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  pullDomainEvents(): DomainEvent[] {
    const events = [...this.domainEvents];
    this.clearEvents();
    return events;
  }

  clearEvents(): void {
    this.domainEvents.length = 0;
  }

  getDomainEvents(): readonly DomainEvent[] {
    return [...this.domainEvents];
  }
}
