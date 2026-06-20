import type { User } from "@/generated/prisma";
import type { SecurityRole } from "@ordella/security";

export type UserRecord = User;

export function toUserRecord(user: User): UserRecord {
  return {
    ...user,
    role: user.role as unknown as SecurityRole,
  };
}
