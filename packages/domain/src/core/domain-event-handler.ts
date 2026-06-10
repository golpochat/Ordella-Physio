import type { DomainEvent } from "./domain-event";

export interface DomainEventHandler<TEvent extends DomainEvent = DomainEvent> {
  eventName: string;
  handle(event: TEvent): void | Promise<void>;
}

export type DomainEventHandlerFactory = () => DomainEventHandler;
