"use client";

import { useState } from "react";
import { Loader2 } from "@ordella/shared-icons";
import { TenantSelector } from "@/components/auth/tenant-selector";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { getApiErrorMessage } from "@/lib/api-error";
import { getDefaultTenantId } from "@/lib/tenant-config";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  onSubmit: (values: LoginFormValues & { tenantId: string }) => Promise<void>;
  initialTenantId?: string;
};

type FieldErrors = Partial<Record<keyof LoginFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: LoginFormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
}

export function LoginForm({ onSubmit, initialTenantId }: LoginFormProps) {
  const [tenantId, setTenantId] = useState(initialTenantId ?? getDefaultTenantId() ?? "");
  const [values, setValues] = useState<LoginFormValues>({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const nextErrors = validate(values);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (!tenantId) {
      setFormError("Please select a clinic before signing in.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ ...values, email: values.email.trim(), tenantId });
    } catch (error) {
      setFormError(getApiErrorMessage(error, "Unable to sign in. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="auth-form-stack" onSubmit={handleSubmit} noValidate>
      {formError ? <p className="auth-form-error">{formError}</p> : null}

      <TenantSelector value={tenantId} onChange={setTenantId} />

      <div className="auth-field-stack">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@clinic.com"
          value={values.email}
          className={fieldErrors.email ? "border-red-500" : undefined}
          onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
          onBlur={() => setFieldErrors((current) => ({ ...current, email: validate(values).email }))}
        />
        {fieldErrors.email ? <p className="auth-field-error">{fieldErrors.email}</p> : null}
      </div>

      <PasswordInput
        id="password"
        value={values.password}
        error={fieldErrors.password}
        onChange={(password) => setValues((current) => ({ ...current, password }))}
        onBlur={() => setFieldErrors((current) => ({ ...current, password: validate(values).password }))}
      />

      <Button type="submit" className="auth-submit-button" disabled={submitting}>
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {submitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
