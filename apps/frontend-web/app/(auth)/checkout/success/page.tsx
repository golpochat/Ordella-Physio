"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoading } from "@/components/patient-portal/page-state";
import { clearCheckoutDraft } from "@/lib/checkout-draft-storage";
import { getPortalForRole } from "@/lib/auth/roleRedirect";
import { useAuthStore } from "@/store/auth.store";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    clearCheckoutDraft();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.replace(getPortalForRole(user?.role ?? "ADMIN"));
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [router, user?.role]);

  return (
    <div className="auth-page-shell py-10">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle>Payment received</CardTitle>
          <CardDescription>
            Your subscription is being activated. You will be redirected to your workspace shortly.
          </CardDescription>
        </CardHeader>
        <CardBody>
          <PageLoading rows={2} />
        </CardBody>
      </Card>
    </div>
  );
}
