"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "@ordella/shared-icons";
import { getApiErrorMessage } from "@/lib/api-error";
import { authClient } from "@/lib/auth-client";

type VerificationState = "loading" | "success" | "error";

type VerificationMessageProps = {
  token: string;
};

export function VerificationMessage({ token }: VerificationMessageProps) {
  const [state, setState] = useState<VerificationState>("loading");
  const [message, setMessage] = useState("Verifying your email…");

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      try {
        const response = await authClient.confirmEmailVerification(token);
        if (cancelled) {
          return;
        }
        setState("success");
        setMessage(response.message || "Email verified successfully");
      } catch (error) {
        if (cancelled) {
          return;
        }
        setState("error");
        setMessage(getApiErrorMessage(error, "Verification link invalid or expired"));
      }
    }

    void verify();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="auth-verification-message">
      {state === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
      <p className={state === "error" ? "auth-form-error" : state === "success" ? "auth-form-success" : undefined}>
        {message}
      </p>
      {state === "success" ? (
        <Link href="/login" className="text-primary hover:underline">
          Continue to sign in
        </Link>
      ) : null}
    </div>
  );
}
