"use client";

import { Loader2 } from "@ordella/shared-icons";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

type AIInsightCardProps = {
  title?: string;
  summary?: string;
  insights?: string[];
  actions?: string[];
  riskLevel?: string;
  riskScore?: number;
  isLoading?: boolean;
  error?: string | null;
};

export function AIInsightCard({
  title = "AI insights",
  summary,
  insights = [],
  actions = [],
  riskLevel,
  riskScore,
  isLoading = false,
  error = null,
}: AIInsightCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {title}
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : null}
        </CardTitle>
      </CardHeader>
      <CardBody className="space-y-4 text-sm">
        {error ? <p className="text-destructive">{error}</p> : null}
        {!error && isLoading ? (
          <p className="text-muted-foreground">Generating insights…</p>
        ) : null}
        {!error && !isLoading && summary ? (
          <div>
            <p className="font-medium">Summary</p>
            <p className="text-muted-foreground">{summary}</p>
          </div>
        ) : null}
        {!error && !isLoading && (riskLevel || riskScore !== undefined) ? (
          <div>
            <p className="font-medium">Operational risk</p>
            <p className="text-muted-foreground">
              {riskLevel ?? "—"}
              {riskScore !== undefined ? ` (${riskScore}/100)` : ""}
            </p>
          </div>
        ) : null}
        {!error && !isLoading && insights.length > 0 ? (
          <div>
            <p className="font-medium">Key insights</p>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              {insights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {!error && !isLoading && actions.length > 0 ? (
          <div>
            <p className="font-medium">Recommended actions</p>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              {actions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {!error && !isLoading && !summary && insights.length === 0 && actions.length === 0 ? (
          <p className="text-muted-foreground">No insights yet. Run AI analysis to generate them.</p>
        ) : null}
      </CardBody>
    </Card>
  );
}
