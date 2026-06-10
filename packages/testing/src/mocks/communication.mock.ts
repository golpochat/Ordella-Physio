import { nextSequence, randomFrom } from "./random";

export type MockNotificationType = "EMAIL" | "SMS" | "PUSH" | "IN_APP";
export type MockNotificationStatus = "PENDING" | "SENT" | "FAILED";

export type MockNotification = {
  id: string;
  tenantId: string;
  type: MockNotificationType;
  template: string;
  to: string;
  subject: string | null;
  message: string;
  status: MockNotificationStatus;
  createdAt: Date;
  updatedAt: Date;
};

const TYPES: MockNotificationType[] = ["EMAIL", "SMS", "PUSH", "IN_APP"];
const STATUSES: MockNotificationStatus[] = ["PENDING", "SENT", "FAILED"];

export function mockNotification(overrides: Partial<MockNotification> = {}): MockNotification {
  const index = nextSequence();
  const now = new Date("2024-01-01T00:00:00.000Z");

  return {
    id: overrides.id ?? `notification-${index}`,
    tenantId: overrides.tenantId ?? `tenant-${index}`,
    type: overrides.type ?? randomFrom(TYPES),
    template: overrides.template ?? `template-${index}`,
    to: overrides.to ?? `recipient${index}@example.com`,
    subject: overrides.subject ?? `Subject ${index}`,
    message: overrides.message ?? `Notification message ${index}`,
    status: overrides.status ?? randomFrom(STATUSES),
    createdAt: overrides.createdAt ?? now,
    updatedAt: overrides.updatedAt ?? now,
    ...overrides,
  };
}
