"use client";

import { VerificationMessage } from "@/components/auth/VerificationMessage";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type VerifyEmailPageProps = {
  params: { token: string };
};

export default function VerifyEmailPage({ params }: VerifyEmailPageProps) {
  const { token } = params;

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email verification</CardTitle>
          <CardDescription>Confirming your email address.</CardDescription>
        </CardHeader>
        <CardBody>
          <VerificationMessage token={token} />
        </CardBody>
      </Card>
    </main>
  );
}
