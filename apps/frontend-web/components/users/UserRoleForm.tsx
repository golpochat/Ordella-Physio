"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/input";
import { useChangeClinicUserRole } from "@/hooks/useClinicPortal";
import { useAuthStore } from "@/store/auth.store";
import { getRoleLevel } from "@/lib/auth/role-levels";
import { isSystemRole } from "@/lib/auth/roleRedirect";
import type { ClinicUser } from "@/lib/clinic-portal-types";
import { parseUserRoleChangeErrors, type UserFieldErrors } from "@/lib/user-api-errors";
import { cn } from "@/lib/cn";

const ALL_ROLES = ["SYSTEM", "OWNER", "ADMIN", "THERAPIST", "STAFF", "PATIENT"] as const;

type AssignableRole = (typeof ALL_ROLES)[number];

function getAssignableRoles(actorRole: string | undefined): AssignableRole[] {
  const systemActor = isSystemRole(actorRole);

  return ALL_ROLES.filter((role) => {
    if (role === "SYSTEM" && !systemActor) {
      return false;
    }

    return getRoleLevel(actorRole) >= getRoleLevel(role);
  });
}

export type UserRoleFormProps = {
  user: ClinicUser;
};

export function UserRoleForm({ user }: UserRoleFormProps) {
  const router = useRouter();
  const changeRole = useChangeClinicUserRole(user.id);
  const actorRole = useAuthStore((state) => state.user?.role);
  const assignableRoles = useMemo(() => getAssignableRoles(actorRole), [actorRole]);

  const [role, setRole] = useState<AssignableRole>(
    (assignableRoles.includes(user.role as AssignableRole)
      ? user.role
      : assignableRoles[0]) as AssignableRole,
  );
  const [fieldErrors, setFieldErrors] = useState<UserFieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    setRole(
      (assignableRoles.includes(user.role as AssignableRole)
        ? user.role
        : assignableRoles[0]) as AssignableRole,
    );
  }, [user, assignableRoles]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError(null);

    if (!role) {
      setFieldErrors({ role: "Role is required" });
      return;
    }

    setFieldErrors({});

    changeRole.mutate(
      { role },
      {
        onSuccess: (response) => {
          toast.success(response.message ?? "User role updated successfully.");
          router.push(`/clinic/users/${user.id}`);
        },
        onError: (error) => {
          const parsed = parseUserRoleChangeErrors(error);

          if (parsed.tenantMismatch) {
            router.replace("/forbidden");
            return;
          }

          if (parsed.notFound) {
            toast.error(parsed.toastError ?? "User not found.");
            router.push("/clinic/users");
            return;
          }

          setFieldErrors(parsed.fieldErrors);

          if (parsed.toastError) {
            toast.error(parsed.toastError);
          }

          if (parsed.generalError) {
            setGeneralError(parsed.generalError);
          }
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change role</CardTitle>
        <CardDescription>
          Update the role for {user.email}. You can only assign roles at or below your own level.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <form className="tenant-create-form" onSubmit={handleSubmit} noValidate>
          {generalError ? <p className="tenant-create-form-error">{generalError}</p> : null}

          <div className="tenant-create-form-field">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              className={cn(
                "tenant-create-form-select",
                fieldErrors.role && "tenant-create-form-select-error",
              )}
              value={role}
              onChange={(event) => setRole(event.target.value as AssignableRole)}
            >
              {assignableRoles.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
            {fieldErrors.role ? (
              <p className="tenant-create-form-field-error">{fieldErrors.role}</p>
            ) : null}
          </div>

          <Button type="submit" disabled={changeRole.isPending || assignableRoles.length === 0}>
            {changeRole.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {changeRole.isPending ? "Saving..." : "Update role"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
