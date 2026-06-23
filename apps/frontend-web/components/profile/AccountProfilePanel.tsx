"use client";

import type { ReactNode } from "react";
import { AccountMfaCard } from "@/components/users/AccountMfaCard";
import { ChangePasswordForm } from "@/components/users/ChangePasswordForm";
import { UserProfileForm } from "@/components/users/UserProfileForm";

export type AccountProfilePanelProps = {
  /** Portal-specific context shown above the account form (e.g. organization card). */
  context?: ReactNode;
  showChangePassword?: boolean;
  showMfa?: boolean;
};

export function AccountProfilePanel({
  context,
  showChangePassword = true,
  showMfa = true,
}: AccountProfilePanelProps) {
  return (
    <div className="space-y-6">
      {context}
      <UserProfileForm />
      {showChangePassword ? <ChangePasswordForm /> : null}
      {showMfa ? <AccountMfaCard /> : null}
    </div>
  );
}
