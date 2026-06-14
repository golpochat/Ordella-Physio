import type { Request } from "express";
import { ForbiddenError } from "../../utils/api-error";
import type { StaffActor } from "./staff.types";
import { StaffAccessError } from "./staff.errors";
import { findStaffByUserId } from "./staff.repository";

export function isAdmin(actor: StaffActor): boolean {
  return actor.roles.includes("ADMIN");
}

export function isStaffMember(actor: StaffActor): boolean {
  return actor.roles.includes("STAFF");
}

export function getActorFromRequest(req: Request): StaffActor {
  if (!req.user) {
    throw new ForbiddenError("Authentication required");
  }

  return {
    userId: req.user.id,
    roles: req.user.roles,
  };
}

export function assertTherapistsBlocked(actor: StaffActor): void {
  if (actor.roles.includes("THERAPIST") && !isAdmin(actor)) {
    throw new StaffAccessError("Therapists cannot access staff management");
  }
}

export function assertCanManageStaff(actor: StaffActor): void {
  assertTherapistsBlocked(actor);
  if (!isAdmin(actor)) {
    throw new StaffAccessError("Only administrators can manage staff");
  }
}

export async function assertCanViewStaffProfile(
  tenantId: string,
  actor: StaffActor,
  staff: { id: string; userId: string },
): Promise<void> {
  assertTherapistsBlocked(actor);

  if (isAdmin(actor)) {
    return;
  }

  if (isStaffMember(actor) && staff.userId === actor.userId) {
    return;
  }

  throw new StaffAccessError("You can only view your own staff profile");
}

export async function resolveOwnStaffId(tenantId: string, userId: string): Promise<string | null> {
  const staff = await findStaffByUserId(tenantId, userId);
  return staff?.id ?? null;
}
