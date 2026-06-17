"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { useAuthStore } from "@/store/auth.store";

export default function EnterpriseSsoCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const status = searchParams.get("status");
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  useEffect(() => {
    if (status !== "success" || !accessToken || !refreshToken) {
      return;
    }

    setSession({
      accessToken,
      refreshToken,
      user: {
        id: "sso-user",
        email: "",
        role: "STAFF",
        roles: ["STAFF"],
        permissions: [],
        tenantId: searchParams.get("tenantId") ?? "",
      },
    });

    router.replace("/clinic");
  }, [accessToken, refreshToken, router, setSession, status]);

  const isSuccess = status === "success" && Boolean(accessToken && refreshToken);

  return (
    <>
      <PageHeader
        title={isSuccess ? "Signing you in…" : "SSO sign-in incomplete"}
        subtitle={
          isSuccess
            ? "Completing your enterprise SSO session."
            : "The SSO flow did not complete. Try again from login or enterprise settings."
        }
      />
      <Card>
        <Button asChild>
          <Link href={isSuccess ? "/clinic" : "/login"}>
            {isSuccess ? "Continue to clinic" : "Back to login"}
          </Link>
        </Button>
      </Card>
    </>
  );
}
