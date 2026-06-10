import { nextSequence, randomHex, randomFrom } from "./random";

export type MockUserRole = "OWNER" | "ADMIN" | "THERAPIST" | "STAFF";

export type MockUser = {
  id: string;
  tenantId: string;
  email: string;
  passwordHash: string;
  role: MockUserRole;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const ROLES: MockUserRole[] = ["OWNER", "ADMIN", "THERAPIST", "STAFF"];

export function mockUser(overrides: Partial<MockUser> = {}): MockUser {
  const index = nextSequence();
  const now = new Date("2024-01-01T00:00:00.000Z");

  return {
    id: overrides.id ?? `user-${randomHex(8)}`,
    tenantId: overrides.tenantId ?? `tenant-${index}`,
    email: overrides.email ?? `user${index}@example.com`,
    passwordHash: overrides.passwordHash ?? `$2b$12$${randomHex(16)}`,
    role: overrides.role ?? randomFrom(ROLES),
    firstName: overrides.firstName ?? `First${index}`,
    lastName: overrides.lastName ?? `Last${index}`,
    isActive: overrides.isActive ?? true,
    createdAt: overrides.createdAt ?? now,
    updatedAt: overrides.updatedAt ?? now,
    ...overrides,
  };
}
