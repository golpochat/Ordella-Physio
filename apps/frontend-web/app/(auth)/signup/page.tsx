"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { TenantSelector } from "@/components/auth/tenant-selector";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { AppForm } from "@/components/forms/form";
import { useAuth } from "@/hooks/useAuth";
import { getDefaultTenantId } from "@/lib/tenant-config";

type SignupFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const { register } = useAuth();
  const [tenantId, setTenantId] = useState(getDefaultTenantId() ?? "");
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="auth-page-shell">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Create your clinic account to get started.</CardDescription>
        </CardHeader>
        <CardBody>
          <AppForm<SignupFormValues>
            defaultValues={{ firstName: "", lastName: "", email: "", password: "" }}
            onSubmit={async (values) => {
              if (!tenantId) {
                toast.error("Select a clinic before signing up.");
                return;
              }

              setSubmitting(true);
              try {
                await register({ ...values, tenantId });
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Unable to create account.");
              } finally {
                setSubmitting(false);
              }
            }}
            className="space-y-4"
          >
            {(form) => (
              <>
                <TenantSelector value={tenantId} onChange={setTenantId} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" {...form.register("firstName", { required: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" {...form.register("lastName", { required: true })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...form.register("email", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" {...form.register("password", { required: true })} />
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "Creating account..." : "Sign up"}
                </Button>
              </>
            )}
          </AppForm>
          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
