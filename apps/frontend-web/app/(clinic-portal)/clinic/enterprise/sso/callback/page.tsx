"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function EnterpriseSsoCallbackPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <>
      <PageHeader
        title={status === "connected" ? "SSO connected" : "SSO setup incomplete"}
        subtitle={
          status === "connected"
            ? "Your identity provider was linked successfully."
            : "The SSO flow did not complete. Try again from enterprise settings."
        }
      />
      <Card>
        <Button asChild>
          <Link href="/clinic/enterprise">Back to enterprise settings</Link>
        </Button>
      </Card>
    </>
  );
}
