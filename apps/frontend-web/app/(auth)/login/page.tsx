"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { TenantSelector } from "@/components/auth/tenant-selector";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { AppForm } from "@/components/forms/form";
import { useAuth } from "@/hooks/useAuth";
import { getDefaultTenantId } from "@/lib/tenant-config";

type LoginFormValues = {
  email: string;
  password: string;
};

const LOGIN_REASON_MESSAGES: Record<string, string> = {
  "session-expired": "Your session expired. Please sign in again.",
  unauthorized: "You do not have access to that page. Please sign in with the correct account.",
  "missing-tenant": "Tenant context is missing. Select your clinic and sign in again.",
};

export default function LoginPage() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const [tenantId, setTenantId] = useState(getDefaultTenantId() ?? "");
  const [submitting, setSubmitting] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Authenticate via the API Gateway auth service.</CardDescription>
        </CardHeader>
        <CardBody>
          {reason && LOGIN_REASON_MESSAGES[reason] ? (
            <p className="mb-4 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-900 dark:text-amber-100">
              {LOGIN_REASON_MESSAGES[reason]}
            </p>
          ) : null}

          <AppForm<LoginFormValues>
            defaultValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              if (!tenantId) {
                toast.error("Select a clinic before signing in.");
                return;
              }

              setSubmitting(true);
              try {
                await login({ ...values, tenantId });
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Unable to sign in.");
              } finally {
                setSubmitting(false);
              }
            }}
            className="space-y-4"
          >
            {(form) => (
              <>
                <TenantSelector value={tenantId} onChange={setTenantId} />
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@clinic.com"
                    {...form.register("email", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" {...form.register("password", { required: true })} />
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "Signing in..." : "Sign in"}
                </Button>
              </>
            )}
          </AppForm>
          <div className="mt-4 flex justify-between text-sm">
            <Link href="/register" className="text-primary hover:underline">
              Create account
            </Link>
            <Link href="/reset-password" className="text-primary hover:underline">
              Reset password
            </Link>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
