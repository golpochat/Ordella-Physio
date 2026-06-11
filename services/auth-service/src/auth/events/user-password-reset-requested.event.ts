export type UserPasswordResetRequestedEvent = {
  tenantId: string;
  userId: string;
  email: string;
  occurredAt: string;
};

export function createUserPasswordResetRequestedEvent(
  input: Omit<UserPasswordResetRequestedEvent, "occurredAt">,
): UserPasswordResetRequestedEvent {
  return {
    ...input,
    occurredAt: new Date().toISOString(),
  };
}
