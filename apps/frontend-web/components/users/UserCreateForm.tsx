"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useCreateClinicUser } from "@/hooks/useClinicPortal";
import { useAuthStore } from "@/store/auth.store";
import { getRoleLevel } from "@/lib/auth/role-levels";
import { parseUserCreateErrors, type UserFieldErrors } from "@/lib/user-api-errors";
import { cn } from "@/lib/cn";

const ALL_ASSIGNABLE_ROLES = ["OWNER", "ADMIN", "THERAPIST", "STAFF", "PATIENT"] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AssignableRole = (typeof ALL_ASSIGNABLE_ROLES)[number];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: AssignableRole;
  password: string;
  confirmPassword: string;
};

function getAssignableRoles(actorRole: string | undefined): AssignableRole[] {
  const actorLevel = getRoleLevel(actorRole);
  return ALL_ASSIGNABLE_ROLES.filter((role) => actorLevel >= getRoleLevel(role));
}

function validateForm(values: FormState): UserFieldErrors {
  const errors: UserFieldErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Password is required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

export function UserCreateForm() {
  const router = useRouter();
  const createUser = useCreateClinicUser();
  const actorRole = useAuthStore((state) => state.user?.role);
  const assignableRoles = useMemo(() => getAssignableRoles(actorRole), [actorRole]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<AssignableRole>(assignableRoles[assignableRoles.length - 1] ?? "STAFF");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<UserFieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError(null);

    const values: FormState = {
      firstName,
      lastName,
      email,
      phone,
      role,
      password,
      confirmPassword,
    };

    const clientErrors = validateForm(values);
    setFieldErrors(clientErrors);

    if (Object.keys(clientErrors).length > 0) {
      return;
    }

    createUser.mutate(
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        role,
        password,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message ?? "User created successfully.");
          router.push("/clinic/users");
        },
        onError: (error) => {
          const parsed = parseUserCreateErrors(error);
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
        <CardTitle>Create user</CardTitle>
        <CardDescription>Add a new user to your clinic with a role and login credentials.</CardDescription>
      </CardHeader>
      <CardBody>
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

          <div className="tenant-create-form-grid">
            <PasswordInput
              id="password"
              label="Password"
              value={password}
              autoComplete="new-password"
              error={fieldErrors.password}
              onChange={setPassword}
            />

            <PasswordInput
              id="confirmPassword"
              label="Confirm password"
              value={confirmPassword}
              autoComplete="new-password"
              error={fieldErrors.confirmPassword}
              onChange={setConfirmPassword}
            />
          </div>

          <Button type="submit" disabled={createUser.isPending}>
            {createUser.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {createUser.isPending ? "Creating..." : "Create user"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
