"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
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

  return (
    <Modal
      open={open && Boolean(plan)}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
    >
      <ModalContent className="max-w-md">
        <ModalHeader>
          <ModalTitle>Confirm plan change</ModalTitle>
          <ModalDescription>
            {plan ? (
              <>
                Switch to <span className="font-medium">{plan.name}</span>?
              </>
            ) : null}
          </ModalDescription>
        </ModalHeader>

        {plan && plan.priceMonthly > 0 ? (
          <div className="space-y-2 py-4">
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

        <ModalFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isSubmitting || !plan}
            onClick={() => plan && onConfirm({ planId: plan.id, billingCycle })}
          >
            {isSubmitting ? "Processing…" : "Confirm"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
