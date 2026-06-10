"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { AppForm } from "@/components/forms/form";
import { useAuth } from "@/hooks/useAuth";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Authenticate via the API Gateway auth service.</CardDescription>
        </CardHeader>
        <CardBody>
          <AppForm<LoginFormValues>
            defaultValues={{ email: "", password: "" }}
            onSubmit={(values) => login(values)}
            className="space-y-4"
          >
            {(form) => (
              <>
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
                <Button type="submit" className="w-full">
                  Sign in
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
