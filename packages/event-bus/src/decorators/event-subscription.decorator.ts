import { SetMetadata } from "@nestjs/common";
import {
  EVENT_HANDLER_METADATA,
  SUBSCRIBE_TO_METADATA,
  type EventHandlerMetadata,
  type SubscribeToMetadata,
} from "./event-handler.decorator";

export function EventHandler(): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const metadata: EventHandlerMetadata = {
      handlerName: String(propertyKey),
    };

    SetMetadata(EVENT_HANDLER_METADATA, metadata)(target, propertyKey, descriptor);
  };
}

export function SubscribeTo(
  subject: string,
  durableName?: string,
  queueGroup?: string,
): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const metadata: SubscribeToMetadata = {
      subject,
      durableName,
      queueGroup,
    };

    SetMetadata(SUBSCRIBE_TO_METADATA, metadata)(target, propertyKey, descriptor);
  };
}

export function getEventHandlerMetadata(target: object, methodName: string | symbol) {
  return Reflect.getMetadata(EVENT_HANDLER_METADATA, target, methodName) as
    | EventHandlerMetadata
    | undefined;
}

export function getSubscribeToMetadata(target: object, methodName: string | symbol) {
  return Reflect.getMetadata(SUBSCRIBE_TO_METADATA, target, methodName) as
    | SubscribeToMetadata
    | undefined;
}

export {
  EVENT_HANDLER_METADATA,
  SUBSCRIBE_TO_METADATA,
  type EventHandlerMetadata,
  type SubscribeToMetadata,
} from "./event-handler.decorator";
