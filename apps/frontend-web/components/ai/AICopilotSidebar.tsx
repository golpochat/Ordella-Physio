"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "@ordella/shared-icons";
import { X } from "lucide-react";
import { toast } from "sonner";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCopilot } from "@/hooks/useAI";
import { ApiError } from "@/lib/api-client";
import type { CopilotEntityType, CopilotResult } from "@/lib/ai-copilot-types";
import { IfHasPermission } from "@/lib/auth/withPermission";

type AICopilotSidebarProps = {
  open: boolean;
  onClose: () => void;
  entityType?: CopilotEntityType;
  entityId?: string;
  title?: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function AICopilotSidebar({
  open,
  onClose,
  entityType,
  entityId,
  title = "AI Copilot",
}: AICopilotSidebarProps) {
  const copilot = useCopilot();
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [lastResult, setLastResult] = useState<CopilotResult | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }

    setMessages((current) => [...current, { role: "user", content: trimmed }]);
    setQuery("");

    try {
      const result = await copilot.mutateAsync({
        query: trimmed,
        entityType,
        entityId,
      });
      setLastResult(result);
      setMessages((current) => [...current, { role: "assistant", content: result.response }]);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Copilot request failed.");
    }
  }

  if (!open) {
    return null;
  }

  return (
    <IfHasPermission permission="ai.use">
      <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
        <aside className="flex h-full w-full max-w-md flex-col border-l bg-background shadow-xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div>
              <p className="font-semibold">{title}</p>
              {entityType && entityId ? (
                <p className="text-xs text-muted-foreground">
                  {entityType} · {entityId}
                </p>
              ) : null}
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={onClose} aria-label="Close copilot">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {lastResult?.summary ? (
              <AIInsightCard
                title="Entity summary"
                summary={lastResult.summary}
                insights={lastResult.insights}
                actions={lastResult.suggestedActions}
              />
            ) : null}

            {lastResult?.predictions?.length ? (
              <Card>
                <CardBody className="space-y-2 text-sm">
                  <p className="font-medium">Predictive scores</p>
                  {lastResult.predictions.map((prediction) => (
                    <div key={prediction.predictionType}>
                      <p className="text-muted-foreground">
                        {prediction.predictionType}: {prediction.score}/100
                      </p>
                    </div>
                  ))}
                </CardBody>
              </Card>
            ) : null}

            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`rounded-md px-3 py-2 text-sm ${
                    message.role === "user" ? "bg-muted ml-8" : "bg-primary/5 mr-8"
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {copilot.isPending ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking…
                </div>
              ) : null}
            </div>
          </div>

          <form onSubmit={(event) => void handleSubmit(event)} className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ask about this record…"
                disabled={copilot.isPending}
              />
              <Button type="submit" disabled={copilot.isPending || !query.trim()}>
                Send
              </Button>
            </div>
          </form>
        </aside>
      </div>
    </IfHasPermission>
  );
}
