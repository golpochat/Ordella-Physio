export {
  PERMISSIONS,
  DEFAULT_ROLE_DEFINITIONS,
  ROLE_PERMISSION_MATRIX,
  getPermissionsForRole,
  type Permission,
} from "./permissions";
export { ROLES, ROLE_LABELS, CLINIC_ROLES, isClinicianRole, normalizeRoleLabel, type RoleName } from "./roles";
export { MODULES, MODULE_PERMISSION_MAP, getModulePermission, type ModuleName } from "./permission-maps";
export { policies } from "./policies";
export { rbacRouter } from "./rbac.routes";
export { assignRole, ensureDefaultRoles, getUserRolesAndPermissions, listRoles } from "./rbac.service";
