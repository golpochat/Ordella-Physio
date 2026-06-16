"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/hooks/useAuth";

const CHECKOUT_PATHS = ["/checkout", "/register", "/login"];

export function RegisteredTenantBanner() {
  const pathname = usePathname();
  const { accessToken } = useAuth();

  const trialQuery = useQuery({
    queryKey: ["tenant-trial"],
    enabled: Boolean(accessToken),
    queryFn: () => authClient.getTenantTrial(accessToken!),
    staleTime: 60_000,
    retry: false,
  });

  const status = trialQuery.data?.status;
  const onCheckoutFlow = CHECKOUT_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (status !== "REGISTERED" || onCheckoutFlow) {
    return null;
  }

  const plan = trialQuery.data?.subscriptionPlan ?? "pro";
  const checkoutHref = `/checkout?plan=${encodeURIComponent(plan)}&cycle=yearly&intent=checkout`;

  return (
    <div className="tenant-trial-banner tenant-trial-banner-expired" role="alert">
      <p>Complete checkout to activate your clinic workspace.</p>
      <Button asChild size="sm">
        <Link href={checkoutHref}>Continue to checkout</Link>
      </Button>
    </div>
  );
}
