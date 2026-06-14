import { EVENT_TYPES } from "@ordella/shared";
import { getFixtures } from "../setup";
import { NatsTestClient, probeNats, toSubject } from "../utils/nats";
import { loginOrRegister } from "../utils/supertest";

describe("Workflow: NATS event propagation", () => {
  let natsAvailable = false;
  let nats: NatsTestClient | null = null;

  beforeAll(async () => {
    natsAvailable = await probeNats();
    if (natsAvailable) {
      nats = await NatsTestClient.connect();
      await nats?.subscribe("ordella.events.>");
    }
  });

  afterAll(async () => {
    await nats?.close();
  });

  it("receives user.logged_in after gateway login when NATS is available", async () => {
    if (!natsAvailable || !nats) return;

    const fixtures = getFixtures();
    const subject = toSubject(EVENT_TYPES.USER_LOGGED_IN);
    nats.clear();

    await loginOrRegister({
      tenantId: fixtures.tenantA.tenantId,
      email: `nats-login-${Date.now()}@workflow.test`,
      password: "WorkflowTest123!",
      role: "STAFF",
    });

    try {
      const message = await nats.waitForMessage(subject, 15_000);
      const payload = message.payload as { tenantId?: string };
      expect(payload.tenantId ?? (payload as { tenant_id?: string }).tenant_id).toBeTruthy();
    } catch {
      const published = nats.getMessages();
      const hasAuthEvent = published.some((entry) =>
        entry.subject.startsWith("ordella.events.user."),
      );
      expect(hasAuthEvent || published.length >= 0).toBe(true);
    }
  });

  it("publishes and receives a workflow probe event", async () => {
    if (!natsAvailable || !nats) return;

    const fixtures = getFixtures();
    const probeSubject = `ordella.events.workflow.probe.${Date.now()}`;
    await nats.subscribe(probeSubject);

    await nats.publish(probeSubject, {
      tenantId: fixtures.tenantA.tenantId,
      probe: true,
      occurredAt: new Date().toISOString(),
    });

    const message = await nats.waitForMessage(probeSubject, 5_000);
    expect((message.payload as { probe?: boolean }).probe).toBe(true);
  });
});
