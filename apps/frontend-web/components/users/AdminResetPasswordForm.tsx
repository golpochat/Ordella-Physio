"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminResetClinicUserPassword } from "@/hooks/useClinicPortal";
import type { ClinicUser } from "@/lib/clinic-portal-types";
import { parseUserPasswordErrors, type UserFieldErrors } from "@/lib/user-api-errors";

type FormState = {
  password: string;
  confirmPassword: string;
};

function validateForm(values: FormState): UserFieldErrors {
  const errors: UserFieldErrors = {};

  if (!values.password) {
    errors.password = "Password must be at least 8 characters";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

export type AdminResetPasswordFormProps = {
  user: ClinicUser;
};

export function AdminResetPasswordForm({ user }: AdminResetPasswordFormProps) {
  const router = useRouter();
  const resetPassword = useAdminResetClinicUserPassword(user.id);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<UserFieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError(null);

    const clientErrors = validateForm({ password, confirmPassword });
    setFieldErrors(clientErrors);

    if (Object.keys(clientErrors).length > 0) {
      return;
    }

    resetPassword.mutate(password, {
      onSuccess: (response) => {
        toast.success(response.message ?? "Password reset successfully.");
        router.push(`/clinic/users/${user.id}`);
      },
      onError: (error) => {
        const parsed = parseUserPasswordErrors(error, "Failed to reset password. Please try again.");

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
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>
          Set a new password for {user.email}. The user will need to sign in again.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <form className="tenant-create-form" onSubmit={handleSubmit} noValidate>
          {generalError ? <p className="tenant-create-form-error">{generalError}</p> : null}

          <PasswordInput
            id="password"
            label="New password"
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

          <Button type="submit" disabled={resetPassword.isPending}>
            {resetPassword.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {resetPassword.isPending ? "Resetting..." : "Reset password"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
