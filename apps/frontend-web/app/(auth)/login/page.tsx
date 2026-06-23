"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormErrorBanner, FormSuccessBanner } from "@/components/ui/form-feedback";
import { useAuth } from "@/hooks/useAuth";
import { LOGIN_REASON_MESSAGES, LOGIN_SUCCESS_MESSAGES } from "@/lib/auth-ui-messages";
import { getGatewayBaseUrl } from "@/lib/gateway-proxy";
import type { TenantLoginOption } from "@/lib/auth-client";

export default function LoginPage() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const message = searchParams.get("message");
  const [tenantOptions, setTenantOptions] = useState<TenantLoginOption[] | null>(null);
  const [selectedTenantId, setSelectedTenantId] = useState<string | undefined>();
  const tenantIdForSso = selectedTenantId ?? tenantOptions?.[0]?.id ?? searchParams.get("tenantId") ?? undefined;

  function startSso(protocol: "saml" | "oidc") {
    if (!tenantIdForSso) {
      return;
    }

    const gateway = getGatewayBaseUrl();
    const path =
      protocol === "saml"
        ? `/enterprise/sso/saml/login?tenantId=${encodeURIComponent(tenantIdForSso)}`
        : `/enterprise/sso/oauth/start?tenantId=${encodeURIComponent(tenantIdForSso)}`;

    window.location.href = `${gateway}${path}`;
  }

  return (
    <div className="auth-page-shell">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Log in to your clinic</CardTitle>
          <CardDescription>Enter your admin email and password to access your clinic portal.</CardDescription>
        </CardHeader>
        <CardBody>
          {reason && LOGIN_REASON_MESSAGES[reason] ? (
            <FormErrorBanner>{LOGIN_REASON_MESSAGES[reason]}</FormErrorBanner>
          ) : null}
          {message && LOGIN_SUCCESS_MESSAGES[message] ? (
            <FormSuccessBanner>{LOGIN_SUCCESS_MESSAGES[message]}</FormSuccessBanner>
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

          <div className="space-y-2 border-t pt-4">
            <p className="text-sm text-muted-foreground">Enterprise SSO</p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={!tenantIdForSso}
                onClick={() => startSso("oidc")}
              >
                Sign in with OIDC
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={!tenantIdForSso}
                onClick={() => startSso("saml")}
              >
                Sign in with SAML
              </Button>
            </div>
            {!tenantIdForSso ? (
              <p className="text-xs text-muted-foreground">
                Enter your email above to resolve your clinic tenant before using SSO.
              </p>
            ) : null}
          </div>

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
