"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { useQueryClient } from "@tanstack/react-query";

export default function MarketplaceOAuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const provider = searchParams.get("provider");
  const status = searchParams.get("status");
  const isSuccess = status === "connected";

  useEffect(() => {
    void queryClient.invalidateQueries({ queryKey: ["marketplace", "tenant-integrations"] });
  }, [queryClient]);

  useEffect(() => {
    if (!isSuccess || !provider) return;

    const timer = window.setTimeout(() => {
      router.replace(`/clinic/marketplace/${provider}`);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [isSuccess, provider, router]);

  return (
    <>
      <PageHeader
        title={isSuccess ? "Integration connected" : "Connection incomplete"}
        subtitle={
          isSuccess
            ? `Your ${provider ?? "provider"} account was linked successfully. Redirecting...`
            : "The OAuth flow did not complete. Try connecting again from the marketplace."
        }
      />
      <Card>
        {provider ? (
          <Button asChild>
            <Link href={`/clinic/marketplace/${provider}`}>View integration</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/clinic/marketplace">Back to marketplace</Link>
          </Button>
        )}
      </Card>
    </>
  );
}
