"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { getApiErrorMessage } from "@/lib/api-error";
import { getPortalForRole, isSystemUser, mapAuthRoleToPortalRole } from "@/lib/auth/roleRedirect";
import { authClient } from "@/lib/auth-client";
import { resolveUserRoles } from "@/lib/rbac";
import { buildTenantStateFromUser } from "@/lib/tenant-sync";
import { useAuthStore } from "@/store/auth.store";
import { useTenantStore } from "@/store/tenant.store";

const CODE_PATTERN = /^\d{6}$/;

type FieldErrors = {
  token?: string;
};

type MFAVerifyProps = {
  userId: string;
  tenantId: string;
};

function validateCode(token: string): FieldErrors {
  if (!token.trim()) {
    return { token: "Code is required" };
  }
  if (!CODE_PATTERN.test(token.trim())) {
    return { token: "Code must be 6 digits" };
  }
  return {};
}

export function MFAVerify({ userId, tenantId }: MFAVerifyProps) {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const setTenant = useTenantStore((state) => state.setTenant);
  const clearTenant = useTenantStore((state) => state.clearTenant);
  const [token, setToken] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const nextErrors = validateCode(token);
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await authClient.completeMfaChallenge({
        userId,
        token: token.trim(),
        tenantId,
      });

      const roles = resolveUserRoles(response.user);
      const primaryRole = roles[0] ?? mapAuthRoleToPortalRole(response.user.role);
      const normalized = {
        ...response,
        user: {
          ...response.user,
          role: primaryRole,
          roles,
          permissions: response.user.permissions ?? [],
        },
      };

      setSession(normalized);

      if (isSystemUser(normalized.user.roles)) {
        clearTenant();
      } else {
        setTenant(buildTenantStateFromUser(normalized.user, tenantId));
      }

      router.push(getPortalForRole(normalized.user.role));
    } catch (error) {
      setFormError(getApiErrorMessage(error, "Unable to verify the code. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="auth-form-stack" onSubmit={handleSubmit} noValidate>
      {formError ? <p className="auth-form-error">{formError}</p> : null}

      <div className="auth-field-stack">
        <Label htmlFor="mfa-login-code">Authenticator code</Label>
        <Input
          id="mfa-login-code"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="000000"
          value={token}
          className={fieldErrors.token ? "border-red-500" : undefined}
          onChange={(event) => setToken(event.target.value.replace(/\D/g, "").slice(0, 6))}
          onBlur={() => setFieldErrors(validateCode(token))}
        />
        {fieldErrors.token ? <p className="auth-field-error">{fieldErrors.token}</p> : null}
      </div>

      <Button type="submit" className="auth-submit-button" disabled={submitting}>
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {submitting ? "Verifying..." : "Continue"}
      </Button>
    </form>
  );
}
