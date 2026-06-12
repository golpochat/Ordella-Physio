"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { getDefaultTenantId } from "@/lib/tenant-config";

const LOGIN_REASON_MESSAGES: Record<string, string> = {
  "session-expired": "Your session expired. Please sign in again.",
  unauthorized: "You do not have access to that page. Please sign in with the correct account.",
  "missing-tenant": "Tenant context is missing. Select your clinic and sign in again.",
  "token-reuse-detected": "Your session was compromised. Please log in again.",
};

const LOGIN_SUCCESS_MESSAGES: Record<string, string> = {
  "password-reset-success": "Your password has been reset successfully.",
};

export default function LoginPage() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const message = searchParams.get("message");
  const [tenantId] = useState(getDefaultTenantId() ?? "");

  return (
    <div className="auth-page-shell">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Authenticate with your clinic account.</CardDescription>
        </CardHeader>
        <CardBody>
          {reason && LOGIN_REASON_MESSAGES[reason] ? (
            <p className="auth-form-error">{LOGIN_REASON_MESSAGES[reason]}</p>
          ) : null}
          {message && LOGIN_SUCCESS_MESSAGES[message] ? (
            <p className="auth-form-success">{LOGIN_SUCCESS_MESSAGES[message]}</p>
          ) : null}

          <LoginForm
            initialTenantId={tenantId}
            onSubmit={async (values) => {
              await login({
                email: values.email,
                password: values.password,
                tenantId: values.tenantId,
              });
            }}
          />

          <div className="auth-form-stack">
            <div className="flex justify-between text-sm">
              <Link href="/signup" className="text-primary hover:underline">
                Create account
              </Link>
              <Link href="/forgot-password" className="text-primary hover:underline">
                Forgot password
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
