import { Client, StringCodec, connect } from "nats";
import { toSubject } from "@ordella/event-bus";
import { WORKFLOW_CONFIG } from "./stack";

export type CapturedNatsMessage = {
  subject: string;
  payload: unknown;
  receivedAt: string;
};

const sc = StringCodec();

export class NatsTestClient {
  private connection: Client | null = null;
  private readonly messages: CapturedNatsMessage[] = [];
  private subscriptions: Array<{ unsubscribe: () => void }> = [];

  static async connect(url = WORKFLOW_CONFIG.natsUrl): Promise<NatsTestClient | null> {
    try {
      const connection = await connect({ servers: url, timeout: 3_000 });
      const client = new NatsTestClient();
      client.connection = connection;
      return client;
    } catch {
      return null;
    }
  }

  async subscribe(pattern: string): Promise<void> {
    if (!this.connection) {
      throw new Error("NATS client is not connected");
    }

    const sub = this.connection.subscribe(pattern);
    this.subscriptions.push({
      unsubscribe: () => sub.unsubscribe(),
    });

    (async () => {
      for await (const message of sub) {
        let payload: unknown = sc.decode(message.data);
        try {
          payload = JSON.parse(payload as string);
        } catch {
          // keep raw string
        }
        this.messages.push({
          subject: message.subject,
          payload,
          receivedAt: new Date().toISOString(),
        });
      }
    })();
  }

  async publish(subject: string, payload: unknown, headers?: Record<string, string>): Promise<void> {
    if (!this.connection) {
      throw new Error("NATS client is not connected");
    }

    const data = sc.encode(JSON.stringify(payload));
    this.connection.publish(subject, data, headers ? { headers } : undefined);
    await this.connection.flush();
  }

  getMessages(subject?: string): CapturedNatsMessage[] {
    if (!subject) {
      return [...this.messages];
    }
    return this.messages.filter((message) => message.subject === subject);
  }

  waitForMessage(subject: string, timeoutMs = 10_000): Promise<CapturedNatsMessage> {
    const started = Date.now();
    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        const match = this.getMessages(subject).at(-1);
        if (match) {
          clearInterval(timer);
          resolve(match);
          return;
        }
        if (Date.now() - started > timeoutMs) {
          clearInterval(timer);
          reject(new Error(`Timed out waiting for NATS message on ${subject}`));
        }
      }, 250);
    });
  }

  clear(): void {
    this.messages.length = 0;
  }

  async close(): Promise<void> {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
    this.subscriptions = [];
    if (this.connection) {
      await this.connection.drain();
      this.connection = null;
    }
  }
}

export { toSubject };

export async function probeNats(url = WORKFLOW_CONFIG.natsUrl): Promise<boolean> {
  const client = await NatsTestClient.connect(url);
  if (!client) {
    return false;
  }
  await client.close();
  return true;
}
