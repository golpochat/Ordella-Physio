"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useClinicPermissionsList, useCreateClinicRole } from "@/hooks/useUserRolePortal";
import { parseRoleCreateErrors } from "@/lib/user-role-api-errors";

const CODE_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function slugifyCode(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function RoleCreateForm() {
  const router = useRouter();
  const createRole = useCreateClinicRole();
  const permissionsQuery = useClinicPermissionsList();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [codeTouched, setCodeTouched] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const permissions = permissionsQuery.data?.data ?? [];

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create role</CardTitle>
        <CardDescription>Define a tenant role and assign permissions for your clinic team.</CardDescription>
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

            createRole.mutate(
              {
                name: name.trim(),
                code: code.trim().toLowerCase(),
                description: description.trim() || undefined,
                permissions: selectedPermissions,
              },
              {
                onSuccess: () => {
                  toast.success("Role created successfully.");
                  router.push("/clinic/roles");
                },
                onError: (error) => {
                  const result = parseRoleCreateErrors(error);

                  if (result.forbidden) {
                    router.replace("/forbidden");
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
              onChange={(event) => {
                const nextName = event.target.value;
                setName(nextName);
                if (!codeTouched) {
                  setCode(slugifyCode(nextName));
                }
              }}
              disabled={createRole.isPending}
            />
            {fieldErrors.name ? <p className="tenant-create-form-field-error">{fieldErrors.name}</p> : null}
          </div>

          <div className="tenant-create-form-field">
            <Label htmlFor="role-code">Role code</Label>
            <Input
              id="role-code"
              value={code}
              onChange={(event) => {
                setCodeTouched(true);
                setCode(event.target.value.toLowerCase());
              }}
              disabled={createRole.isPending}
            />
            {fieldErrors.code ? <p className="tenant-create-form-field-error">{fieldErrors.code}</p> : null}
          </div>

          <div className="tenant-create-form-field">
            <Label htmlFor="role-description">Description</Label>
            <Input
              id="role-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={createRole.isPending}
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
                      disabled={createRole.isPending}
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
            <Button type="submit" className="btn-primary" disabled={createRole.isPending}>
              {createRole.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {createRole.isPending ? "Creating..." : "Create role"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
