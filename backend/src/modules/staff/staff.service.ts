import { buildPaginatedResponse } from "../../utils/pagination";
import { hashPassword } from "../../utils/password";
import { ensureDefaultRoles } from "../rbac/rbac.service";
import {
  assertCanManageStaff,
  assertCanViewStaffProfile,
  assertTherapistsBlocked,
} from "./staff.access";
import type { StaffActor } from "./staff.types";
import { StaffConflictError, StaffRoleAssignmentError } from "./staff.errors";
import {
  createStaffRecord,
  createStaffUser,
  deactivateStaffRecord,
  findRolesByNames,
  findStaffByIdOrThrow,
  findStaffByUserId,
  findStaffMembers,
  findUserByEmail,
  getUserRoleAssignments,
  mapStaffProfile,
  replaceUserRoles,
  updateStaffRecord,
} from "./staff.repository";
import type {
  AdminUpdateStaffInput,
  CreateStaffInput,
  ListStaffFilters,
  StaffAssignableRoleName,
} from "./staff.types";
import { STAFF_ASSIGNABLE_ROLE_NAMES } from "./staff.types";

function resolveRoleNames(input?: StaffAssignableRoleName[]): StaffAssignableRoleName[] {
  if (!input || input.length === 0) {
    return ["STAFF"];
  }
  return input;
}

async function resolveAssignableRoleIds(
  tenantId: string,
  roleNames: StaffAssignableRoleName[],
): Promise<string[]> {
  const roles = await findRolesByNames(tenantId, roleNames);
  const foundNames = new Set(roles.map((role) => role.name));
  const missing = roleNames.filter((name) => !foundNames.has(name));

  if (missing.length > 0) {
    throw new StaffRoleAssignmentError(`Roles not found: ${missing.join(", ")}`);
  }

  const invalid = roles.filter(
    (role) => !(STAFF_ASSIGNABLE_ROLE_NAMES as readonly string[]).includes(role.name),
  );
  if (invalid.length > 0) {
    throw new StaffRoleAssignmentError(
      `Roles cannot be assigned via staff module: ${invalid.map((r) => r.name).join(", ")}`,
    );
  }

  return roles.map((role) => role.id);
}

export async function listStaff(tenantId: string, actor: StaffActor, filters: ListStaffFilters) {
  assertCanManageStaff(actor);
  const { items, total } = await findStaffMembers(tenantId, filters);
  return buildPaginatedResponse(
    items.map((item) => mapStaffProfile(item)),
    total,
    filters,
  );
}

export async function getStaffMember(tenantId: string, actor: StaffActor, id: string) {
  const staff = await findStaffByIdOrThrow(tenantId, id);
  await assertCanViewStaffProfile(tenantId, actor, staff);
  return mapStaffProfile(staff);
}

export async function getMyStaffProfile(tenantId: string, actor: StaffActor) {
  assertTherapistsBlocked(actor);

  const staff = await findStaffByUserId(tenantId, actor.userId);
  if (!staff) {
    throw new StaffConflictError("No staff profile linked to this user");
  }

  await assertCanViewStaffProfile(tenantId, actor, staff);
  return mapStaffProfile(staff);
}

export async function getStaffPermissions(tenantId: string, actor: StaffActor, id: string) {
  const profile = await getStaffMember(tenantId, actor, id);
  return {
    staffId: profile.staff.id,
    userId: profile.staff.userId,
    roles: profile.roles.map((role) => role.name),
    permissions: profile.permissions,
  };
}

export async function createStaffMember(
  tenantId: string,
  actor: StaffActor,
  adminUserId: string,
  data: CreateStaffInput,
) {
  assertCanManageStaff(actor);
  await ensureDefaultRoles(tenantId);

  const existingUser = await findUserByEmail(tenantId, data.email);
  if (existingUser) {
    throw new StaffConflictError("User with this email already exists");
  }

  const roleNames = resolveRoleNames(data.roleNames);
  const roleIds = await resolveAssignableRoleIds(tenantId, roleNames);

  const user = await createStaffUser(tenantId, data, await hashPassword(data.password), roleIds);
  const staff = await createStaffRecord(tenantId, user.id, data);

  return mapStaffProfile(staff);
}

export async function updateStaffMember(
  tenantId: string,
  actor: StaffActor,
  adminUserId: string,
  id: string,
  data: AdminUpdateStaffInput,
) {
  assertCanManageStaff(actor);
  await findStaffByIdOrThrow(tenantId, id);

  const { firstName, lastName, phone, ...profileData } = data;
  const staff = await updateStaffRecord(tenantId, id, profileData, { firstName, lastName, phone });

  return mapStaffProfile(staff);
}

export async function deleteStaffMember(
  tenantId: string,
  actor: StaffActor,
  adminUserId: string,
  id: string,
) {
  assertCanManageStaff(actor);
  const staff = await deactivateStaffRecord(tenantId, id);

  return mapStaffProfile(staff);
}

export async function assignStaffRoles(
  tenantId: string,
  actor: StaffActor,
  adminUserId: string,
  staffId: string,
  roleNames: StaffAssignableRoleName[],
) {
  assertCanManageStaff(actor);

  const staff = await findStaffByIdOrThrow(tenantId, staffId);
  if (roleNames.length === 0) {
    throw new StaffRoleAssignmentError("At least one role is required");
  }

  const roleIds = await resolveAssignableRoleIds(tenantId, roleNames);
  await replaceUserRoles(staff.userId, roleIds);

  const assignments = await getUserRoleAssignments(staff.userId, tenantId);

  return {
    staffId,
    userId: staff.userId,
    roles: assignments.map((entry) => ({
      id: entry.role.id,
      name: entry.role.name,
      description: entry.role.description,
      permissions: entry.role.permissions,
    })),
    permissions: [...new Set(assignments.flatMap((entry) => entry.role.permissions))],
  };
}

export { getActorFromRequest } from "./staff.access";
