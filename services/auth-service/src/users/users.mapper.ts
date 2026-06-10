import type { User } from "@prisma/client";
import type { SecurityRole } from "@ordella/security";

export type UserRecord = User;

export function toUserRecord(user: User): UserRecord {
  return {
    ...user,
    role: user.role as SecurityRole,
  };
}
