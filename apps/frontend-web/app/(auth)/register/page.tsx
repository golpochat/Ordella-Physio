"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { AppForm } from "@/components/forms/form";
import { useAuth } from "@/hooks/useAuth";

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const { register } = useAuth();

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Register a new user through the auth service proxy.</CardDescription>
        </CardHeader>
        <CardBody>
          <AppForm<RegisterFormValues>
            defaultValues={{ firstName: "", lastName: "", email: "", password: "" }}
            onSubmit={(values) => register(values)}
            className="space-y-4"
          >
            {(form) => (
              <>
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
                <Button type="submit" className="w-full">
                  Register
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
