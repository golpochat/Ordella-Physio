"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { AppForm } from "@/components/forms/form";
import { authClient } from "@/lib/auth-client";

type ResetFormValues = {
  email: string;
};

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>Request a password reset email via the auth service.</CardDescription>
        </CardHeader>
        <CardBody>
          <AppForm<ResetFormValues>
            defaultValues={{ email: "" }}
            onSubmit={async (values) => {
              await authClient.resetPassword(values);
              toast.success("Reset instructions sent if the account exists.");
            }}
            className="space-y-4"
          >
            {(form) => (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...form.register("email", { required: true })} />
                </div>
                <Button type="submit" className="w-full">
                  Send reset link
                </Button>
              </>
            )}
          </AppForm>
          <p className="mt-4 text-sm">
            <Link href="/login" className="text-primary hover:underline">
              Back to sign in
            </Link>
          </p>
        </CardBody>
      </Card>
    </main>
  );
}
