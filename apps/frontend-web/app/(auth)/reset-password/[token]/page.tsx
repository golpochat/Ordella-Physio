"use client";

import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ResetPasswordTokenPageProps = {
  params: { token: string };
};

export default function ResetPasswordTokenPage({ params }: ResetPasswordTokenPageProps) {
  const { token } = params;

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>Choose a new password for your account.</CardDescription>
        </CardHeader>
        <CardBody>
          <ResetPasswordForm token={token} />
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
