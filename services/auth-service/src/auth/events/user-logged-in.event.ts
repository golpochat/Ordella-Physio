export type UserLoggedInEvent = {
  tenantId: string;
  userId: string;
  email: string;
  sessionId: string;
  occurredAt: string;
};

export function createUserLoggedInEvent(input: Omit<UserLoggedInEvent, "occurredAt">): UserLoggedInEvent {
  return {
    ...input,
    occurredAt: new Date().toISOString(),
  };
}
