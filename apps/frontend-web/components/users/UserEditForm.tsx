"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { AvatarUploader } from "@/components/users/AvatarUploader";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useUpdateClinicUser } from "@/hooks/useClinicPortal";
import { useAuthStore } from "@/store/auth.store";
import { getRoleLevel } from "@/lib/auth/role-levels";
import type { ClinicUser } from "@/lib/clinic-portal-types";
import { parseUserUpdateErrors, type UserFieldErrors } from "@/lib/user-api-errors";
import { cn } from "@/lib/cn";

const ALL_ASSIGNABLE_ROLES = ["OWNER", "ADMIN", "THERAPIST", "STAFF", "PATIENT"] as const;
const USER_STATUSES = ["ACTIVE", "DISABLED"] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[1-9]\d{6,14}$/;

type AssignableRole = (typeof ALL_ASSIGNABLE_ROLES)[number];
type UserStatus = (typeof USER_STATUSES)[number];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: AssignableRole;
  status: UserStatus;
};

function getAssignableRoles(actorRole: string | undefined): AssignableRole[] {
  const actorLevel = getRoleLevel(actorRole);
  return ALL_ASSIGNABLE_ROLES.filter((role) => actorLevel >= getRoleLevel(role));
}

function validateForm(values: FormState): UserFieldErrors {
  const errors: UserFieldErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First name must be at least 2 characters";
  } else if (values.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last name must be at least 2 characters";
  } else if (values.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  if (!values.email.trim()) {
    errors.email = "Enter a valid email";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email";
  }

  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number";
  }

  return errors;
}

export type UserEditFormProps = {
  user: ClinicUser;
};

export function UserEditForm({ user }: UserEditFormProps) {
  const router = useRouter();
  const updateUser = useUpdateClinicUser(user.id);
  const actorRole = useAuthStore((state) => state.user?.role);
  const assignableRoles = useMemo(() => getAssignableRoles(actorRole), [actorRole]);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [role, setRole] = useState<AssignableRole>(
    (assignableRoles.includes(user.role as AssignableRole)
      ? user.role
      : assignableRoles[assignableRoles.length - 1]) as AssignableRole,
  );
  const [status, setStatus] = useState<UserStatus>(user.status);
  const [fieldErrors, setFieldErrors] = useState<UserFieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone ?? "");
    setRole(
      (assignableRoles.includes(user.role as AssignableRole)
        ? user.role
        : assignableRoles[assignableRoles.length - 1]) as AssignableRole,
    );
    setStatus(user.status);
  }, [user, assignableRoles]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError(null);

    const values: FormState = {
      firstName,
      lastName,
      email,
      phone,
      role,
      status,
    };

    const clientErrors = validateForm(values);
    setFieldErrors(clientErrors);

    if (Object.keys(clientErrors).length > 0) {
      return;
    }

    updateUser.mutate(
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        role,
        status,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message ?? "User updated successfully.");
          router.push("/clinic/users");
        },
        onError: (error) => {
          const parsed = parseUserUpdateErrors(error);

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
        <CardTitle>Edit user</CardTitle>
        <CardDescription>Update account details, role, and status for {user.email}.</CardDescription>
      </CardHeader>
      <CardBody>
        <AvatarUploader
          avatarUrl={user.avatarUrl}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          readOnly
        />

        <form className="tenant-create-form" onSubmit={handleSubmit} noValidate>
          {generalError ? <p className="tenant-create-form-error">{generalError}</p> : null}

          <div className="tenant-create-form-grid">
            <div className="tenant-create-form-field">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                value={firstName}
                className={cn(fieldErrors.firstName && "tenant-create-form-select-error")}
                onChange={(event) => setFirstName(event.target.value)}
              />
              {fieldErrors.firstName ? (
                <p className="tenant-create-form-field-error">{fieldErrors.firstName}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={lastName}
                className={cn(fieldErrors.lastName && "tenant-create-form-select-error")}
                onChange={(event) => setLastName(event.target.value)}
              />
              {fieldErrors.lastName ? (
                <p className="tenant-create-form-field-error">{fieldErrors.lastName}</p>
              ) : null}
            </div>
          </div>

          <div className="tenant-create-form-grid">
            <div className="tenant-create-form-field">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                className={cn(fieldErrors.email && "tenant-create-form-select-error")}
                onChange={(event) => setEmail(event.target.value)}
              />
              {fieldErrors.email ? (
                <p className="tenant-create-form-field-error">{fieldErrors.email}</p>
              ) : null}
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                className={cn(fieldErrors.phone && "tenant-create-form-select-error")}
                onChange={(event) => setPhone(event.target.value)}
              />
              {fieldErrors.phone ? (
                <p className="tenant-create-form-field-error">{fieldErrors.phone}</p>
              ) : null}
            </div>
          </div>

          <div className="tenant-create-form-grid">
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

            <div className="tenant-create-form-field">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className={cn(
                  "tenant-create-form-select",
                  fieldErrors.status && "tenant-create-form-select-error",
                )}
                value={status}
                onChange={(event) => setStatus(event.target.value as UserStatus)}
              >
                {USER_STATUSES.map((entry) => (
                  <option key={entry} value={entry}>
                    {entry}
                  </option>
                ))}
              </select>
              {fieldErrors.status ? (
                <p className="tenant-create-form-field-error">{fieldErrors.status}</p>
              ) : null}
            </div>
          </div>

          <Button type="submit" disabled={updateUser.isPending}>
            {updateUser.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {updateUser.isPending ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
