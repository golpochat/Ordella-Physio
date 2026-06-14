import type { Request } from "express";
import { ForbiddenError } from "../../utils/api-error";
import type { TherapistActor } from "./therapists.types";
import { TherapistAccessError } from "./therapists.errors";
import { findTherapistByUserId } from "./therapists.repository";

export function isAdmin(actor: TherapistActor): boolean {
  return actor.roles.includes("ADMIN");
}

export function isStaff(actor: TherapistActor): boolean {
  return actor.roles.includes("STAFF");
}

export function isClinician(actor: TherapistActor): boolean {
  return actor.roles.includes("THERAPIST");
}

export function getActorFromRequest(req: Request): TherapistActor {
  if (!req.user) {
    throw new ForbiddenError("Authentication required");
  }

  return {
    userId: req.user.id,
    roles: req.user.roles,
  };
}

export async function assertCanReadTherapists(actor: TherapistActor): Promise<void> {
  if (actor.roles.includes("PATIENT")) {
    throw new TherapistAccessError("Patients cannot access therapist records");
  }
}

export function assertCanManageTherapists(actor: TherapistActor): void {
  if (!isAdmin(actor)) {
    throw new TherapistAccessError("Only administrators can manage therapists");
  }
}

export async function assertCanReadTherapist(
  _tenantId: string,
  actor: TherapistActor,
): Promise<void> {
  await assertCanReadTherapists(actor);
}

export async function assertCanUpdateTherapist(
  tenantId: string,
  actor: TherapistActor,
  therapist: { id: string; userId: string },
  adminUpdate: boolean,
): Promise<void> {
  if (adminUpdate) {
    assertCanManageTherapists(actor);
    return;
  }

  if (isClinician(actor)) {
    const own = await findTherapistByUserId(tenantId, actor.userId);
    if (!own || own.id !== therapist.id) {
      throw new TherapistAccessError("You can only update your own profile");
    }
    return;
  }

  throw new TherapistAccessError();
}

export async function resolveOwnTherapistId(tenantId: string, userId: string): Promise<string | null> {
  const therapist = await findTherapistByUserId(tenantId, userId);
  return therapist?.id ?? null;
}
