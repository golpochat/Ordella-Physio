"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import type { TenantLoginOption } from "@/lib/auth-client";

const LOGIN_REASON_MESSAGES: Record<string, string> = {
  "session-expired": "Your session expired. Please sign in again.",
  unauthorized: "You do not have access to that page. Please sign in with the correct account.",
  "missing-tenant": "Session context is missing. Please sign in again.",
  "token-reuse-detected": "Your session was compromised. Please log in again.",
  "trial-expired": "Your free trial has ended. Sign in to upgrade your plan.",
};

const LOGIN_SUCCESS_MESSAGES: Record<string, string> = {
  "password-reset-success": "Your password has been reset successfully.",
};

export default function LoginPage() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const message = searchParams.get("message");
  const [tenantOptions, setTenantOptions] = useState<TenantLoginOption[] | null>(null);
  const [selectedTenantId, setSelectedTenantId] = useState<string | undefined>();

  return (
    <div className="auth-page-shell">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Log in to your clinic</CardTitle>
          <CardDescription>Enter your admin email and password to access your clinic portal.</CardDescription>
        </CardHeader>
        <CardBody>
          {reason && LOGIN_REASON_MESSAGES[reason] ? (
            <p className="auth-form-error">{LOGIN_REASON_MESSAGES[reason]}</p>
          ) : null}
          {message && LOGIN_SUCCESS_MESSAGES[message] ? (
            <p className="auth-form-success">{LOGIN_SUCCESS_MESSAGES[message]}</p>
          ) : null}

          <LoginForm
            tenantOptions={tenantOptions}
            selectedTenantId={selectedTenantId}
            onTenantSelect={setSelectedTenantId}
            onSubmit={async (values) => {
              const result = await login({
                email: values.email,
                password: values.password,
                tenantId: values.tenantId,
              });

              if (result?.requiresTenantSelection) {
                setTenantOptions(result.tenants);
                setSelectedTenantId(undefined);
              }
            }}
          />

          <div className="auth-form-stack">
            <div className="flex flex-col gap-2 text-sm sm:flex-row sm:justify-between">
              <Link href="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
              <Link href="/checkout?intent=trial" className="text-primary hover:underline">
                Don&apos;t have a clinic account? Start a free trial
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
