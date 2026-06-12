"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { SubscriptionPlan } from "@/lib/subscription-billing-types";

type UpgradeModalProps = {
  plan: SubscriptionPlan | null;
  open: boolean;
  isSubmitting?: boolean;
  onClose: () => void;
  onConfirm: (input: { planId: string; billingCycle: "monthly" | "yearly" }) => void;
};

export function UpgradeModal({
  plan,
  open,
  isSubmitting = false,
  onClose,
  onConfirm,
}: UpgradeModalProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  if (!open || !plan) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Confirm plan change</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Switch to <span className="font-medium">{plan.name}</span>?
        </p>

        {plan.priceMonthly > 0 ? (
          <div className="mt-4 space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="billingCycle"
                checked={billingCycle === "monthly"}
                onChange={() => setBillingCycle("monthly")}
              />
              Monthly billing
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="billingCycle"
                checked={billingCycle === "yearly"}
                onChange={() => setBillingCycle("yearly")}
              />
              Yearly billing
            </label>
          </div>
        ) : null}

        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={() => onConfirm({ planId: plan.id, billingCycle })}
          >
            {isSubmitting ? "Processing…" : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
}
