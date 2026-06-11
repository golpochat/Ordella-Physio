"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { AvatarUploader } from "@/components/users/AvatarUploader";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { UserStatusBadge } from "@/components/users/UserStatusBadge";
import { useMyProfile, useUpdateMyProfile } from "@/hooks/useClinicPortal";
import { redirectToLogin } from "@/lib/session-manager";
import type { UserProfile } from "@/lib/clinic-portal-types";
import { parseUserProfileErrors, type UserFieldErrors } from "@/lib/user-api-errors";
import { cn } from "@/lib/cn";

const PHONE_PATTERN = /^\+?[1-9]\d{6,14}$/;

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
};

function validateForm(values: FormState): UserFieldErrors {
  const errors: UserFieldErrors = {};

  if (!values.firstName.trim() || values.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  if (!values.lastName.trim() || values.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number";
  }

  return errors;
}

export type UserProfileFormProps = {
  user?: UserProfile;
  onProfileUpdated?: (user: UserProfile) => void;
};

export function UserProfileForm({ user: initialUser, onProfileUpdated }: UserProfileFormProps) {
  const profileQuery = useMyProfile();
  const updateProfile = useUpdateMyProfile();
  const user = initialUser ?? profileQuery.data;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<UserFieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(user.firstName ?? "");
    setLastName(user.lastName ?? "");
    setPhone(user.phone ?? "");
    setAvatarUrl(user.avatarUrl ?? null);
  }, [user]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError(null);

    const values: FormState = { firstName, lastName, phone };
    const clientErrors = validateForm(values);
    setFieldErrors(clientErrors);

    if (Object.keys(clientErrors).length > 0) {
      return;
    }

    updateProfile.mutate(
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim() || null,
      },
      {
        onSuccess: (response) => {
          onProfileUpdated?.(response.user);
          toast.success(response.message ?? "Profile updated successfully.");
        },
        onError: (error) => {
          const parsed = parseUserProfileErrors(error);

          if (parsed.notFound) {
            redirectToLogin("session-expired");
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

  if (!initialUser && profileQuery.isLoading) {
    return <p className="dashboard-cell-muted">Loading profile...</p>;
  }

  if (!user) {
    return <p className="tenant-create-form-error">Unable to load profile.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your personal details. Email, role, and status cannot be changed here.</CardDescription>
      </CardHeader>
      <CardBody>
        <AvatarUploader
          avatarUrl={avatarUrl}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          onAvatarChange={setAvatarUrl}
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

          <dl className="tenant-create-form-grid">
            <div className="tenant-create-form-field">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email} disabled readOnly />
            </div>
            <div className="tenant-create-form-field">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={user.role} disabled readOnly />
            </div>
            <div className="tenant-create-form-field">
              <Label htmlFor="tenantId">Tenant</Label>
              <Input id="tenantId" value={user.tenantId} disabled readOnly />
            </div>
            <div className="tenant-create-form-field">
              <Label>Status</Label>
              <div>
                <UserStatusBadge status={user.status} />
              </div>
            </div>
          </dl>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={updateProfile.isPending}>
              {updateProfile.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {updateProfile.isPending ? "Saving..." : "Save changes"}
            </Button>
            <Button asChild variant="outline">
              <Link href="/clinic/account/change-password">Change password</Link>
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
