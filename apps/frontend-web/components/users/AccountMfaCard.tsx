"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "@ordella/shared-icons";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ACCOUNT_PROFILE_QUERY_KEY, useMyProfile } from "@/hooks/useAccountProfile";
import { getApiErrorMessage } from "@/lib/api-error";
import { authClient } from "@/lib/auth-client";
import { useAuthStore } from "@/store/auth.store";

function MfaStatusBadge({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={
        enabled
          ? "inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800"
          : "inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
      }
    >
      {enabled ? "Enabled" : "Not enabled"}
    </span>
  );
}

export function AccountMfaCard() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const profileQuery = useMyProfile();
  const queryClient = useQueryClient();
  const [disabling, setDisabling] = useState(false);

  const mfaEnabled = profileQuery.data?.mfaEnabled ?? false;

  const handleDisable = async () => {
    if (!accessToken) {
      toast.error("Your session expired. Please sign in again.");
      return;
    }

    if (!window.confirm("Disable multi-factor authentication for this account?")) {
      return;
    }

    setDisabling(true);
    try {
      await authClient.disableMfa(accessToken);
      await queryClient.invalidateQueries({ queryKey: ACCOUNT_PROFILE_QUERY_KEY });
      await queryClient.invalidateQueries({ queryKey: ["user-portal", "profile"] });
      toast.success("Multi-factor authentication disabled.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to disable MFA. Please try again."));
    } finally {
      setDisabling(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Multi-factor authentication</CardTitle>
        <CardDescription>
          Add an extra layer of security with an authenticator app on sign-in.
        </CardDescription>
      </CardHeader>
      <CardBody className="space-y-4">
        {profileQuery.isLoading ? (
          <p className="dashboard-cell-muted text-sm">Loading security settings…</p>
        ) : profileQuery.isError ? (
          <p className="form-error-banner text-sm">Unable to load MFA status.</p>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-muted-foreground">Status</span>
              <MfaStatusBadge enabled={mfaEnabled} />
            </div>

            {mfaEnabled ? (
              <Button type="button" variant="outline" disabled={disabling} onClick={() => void handleDisable()}>
                {disabling ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {disabling ? "Disabling…" : "Disable MFA"}
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link href="/mfa/setup">Set up MFA</Link>
              </Button>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
}
