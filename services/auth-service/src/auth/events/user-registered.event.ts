export type UserRegisteredEvent = {
  tenantId: string;
  userId: string;
  email: string;
  role: string;
  occurredAt: string;
};

export function createUserRegisteredEvent(input: Omit<UserRegisteredEvent, "occurredAt">): UserRegisteredEvent {
  return {
    ...input,
    occurredAt: new Date().toISOString(),
  };
}
