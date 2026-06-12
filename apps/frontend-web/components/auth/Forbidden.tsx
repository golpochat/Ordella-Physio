"use client";

import Link from "next/link";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPortalForRole } from "@/lib/auth/roleRedirect";
import { resolveUserRoles } from "@/lib/rbac";
import { useAuthStore } from "@/store/auth.store";

export function Forbidden() {
  const user = useAuthStore((state) => state.user);
  const roles = user ? resolveUserRoles(user) : [];
  const homeHref = user ? getPortalForRole(roles[0] ?? user.role) : "/login";

  return (
    <div className="auth-page-shell">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Access denied</CardTitle>
          <CardDescription>You do not have permission to view this page.</CardDescription>
        </CardHeader>
        <CardBody className="auth-form-stack">
          <Link href={homeHref} className="auth-submit-button">
            Go to your dashboard
          </Link>
          <Link href="/login" className="text-sm text-primary hover:underline">
            Sign in with a different account
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
