"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { AIActionSuggestions } from "@/components/ai/AIActionSuggestions";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { AISummaryPanel } from "@/components/ai/AISummaryPanel";
import { Button } from "@/components/ui/button";
import { useInvoiceInsights } from "@/hooks/useAI";
import { ApiError } from "@/lib/api-client";
import { IfHasPermission } from "@/lib/auth/withPermission";

type InvoiceAIInsightsProps = {
  invoiceId: string;
  patientId?: string;
};

export function InvoiceAIInsights({ invoiceId, patientId }: InvoiceAIInsightsProps) {
  const insights = useInvoiceInsights();

  useEffect(() => {
    if (insights.isError && insights.error) {
      const message =
        insights.error instanceof ApiError
          ? insights.error.message
          : "Failed to explain invoice.";
      toast.error(message);
    }
  }, [insights.isError, insights.error]);

  const data = insights.data;

  return (
    <IfHasPermission permission="ai.use">
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={insights.isPending}
            onClick={() => void insights.mutate(invoiceId)}
          >
            {insights.isPending ? "Explaining…" : "Explain invoice"}
          </Button>
        </div>
        <AIInsightCard
          title="Invoice explanation"
          summary={data?.explanation}
          insights={data?.anomalies}
          actions={data?.suggestedActions}
          isLoading={insights.isPending}
        />
        <AISummaryPanel
          title="Invoice details"
          summary={data?.explanation}
          sections={[
            { label: "Anomalies", items: data?.anomalies ?? [] },
            { label: "Suggested actions", items: data?.suggestedActions ?? [] },
          ]}
          defaultExpanded={Boolean(data)}
        />
        <AIActionSuggestions patientId={patientId} invoiceId={invoiceId} />
      </div>
    </IfHasPermission>
  );
}
