"use client";

import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { useCopilot, useInvoiceInsights, useWorkflowRun } from "@/hooks/useAI";
import { ApiError } from "@/lib/api-client";
import type { CopilotEntityType } from "@/lib/ai-copilot-types";

type AIWorkflowSuggestionsProps = {
  entityType?: CopilotEntityType;
  entityId?: string;
  patientId?: string;
  invoiceId?: string;
  appointmentId?: string;
};

const QUICK_ACTIONS = [
  { label: "Send reminder", query: "Send reminder to the patient" },
  { label: "Create follow-up task", query: "Create a follow-up task for this case" },
  { label: "Explain invoice", query: "Explain this invoice in plain language" },
] as const;

export function AIWorkflowSuggestions({
  entityType,
  entityId,
  patientId,
  invoiceId,
  appointmentId,
}: AIWorkflowSuggestionsProps) {
  const copilot = useCopilot();
  const workflow = useWorkflowRun();
  const invoiceInsights = useInvoiceInsights();

  async function runQuickAction(query: string) {
    try {
      await copilot.mutateAsync({
        query,
        entityType,
        entityId,
      });
      toast.success("Action completed.");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "AI action failed.");
    }
  }

  async function handleExplainInvoice() {
    if (!invoiceId) {
      await runQuickAction("Explain this invoice");
      return;
    }

    try {
      await invoiceInsights.mutateAsync(invoiceId);
      toast.success("Invoice explanation generated.");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Failed to explain invoice.");
    }
  }

  async function runWorkflow(trigger: string) {
    try {
      const result = await workflow.mutateAsync({
        trigger,
        patientId,
        invoiceId,
        appointmentId,
      });
      toast.success(`Workflow ${result.status.toLowerCase()}.`);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Workflow failed.");
    }
  }

  const isBusy = copilot.isPending || workflow.isPending || invoiceInsights.isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Workflow suggestions</CardTitle>
      </CardHeader>
      <CardBody className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {QUICK_ACTIONS.map((action) => (
            <Button
              key={action.label}
              type="button"
              variant="outline"
              size="sm"
              disabled={isBusy}
              onClick={() =>
                void (action.label === "Explain invoice"
                  ? handleExplainInvoice()
                  : runQuickAction(action.query))
              }
            >
              {isBusy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
              {action.label}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isBusy}
            onClick={() => void runWorkflow("APPOINTMENT_MISSED")}
          >
            Missed appointment workflow
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isBusy}
            onClick={() => void runWorkflow("INVOICE_OVERDUE")}
          >
            Overdue invoice workflow
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
