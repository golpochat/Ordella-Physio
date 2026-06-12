"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { AIActionSuggestions } from "@/components/ai/AIActionSuggestions";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { AISummaryPanel } from "@/components/ai/AISummaryPanel";
import { Button } from "@/components/ui/button";
import { usePatientInsights } from "@/hooks/useAI";
import { ApiError } from "@/lib/api-client";
import { IfHasPermission } from "@/lib/auth/withPermission";

type PatientAIInsightsProps = {
  patientId: string;
};

export function PatientAIInsights({ patientId }: PatientAIInsightsProps) {
  const insights = usePatientInsights();

  useEffect(() => {
    if (insights.isError && insights.error) {
      const message =
        insights.error instanceof ApiError
          ? insights.error.message
          : "Failed to load patient AI insights.";
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
            onClick={() => void insights.mutate(patientId)}
          >
            {insights.isPending ? "Generating…" : "Generate AI summary"}
          </Button>
        </div>
        <AIInsightCard
          title="Patient AI summary"
          summary={data?.summary}
          insights={data?.keyConcerns}
          actions={data?.recommendedNextSteps}
          riskLevel={data?.riskScore?.level}
          riskScore={data?.riskScore?.score}
          isLoading={insights.isPending}
        />
        <AISummaryPanel
          summary={data?.summary}
          sections={[
            {
              label: "Risk factors",
              items: data?.riskScore?.factors ?? [],
            },
          ]}
          defaultExpanded={Boolean(data)}
        />
        <AIActionSuggestions patientId={patientId} />
      </div>
    </IfHasPermission>
  );
}
