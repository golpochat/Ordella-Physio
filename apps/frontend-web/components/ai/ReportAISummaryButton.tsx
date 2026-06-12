"use client";

import { useState } from "react";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { AISummaryPanel } from "@/components/ai/AISummaryPanel";
import { Button } from "@/components/ui/button";
import { useReportInsights } from "@/hooks/useAI";
import { ApiError } from "@/lib/api-client";
import { IfHasPermission } from "@/lib/auth/withPermission";

type ReportAISummaryButtonProps = {
  report: Record<string, unknown> | null | undefined;
  disabled?: boolean;
};

export function ReportAISummaryButton({ report, disabled = false }: ReportAISummaryButtonProps) {
  const insights = useReportInsights();
  const [visible, setVisible] = useState(false);

  async function handleSummarize() {
    if (!report) {
      toast.error("Run the report first to generate an AI summary.");
      return;
    }

    try {
      await insights.mutateAsync(report);
      setVisible(true);
      toast.success("AI summary generated.");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : error instanceof Error
            ? error.message
            : "Failed to summarize report.";
      toast.error(message);
    }
  }

  return (
    <IfHasPermission permission="ai.use">
      <div className="space-y-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || insights.isPending || !report}
          onClick={() => void handleSummarize()}
        >
          {insights.isPending ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
          AI summary
        </Button>
        {visible && insights.data ? (
          <AISummaryPanel
            title="Report AI summary"
            summary={insights.data.summary}
            sections={[
              { label: "Highlights", items: insights.data.highlights },
              { label: "Risks", items: insights.data.risks },
            ]}
            defaultExpanded
          />
        ) : null}
      </div>
    </IfHasPermission>
  );
}
