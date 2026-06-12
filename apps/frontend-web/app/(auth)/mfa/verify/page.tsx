"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { MFAVerify } from "@/components/auth/MFAVerify";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MfaVerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const tenantId = searchParams.get("tenantId");

  useEffect(() => {
    if (!userId || !tenantId) {
      router.replace("/login");
    }
  }, [router, tenantId, userId]);

  if (!userId || !tenantId) {
    return null;
  }

  return (
    <div className="auth-page-shell">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify your identity</CardTitle>
          <CardDescription>Enter the 6-digit code from your authenticator app to finish signing in.</CardDescription>
        </CardHeader>
        <CardBody>
          <MFAVerify userId={userId} tenantId={tenantId} />
          <p className="mt-4 text-sm">
            <Link href="/login" className="text-primary hover:underline">
              Back to sign in
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
