"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { AIActionSuggestions } from "@/components/ai/AIActionSuggestions";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { AISummaryPanel } from "@/components/ai/AISummaryPanel";
import { Button } from "@/components/ui/button";
import { useAppointmentInsights } from "@/hooks/useAI";
import { ApiError } from "@/lib/api-client";
import { IfHasPermission } from "@/lib/auth/withPermission";

type AppointmentAIInsightsProps = {
  appointmentId: string;
  patientId?: string;
};

export function AppointmentAIInsights({ appointmentId, patientId }: AppointmentAIInsightsProps) {
  const insights = useAppointmentInsights();

  useEffect(() => {
    if (insights.isError && insights.error) {
      const message =
        insights.error instanceof ApiError
          ? insights.error.message
          : "Failed to load visit insights.";
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
            onClick={() => void insights.mutate(appointmentId)}
          >
            {insights.isPending ? "Generating…" : "Generate visit insights"}
          </Button>
        </div>
        <AIInsightCard
          title="Visit insights"
          summary={data?.visitSummary}
          insights={data?.flags}
          actions={data?.followUpActions}
          isLoading={insights.isPending}
        />
        <AISummaryPanel
          title="Visit summary"
          summary={data?.visitSummary}
          sections={[
            { label: "Follow-up actions", items: data?.followUpActions ?? [] },
            { label: "Flags", items: data?.flags ?? [] },
          ]}
          defaultExpanded={Boolean(data)}
        />
        <AIActionSuggestions patientId={patientId} />
      </div>
    </IfHasPermission>
  );
}
