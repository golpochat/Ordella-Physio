export const EVENT_HANDLER_METADATA = "ordella:event-handler";
export const SUBSCRIBE_TO_METADATA = "ordella:subscribe-to";

export type EventHandlerMetadata = {
  handlerName: string;
};

export type SubscribeToMetadata = {
  subject: string;
  durableName?: string;
  queueGroup?: string;
};
