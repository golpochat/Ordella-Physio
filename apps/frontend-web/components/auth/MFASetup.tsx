"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { getApiErrorMessage } from "@/lib/api-error";
import { getPortalForRole } from "@/lib/auth/roleRedirect";
import { authClient } from "@/lib/auth-client";
import { useAuthStore } from "@/store/auth.store";

const CODE_PATTERN = /^\d{6}$/;

type FieldErrors = {
  token?: string;
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

export function MFASetup() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loadingSetup, setLoadingSetup] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
      return;
    }

    const sessionToken = accessToken;
    let cancelled = false;

    async function loadSetup() {
      setLoadingSetup(true);
      setFormError(null);
      try {
        const response = await authClient.setupMfa(sessionToken);
        if (cancelled) {
          return;
        }
        setQrCode(response.qrCode);
        setSecret(response.secret);
      } catch (error) {
        if (!cancelled) {
          setFormError(getApiErrorMessage(error, "Unable to start MFA setup. Please try again."));
        }
      } finally {
        if (!cancelled) {
          setLoadingSetup(false);
        }
      }
    }

    void loadSetup();

    return () => {
      cancelled = true;
    };
  }, [accessToken, router]);

  const handleCopySecret = async () => {
    if (!secret) {
      return;
    }
    await navigator.clipboard.writeText(secret);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const nextErrors = validateCode(token);
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (!accessToken) {
      setFormError("Your session expired. Please sign in again.");
      return;
    }

    setSubmitting(true);
    try {
      await authClient.verifyMfa(accessToken, token.trim());
      const destination = user?.role ? getPortalForRole(user.role) : "/clinic";
      router.push(`${destination}?message=mfa-enabled`);
    } catch (error) {
      setFormError(getApiErrorMessage(error, "Unable to verify the code. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingSetup) {
    return (
      <div className="auth-mfa-loading">
        <Loader2 className="h-5 w-5 animate-spin" />
        <p>Preparing your authenticator setup…</p>
      </div>
    );
  }

  return (
    <form className="auth-form-stack" onSubmit={handleSubmit} noValidate>
      {formError ? <p className="auth-form-error">{formError}</p> : null}

      {qrCode ? (
        <div className="auth-mfa-qr">
          <Image src={qrCode} alt="MFA QR code" width={200} height={200} unoptimized />
        </div>
      ) : null}

      {secret ? (
        <div className="auth-field-stack">
          <Label htmlFor="mfa-secret">Secret key</Label>
          <div className="auth-mfa-secret-row">
            <Input id="mfa-secret" readOnly value={secret} />
            <Button type="button" variant="outline" onClick={handleCopySecret}>
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      ) : null}

      <div className="auth-field-stack">
        <Label htmlFor="mfa-code">Authenticator code</Label>
        <Input
          id="mfa-code"
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

      <Button type="submit" className="auth-submit-button" disabled={submitting || !qrCode}>
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {submitting ? "Verifying..." : "Enable MFA"}
      </Button>
    </form>
  );
}
