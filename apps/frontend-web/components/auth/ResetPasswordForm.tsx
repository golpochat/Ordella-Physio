"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api-error";
import { authClient } from "@/lib/auth-client";

type FieldErrors = {
  newPassword?: string;
  confirmPassword?: string;
};

type ResetPasswordFormProps = {
  token: string;
};

function validate(newPassword: string, confirmPassword: string): FieldErrors {
  const errors: FieldErrors = {};

  if (!newPassword) {
    errors.newPassword = "Password is required";
  } else if (newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Password is required";
  } else if (newPassword !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const nextErrors = validate(newPassword, confirmPassword);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await authClient.confirmPasswordReset({ token, newPassword });
      router.push("/login?message=password-reset-success");
    } catch (error) {
      setFormError(getApiErrorMessage(error, "Unable to reset your password. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="auth-form-stack" onSubmit={handleSubmit} noValidate>
      {formError ? <p className="auth-form-error">{formError}</p> : null}

      <PasswordInput
        id="newPassword"
        label="New password"
        value={newPassword}
        autoComplete="new-password"
        error={fieldErrors.newPassword}
        onChange={setNewPassword}
        onBlur={() =>
          setFieldErrors((current) => ({
            ...current,
            newPassword: validate(newPassword, confirmPassword).newPassword,
          }))
        }
      />

      <PasswordInput
        id="confirmPassword"
        label="Confirm password"
        value={confirmPassword}
        autoComplete="new-password"
        error={fieldErrors.confirmPassword}
        onChange={setConfirmPassword}
        onBlur={() =>
          setFieldErrors((current) => ({
            ...current,
            confirmPassword: validate(newPassword, confirmPassword).confirmPassword,
          }))
        }
      />

      <Button type="submit" className="auth-submit-button" disabled={submitting}>
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {submitting ? "Resetting..." : "Reset password"}
      </Button>
    </form>
  );
}
