import { describe, expect, it } from "vitest";
import { PLATFORM_PERMISSIONS } from "../src/rbac/platform-permissions";
import { hasResolvedPermission, resolvePermissions } from "../src/rbac/resolve-rbac";

describe("productized RBAC", () => {
  it("maps TENANT_OWNER to all tenant permissions", () => {
    const { effectiveRole, resolvedPermissions } = resolvePermissions({ role: "OWNER" });
    expect(effectiveRole).toBe("TENANT_OWNER");
    expect(resolvedPermissions).toContain(PLATFORM_PERMISSIONS.PATIENTS_DELETE);
  });

  it("maps ADMIN without delete-level permissions", () => {
    const { resolvedPermissions } = resolvePermissions({ role: "ADMIN" });
    expect(resolvedPermissions).toContain(PLATFORM_PERMISSIONS.PATIENTS_WRITE);
    expect(resolvedPermissions).not.toContain(PLATFORM_PERMISSIONS.PATIENTS_DELETE);
  });

  it("maps THERAPIST to clinical workflow permissions", () => {
    const { resolvedPermissions } = resolvePermissions({ role: "THERAPIST" });
    expect(resolvedPermissions).toContain(PLATFORM_PERMISSIONS.PATIENTS_READ);
    expect(resolvedPermissions).toContain(PLATFORM_PERMISSIONS.AI_NOTES_GENERATE);
    expect(resolvedPermissions).not.toContain(PLATFORM_PERMISSIONS.PATIENTS_DELETE);
  });

  it("grants SUPER_ADMIN all platform permissions without tenant scope", () => {
    const { effectiveRole, resolvedPermissions } = resolvePermissions({ role: "SYSTEM" });
    expect(effectiveRole).toBe("SUPER_ADMIN");
    expect(hasResolvedPermission(resolvedPermissions, PLATFORM_PERMISSIONS.PLATFORM_AUDIT_READ, effectiveRole)).toBe(true);
  });

  it("merges permission overrides additively", () => {
    const { resolvedPermissions } = resolvePermissions({
      role: "READ_ONLY",
      permissionOverrides: [PLATFORM_PERMISSIONS.PATIENTS_WRITE],
    });
    expect(resolvedPermissions).toContain(PLATFORM_PERMISSIONS.PATIENTS_READ);
    expect(resolvedPermissions).toContain(PLATFORM_PERMISSIONS.PATIENTS_WRITE);
  });
});
