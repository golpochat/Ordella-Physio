import { toSubject } from "@ordella/event-bus";

export function toEventSubject(eventName: string): string {
  return toSubject(eventName);
}

export function stripSubjectPrefix(subject: string): string {
  return subject.replace(/^ordella\.events\./, "");
}

export function matchesTenantFilter(tenantId: string | undefined, eventTenantId: string): boolean {
  if (!tenantId) {
    return true;
  }

  return tenantId === eventTenantId;
}
