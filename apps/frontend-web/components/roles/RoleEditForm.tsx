"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useClinicPermissionsList, useUpdateClinicRole } from "@/hooks/useUserRolePortal";
import { parseRoleUpdateErrors } from "@/lib/user-role-api-errors";
import type { ClinicRole } from "@/lib/user-role-portal-types";

const CODE_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type RoleEditFormProps = {
  role: ClinicRole;
  assignedPermissions: string[];
};

export function RoleEditForm({ role, assignedPermissions }: RoleEditFormProps) {
  const router = useRouter();
  const updateRole = useUpdateClinicRole(role.id);
  const permissionsQuery = useClinicPermissionsList();

  const [name, setName] = useState(role.name);
  const [code, setCode] = useState(role.code);
  const [description, setDescription] = useState(role.description ?? "");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(assignedPermissions);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const permissions = permissionsQuery.data?.data ?? [];

  useEffect(() => {
    setName(role.name);
    setCode(role.code);
    setDescription(role.description ?? "");
    setSelectedPermissions(assignedPermissions);
  }, [role, assignedPermissions]);

  function togglePermission(permissionCode: string) {
    setSelectedPermissions((current) =>
      current.includes(permissionCode)
        ? current.filter((entry) => entry !== permissionCode)
        : [...current, permissionCode],
    );
  }

  function validateClient(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "Role name is required";
    } else if (name.trim().length < 2) {
      errors.name = "Role name must be at least 2 characters";
    }

    if (!code.trim()) {
      errors.code = "Role code is required";
    } else if (!CODE_REGEX.test(code.trim())) {
      errors.code = "Code must be lowercase and can contain letters, numbers, and hyphens";
    }

    return errors;
  }

  if (role.isSystem) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>System role</CardTitle>
          <CardDescription>System roles cannot be modified.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit role</CardTitle>
        <CardDescription>Update role details and assigned permissions for your clinic.</CardDescription>
      </CardHeader>
      <CardBody>
        <form
          className="tenant-create-form"
          onSubmit={(event) => {
            event.preventDefault();
            setGeneralError(null);

            const clientErrors = validateClient();
            if (Object.keys(clientErrors).length > 0) {
              setFieldErrors(clientErrors);
              return;
            }

            setFieldErrors({});

            updateRole.mutate(
              {
                name: name.trim(),
                code: code.trim().toLowerCase(),
                description: description.trim() || null,
                permissions: selectedPermissions,
              },
              {
                onSuccess: () => {
                  toast.success("Role updated successfully.");
                  router.push("/clinic/roles");
                },
                onError: (error) => {
                  const result = parseRoleUpdateErrors(error);

                  if (result.forbidden || result.tenantMismatch) {
                    router.replace("/forbidden");
                    return;
                  }

                  if (result.notFound) {
                    toast.error(result.generalError ?? "Role does not exist.");
                    router.push("/clinic/roles");
                    return;
                  }

                  if (result.systemRole) {
                    toast.error(result.generalError ?? "System roles cannot be modified.");
                    return;
                  }

                  if (result.invalidPermission) {
                    toast.error(result.generalError ?? "One or more permissions are invalid.");
                    return;
                  }

                  setFieldErrors(result.fieldErrors);
                  setGeneralError(result.generalError);
                },
              },
            );
          }}
        >
          {generalError ? <p className="tenant-create-form-error">{generalError}</p> : null}

          <div className="tenant-create-form-field">
            <Label htmlFor="role-name">Role name</Label>
            <Input
              id="role-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={updateRole.isPending}
            />
            {fieldErrors.name ? <p className="tenant-create-form-field-error">{fieldErrors.name}</p> : null}
          </div>

          <div className="tenant-create-form-field">
            <Label htmlFor="role-code">Role code</Label>
            <Input
              id="role-code"
              value={code}
              onChange={(event) => setCode(event.target.value.toLowerCase())}
              disabled={updateRole.isPending}
            />
            {fieldErrors.code ? <p className="tenant-create-form-field-error">{fieldErrors.code}</p> : null}
          </div>

          <div className="tenant-create-form-field">
            <Label htmlFor="role-description">Description</Label>
            <Input
              id="role-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={updateRole.isPending}
            />
          </div>

          <div className="tenant-create-form-field">
            <p className="dashboard-section-title">Permissions</p>
            {permissionsQuery.isLoading ? (
              <p className="dashboard-cell-muted">Loading permissions...</p>
            ) : permissionsQuery.isError ? (
              <p className="tenant-create-form-error">Unable to load permissions.</p>
            ) : (
              <div className="role-permission-list">
                {permissions.map((permission) => (
                  <label key={permission.id} className="role-permission-option">
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(permission.code)}
                      onChange={() => togglePermission(permission.code)}
                      disabled={updateRole.isPending}
                    />
                    <span>
                      <span className="role-permission-code">{permission.code}</span>
                      {permission.description ? (
                        <span className="dashboard-cell-muted"> — {permission.description}</span>
                      ) : null}
                    </span>
                  </label>
                ))}
              </div>
            )}
            {fieldErrors.permissions ? (
              <p className="tenant-create-form-field-error">{fieldErrors.permissions}</p>
            ) : null}
          </div>

          <div className="tenant-create-form-actions">
            <Button type="submit" className="btn-primary" disabled={updateRole.isPending}>
              {updateRole.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {updateRole.isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
