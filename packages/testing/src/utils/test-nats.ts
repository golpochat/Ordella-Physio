export type CapturedNatsEvent = {
  subject: string;
  payload: unknown;
  headers?: Record<string, string>;
};

export type MockNatsClient = {
  publish: (subject: string, payload: unknown, headers?: Record<string, string>) => Promise<void>;
  subscribe: (subject: string, handler: (payload: unknown) => void | Promise<void>) => () => void;
  getPublishedEvents: () => CapturedNatsEvent[];
  getEventsBySubject: (subject: string) => CapturedNatsEvent[];
  clear: () => void;
};

export function createMockNatsClient(): MockNatsClient {
  const events: CapturedNatsEvent[] = [];
  const subscribers = new Map<string, Array<(payload: unknown) => void | Promise<void>>>();

  return {
    async publish(subject, payload, headers) {
      events.push({ subject, payload, headers });
      const handlers = subscribers.get(subject) ?? [];
      await Promise.all(handlers.map((handler) => handler(payload)));
    },

    subscribe(subject, handler) {
      const handlers = subscribers.get(subject) ?? [];
      handlers.push(handler);
      subscribers.set(subject, handlers);

      return () => {
        subscribers.set(
          subject,
          (subscribers.get(subject) ?? []).filter((existing) => existing !== handler),
        );
      };
    },

    getPublishedEvents() {
      return [...events];
    },

    getEventsBySubject(subject) {
      return events.filter((event) => event.subject === subject);
    },

    clear() {
      events.length = 0;
      subscribers.clear();
    },
  };
}

export function assertEventPublished(
  client: MockNatsClient,
  subject: string,
  matcher?: (payload: unknown) => boolean,
): CapturedNatsEvent {
  const matches = client.getEventsBySubject(subject);
  const event = matcher ? matches.find((entry) => matcher(entry.payload)) : matches.at(-1);

  if (!event) {
    throw new Error(`Expected NATS event on subject "${subject}"`);
  }

  return event;
}
