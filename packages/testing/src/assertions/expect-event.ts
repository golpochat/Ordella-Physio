import type { CapturedNatsEvent, MockNatsClient } from "../utils/test-nats";

export function expectEvent(
  client: MockNatsClient,
  subject: string,
  matcher?: (payload: unknown) => boolean,
): CapturedNatsEvent {
  const events = client.getEventsBySubject(subject);
  const event = matcher ? events.find((entry) => matcher(entry.payload)) : events.at(-1);

  if (!event) {
    throw new Error(`Expected event on subject "${subject}"`);
  }

  return event;
}

export function expectEventCount(client: MockNatsClient, subject: string, count: number): void {
  const events = client.getEventsBySubject(subject);
  if (events.length !== count) {
    throw new Error(`Expected ${count} events on "${subject}", received ${events.length}`);
  }
}
