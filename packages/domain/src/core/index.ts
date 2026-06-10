export { Entity, type EntityProps } from "./entity";
export { AggregateRoot } from "./aggregate-root";
export { ValueObject } from "./value-object";
export { DomainEvent, type DomainEventProps } from "./domain-event";
export {
  DomainEventDispatcher,
  domainEventDispatcher,
} from "./domain-event-dispatcher";
export {
  type DomainEventHandler,
  type DomainEventHandlerFactory,
} from "./domain-event-handler";
export {
  Failure,
  Success,
  combineResults,
  fail,
  ok,
  type Result,
} from "./result";
