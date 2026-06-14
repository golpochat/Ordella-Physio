import { buildPaginatedResponse } from "../../utils/pagination";
import { hashPassword } from "../../utils/password";
import { writeAuditLog } from "../utilities/audit.service";
import { ensureDefaultRoles } from "../rbac/rbac.service";
import {
  assertCanManageTherapists,
  assertCanReadTherapist,
  assertCanReadTherapists,
  assertCanUpdateTherapist,
} from "./therapists.access";
import type { TherapistActor } from "./therapists.types";
import { TherapistConflictError, TherapistScheduleError } from "./therapists.errors";
import {
  createBlockedSlot,
  createTherapistRecord,
  createTherapistUser,
  deactivateTherapistRecord,
  deleteBlockedSlot,
  findTherapistAppointments,
  findTherapistByIdOrThrow,
  findTherapistByUserId,
  findTherapistRole,
  findTherapists,
  findUserByEmail,
  getServiceTypes,
  getTherapistSchedule,
  replaceServiceTypes,
  replaceWorkingHours,
  updateTherapistRecord,
} from "./therapists.repository";
import type {
  AdminUpdateTherapistInput,
  CreateTherapistInput,
  ListTherapistAppointmentsFilters,
  ListTherapistsFilters,
  SelfUpdateTherapistInput,
  ServiceTypeInput,
  WorkingHoursBlock,
} from "./therapists.types";

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;

function parseMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function validateWorkingHours(blocks: WorkingHoursBlock[]): void {
  for (const block of blocks) {
    if (!TIME_PATTERN.test(block.startTime) || !TIME_PATTERN.test(block.endTime)) {
      throw new TherapistScheduleError("Working hours must use HH:mm format (24-hour)");
    }

    if (parseMinutes(block.endTime) <= parseMinutes(block.startTime)) {
      throw new TherapistScheduleError(
        `End time must be after start time for ${block.dayOfWeek}`,
      );
    }
  }

  for (const day of DAYS) {
    const dayBlocks = blocks.filter((block) => block.dayOfWeek === day);
    const sorted = [...dayBlocks].sort((a, b) => parseMinutes(a.startTime) - parseMinutes(b.startTime));

    for (let i = 1; i < sorted.length; i += 1) {
      if (parseMinutes(sorted[i].startTime) < parseMinutes(sorted[i - 1].endTime)) {
        throw new TherapistScheduleError(`Overlapping working hours on ${day}`);
      }
    }
  }
}

export async function listTherapists(tenantId: string, actor: TherapistActor, filters: ListTherapistsFilters) {
  await assertCanReadTherapists(actor);
  const { items, total } = await findTherapists(tenantId, filters);
  return buildPaginatedResponse(items, total, filters);
}

export async function getTherapist(tenantId: string, actor: TherapistActor, id: string) {
  await assertCanReadTherapist(tenantId, actor);
  return findTherapistByIdOrThrow(tenantId, id);
}

export async function getMyTherapistProfile(tenantId: string, actor: TherapistActor) {
  await assertCanReadTherapists(actor);
  const therapist = await findTherapistByUserId(tenantId, actor.userId);
  if (!therapist) {
    throw new TherapistConflictError("No therapist profile linked to this user");
  }
  return therapist;
}

export async function createTherapist(
  tenantId: string,
  actor: TherapistActor,
  userId: string,
  data: CreateTherapistInput,
) {
  assertCanManageTherapists(actor);
  await ensureDefaultRoles(tenantId);

  const existingUser = await findUserByEmail(tenantId, data.email);
  if (existingUser) {
    throw new TherapistConflictError("User with this email already exists");
  }

  const therapistRole = await findTherapistRole(tenantId);
  const user = await createTherapistUser(
    tenantId,
    data,
    await hashPassword(data.password),
    therapistRole?.id ?? null,
  );

  const therapist = await createTherapistRecord(tenantId, user.id, data);

  await writeAuditLog({
    tenantId,
    userId,
    action: "therapist.created",
    entity: "Therapist",
    entityId: therapist.id,
    metadata: { email: data.email },
  });

  return therapist;
}

export async function updateTherapistAsAdmin(
  tenantId: string,
  actor: TherapistActor,
  userId: string,
  id: string,
  data: AdminUpdateTherapistInput,
) {
  const therapist = await findTherapistByIdOrThrow(tenantId, id);
  await assertCanUpdateTherapist(tenantId, actor, therapist, true);

  const { firstName, lastName, phone, ...profileData } = data;
  const updated = await updateTherapistRecord(tenantId, id, profileData, {
    firstName,
    lastName,
    phone,
  });

  await writeAuditLog({
    tenantId,
    userId,
    action: "therapist.updated",
    entity: "Therapist",
    entityId: id,
    metadata: { fields: Object.keys(data), scope: "admin" },
  });

  return updated;
}

export async function updateMyTherapistProfile(
  tenantId: string,
  actor: TherapistActor,
  data: SelfUpdateTherapistInput,
) {
  const therapist = await findTherapistByUserId(tenantId, actor.userId);
  if (!therapist) {
    throw new TherapistConflictError("No therapist profile linked to this user");
  }

  await assertCanUpdateTherapist(tenantId, actor, therapist, false);

  const { firstName, lastName, phone, ...profileData } = data;
  const updated = await updateTherapistRecord(tenantId, therapist.id, profileData, {
    firstName,
    lastName,
    phone,
  });

  await writeAuditLog({
    tenantId,
    userId: actor.userId,
    action: "therapist.profile.updated",
    entity: "Therapist",
    entityId: therapist.id,
    metadata: { fields: Object.keys(data), scope: "self" },
  });

  return updated;
}

export async function deleteTherapist(
  tenantId: string,
  actor: TherapistActor,
  userId: string,
  id: string,
) {
  assertCanManageTherapists(actor);
  const therapist = await deactivateTherapistRecord(tenantId, id);

  await writeAuditLog({
    tenantId,
    userId,
    action: "therapist.deactivated",
    entity: "Therapist",
    entityId: id,
  });

  return therapist;
}

export async function getSchedule(tenantId: string, actor: TherapistActor, therapistId: string) {
  await assertCanReadTherapist(tenantId, actor);
  return getTherapistSchedule(tenantId, therapistId);
}

export async function setWorkingHours(
  tenantId: string,
  actor: TherapistActor,
  userId: string,
  therapistId: string,
  blocks: WorkingHoursBlock[],
) {
  assertCanManageTherapists(actor);
  validateWorkingHours(blocks);

  const workingHours = await replaceWorkingHours(tenantId, therapistId, blocks);

  await writeAuditLog({
    tenantId,
    userId,
    action: "therapist.working_hours.updated",
    entity: "Therapist",
    entityId: therapistId,
    metadata: { blockCount: blocks.length },
  });

  return workingHours;
}

export async function addBlockedSlot(
  tenantId: string,
  actor: TherapistActor,
  userId: string,
  therapistId: string,
  data: { startTime: Date; endTime: Date; reason?: string },
) {
  assertCanManageTherapists(actor);

  if (data.endTime <= data.startTime) {
    throw new TherapistScheduleError("Blocked slot end time must be after start time");
  }

  const slot = await createBlockedSlot(tenantId, therapistId, data);

  await writeAuditLog({
    tenantId,
    userId,
    action: "therapist.blocked_slot.created",
    entity: "TherapistBlockedSlot",
    entityId: slot.id,
    metadata: { therapistId },
  });

  return slot;
}

export async function removeBlockedSlot(
  tenantId: string,
  actor: TherapistActor,
  userId: string,
  therapistId: string,
  blockId: string,
) {
  assertCanManageTherapists(actor);
  const slot = await deleteBlockedSlot(tenantId, therapistId, blockId);

  await writeAuditLog({
    tenantId,
    userId,
    action: "therapist.blocked_slot.deleted",
    entity: "TherapistBlockedSlot",
    entityId: blockId,
    metadata: { therapistId },
  });

  return slot;
}

export async function listServiceTypes(tenantId: string, actor: TherapistActor, therapistId: string) {
  await assertCanReadTherapist(tenantId, actor);
  return getServiceTypes(tenantId, therapistId);
}

export async function setServiceTypes(
  tenantId: string,
  actor: TherapistActor,
  userId: string,
  therapistId: string,
  serviceTypes: ServiceTypeInput[],
) {
  assertCanManageTherapists(actor);

  const names = new Set<string>();
  for (const type of serviceTypes) {
    const key = type.name.trim().toLowerCase();
    if (names.has(key)) {
      throw new TherapistConflictError(`Duplicate service type: ${type.name}`);
    }
    names.add(key);
  }

  const types = await replaceServiceTypes(tenantId, therapistId, serviceTypes);

  await writeAuditLog({
    tenantId,
    userId,
    action: "therapist.service_types.updated",
    entity: "Therapist",
    entityId: therapistId,
    metadata: { count: serviceTypes.length },
  });

  return types;
}

export async function listTherapistAppointments(
  tenantId: string,
  actor: TherapistActor,
  therapistId: string,
  filters: ListTherapistAppointmentsFilters,
) {
  await assertCanReadTherapist(tenantId, actor);
  const { items, total } = await findTherapistAppointments(tenantId, therapistId, filters);
  return buildPaginatedResponse(items, total, filters);
}
