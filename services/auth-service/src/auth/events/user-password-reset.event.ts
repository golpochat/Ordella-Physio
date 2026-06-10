export type UserPasswordResetEvent = {
  tenantId: string;
  userId: string;
  email: string;
  occurredAt: string;
};

export function createUserPasswordResetEvent(
  input: Omit<UserPasswordResetEvent, "occurredAt">,
): UserPasswordResetEvent {
  return {
    ...input,
    occurredAt: new Date().toISOString(),
  };
}
