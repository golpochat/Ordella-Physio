"use client";

import { useState } from "react";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useChangePassword } from "@/hooks/useClinicPortal";
import { clearAuthSession, redirectToLogin } from "@/lib/session-manager";
import { parseUserPasswordErrors, type UserFieldErrors } from "@/lib/user-api-errors";

type FormState = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

function validateForm(values: FormState): UserFieldErrors {
  const errors: UserFieldErrors = {};

  if (!values.currentPassword) {
    errors.currentPassword = "Current password is required";
  }

  if (!values.newPassword) {
    errors.newPassword = "New password must be at least 8 characters";
  } else if (values.newPassword.length < 8) {
    errors.newPassword = "New password must be at least 8 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

export function ChangePasswordForm() {
  const changePassword = useChangePassword();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<UserFieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError(null);

    const values: FormState = { currentPassword, newPassword, confirmPassword };
    const clientErrors = validateForm(values);
    setFieldErrors(clientErrors);

    if (Object.keys(clientErrors).length > 0) {
      return;
    }

    changePassword.mutate(values, {
      onSuccess: (response) => {
        toast.success(response.message ?? "Password updated successfully.");
        clearAuthSession();
        redirectToLogin("password-changed");
      },
      onError: (error) => {
        const parsed = parseUserPasswordErrors(error, "Failed to update password. Please try again.");
        setFieldErrors(parsed.fieldErrors);

        if (parsed.toastError) {
          toast.error(parsed.toastError);
        }

        if (parsed.generalError) {
          setGeneralError(parsed.generalError);
        }
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change password</CardTitle>
        <CardDescription>
          Update your account password. You will be signed out and need to log in again.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <form className="tenant-create-form" onSubmit={handleSubmit} noValidate>
          {generalError ? <p className="tenant-create-form-error">{generalError}</p> : null}

          <PasswordInput
            id="currentPassword"
            label="Current password"
            value={currentPassword}
            autoComplete="current-password"
            error={fieldErrors.currentPassword}
            onChange={setCurrentPassword}
          />

          <PasswordInput
            id="newPassword"
            label="New password"
            value={newPassword}
            autoComplete="new-password"
            error={fieldErrors.newPassword}
            onChange={setNewPassword}
          />

          <PasswordInput
            id="confirmPassword"
            label="Confirm password"
            value={confirmPassword}
            autoComplete="new-password"
            error={fieldErrors.confirmPassword}
            onChange={setConfirmPassword}
          />

          <Button type="submit" disabled={changePassword.isPending}>
            {changePassword.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {changePassword.isPending ? "Updating..." : "Update password"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
