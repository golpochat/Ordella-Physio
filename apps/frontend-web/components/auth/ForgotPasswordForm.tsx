"use client";

import { useState } from "react";
import { Loader2 } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { getApiErrorMessage } from "@/lib/api-error";
import { authClient } from "@/lib/auth-client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  email?: string;
};

function validate(email: string): FieldErrors {
  const errors: FieldErrors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Enter a valid email";
  }

  return errors;
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    const nextErrors = validate(email);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await authClient.requestPasswordReset({ email: email.trim() });
      setSuccessMessage("If an account exists, a reset link has been sent.");
    } catch (error) {
      setFormError(getApiErrorMessage(error, "If an account exists, a reset link has been sent."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="auth-form-stack" onSubmit={handleSubmit} noValidate>
      {formError ? <p className="auth-form-error">{formError}</p> : null}
      {successMessage ? <p className="auth-form-success">{successMessage}</p> : null}

      <div className="auth-field-stack">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@clinic.com"
          value={email}
          className={fieldErrors.email ? "border-red-500" : undefined}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setFieldErrors((current) => ({ ...current, email: validate(email).email }))}
        />
        {fieldErrors.email ? <p className="auth-field-error">{fieldErrors.email}</p> : null}
      </div>

      <Button type="submit" className="auth-submit-button" disabled={submitting}>
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {submitting ? "Sending..." : "Send reset link"}
      </Button>
    </form>
  );
}
