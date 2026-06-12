"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Badge } from "@/components/dashboard/Badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import {
  useIssueClinicInvoice,
  usePayClinicInvoice,
  useVoidClinicInvoice,
} from "@/hooks/useClinicPortal";
import { parseInvoiceStatusActionErrors } from "@/lib/invoice-api-errors";
import type { ClinicInvoice, ClinicInvoiceStatusActionResponse } from "@/lib/clinic-portal-types";

type StatusAction = "issue" | "pay" | "void";

const ACTION_COPY: Record<
  StatusAction,
  { title: string; description: string; confirmLabel: string; successMessage: string }
> = {
  issue: {
    title: "Issue invoice",
    description: "Issue this invoice to the patient? It will no longer be editable as a draft.",
    confirmLabel: "Issue invoice",
    successMessage: "Invoice issued successfully.",
  },
  pay: {
    title: "Mark as paid",
    description: "Record this invoice as paid?",
    confirmLabel: "Mark as paid",
    successMessage: "Invoice marked as paid.",
  },
  void: {
    title: "Void invoice",
    description: "Void this invoice? This action cannot be undone.",
    confirmLabel: "Void invoice",
    successMessage: "Invoice voided successfully.",
  },
};

export type InvoiceStatusActionsProps = {
  invoice: ClinicInvoice;
  onStatusChange?: (invoice: ClinicInvoice) => void;
};

export function InvoiceStatusActions({ invoice, onStatusChange }: InvoiceStatusActionsProps) {
  const router = useRouter();
  const issueInvoice = useIssueClinicInvoice(invoice.id);
  const payInvoice = usePayClinicInvoice(invoice.id);
  const voidInvoice = useVoidClinicInvoice(invoice.id);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<StatusAction | null>(null);
  const [paymentReference, setPaymentReference] = useState("");

  const isPending = issueInvoice.isPending || payInvoice.isPending || voidInvoice.isPending;

  function openConfirm(action: StatusAction) {
    setPendingAction(action);
    setPaymentReference("");
    setConfirmOpen(true);
  }

  function handleMutationError(error: unknown) {
    const result = parseInvoiceStatusActionErrors(error);

    if (result.forbidden || result.tenantMismatch) {
      router.replace("/forbidden");
      return;
    }

    if (result.notFound) {
      toast.error(result.message ?? "Invoice does not exist.");
      router.push("/billing/invoices");
      return;
    }

    toast.error(result.message ?? "Failed to update invoice status.");
  }

  function handleConfirm() {
    if (!pendingAction) {
      return;
    }

    const mutationOptions = {
      onSuccess: (response: ClinicInvoiceStatusActionResponse) => {
        setConfirmOpen(false);
        setPendingAction(null);
        onStatusChange?.(response.invoice);
        toast.success(response.message ?? ACTION_COPY[pendingAction].successMessage);
      },
      onError: handleMutationError,
    };

    if (pendingAction === "issue") {
      issueInvoice.mutate(undefined, mutationOptions);
      return;
    }

    if (pendingAction === "pay") {
      payInvoice.mutate(
        paymentReference.trim() ? { paymentReference: paymentReference.trim() } : undefined,
        mutationOptions,
      );
      return;
    }

    voidInvoice.mutate(undefined, mutationOptions);
  }

  if (invoice.status === "PAID") {
    return <Badge variant="success">Paid</Badge>;
  }

  if (invoice.status === "VOIDED") {
    return <Badge variant="danger">Void</Badge>;
  }

  if (invoice.status === "ISSUED") {
    const pendingCopy = pendingAction ? ACTION_COPY[pendingAction] : null;

    return (
      <>
        <div className="user-list-actions">
          <Button variant="primary" disabled={isPending} onClick={() => openConfirm("pay")}>
            {payInvoice.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {payInvoice.isPending ? "Processing..." : "Mark as Paid"}
          </Button>
          <Button variant="destructive" disabled={isPending} onClick={() => openConfirm("void")}>
            {voidInvoice.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {voidInvoice.isPending ? "Voiding..." : "Void Invoice"}
          </Button>
        </div>

        <Modal open={confirmOpen} onOpenChange={setConfirmOpen}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{pendingCopy?.title}</ModalTitle>
              <ModalDescription>{pendingCopy?.description}</ModalDescription>
            </ModalHeader>
            {pendingAction === "pay" ? (
              <div className="space-y-2 px-6 pb-2">
                <Label htmlFor="payment-reference">Payment reference (optional)</Label>
                <Input
                  id="payment-reference"
                  value={paymentReference}
                  placeholder="e.g. txn_12345"
                  disabled={isPending}
                  onChange={(event) => setPaymentReference(event.target.value)}
                />
              </div>
            ) : null}
            <ModalFooter className="gap-2 sm:gap-0">
              <Button variant="outline" disabled={isPending} onClick={() => setConfirmOpen(false)}>
                Close
              </Button>
              <Button
                variant={pendingAction === "void" ? "destructive" : "primary"}
                disabled={isPending}
                onClick={handleConfirm}
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isPending ? "Working..." : pendingCopy?.confirmLabel}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  if (invoice.status === "DRAFT") {
    const pendingCopy = pendingAction ? ACTION_COPY[pendingAction] : null;

    return (
      <>
        <Button variant="primary" disabled={isPending} onClick={() => openConfirm("issue")}>
          {issueInvoice.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {issueInvoice.isPending ? "Issuing..." : "Issue Invoice"}
        </Button>

        <Modal open={confirmOpen} onOpenChange={setConfirmOpen}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{pendingCopy?.title}</ModalTitle>
              <ModalDescription>{pendingCopy?.description}</ModalDescription>
            </ModalHeader>
            <ModalFooter className="gap-2 sm:gap-0">
              <Button variant="outline" disabled={isPending} onClick={() => setConfirmOpen(false)}>
                Close
              </Button>
              <Button variant="primary" disabled={isPending} onClick={handleConfirm}>
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isPending ? "Working..." : pendingCopy?.confirmLabel}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return null;
}

export function InvoiceStatusBadge({ status }: { status: string }) {
  if (status === "DRAFT") {
    return <Badge variant="muted">Draft</Badge>;
  }

  if (status === "ISSUED") {
    return <Badge variant="info">Issued</Badge>;
  }

  if (status === "PAID") {
    return <Badge variant="success">Paid</Badge>;
  }

  if (status === "VOIDED") {
    return <Badge variant="danger">Void</Badge>;
  }

  return <Badge>{status}</Badge>;
}
