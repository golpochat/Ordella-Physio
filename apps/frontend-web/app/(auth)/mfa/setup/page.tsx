"use client";

import Link from "next/link";
import { MFASetup } from "@/components/auth/MFASetup";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MfaSetupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Set up multi-factor authentication</CardTitle>
          <CardDescription>Scan the QR code with your authenticator app, then confirm with a 6-digit code.</CardDescription>
        </CardHeader>
        <CardBody>
          <MFASetup />
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
