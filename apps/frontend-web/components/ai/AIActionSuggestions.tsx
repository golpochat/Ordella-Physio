"use client";

import { useState } from "react";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIAgent } from "@/hooks/useAI";
import { ApiError } from "@/lib/api-client";

type AIActionSuggestionsProps = {
  patientId?: string;
  invoiceId?: string;
  suggestions?: string[];
};

const DEFAULT_SUGGESTIONS = ["Send reminder", "Schedule follow-up", "Create task"];

export function AIActionSuggestions({
  patientId,
  invoiceId,
  suggestions = DEFAULT_SUGGESTIONS,
}: AIActionSuggestionsProps) {
  const agent = useAIAgent();
  const [lastResponse, setLastResponse] = useState<string | null>(null);

  async function runAction(label: string) {
    try {
      const result = await agent.mutateAsync({
        request: label,
        patientId,
        invoiceId,
      });
      setLastResponse(result.response);
      toast.success("AI action completed.");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : error instanceof Error
            ? error.message
            : "AI action failed.";
      toast.error(message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Suggested actions</CardTitle>
      </CardHeader>
      <CardBody className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {suggestions.map((label) => (
            <Button
              key={label}
              type="button"
              variant="outline"
              size="sm"
              disabled={agent.isPending}
              onClick={() => void runAction(label)}
            >
              {agent.isPending ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
              {label}
            </Button>
          ))}
        </div>
        {lastResponse ? (
          <p className="text-sm text-muted-foreground">{lastResponse}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Use AI-assisted actions for reminders, follow-ups, and tasks.
          </p>
        )}
      </CardBody>
    </Card>
  );
}
