"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";

export default function EnterpriseSsoCallbackPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <div className="mx-auto max-w-lg">
      <Card>
        <CardBody className="space-y-4 text-center">
          <h1 className="text-xl font-semibold">
            {status === "connected" ? "SSO connected" : "SSO setup incomplete"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {status === "connected"
              ? "Your identity provider was linked successfully."
              : "The SSO flow did not complete. Try again from enterprise settings."}
          </p>
          <Button asChild>
            <Link href="/clinic/enterprise">Back to enterprise settings</Link>
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
